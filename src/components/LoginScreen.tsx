import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  KeyRound,
  Lock,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { SCHOOL_LIST, STUDENTS_DATA } from '../data/students';
import { Student } from '../types/exam';
import { SUBJECT_NAME, validateExamToken } from '../utils/gasService';

interface LoginScreenProps {
  onStartExam: (student: Student, token: string) => void;
  onOpenTeacherPortal: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onStartExam,
  onOpenTeacherPortal,
}) => {
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [tokenInput, setTokenInput] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isValidatingToken, setIsValidatingToken] = useState<boolean>(false);
  const [tokenFeedback, setTokenFeedback] = useState<{
    type: 'error' | 'success' | null;
    message: string;
  }>({ type: null, message: '' });

  // Dropdown 2: Classes filtered by selectedSchool
  const availableClasses = useMemo(() => {
    if (!selectedSchool) return [];
    const classes = STUDENTS_DATA.filter((s) => s.sekolah === selectedSchool).map(
      (s) => s.kelas
    );
    return Array.from(new Set(classes));
  }, [selectedSchool]);

  // Dropdown 3: Students filtered by selectedSchool + selectedClass, sorted A-Z by nama
  const availableStudents = useMemo(() => {
    if (!selectedSchool || !selectedClass) return [];
    return STUDENTS_DATA.filter(
      (s) => s.sekolah === selectedSchool && s.kelas === selectedClass
    ).sort((a, b) => {
      const nameCmp = a.nama.localeCompare(b.nama, 'id', { sensitivity: 'base' });
      if (nameCmp !== 0) return nameCmp;
      return a.noAbsen.localeCompare(b.noAbsen, 'id');
    });
  }, [selectedSchool, selectedClass]);

  const selectedStudent = useMemo(() => {
    if (!selectedStudentId) return null;
    return STUDENTS_DATA.find((s) => s.id === selectedStudentId) || null;
  }, [selectedStudentId]);

  const handleSchoolChange = (school: string) => {
    setSelectedSchool(school);
    setSelectedClass('');
    setSelectedStudentId('');
    setIsConfirmed(false);
  };

  const handleClassChange = (kelas: string) => {
    setSelectedClass(kelas);
    setSelectedStudentId('');
    setIsConfirmed(false);
  };

  const handleStudentChange = (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsConfirmed(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !isConfirmed || isValidatingToken) return;

    setIsValidatingToken(true);
    setTokenFeedback({ type: null, message: '' });

    const result = await validateExamToken(tokenInput);
    setIsValidatingToken(false);

    if (!result.valid) {
      setTokenFeedback({ type: 'error', message: result.message });
      return;
    }

    setTokenFeedback({ type: 'success', message: result.message });
    onStartExam(selectedStudent, tokenInput.trim().toUpperCase());
  };

  const canAttemptStart =
    Boolean(selectedStudent) &&
    tokenInput.trim().length > 0 &&
    isConfirmed &&
    !isValidatingToken;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: Brand wordmark | concise links | 1 primary action */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <div className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            CBT Penilaian Sumatif Akhir Semester
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#identitas-peserta"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Masuk Peserta
            </a>
            <a
              href="#tata-tertib"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Struktur & Aturan
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenTeacherPortal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Portal Guru
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 lg:py-12">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-500 mb-2">
            Tahun Pelajaran 2026/2027 · Program Keahlian TJKT · Durasi 120 Menit
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 max-w-3xl text-balance">
            {SUBJECT_NAME}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cascading Login Form */}
          <section
            id="identitas-peserta"
            className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8"
          >
            <div className="mb-6 pb-5 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900">
                Verifikasi Identitas Peserta Ujian
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Pilih asal sekolah, kelas, dan nama Anda secara berurutan, lalu masukkan
                token sesi dari pengawas ruangan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Dropdown 1: Sekolah */}
              <div>
                <label
                  htmlFor="select-school"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  1. Asal Sekolah / Institusi
                </label>
                <div className="relative">
                  <select
                    id="select-school"
                    value={selectedSchool}
                    onChange={(e) => handleSchoolChange(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
                  >
                    <option value="">-- Pilih Asal Sekolah --</option>
                    {SCHOOL_LIST.map((school) => (
                      <option key={school} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Dropdown 2: Kelas */}
              <div>
                <label
                  htmlFor="select-class"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  2. Kelas / Jurusan
                </label>
                <div className="relative">
                  <select
                    id="select-class"
                    value={selectedClass}
                    onChange={(e) => handleClassChange(e.target.value)}
                    disabled={!selectedSchool}
                    className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <option value="">
                      {selectedSchool
                        ? '-- Pilih Kelas / Jurusan --'
                        : 'Pilih sekolah terlebih dahulu'}
                    </option>
                    {availableClasses.map((kelas) => (
                      <option key={kelas} value={kelas}>
                        {kelas}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Dropdown 3: Nama Peserta (A-Z) */}
              <div>
                <label
                  htmlFor="select-student"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  3. Nama Peserta (Urut Abjad A–Z)
                </label>
                <div className="relative">
                  <select
                    id="select-student"
                    value={selectedStudentId}
                    onChange={(e) => handleStudentChange(e.target.value)}
                    disabled={!selectedClass}
                    className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <option value="">
                      {selectedClass
                        ? `-- Pilih Nama Peserta (${availableStudents.length} siswa) --`
                        : 'Pilih kelas terlebih dahulu'}
                    </option>
                    {availableStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.nama} (No. {student.noAbsen})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Biodata Read-only */}
              {selectedStudent && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-3">
                    <UserCheck className="w-4 h-4 text-sky-700" />
                    <span>Biodata Peserta Terpilih (Read-Only)</span>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                    <div>
                      <dt className="text-xs text-slate-500">Nama Lengkap</dt>
                      <dd className="font-semibold text-slate-900">
                        {selectedStudent.nama}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">No. Peserta / Absen</dt>
                      <dd className="font-mono font-medium text-slate-900 tabular-nums">
                        {selectedStudent.noAbsen} ({selectedStudent.id})
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Asal Sekolah</dt>
                      <dd className="font-medium text-slate-900">
                        {selectedStudent.sekolah}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Kelas / Rombel</dt>
                      <dd className="font-medium text-slate-900">
                        {selectedStudent.kelas}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              {/* Token Input */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label
                    htmlFor="exam-token"
                    className="block text-sm font-medium text-slate-700"
                  >
                    4. Token Ujian
                  </label>
                  <span className="text-xs font-mono text-slate-500">
                    Token sesi aktif: KKA-2026
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="exam-token"
                    type="text"
                    value={tokenInput}
                    onChange={(e) => {
                      setTokenInput(e.target.value.toUpperCase());
                      if (tokenFeedback.type) {
                        setTokenFeedback({ type: null, message: '' });
                      }
                    }}
                    placeholder="Masukkan token sesi (contoh: KKA-2026)"
                    autoComplete="off"
                    className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 font-mono text-sm text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  />
                </div>
                {tokenFeedback.type === 'error' && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-700">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{tokenFeedback.message}</span>
                  </p>
                )}
                {tokenFeedback.type === 'success' && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{tokenFeedback.message}</span>
                  </p>
                )}
              </div>

              {/* Confirmation Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    disabled={!selectedStudent}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-600 disabled:opacity-50"
                  />
                  <span className="text-sm text-slate-700 leading-relaxed">
                    Saya menyatakan bahwa identitas peserta yang dipilih di atas benar
                    merupakan data diri saya dan saya bersedia mengerjakan ujian ini secara
                    mandiri serta jujur.
                  </span>
                </label>
              </div>

              {/* Start Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!canAttemptStart}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isValidatingToken ? 'Memverifikasi Token...' : 'Mulai Ujian'}
                </button>
              </div>
            </form>
          </section>

          {/* Right Column: Exam Spec & Integrity Notice */}
          <aside id="tata-tertib" className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <BookOpen className="w-4 h-4 text-sky-700" />
                <h2 className="text-base font-semibold text-slate-900">
                  Komposisi Paket Soal (50 Butir)
                </h2>
              </div>
              <div className="divide-y divide-slate-100 text-sm">
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">
                      Bagian A · Pilihan Ganda Tunggal
                    </p>
                    <p className="text-xs text-slate-500">
                      Pilih 1 jawaban paling tepat dari 5 opsi (A–E)
                    </p>
                  </div>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums shrink-0">
                    30 Soal
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">
                      Bagian B · Pilihan Ganda Kompleks
                    </p>
                    <p className="text-xs text-slate-500">
                      Pilih tepat 5 pernyataan benar dari 10 opsi (A–J)
                    </p>
                  </div>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums shrink-0">
                    15 Soal
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">Bagian C · Uraian</p>
                    <p className="text-xs text-slate-500">
                      Jawaban tertulis terstruktur sesuai rubrik penilaian
                    </p>
                  </div>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums shrink-0">
                    5 Soal
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-700" />
                <h2 className="text-base font-semibold text-slate-900">
                  Ketentuan Sesi & Keamanan
                </h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Waktu pengerjaan <strong>120 menit</strong> berjalan terus dan
                    tersinkronisasi otomatis. Ujian dikirim otomatis saat waktu habis.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Setiap peserta menerima paket soal & urutan opsi acak deterministik
                    sesuai identitas masing-masing.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Perpindahan tab atau jendela browser selama ujian tercatat otomatis
                    sebagai pelanggaran dan dilaporkan ke lembar hasil.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Rekap jawaban dienkripsi dengan <strong>AES-256-GCM</strong> serta
                    hash integritas <strong>SHA-256</strong> sebelum dikirim dan dicadangkan.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Penilaian Sumatif Akhir Semester Ganjil 2026/2027 · Koding dan Kecerdasan
            Artificial
          </span>
          <span>SMK Mudita Singkawang & SMK Negeri 1 Singkawang</span>
        </div>
      </footer>
    </div>
  );
};
