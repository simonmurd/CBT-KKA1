import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  LayoutGrid,
  Send,
  ShieldAlert,
  X,
} from 'lucide-react';
import {
  ExamPacket,
  RenderedQuestion,
  StoredExamSession,
} from '../types/exam';
import { formatDurationMMSS, SUBJECT_NAME } from '../utils/gasService';

interface ExamRoomProps {
  packet: ExamPacket;
  session: StoredExamSession;
  onUpdateSession: (updater: (prev: StoredExamSession) => StoredExamSession) => void;
  onFinalizeSubmit: (autoSubmittedByTimer: boolean) => Promise<void>;
  isSubmitting: boolean;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({
  packet,
  session,
  onUpdateSession,
  onFinalizeSubmit,
  isSubmitting,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() =>
    Math.max(0, Math.floor((session.endTimestamp - Date.now()) / 1000))
  );
  const [showNavigatorMobile, setShowNavigatorMobile] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showViolationModal, setShowViolationModal] = useState<boolean>(false);
  const [pgkLimitWarning, setPgkLimitWarning] = useState<boolean>(false);

  const autoSubmitTriggeredRef = useRef<boolean>(false);
  const lastViolationTimeRef = useRef<number>(0);
  const pendingViolationModalRef = useRef<boolean>(false);

  const currentQuestion: RenderedQuestion =
    packet.allQuestions[session.currentIndex] || packet.allQuestions[0];

