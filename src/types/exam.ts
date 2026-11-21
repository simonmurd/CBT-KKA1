export type QuestionType = 'PG' | 'PGK' | 'ESSAY';

export interface Student {
  id: string;
  sekolah: string;
  kelas: string;
  noAbsen: string;
  nama: string;
  namaLengkapDisplay: string;
}

export interface OptionItem {
  originalKey: string;
  text: string;
}

export interface PGQuestionBankItem {
  questionId: string;
  isOriginal: boolean;
  topic: string;
  prompt: string;
  codeSnippet?: string;
  options: OptionItem[];
  originalKey: string;
}

export interface PGKQuestionBankItem {
  questionId: string;
  isOriginal: boolean;
  topic: string;
  prompt: string;
  codeSnippet?: string;
  options: OptionItem[];
  originalKeys: string[]; // Always 5 correct originalKey strings
}

export interface EssayRubricItem {
  kriteria: string;
  bobot: number;
  deskripsi: string;
}

export interface EssayQuestionBankItem {
  questionId: string;
  isOriginal: boolean;
  topic: string;
  prompt: string;
  maxScore: number;
  kunciJawabanRingkas: string;
  rubrik: EssayRubricItem[];
}

export interface RenderedOption {
  displayLabel: string; // 'A'..'E' for PG, 'A'..'J' for PGK
  originalKey: string;
  text: string;
}

export interface RenderedPGQuestion {
  index: number; // 1..30
  type: 'PG';
  questionId: string;
  topic: string;
  prompt: string;
  codeSnippet?: string;
  options: RenderedOption[];
  originalKey: string;
}

export interface RenderedPGKQuestion {
  index: number; // 31..45
  type: 'PGK';
  questionId: string;
  topic: string;
  prompt: string;
  codeSnippet?: string;
  options: RenderedOption[];
  originalKeys: string[];
}

export interface RenderedEssayQuestion {
  index: number; // 46..50
  type: 'ESSAY';
  questionId: string;
  topic: string;
  prompt: string;
  maxScore: number;
  kunciJawabanRingkas: string;
  rubrik: EssayRubricItem[];
}

export type RenderedQuestion =
  | RenderedPGQuestion
  | RenderedPGKQuestion
  | RenderedEssayQuestion;

export interface ExamPacket {
  seedString: string;
  seedHash: number;
  pgQuestions: RenderedPGQuestion[];
  pgkQuestions: RenderedPGKQuestion[];
  essayQuestions: RenderedEssayQuestion[];
  allQuestions: RenderedQuestion[];
}

export interface StudentAnswers {
  pg: Record<string, string>; // questionId -> originalKey selected
  pgk: Record<string, string[]>; // questionId -> array of originalKeys selected (max 5)
  essay: Record<string, string>; // questionId -> text
}

/**
 * Stored in localStorage during & after exam.
 * NEVER contains scores (skor_pg, skor_pgk, total_skor_otomatis) or answer keys.
 */
export interface StoredExamSession {
  version: number;
  student: Student;
  tokenUjian: string;
  startedAt: number; // epoch ms
  endTimestamp: number; // epoch ms (startedAt + 120 * 60 * 1000)
  currentIndex: number; // 0..49
  answers: StudentAnswers;
  flagged: Record<string, boolean>; // questionId -> boolean
  violations: number;
  status: 'in_progress' | 'submitted';
  submittedAt?: number;
  durasiDetik?: number;
  submissionSyncStatus?: 'sending' | 'sent' | 'queued' | 'failed';
  submissionSyncNote?: string;
  integritySha256?: string;
  encryptedPayload?: string;
  encryptionVersion?: string;
}

export interface TeacherDecryptedQuestionDetailPG {
  no: number;
  questionId: string;
  topic: string;
  prompt: string;
  selectedOriginalKey: string | null;
  selectedText: string | null;
  correctOriginalKey: string;
  correctText: string;
  isCorrect: boolean;
}

export interface TeacherDecryptedQuestionDetailPGK {
  no: number;
  questionId: string;
  topic: string;
  prompt: string;
  selectedOriginalKeys: string[];
  correctOriginalKeys: string[];
  matchedCount: number;
  scoreRatio: number;
}

export interface TeacherDecryptedQuestionDetailEssay {
  no: number;
  questionId: string;
  topic: string;
  prompt: string;
  answerText: string;
  maxScore: number;
  kunciJawabanRingkas: string;
  rubrik: EssayRubricItem[];
}

export interface TeacherReportPayload {
  metadata: {
    timestamp: string;
    sekolah: string;
    kelas: string;
    noAbsen: string;
    namaPeserta: string;
    namaLengkap: string;
    mataPelajaran: string;
    tokenUjian: string;
    durasiDetik: number;
    jumlahPelanggaranTab: number;
    seedHash: number;
  };
  scores: {
    skor_pg_benar: number;
    total_pg: number;
    skor_pg: number;
    skor_pgk_benar_sempurna: number;
    total_pgk: number;
    skor_pgk: number;
    total_skor_otomatis: number;
  };
  details: {
    pg: TeacherDecryptedQuestionDetailPG[];
    pgk: TeacherDecryptedQuestionDetailPGK[];
    essay: TeacherDecryptedQuestionDetailEssay[];
  };
}

export interface BackupEnvelope {
  app: string;
  mata_pelajaran: string;
  timestamp: string;
  peserta: {
    id: string;
    sekolah: string;
    kelas: string;
    no_peserta: string;
    nama: string;
  };
  sesi: {
    token_ujian: string;
    durasi_detik: number;
    jumlah_pelanggaran_tab: number;
    pg_terjawab: number;
    pgk_terjawab: number;
    uraian_terjawab: number;
  };
  encryption_version: string;
  integrity_sha256: string;
  encrypted_payload: string;
}

export interface GASSubmissionPayload {
  sekolah: string;
  kelas: string;
  nama_lengkap: string;
  pilihan_lkpd: string;
  durasi_detik: number;
  skor_pg_benar: number;
  nilai_akhir: number;
  timestamp: string;
  nama_peserta: string;
  nis_no_peserta: string;
  kelas_rombel: string;
  mata_pelajaran: string;
  token_ujian: string;
  durasi_terpakai_detik: number;
  jumlah_pelanggaran_tab: number;
  skor_pg: number;
  skor_pgk: number;
  total_skor_otomatis: number;
  encryption_version: string;
  integrity_sha256: string;
  rekap_jawaban: string;
  encrypted_payload: string;
}
