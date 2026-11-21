import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ExamRoom } from './components/ExamRoom';
import { LoginScreen } from './components/LoginScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { TeacherPortal } from './components/TeacherPortal';
import {
  BackupEnvelope,
  ExamPacket,
  GASSubmissionPayload,
  StoredExamSession,
  Student,
} from './types/exam';
import { ENCRYPTION_VERSION } from './utils/crypto';
import {
  buildSubmissionArtifacts,
  EXAM_DURATION_MINUTES,
  STORAGE_KEY,
  submitToGAS,
} from './utils/gasService';
import { generateStudentExamPacket } from './utils/prng';

type AppView = 'login' | 'exam' | 'summary' | 'teacher';

function loadSavedSession(): StoredExamSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredExamSession;
    if (
      parsed &&
      parsed.student &&
      parsed.student.id &&
      parsed.answers &&
      typeof parsed.endTimestamp === 'number'
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function saveSessionToStorage(session: StoredExamSession | null): void {
  try {
    if (!session) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export default function App() {
  const [session, setSession] = useState<StoredExamSession | null>(() =>
    loadSavedSession()
  );
  const [view, setView] = useState<AppView>(() => {
    const saved = loadSavedSession();
    if (!saved) return 'login';
    return saved.status === 'submitted' ? 'summary' : 'exam';
  });
  const [returnViewFromTeacher, setReturnViewFromTeacher] =
    useState<Exclude<AppView, 'teacher'>>('login');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [backupEnvelope, setBackupEnvelope] = useState<BackupEnvelope | null>(null);
  const gasPayloadMemoryRef = useRef<GASSubmissionPayload | null>(null);
  const submittingLockRef = useRef<boolean>(false);

  const packet: ExamPacket | null = useMemo(() => {
    if (!session?.student) return null;
    return generateStudentExamPacket(session.student);
  }, [session?.student]);

  // Keep localStorage synced whenever session updates (contains NO scores or keys)
  useEffect(() => {
    saveSessionToStorage(session);
  }, [session]);

  // Reconstruct backupEnvelope & in-memory GAS payload if page was refreshed on summary view
  useEffect(() => {
    if (
      session &&
      session.status === 'submitted' &&
      packet &&
      !backupEnvelope
    ) {
      void buildSubmissionArtifacts(packet, session).then((artifacts) => {
        setBackupEnvelope(artifacts.backupEnvelope);
        gasPayloadMemoryRef.current = artifacts.gasPayload;
      });
    }
  }, [session, packet, backupEnvelope]);

  const handleStartExam = useCallback((student: Student, token: string) => {
    const now = Date.now();
    const newSession: StoredExamSession = {
      version: 1,
      student,
      tokenUjian: token,
      startedAt: now,
      endTimestamp: now + EXAM_DURATION_MINUTES * 60 * 1000,
      currentIndex: 0,
      answers: {
        pg: {},
        pgk: {},
        essay: {},
      },
      flagged: {},
      violations: 0,
      status: 'in_progress',
    };
    setBackupEnvelope(null);
    gasPayloadMemoryRef.current = null;
    setSession(newSession);
    setView('exam');
  }, []);

  const handleUpdateSession = useCallback(
    (updater: (prev: StoredExamSession) => StoredExamSession) => {
      setSession((prev) => {
        if (!prev) return prev;
        return updater(prev);
      });
    },
    []
  );

  const handleFinalizeSubmit = useCallback(
    async (autoSubmittedByTimer: boolean) => {
      if (submittingLockRef.current || !session || !packet) return;
      submittingLockRef.current = true;
      setIsSubmitting(true);

      const submittedAt = Date.now();
      const durasiDetik = Math.max(
        1,
        Math.min(
          EXAM_DURATION_MINUTES * 60,
          Math.round((submittedAt - session.startedAt) / 1000)
        )
      );

      const baseSubmittedSession: StoredExamSession = {
        ...session,
        status: 'submitted',
        submittedAt,
        durasiDetik,
        submissionSyncStatus: 'sending',
        submissionSyncNote: autoSubmittedByTimer
          ? 'Waktu ujian habis. Mengirim data otomatis ke server...'
          : 'Mengenkripsi dan mengirim data ke Google Apps Script...',
      };

      setSession(baseSubmittedSession);
      setView('summary');

      try {
        const artifacts = await buildSubmissionArtifacts(packet, baseSubmittedSession);
        setBackupEnvelope(artifacts.backupEnvelope);
        gasPayloadMemoryRef.current = artifacts.gasPayload;

        const sendingSession: StoredExamSession = {
          ...baseSubmittedSession,
          integritySha256: artifacts.integritySha256,
          encryptedPayload: artifacts.encryptedPayload,
          encryptionVersion: ENCRYPTION_VERSION,
        };
        setSession(sendingSession);

        const syncResult = await submitToGAS(artifacts.gasPayload);
        setSession((prev) =>
          prev
            ? {
                ...prev,
                integritySha256: artifacts.integritySha256,
                encryptedPayload: artifacts.encryptedPayload,
                encryptionVersion: ENCRYPTION_VERSION,
                submissionSyncStatus: syncResult.ok ? 'sent' : 'failed',
                submissionSyncNote: syncResult.message,
              }
            : prev
        );
      } catch (err) {
        setSession((prev) =>
          prev
            ? {
                ...prev,
                submissionSyncStatus: 'failed',
                submissionSyncNote:
                  err instanceof Error
                    ? `Terjadi kesalahan saat memproses data: ${err.message}`
                    : 'Terjadi kesalahan saat memproses pengiriman.',
              }
            : prev
        );
      } finally {
        setIsSubmitting(false);
        submittingLockRef.current = false;
      }
    },
    [session, packet]
  );

  const handleResendToServer = useCallback(async () => {
    if (!session || !packet || isResending) return;
    setIsResending(true);

    setSession((prev) =>
      prev
        ? {
            ...prev,
            submissionSyncStatus: 'sending',
            submissionSyncNote: 'Mengirim ulang data ke Google Apps Script...',
          }
        : prev
    );

    try {
      let payload = gasPayloadMemoryRef.current;
      if (!payload) {
        const artifacts = await buildSubmissionArtifacts(packet, session);
        setBackupEnvelope(artifacts.backupEnvelope);
        gasPayloadMemoryRef.current = artifacts.gasPayload;
        payload = artifacts.gasPayload;
      }

      const syncResult = await submitToGAS(payload);
      setSession((prev) =>
        prev
          ? {
              ...prev,
              submissionSyncStatus: syncResult.ok ? 'sent' : 'failed',
              submissionSyncNote: syncResult.message,
            }
          : prev
      );
    } finally {
      setIsResending(false);
    }
  }, [session, packet, isResending]);

  const handleExitSession = useCallback(() => {
    setBackupEnvelope(null);
    gasPayloadMemoryRef.current = null;
    setSession(null);
    saveSessionToStorage(null);
    setView('login');
  }, []);

  const openTeacherPortal = useCallback(() => {
    if (view !== 'teacher') {
      setReturnViewFromTeacher(view);
      setView('teacher');
    }
  }, [view]);

  if (view === 'teacher') {
    return <TeacherPortal onBack={() => setView(returnViewFromTeacher)} />;
  }

  if (view === 'exam' && session && packet) {
    return (
      <ExamRoom
        packet={packet}
        session={session}
        onUpdateSession={handleUpdateSession}
        onFinalizeSubmit={handleFinalizeSubmit}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (view === 'summary' && session) {
    return (
      <SummaryScreen
        session={session}
        backupEnvelope={backupEnvelope}
        isResending={isResending}
        onResendToServer={handleResendToServer}
        onOpenTeacherPortal={openTeacherPortal}
        onExitSession={handleExitSession}
      />
    );
  }

  return (
    <LoginScreen
      onStartExam={handleStartExam}
      onOpenTeacherPortal={openTeacherPortal}
    />
  );
}
