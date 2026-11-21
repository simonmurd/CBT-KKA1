import {
  BackupEnvelope,
  ExamPacket,
  GASSubmissionPayload,
  StoredExamSession,
  TeacherDecryptedQuestionDetailEssay,
  TeacherDecryptedQuestionDetailPG,
  TeacherDecryptedQuestionDetailPGK,
  TeacherReportPayload,
} from '../types/exam';
import { ENCRYPTION_VERSION, encryptTeacherReport } from './crypto';

export const GAS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwyTj0U5WFHyR90tdWuzavINwCr-mxKxmdc0ff1I2TxyzQWdruwqWsfs7a2cVMWjKye4g/exec';

export const SUBJECT_NAME = 'Koding dan Kecerdasan Artificial';
export const EXAM_DURATION_MINUTES = 120;
export const STORAGE_KEY = 'cbt_kka_sas_2026_session_v1';

export const ACTIVE_EXAM_TOKENS = [
  'KKA-2026',
  'SAS-KKA-26',
  'MUDITA-KKA',
  'SMKN1-KKA',
];

export function isValidLocalToken(token: string): boolean {
  const normalized = token.trim().toUpperCase();
  return ACTIVE_EXAM_TOKENS.includes(normalized);
}

/**
 * Optional online token verification against Apps Script if endpoint supports ?action=validateToken&token=...
 * Falls back gracefully to local token list when offline or CORS-restricted.
 */