  // Synchronized countdown timer against endTimestamp
  useEffect(() => {
    const tick = () => {
      const diffSec = Math.max(0, Math.floor((session.endTimestamp - Date.now()) / 1000));
      setRemainingSeconds(diffSec);
      if (diffSec <= 0 && !autoSubmitTriggeredRef.current && !isSubmitting) {
        autoSubmitTriggeredRef.current = true;
        void onFinalizeSubmit(true);
      }
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [session.endTimestamp, isSubmitting, onFinalizeSubmit]);

  // Anti-cheat tab/window switch detector with debounce
  const recordViolation = useCallback(() => {
    const now = Date.now();
    if (now - lastViolationTimeRef.current < 1500) return;
    lastViolationTimeRef.current = now;
    pendingViolationModalRef.current = true;
    onUpdateSession((prev) => ({
      ...prev,
      violations: prev.violations + 1,
    }));
  }, [onUpdateSession]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation();
      } else if (pendingViolationModalRef.current) {
        pendingViolationModalRef.current = false;
        setShowViolationModal(true);
      }
    };

    const handleBlur = () => {
      recordViolation();
    };

    const handleFocus = () => {
      if (pendingViolationModalRef.current) {
        pendingViolationModalRef.current = false;
        setShowViolationModal(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [recordViolation]);

  // Clear temporary PGK limit warning when changing questions
  useEffect(() => {
    setPgkLimitWarning(false);
  }, [session.currentIndex]);

  const isQuestionAnswered = useCallback(
    (q: RenderedQuestion): boolean => {
      if (q.type === 'PG') {
        return Boolean(session.answers.pg[q.questionId]);
      }
      if (q.type === 'PGK') {
        const list = session.answers.pgk[q.questionId] || [];
        return list.length > 0;
      }
      return (session.answers.essay[q.questionId] || '').trim().length > 0;
    },
    [session.answers]
  );

  const summaryStats = useMemo(() => {
    let pgDone = 0;
    let pgkDone = 0;
    let essayDone = 0;
    let flaggedCount = 0;

    for (const q of packet.allQuestions) {
      if (session.flagged[q.questionId]) flaggedCount += 1;
      if (isQuestionAnswered(q)) {
        if (q.type === 'PG') pgDone += 1;
        else if (q.type === 'PGK') pgkDone += 1;
        else essayDone += 1;
      }
    }

    return {
      pgDone,
      pgkDone,
      essayDone,
      totalDone: pgDone + pgkDone + essayDone,
      flaggedCount,
    };
  }, [packet.allQuestions, session.flagged, isQuestionAnswered]);

  const handleSelectPG = (questionId: string, originalKey: string) => {
    onUpdateSession((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        pg: {
          ...prev.answers.pg,
          [questionId]: originalKey,
        },
      },
    }));
  };

  const handleTogglePGK = (questionId: string, originalKey: string) => {
    const currentSelected = session.answers.pgk[questionId] || [];
    const exists = currentSelected.includes(originalKey);

    if (!exists && currentSelected.length >= 5) {
      setPgkLimitWarning(true);
      return;
    }

    setPgkLimitWarning(false);
    const updated = exists
      ? currentSelected.filter((k) => k !== originalKey)
      : [...currentSelected, originalKey];

    onUpdateSession((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        pgk: {
          ...prev.answers.pgk,
          [questionId]: updated,
        },
      },
    }));
  };

  const handleChangeEssay = (questionId: string, value: string) => {
    onUpdateSession((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        essay: {
          ...prev.answers.essay,
          [questionId]: value,
        },
      },
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    onUpdateSession((prev) => ({
      ...prev,
      flagged: {
        ...prev.flagged,
        [questionId]: !prev.flagged[questionId],
      },
    }));
  };

  const goToIndex = (index: number) => {
    const bounded = Math.max(0, Math.min(packet.allQuestions.length - 1, index));
    onUpdateSession((prev) => ({
      ...prev,
      currentIndex: bounded,
    }));
    setShowNavigatorMobile(false);
  };

  const isFlagged = Boolean(session.flagged[currentQuestion.questionId]);
  const timerIsCritical = remainingSeconds <= 180;
  const timerIsLow = remainingSeconds > 180 && remainingSeconds <= 600;

  const renderNavigatorButton = (q: RenderedQuestion, idx: number) => {
    const active = idx === session.currentIndex;
    const flagged = Boolean(session.flagged[q.questionId]);
    const answered = isQuestionAnswered(q);

    let stateClasses =
      'bg-white text-slate-700 border-slate-200 hover:border-slate-400';
    if (active) {
      stateClasses =
        'bg-slate-900 text-white border-slate-900 ring-2 ring-sky-600 ring-offset-1';
    } else if (flagged) {
      stateClasses =
        'bg-amber-50 text-amber-900 border-amber-400 hover:bg-amber-100';
    } else if (answered) {
      stateClasses =
        'bg-emerald-50 text-emerald-900 border-emerald-400 hover:bg-emerald-100';
    }

    return (
      <button
        key={q.questionId}
        type="button"
        onClick={() => goToIndex(idx)}
        aria-label={`Soal ${q.index}${active ? ' (Aktif)' : ''}${
          flagged ? ' (Ragu-ragu)' : answered ? ' (Sudah dijawab)' : ' (Belum dijawab)'
        }`}
        className={`relative h-10 rounded-lg border font-mono text-xs font-semibold tabular-nums transition-colors flex items-center justify-center cursor-pointer ${stateClasses}`}
      >
        <span>{q.index}</span>
        {flagged && !active && (
          <span
            className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-600"
            aria-hidden="true"
          />
        )}
      </button>
    );
  };

  const navigatorContent = (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Navigasi Soal</h2>
          <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
            Terjawab {summaryStats.totalDone}/50 · Ragu {summaryStats.flaggedCount}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowNavigatorMobile(false)}
          className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
          aria-label="Tutup navigasi soal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Bagian A: PG (1-30) */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
          <span>Bagian A · Pilihan Ganda</span>
          <span className="font-mono tabular-nums">{summaryStats.pgDone}/30</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {packet.pgQuestions.map((q, i) => renderNavigatorButton(q, i))}
        </div>
      </div>

      {/* Bagian B: PGK (31-45) */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
          <span>Bagian B · PG Kompleks</span>
          <span className="font-mono tabular-nums">{summaryStats.pgkDone}/15</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {packet.pgkQuestions.map((q, i) => renderNavigatorButton(q, 30 + i))}
        </div>
      </div>

      {/* Bagian C: Essay (46-50) */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
          <span>Bagian C · Uraian</span>
          <span className="font-mono tabular-nums">{summaryStats.essayDone}/5</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {packet.essayQuestions.map((q, i) => renderNavigatorButton(q, 45 + i))}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-900 inline-block shrink-0" />
          <span>Soal Aktif</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-emerald-50 border border-emerald-400 inline-block shrink-0" />
          <span>Sudah Dijawab</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-amber-50 border border-amber-400 inline-block shrink-0" />
          <span>Ragu-Ragu</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300 inline-block shrink-0" />
          <span>Belum Dijawab</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowSubmitModal(true)}
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Send className="w-4 h-4" />
        Selesai & Kirim Ujian
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col bg-slate-50 text-slate-900"
      onContextMenu={(e) => {
        if ((e.target as HTMLElement).tagName !== 'TEXTAREA') {
          e.preventDefault();
        }
      }}
    >
      {/* Exam Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {session.student.sekolah}
            </div>
            <div className="text-xs text-slate-600 truncate">
              {SUBJECT_NAME} · {session.student.kelas} · No. {session.student.noAbsen}{' '}
              {session.student.nama}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {session.violations > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700 tabular-nums">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Peringatan Tab: {session.violations}×</span>
              </div>
            )}

            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono text-sm font-semibold tabular-nums ${
                timerIsCritical
                  ? 'bg-red-50 border-red-300 text-red-800'
                  : timerIsLow
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
              aria-live="polite"
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>Sisa Waktu: {formatDurationMMSS(remainingSeconds)}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowNavigatorMobile(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Daftar Soal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Two-Column Exam Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Workspace (8 cols) */}
          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 sm:p-8 select-none">
            {/* Question Metadata Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  Soal {currentQuestion.index} / 50
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-slate-700">
                  {currentQuestion.type === 'PG'
                    ? 'Bagian A · Pilihan Ganda Tunggal'
                    : currentQuestion.type === 'PGK'
                    ? 'Bagian B · Pilihan Ganda Kompleks (Pilih Maks. 5)'
                    : 'Bagian C · Uraian'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentQuestion.topic}</span>
              </div>

              {isFlagged && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                  <Flag className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                  <span>Ditandai Ragu-Ragu</span>
                </div>
              )}
            </div>

            {/* Question Prompt */}
            <div className="mb-6">
              <p className="text-base leading-relaxed text-slate-900 whitespace-pre-line">
                {currentQuestion.prompt}
              </p>
            </div>

            {/* Answer Area: PG */}
            {currentQuestion.type === 'PG' && (
              <div className="space-y-2.5" role="radiogroup" aria-label="Pilihan jawaban">
                {currentQuestion.options.map((opt) => {
                  const selected =
                    session.answers.pg[currentQuestion.questionId] === opt.originalKey;
                  return (
                    <button
                      key={opt.originalKey}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() =>
                        handleSelectPG(currentQuestion.questionId, opt.originalKey)
                      }
                      className={`w-full text-left flex items-start gap-3.5 p-4 rounded-xl border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-sky-50 border-sky-600 text-slate-900'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          selected
                            ? 'bg-sky-700 text-white'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {opt.displayLabel}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed flex-1">
                        {opt.text}
                      </span>
                      {selected && (
                        <CheckCircle2 className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Answer Area: PGK (10 options, max 5 selections) */}
            {currentQuestion.type === 'PGK' && (() => {
              const selectedList =
                session.answers.pgk[currentQuestion.questionId] || [];
              const count = selectedList.length;
              const isMaxReached = count >= 5;

              return (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-sm font-medium text-slate-800 tabular-nums">
                      Terpilih <span className="font-mono font-bold text-sky-800">{count}</span>{' '}
                      dari <span className="font-mono font-bold">5</span> jawaban
                    </div>
                    <div className="text-xs text-slate-600">
                      {count === 5
                        ? 'Batas maksimal 5 pilihan tercapai. Hapus salah satu jika ingin mengganti.'
                        : `Pilih ${5 - count} pernyataan lagi yang menurut Anda benar.`}
                    </div>
                  </div>

                  {pgkLimitWarning && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs font-medium text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        Maksimal 5 jawaban sudah dipilih. Hapus centang pada salah satu
                        opsi terlebih dahulu untuk memilih opsi lain.
                      </span>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {currentQuestion.options.map((opt) => {
                      const checked = selectedList.includes(opt.originalKey);
                      const disabledBecauseMax = !checked && isMaxReached;

                      return (
                        <button
                          key={opt.originalKey}
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() =>
                            handleTogglePGK(currentQuestion.questionId, opt.originalKey)
                          }
                          className={`w-full text-left flex items-start gap-3.5 p-3.5 rounded-xl border transition-colors ${
                            checked
                              ? 'bg-sky-50 border-sky-600 text-slate-900 cursor-pointer'
                              : disabledBecauseMax
                              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 cursor-pointer'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                              checked
                                ? 'bg-sky-700 text-white'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {opt.displayLabel}
                          </span>
                          <span className="text-sm leading-relaxed flex-1">{opt.text}</span>
                          <span
                            className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                              checked
                                ? 'bg-sky-700 border-sky-700 text-white'
                                : 'bg-white border-slate-300'
                            }`}
                            aria-hidden="true"
                          >
                            {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Answer Area: Essay */}
            {currentQuestion.type === 'ESSAY' && (() => {
              const essayVal = session.answers.essay[currentQuestion.questionId] || '';
              return (
                <div className="space-y-2 select-text">
                  <label
                    htmlFor={`essay-${currentQuestion.questionId}`}
                    className="block text-sm font-medium text-slate-700"
                  >
                    Jawaban Uraian Anda
                  </label>
                  <textarea
                    id={`essay-${currentQuestion.questionId}`}
                    rows={8}
                    value={essayVal}
                    onChange={(e) =>
                      handleChangeEssay(currentQuestion.questionId, e.target.value)
                    }
                    placeholder="Tuliskan penjelasan jawaban Anda secara runtut, lengkap, dan jelas..."
                    className="w-full rounded-xl border border-slate-300 bg-white p-4 text-sm sm:text-base text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                    <span>Progres tersimpan otomatis di perangkat Anda.</span>
                    <span>{essayVal.length} karakter</span>
                  </div>
                </div>
              );
            })()}

            {/* Action Buttons Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => goToIndex(session.currentIndex - 1)}
                  disabled={session.currentIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Sebelumnya
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleFlag(currentQuestion.questionId)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isFlagged
                      ? 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Flag
                    className={`w-4 h-4 ${
                      isFlagged ? 'fill-amber-500 text-amber-600' : 'text-slate-500'
                    }`}
                  />
                  {isFlagged ? 'Hapus Ragu-Ragu' : 'Tandai Ragu-Ragu'}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {session.currentIndex < packet.allQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => goToIndex(session.currentIndex + 1)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Simpan & Lanjutkan
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Selesai & Kirim Ujian
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Desktop Navigator Panel (4 cols) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20">
            {navigatorContent}
          </aside>
        </div>
      </main>

      {/* Mobile Drawer Navigator */}
      {showNavigatorMobile && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/50 flex justify-end">
          <div className="w-full max-w-sm bg-slate-50 h-full overflow-y-auto p-4">
            {navigatorContent}
          </div>
        </div>
      )}

      {/* Tab Violation Warning Modal */}
      {showViolationModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Peringatan Perpindahan Tab / Jendela
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Sistem mendeteksi Anda meninggalkan halaman ujian. Aktivitas ini telah
                  dicatat secara otomatis pada data sesi Anda.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-900 tabular-nums">
              Total pelanggaran tercatat:{' '}
              <strong className="font-mono">{session.violations} kali</strong>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowViolationModal(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                Saya Mengerti, Lanjutkan Ujian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Submit Confirmation Modal */}
      {showSubmitModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Konfirmasi Penyelesaian Ujian
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Periksa kembali kelengkapan jawaban Anda sebelum mengirim. Setelah dikirim,
                jawaban tidak dapat diubah kembali.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Bagian A · Pilihan Ganda</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {summaryStats.pgDone} / 30 dijawab
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Bagian B · Pilihan Ganda Kompleks</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {summaryStats.pgkDone} / 15 dijawab
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Bagian C · Uraian</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {summaryStats.essayDone} / 5 dijawab
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Soal Ditandai Ragu-Ragu</span>
                <span className="font-mono font-semibold text-amber-800 tabular-nums">
                  {summaryStats.flaggedCount} soal
                </span>
              </div>
            </div>

            {(summaryStats.totalDone < 50 || summaryStats.flaggedCount > 0) && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Masih terdapat{' '}
                  <strong className="tabular-nums">{50 - summaryStats.totalDone}</strong>{' '}
                  soal yang belum dijawab dan{' '}
                  <strong className="tabular-nums">{summaryStats.flaggedCount}</strong>{' '}
                  soal bertanda ragu-ragu.
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                disabled={isSubmitting}
                className="px-4 py-2.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                Kembali Periksa
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  void onFinalizeSubmit(false);
                }}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-60 text-white text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isSubmitting ? 'Mengenkripsi & Mengirim...' : 'Ya, Kirim Ujian Sekarang'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
