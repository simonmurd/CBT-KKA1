import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileSpreadsheet,
  KeyRound,
  Lock,
  ShieldCheck,
  Unlock,
  Upload,
  XCircle,
} from 'lucide-react';
import { TeacherReportPayload } from '../types/exam';
import {
  DecryptedResult,
  decryptTeacherReport,
  TEACHER_ACCESS_CODE,
} from '../utils/crypto';
import { formatDurationMMSS } from '../utils/gasService';

interface TeacherPortalProps {
  onBack: () => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({ onBack }) => {
  const [accessCodeInput, setAccessCodeInput] = useState<string>('');
  const [unlockedCode, setUnlockedCode] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string>('');

  const [cipherInput, setCipherInput] = useState<string>('');
  const [decryptError, setDecryptError] = useState<string>('');
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [decrypted, setDecrypted] = useState<DecryptedResult | null>(null);
  const [activeTab, setActiveTab] = useState<'PG' | 'PGK' | 'ESSAY'>('PG');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCodeInput.trim() !== TEACHER_ACCESS_CODE) {
      setAuthError('Kode akses guru tidak valid.');
      return;
    }
    setAuthError('');
    setUnlockedCode(accessCodeInput.trim());
  };

  const handleDecrypt = async (rawText?: string) => {
    if (!unlockedCode) return;
    const source = rawText ?? cipherInput;
    setDecryptError('');
    setIsDecrypting(true);
    try {
      const result = await decryptTeacherReport(source, unlockedCode);
      setDecrypted(result);
    } catch (err) {
      setDecrypted(null);
      setDecryptError(
        err instanceof Error ? err.message : 'Gagal mendekripsi data.'
      );
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    let extracted = text.trim();

    // If CSV uploaded, extract encrypted_payload column (last column)
    if (file.name.toLowerCase().endsWith('.csv')) {
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length >= 2) {
        const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').trim());
        const payloadColIdx = headers.indexOf('encrypted_payload');
        const rowCells = lines[1].match(/("([^"]|"")*"|[^,]*)/g)?.filter((_, idx) => idx % 2 === 0) || lines[1].split(',');
        if (payloadColIdx >= 0 && rowCells[payloadColIdx]) {
          extracted = rowCells[payloadColIdx].replace(/^"|"$/g, '').replace(/""/g, '"');
        } else {
          const last = lines[1].split(',').pop() || '';
          extracted = last.replace(/^"|"$/g, '');
        }
      }
    }

    setCipherInput(extracted);
    await handleDecrypt(extracted);
    e.target.value = '';
  };

  const handleExportTeacherCSV = (report: TeacherReportPayload) => {
    const headers = [
      'timestamp',
      'sekolah',
      'kelas',
      'no_absen',
      'nama_peserta',
      'token_ujian',
      'durasi_detik',
      'pelanggaran_tab',
      'skor_pg_benar',
      'skor_pg_skala_100',
      'skor_pgk_sempurna',
      'skor_pgk_skala_100',
      'nilai_akhir_otomatis',
    ];
    const values = [
      report.metadata.timestamp,
      report.metadata.sekolah,
      report.metadata.kelas,
      report.metadata.noAbsen,
      report.metadata.namaPeserta,
      report.metadata.tokenUjian,
      report.metadata.durasiDetik,
      report.metadata.jumlahPelanggaranTab,
      report.scores.skor_pg_benar,
      report.scores.skor_pg,
      report.scores.skor_pgk_benar_sempurna,
      report.scores.skor_pgk,
      report.scores.total_skor_otomatis,
    ].map((v) => {
      const s = String(v);
      return s.includes(',') ? `"${s.replace(/"/g, '""')}"` : s;
    });

    const csv = `${headers.join(',')}\n${values.join(',')}\n`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `REKAP_GURU_${report.metadata.kelas.replace(/\s+/g, '_')}_${report.metadata.noAbsen}_${report.metadata.namaPeserta.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <div className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            Portal Guru · Dekripsi Hasil CBT
          </div>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Ujian
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {!unlockedCode ? (
          <div className="max-w-md mx-auto mt-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  Autentikasi Portal Guru
                </h1>
                <p className="text-xs text-slate-500">
                  Masukkan kode akses guru untuk mendekripsi berkas hasil siswa.
                </p>
              </div>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label
                  htmlFor="teacher-code"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Kode Akses Guru
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="teacher-code"
                    type="password"
                    value={accessCodeInput}
                    onChange={(e) => {
                      setAccessCodeInput(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="Masukkan kode akses guru"
                    className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  Kode akses default penguji: <span className="font-mono">GURU-KKA-2026</span>
                </p>
              </div>

              {authError && (
                <p className="text-xs font-medium text-red-700 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg whitespace-nowrap cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                Buka Portal Guru
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Decrypt Input Card */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Dekripsi Berkas Cadangan & Ciphertext AES-256-GCM
                  </h1>
                  <p className="text-sm text-slate-600 mt-1">
                    Unggah file <span className="font-mono text-xs">.json</span> /{' '}
                    <span className="font-mono text-xs">.csv</span> cadangan siswa atau
                    tempel string{' '}
                    <span className="font-mono text-xs">encrypted_payload</span> dari
                    Google Sheets.
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-lg cursor-pointer whitespace-nowrap shrink-0">
                  <Upload className="w-4 h-4" />
                  <span>Unggah File JSON / CSV</span>
                  <input
                    type="file"
                    accept=".json,.csv,application/json,text/csv"
                    onChange={(e) => void handleFileUpload(e)}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={cipherInput}
                  onChange={(e) => setCipherInput(e.target.value)}
                  placeholder="Atau tempel isi file JSON cadangan maupun ciphertext Base64 encrypted_payload di sini..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
                />
              </div>

              {decryptError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{decryptError}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleDecrypt()}
                  disabled={!cipherInput.trim() || isDecrypting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  {isDecrypting ? 'Mendekripsi...' : 'Dekripsi & Verifikasi Integritas'}
                </button>
              </div>
            </section>

            {/* Decrypted Report Output */}
            {decrypted && (
              <div className="space-y-6">
                {/* Integrity + Identity + Score Summary */}
                <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      {decrypted.integrityVerified ? (
                        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-700 shrink-0" />
                      )}
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          {decrypted.report.metadata.namaLengkap}
                        </h2>
                        <p className="text-xs text-slate-600">
                          {decrypted.report.metadata.sekolah} ·{' '}
                          {decrypted.report.metadata.kelas} · Token:{' '}
                          <span className="font-mono">
                            {decrypted.report.metadata.tokenUjian}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                          decrypted.integrityVerified
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                        }`}
                      >
                        {decrypted.integrityVerified ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {decrypted.integrityVerified
                          ? 'Integritas SHA-256 Valid'
                          : 'Peringatan: Hash SHA-256 Tidak Cocok'}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleExportTeacherCSV(decrypted.report)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        Ekspor Rekap CSV
                      </button>
                    </div>
                  </div>

                  {/* 4-column KPI Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs text-slate-500">
                        Skor Pilihan Ganda (Bobot 50%)
                      </div>
                      <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                        {decrypted.report.scores.skor_pg.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 tabular-nums">
                        Benar {decrypted.report.scores.skor_pg_benar} dari 30 soal
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs text-slate-500">
                        Skor PG Kompleks (Bobot 50%)
                      </div>
                      <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                        {decrypted.report.scores.skor_pgk.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 tabular-nums">
                        Sempurna (5/5):{' '}
                        {decrypted.report.scores.skor_pgk_benar_sempurna} dari 15 soal
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
                      <div className="text-xs font-medium text-sky-900">
                        Nilai Akhir Otomatis (PG + PGK)
                      </div>
                      <div className="text-2xl font-bold font-mono text-sky-900 mt-1 tabular-nums">
                        {decrypted.report.scores.total_skor_otomatis.toFixed(2)}
                      </div>
                      <div className="text-xs text-sky-800 mt-1">
                        Skala 0–100 (belum termasuk Uraian)
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs text-slate-500">
                        Durasi & Aktivitas Tab
                      </div>
                      <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                        {formatDurationMMSS(decrypted.report.metadata.durasiDetik)}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 tabular-nums">
                        Pelanggaran Tab:{' '}
                        {decrypted.report.metadata.jumlahPelanggaranTab} kali
                      </div>
                    </div>
                  </div>
                </section>

                {/* Detailed Question Breakdown Tabs */}
                <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <h3 className="text-base font-semibold text-slate-900">
                      Rincian Jawaban Peserta & Kunci / Rubrik
                    </h3>

                    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setActiveTab('PG')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          activeTab === 'PG'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Bagian A · PG (30)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('PGK')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          activeTab === 'PGK'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Bagian B · PGK (15)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('ESSAY')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          activeTab === 'ESSAY'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Bagian C · Uraian & Rubrik (5)
                      </button>
                    </div>
                  </div>

                  {/* PG Table */}
                  {activeTab === 'PG' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs text-slate-500">
                            <th className="py-2.5 pr-3 font-medium">No</th>
                            <th className="py-2.5 pr-3 font-medium">ID Bank</th>
                            <th className="py-2.5 pr-4 font-medium">Topik</th>
                            <th className="py-2.5 pr-4 font-medium">Jawaban Siswa</th>
                            <th className="py-2.5 pr-4 font-medium">Kunci Asli</th>
                            <th className="py-2.5 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {decrypted.report.details.pg.map((item) => (
                            <tr key={item.questionId}>
                              <td className="py-3 pr-3 font-mono text-xs tabular-nums">
                                {item.no}
                              </td>
                              <td className="py-3 pr-3 font-mono text-xs text-slate-600">
                                {item.questionId}
                              </td>
                              <td className="py-3 pr-4 text-slate-800">
                                {item.topic}
                              </td>
                              <td className="py-3 pr-4 text-xs text-slate-700">
                                {item.selectedOriginalKey ? (
                                  <span>
                                    <strong className="font-mono">
                                      [{item.selectedOriginalKey}]
                                    </strong>{' '}
                                    {item.selectedText}
                                  </span>
                                ) : (
                                  <span className="text-slate-400">Tidak dijawab</span>
                                )}
                              </td>
                              <td className="py-3 pr-4 text-xs text-slate-700">
                                <strong className="font-mono">
                                  [{item.correctOriginalKey}]
                                </strong>{' '}
                                {item.correctText}
                              </td>
                              <td className="py-3 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                                    item.isCorrect
                                      ? 'text-emerald-700'
                                      : 'text-red-700'
                                  }`}
                                >
                                  {item.isCorrect ? (
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  ) : (
                                    <XCircle className="w-3.5 h-3.5" />
                                  )}
                                  {item.isCorrect ? 'Benar' : 'Salah'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* PGK Table */}
                  {activeTab === 'PGK' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs text-slate-500">
                            <th className="py-2.5 pr-3 font-medium">No</th>
                            <th className="py-2.5 pr-3 font-medium">ID Bank</th>
                            <th className="py-2.5 pr-4 font-medium">Topik</th>
                            <th className="py-2.5 pr-4 font-medium">
                              Kunci Dipilih Siswa (Asli)
                            </th>
                            <th className="py-2.5 pr-4 font-medium">
                              5 Kunci Benar (Asli)
                            </th>
                            <th className="py-2.5 font-medium">Ketepatan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {decrypted.report.details.pgk.map((item) => (
                            <tr key={item.questionId}>
                              <td className="py-3 pr-3 font-mono text-xs tabular-nums">
                                {item.no}
                              </td>
                              <td className="py-3 pr-3 font-mono text-xs text-slate-600">
                                {item.questionId}
                              </td>
                              <td className="py-3 pr-4 text-slate-800">
                                {item.topic}
                              </td>
                              <td className="py-3 pr-4 font-mono text-xs text-slate-700">
                                {item.selectedOriginalKeys.length > 0
                                  ? [...item.selectedOriginalKeys].sort().join(', ')
                                  : '-'}
                              </td>
                              <td className="py-3 pr-4 font-mono text-xs font-semibold text-slate-900">
                                {[...item.correctOriginalKeys].sort().join(', ')}
                              </td>
                              <td className="py-3 font-mono text-xs font-semibold tabular-nums whitespace-nowrap">
                                <span
                                  className={
                                    item.matchedCount === 5
                                      ? 'text-emerald-700'
                                      : item.matchedCount >= 3
                                      ? 'text-amber-700'
                                      : 'text-red-700'
                                  }
                                >
                                  {item.matchedCount}/5 ({Math.round(item.scoreRatio * 100)}
                                  %)
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Essay + Rubrics */}
                  {activeTab === 'ESSAY' && (
                    <div className="space-y-6">
                      {decrypted.report.details.essay.map((item) => (
                        <div
                          key={item.questionId}
                          className="border border-slate-200 rounded-xl p-5 space-y-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                            <div className="text-sm font-semibold text-slate-900">
                              Soal {item.no} · {item.questionId} · {item.topic}
                            </div>
                            <span className="font-mono text-xs font-semibold text-slate-700 tabular-nums">
                              Skor Maksimal: {item.maxScore}
                            </span>
                          </div>

                          <p className="text-sm text-slate-800 leading-relaxed">
                            {item.prompt}
                          </p>

                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <div className="text-xs font-semibold text-slate-600 mb-1.5">
                              Jawaban Peserta:
                            </div>
                            <p className="text-sm text-slate-900 whitespace-pre-line leading-relaxed">
                              {item.answerText || '(Peserta tidak mengisi jawaban)'}
                            </p>
                          </div>

                          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                            <div className="text-xs font-semibold text-sky-900 mb-1.5">
                              Kunci Jawaban Ringkas:
                            </div>
                            <p className="text-xs text-sky-950 leading-relaxed">
                              {item.kunciJawabanRingkas}
                            </p>
                          </div>

                          <div>
                            <div className="text-xs font-semibold text-slate-700 mb-2">
                              Rubrik Penilaian:
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {item.rubrik.map((r, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded-lg border border-slate-200 bg-white text-xs"
                                >
                                  <div className="flex items-center justify-between gap-2 font-semibold text-slate-900 mb-1">
                                    <span>{r.kriteria}</span>
                                    <span className="font-mono tabular-nums">
                                      {r.bobot} poin
                                    </span>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed">
                                    {r.deskripsi}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