export async function validateExamToken(
  token: string
): Promise<{ valid: boolean; source: 'server' | 'local'; message: string }> {
  const normalized = token.trim().toUpperCase();
  if (!normalized) {
    return { valid: false, source: 'local', message: 'Token ujian wajib diisi.' };
  }

  if (isValidLocalToken(normalized)) {
    return {
      valid: true,
      source: 'local',
      message: 'Token sesi terverifikasi aktif.',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const url = `${GAS_ENDPOINT}?action=validateToken&token=${encodeURIComponent(normalized)}`;
    const response = await fetch(url, { method: 'GET', signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = (await response.json()) as { valid?: boolean; message?: string };
      if (data && data.valid === true) {
        return {
          valid: true,
          source: 'server',
          message: data.message || 'Token terverifikasi oleh server.',
        };
      }
    }
  } catch {
    // Ignore CORS / offline errors and return local validation result
  }

  return {
    valid: false,
    source: 'local',
    message: 'Token ujian tidak valid atau sudah tidak aktif.',
  };
}

export interface BuiltSubmissionArtifacts {
  backupEnvelope: BackupEnvelope;
  gasPayload: GASSubmissionPayload;
  integritySha256: string;
  encryptedPayload: string;
  durasiDetik: number;
  pgAnswered: number;
  pgkAnswered: number;
  essayAnswered: number;
}

/**
 * Computes scores ONLY in memory to build the encrypted report & GAS payload.
 * Never persists scores into localStorage or student backup files.
 */
export async function buildSubmissionArtifacts(
  packet: ExamPacket,
  session: StoredExamSession
): Promise<BuiltSubmissionArtifacts> {
  const now = session.submittedAt || Date.now();
  const durasiDetik =
    session.durasiDetik ??
    Math.max(1, Math.min(EXAM_DURATION_MINUTES * 60, Math.round((now - session.startedAt) / 1000)));
  const timestampIso = new Date(now).toISOString();

  // Grade PG (30 questions)
  let skorPgBenar = 0;
  let pgAnswered = 0;
  const pgDetails: TeacherDecryptedQuestionDetailPG[] = packet.pgQuestions.map((q) => {
    const selectedOrig = session.answers.pg[q.questionId] || null;
    if (selectedOrig) pgAnswered += 1;
    const isCorrect = selectedOrig === q.originalKey;
    if (isCorrect) skorPgBenar += 1;

    const selectedOpt = q.options.find((o) => o.originalKey === selectedOrig);
    const correctOpt = q.options.find((o) => o.originalKey === q.originalKey);

    return {
      no: q.index,
      questionId: q.questionId,
      topic: q.topic,
      prompt: q.prompt,
      selectedOriginalKey: selectedOrig,
      selectedText: selectedOpt ? selectedOpt.text : null,
      correctOriginalKey: q.originalKey,
      correctText: correctOpt ? correctOpt.text : '',
      isCorrect,
    };
  });

  // Grade PGK (15 questions, max 5 selections, each correct key = 1/5 point)
  let pgkScoreSum = 0;
  let pgkExactPerfectCount = 0;
  let pgkAnswered = 0;
  const pgkDetails: TeacherDecryptedQuestionDetailPGK[] = packet.pgkQuestions.map((q) => {
    const selectedOrigList = session.answers.pgk[q.questionId] || [];
    if (selectedOrigList.length > 0) pgkAnswered += 1;

    const matchedCount = selectedOrigList.filter((k) => q.originalKeys.includes(k)).length;
    const ratio = matchedCount / 5;
    pgkScoreSum += ratio;
    if (matchedCount === 5 && selectedOrigList.length === 5) {
      pgkExactPerfectCount += 1;
    }

    return {
      no: q.index,
      questionId: q.questionId,
      topic: q.topic,
      prompt: q.prompt,
      selectedOriginalKeys: selectedOrigList,
      correctOriginalKeys: q.originalKeys,
      matchedCount,
      scoreRatio: Math.round(ratio * 100) / 100,
    };
  });

  // Collect Essay answers + rubrics
  let essayAnswered = 0;
  const essayDetails: TeacherDecryptedQuestionDetailEssay[] = packet.essayQuestions.map((q) => {
    const ans = (session.answers.essay[q.questionId] || '').trim();
    if (ans.length > 0) essayAnswered += 1;
    return {
      no: q.index,
      questionId: q.questionId,
      topic: q.topic,
      prompt: q.prompt,
      answerText: ans,
      maxScore: q.maxScore,
      kunciJawabanRingkas: q.kunciJawabanRingkas,
      rubrik: q.rubrik,
    };
  });

  const skorPg = Math.round((skorPgBenar / 30) * 10000) / 100;
  const skorPgk = Math.round((pgkScoreSum / 15) * 10000) / 100;
  const totalSkorOtomatis = Math.round((skorPg * 0.5 + skorPgk * 0.5) * 100) / 100;

  const teacherReport: TeacherReportPayload = {
    metadata: {
      timestamp: timestampIso,
      sekolah: session.student.sekolah,
      kelas: session.student.kelas,
      noAbsen: session.student.noAbsen,
      namaPeserta: session.student.nama,
      namaLengkap: session.student.namaLengkapDisplay,
      mataPelajaran: SUBJECT_NAME,
      tokenUjian: session.tokenUjian,
      durasiDetik,
      jumlahPelanggaranTab: session.violations,
      seedHash: packet.seedHash,
    },
    scores: {
      skor_pg_benar: skorPgBenar,
      total_pg: 30,
      skor_pg: skorPg,
      skor_pgk_benar_sempurna: pgkExactPerfectCount,
      total_pgk: 15,
      skor_pgk: skorPgk,
      total_skor_otomatis: totalSkorOtomatis,
    },
    details: {
      pg: pgDetails,
      pgk: pgkDetails,
      essay: essayDetails,
    },
  };

  const { encryptedPayload, integritySha256 } = await encryptTeacherReport(teacherReport);

  // Student-safe backup envelope (ZERO scores, ZERO answer keys)
  const backupEnvelope: BackupEnvelope = {
    app: 'CBT SAS Koding & Kecerdasan Artificial',
    mata_pelajaran: SUBJECT_NAME,
    timestamp: timestampIso,
    peserta: {
      id: session.student.id,
      sekolah: session.student.sekolah,
      kelas: session.student.kelas,
      no_peserta: session.student.noAbsen,
      nama: session.student.nama,
    },
    sesi: {
      token_ujian: session.tokenUjian,
      durasi_detik: durasiDetik,
      jumlah_pelanggaran_tab: session.violations,
      pg_terjawab: pgAnswered,
      pgk_terjawab: pgkAnswered,
      uraian_terjawab: essayAnswered,
    },
    encryption_version: ENCRYPTION_VERSION,
    integrity_sha256: integritySha256,
    encrypted_payload: encryptedPayload,
  };

  const gasPayload: GASSubmissionPayload = {
    sekolah: session.student.sekolah,
    kelas: session.student.kelas,
    nama_lengkap: session.student.namaLengkapDisplay,
    pilihan_lkpd: `SAS Ganjil KKA 2026 | Token: ${session.tokenUjian} | Pelanggaran Tab: ${session.violations}`,
    durasi_detik: durasiDetik,
    skor_pg_benar: skorPgBenar,
    nilai_akhir: totalSkorOtomatis,
    timestamp: timestampIso,
    nama_peserta: session.student.nama,
    nis_no_peserta: session.student.noAbsen,
    kelas_rombel: session.student.kelas,
    mata_pelajaran: SUBJECT_NAME,
    token_ujian: session.tokenUjian,
    durasi_terpakai_detik: durasiDetik,
    jumlah_pelanggaran_tab: session.violations,
    skor_pg: skorPg,
    skor_pgk: skorPgk,
    total_skor_otomatis: totalSkorOtomatis,
    encryption_version: ENCRYPTION_VERSION,
    integrity_sha256: integritySha256,
    rekap_jawaban: encryptedPayload,
    encrypted_payload: encryptedPayload,
  };

  return {
    backupEnvelope,
    gasPayload,
    integritySha256,
    encryptedPayload,
    durasiDetik,
    pgAnswered,
    pgkAnswered,
    essayAnswered,
  };
}

export async function submitToGAS(
  payload: GASSubmissionPayload
): Promise<{ ok: boolean; mode: 'cors' | 'no-cors' | 'error'; message: string }> {
  const body = JSON.stringify(payload);

  try {
    const response = await fetch(GAS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body,
    });

    if (response.ok) {
      return {
        ok: true,
        mode: 'cors',
        message: 'Data ujian berhasil diterima oleh server Google Apps Script.',
      };
    }

    // Fallback if server returned non-2xx or blocked
    throw new Error(`HTTP ${response.status}`);
  } catch {
    // Retry using mode: 'no-cors' (standard for GAS Web App cross-origin posts)
    try {
      await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body,
      });

      return {
        ok: true,
        mode: 'no-cors',
        message:
          'Permintaan pengiriman berhasil dikirim ke endpoint Google Apps Script (mode no-cors). Simpan berkas cadangan JSON/CSV sebagai bukti lokal.',
      };
    } catch (err) {
      return {
        ok: false,
        mode: 'error',
        message:
          err instanceof Error
            ? `Gagal terhubung ke server (${err.message}). Gunakan tombol Kirim Ulang Data atau unduh berkas cadangan.`
            : 'Koneksi gagal. Gunakan tombol Kirim Ulang Data atau unduh berkas cadangan.',
      };
    }
  }
}

