import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileJson,
  FileSpreadsheet,
  Lock,
  LogOut,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { BackupEnvelope, StoredExamSession } from '../types/exam';
import {
  downloadBackupCSV,
  downloadBackupJSON,
  formatDurationMMSS,
  SUBJECT_NAME,
} from '../utils/gasService';

interface SummaryScreenProps {
  session: StoredExamSession;
  backupEnvelope: BackupEnvelope | null;
  isResending: boolean;
  onResendToServer: () => Promise<void>;
  onOpenTeacherPortal: () => void;
  onExitSession: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  session,
  backupEnvelope,
  isResending,
  onResendToServer,
  onOpenTeacherPortal,
  onExitSession,
}) => {
  const [confirmExit, setConfirmExit] = useState<boolean>(false);

  const pgAnswered = Object.keys(session.answers.pg).length;
  const pgkAnswered = Object.values(session.answers.pgk).filter(
    (arr) => arr.length > 0
  ).length;
  const essayAnswered = Object.values(session.answers.essay).filter(
    (txt) => txt.trim().length > 0
  ).length;

  const syncStatus = session.submissionSyncStatus || 'queued';
  const durasiDetik =
    session.durasiDetik ??
    Math.max(
      1,
      Math.round(((session.submittedAt || Date.now()) - session.startedAt) / 1000)
    );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <div className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            CBT Penilaian Sumatif Akhir Semester
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenTeacherPortal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Portal Guru
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 space-y-6">
        {/* Completion Header Card */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                {session.student.sekolah} · {SUBJECT_NAME}
              </p>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Ujian Telah Diselesaikan & Terenkripsi
              </h1>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                Jawaban Anda telah diproses, dienkripsi dengan{' '}
                <span className="font-mono text-xs font-semibold text-slate-800">
                  AES-256-GCM
                </span>
                , dan diamankan. Hasil nilai bersifat tertutup bagi peserta dan hanya
                dapat didekripsi melalui Portal Guru.
              </p>
            </div>
          </div>

          {/* Student & Work Summary (NO SCORES, NO KEYS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Identitas & Waktu Pengerjaan
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100">
                  <dt className="text-slate-500">Nama Peserta</dt>
                  <dd className="font-semibold text-slate-900 text-right">
                    {session.student.nama}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100">
                  <dt className="text-slate-500">No. Peserta / Kelas</dt>
                  <dd className="font-mono text-slate-900 text-right tabular-nums">
                    {session.student.noAbsen} · {session.student.kelas}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100">
                  <dt className="text-slate-500">Token Sesi</dt>
                  <dd className="font-mono font-medium text-slate-900 text-right">
                    {session.tokenUjian}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100">
                  <dt className="text-slate-500">Durasi Pengerjaan</dt>
                  <dd className="font-mono font-medium text-slate-900 text-right tabular-nums">
                    {formatDurationMMSS(durasiDetik)} ({durasiDetik} detik)
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5">
                  <dt className="text-slate-500">Catatan Perpindahan Tab</dt>
                  <dd className="font-mono font-medium text-slate-900 text-right tabular-nums">
                    {session.violations} kali
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Status Kelengkapan Jawaban
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100">
                  <dt className="text-slate-500">Bagian A · Pilihan Ganda</dt>
                  <dd className="font-mono font-semibold text-slate-900 tabular-nums">
                    {pgAnswered} / 30 Soal
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100">
                  <dt className="text-slate-500">Bagian B · Pilihan Ganda Kompleks</dt>
                  <dd className="font-mono font-semibold text-slate-900 tabular-nums">
                    {pgkAnswered} / 15 Soal
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100">
                  <dt className="text-slate-500">Bagian C · Uraian</dt>
                  <dd className="font-mono font-semibold text-slate-900 tabular-nums">
                    {essayAnswered} / 5 Soal
                  </dd>
                </div>
                <div className="py-1.5">
                  <dt className="text-xs text-slate-500 mb-1">
                    Sidik Jari Integritas (SHA-256)
                  </dt>
                  <dd className="font-mono text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 break-all">
                    {session.integritySha256 || backupEnvelope?.integrity_sha256 || '-'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Server Sync Status & Retry */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              {syncStatus === 'sent' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : syncStatus === 'sending' ? (
                <RefreshCw className="w-5 h-5 text-sky-700 animate-spin shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Status Pengiriman Server:{' '}
                  <span
                    className={
                      syncStatus === 'sent'
                        ? 'text-emerald-700'
                        : syncStatus === 'sending'
                        ? 'text-sky-700'
                        : 'text-amber-700'
                    }
                  >
                    {syncStatus === 'sent'
                      ? 'Berhasil Terkirim'
                      : syncStatus === 'sending'
                      ? 'Sedang Mengirim...'
                      : syncStatus === 'failed'
                      ? 'Gagal Mengirim (Perlu Kirim Ulang)'
                      : 'Antrean Ulang'}
                  </span>
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {session.submissionSyncNote ||
                    'Data ujian telah disiapkan untuk dikirim ke Google Apps Script.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void onResendToServer()}
              disabled={isResending}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`}
              />
              {isResending ? 'Mengirim Ulang...' : 'Kirim Ulang Data'}
            </button>
          </div>
        </section>

        {/* Encrypted Backup Downloads */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Unduh Berkas Cadangan Terenkripsi
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Simpan berkas cadangan di bawah ini sebagai bukti pengerjaan resmi. Berkas
                hanya berisi identitas sesi dan payload terenkripsi AES-256-GCM (tanpa
                nilai maupun kunci jawaban).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              disabled={!backupEnvelope}
              onClick={() => backupEnvelope && downloadBackupJSON(backupEnvelope)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileJson className="w-4 h-4" />
              Unduh JSON Cadangan
            </button>

            <button
              type="button"
              disabled={!backupEnvelope}
              onClick={() => backupEnvelope && downloadBackupCSV(backupEnvelope)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 disabled:opacity-50 text-slate-800 text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-600" />
              Unduh CSV Cadangan
            </button>
          </div>
        </section>

        {/* Exit Session */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {!confirmExit ? (
            <button
              type="button"
              onClick={() => setConfirmExit(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 bg-white rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Keluar & Mulai Sesi Peserta Baru
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3 bg-white border border-slate-300 rounded-xl p-3">
              <span className="text-xs text-slate-700 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-sky-700" />
                Pastikan Anda sudah mengunduh cadangan atau status server terkirim.
              </span>
              <button
                type="button"
                onClick={onExitSession}
                className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                Ya, Hapus Sesi Lokal & Keluar
              </button>
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