function triggerFileDownload(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_');
}

export function downloadBackupJSON(envelope: BackupEnvelope): void {
  const filename = `CBT_KKA_${sanitizeFilename(envelope.peserta.kelas)}_${envelope.peserta.no_peserta}_${sanitizeFilename(envelope.peserta.nama)}.json`;
  triggerFileDownload(filename, JSON.stringify(envelope, null, 2), 'application/json;charset=utf-8');
}

function escapeCsvCell(value: string | number): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function downloadBackupCSV(envelope: BackupEnvelope): void {
  const headers = [
    'timestamp',
    'sekolah',
    'kelas',
    'no_peserta',
    'nama_peserta',
    'mata_pelajaran',
    'token_ujian',
    'durasi_detik',
    'jumlah_pelanggaran_tab',
    'pg_terjawab',
    'pgk_terjawab',
    'uraian_terjawab',
    'encryption_version',
    'integrity_sha256',
    'encrypted_payload',
  ];

  const row = [
    envelope.timestamp,
    envelope.peserta.sekolah,
    envelope.peserta.kelas,
    envelope.peserta.no_peserta,
    envelope.peserta.nama,
    envelope.mata_pelajaran,
    envelope.sesi.token_ujian,
    envelope.sesi.durasi_detik,
    envelope.sesi.jumlah_pelanggaran_tab,
    envelope.sesi.pg_terjawab,
    envelope.sesi.pgk_terjawab,
    envelope.sesi.uraian_terjawab,
    envelope.encryption_version,
    envelope.integrity_sha256,
    envelope.encrypted_payload,
  ];

  const csvContent = `${headers.join(',')}\n${row.map(escapeCsvCell).join(',')}\n`;
  const filename = `CBT_KKA_${sanitizeFilename(envelope.peserta.kelas)}_${envelope.peserta.no_peserta}_${sanitizeFilename(envelope.peserta.nama)}.csv`;
  triggerFileDownload(filename, csvContent, 'text/csv;charset=utf-8');
}

export function formatDurationMMSS(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
