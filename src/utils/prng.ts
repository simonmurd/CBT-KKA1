import { ESSAY_QUESTION_BANK } from '../data/questionsEssay';
import { PG_QUESTION_BANK } from '../data/questionsPG';
import { PGK_QUESTION_BANK } from '../data/questionsPGK';
import {
  ExamPacket,
  RenderedEssayQuestion,
  RenderedPGKQuestion,
  RenderedPGQuestion,
  Student,
} from '../types/exam';

/**
 * FNV-1a 32-bit hash algorithm
 * Converts any student identity string deterministically into an unsigned 32-bit integer seed.
 */
export function fnv1aHash(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Mulberry32 32-bit deterministic PRNG
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic Fisher-Yates Shuffle
 */
export function fisherYatesShuffle<T>(items: readonly T[], rng: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

const PG_LABELS = ['A', 'B', 'C', 'D', 'E'] as const;
const PGK_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] as const;

/**
 * Generates a deterministic 50-question exam packet for a specific student:
 * - 30 PG (sampled from 60 PG bank, shuffled, options A-E shuffled)
 * - 15 PGK (sampled from 30 PGK bank, shuffled, options A-J shuffled)
 * - 5 Essay (sampled from 10 Essay bank, shuffled)
 */
export function generateStudentExamPacket(student: Student): ExamPacket {
  const seedString = `${student.sekolah}|${student.kelas}|${student.noAbsen}|${student.nama}|KKA-SAS-2026`;
  const seedHash = fnv1aHash(seedString);
  const rng = mulberry32(seedHash);

  // 1. Sample & shuffle 30 PG questions from 60-item bank
  const shuffledPGPool = fisherYatesShuffle(PG_QUESTION_BANK, rng);
  const selectedPG = shuffledPGPool.slice(0, 30);

  const pgQuestions: RenderedPGQuestion[] = selectedPG.map((q, idx) => {
    const shuffledOptions = fisherYatesShuffle(q.options, rng);
    return {
      index: idx + 1,
      type: 'PG',
      questionId: q.questionId,
      topic: q.topic,
      prompt: q.prompt,
      codeSnippet: q.codeSnippet,
      originalKey: q.originalKey,
      options: shuffledOptions.map((opt, optIdx) => ({
        displayLabel: PG_LABELS[optIdx],
        originalKey: opt.originalKey,
        text: opt.text,
      })),
    };
  });

  // 2. Sample & shuffle 15 PGK questions from 30-item bank
  const shuffledPGKPool = fisherYatesShuffle(PGK_QUESTION_BANK, rng);
  const selectedPGK = shuffledPGKPool.slice(0, 15);

  const pgkQuestions: RenderedPGKQuestion[] = selectedPGK.map((q, idx) => {
    const shuffledOptions = fisherYatesShuffle(q.options, rng);
    return {
      index: 31 + idx,
      type: 'PGK',
      questionId: q.questionId,
      topic: q.topic,
      prompt: q.prompt,
      codeSnippet: q.codeSnippet,
      originalKeys: q.originalKeys,
      options: shuffledOptions.map((opt, optIdx) => ({
        displayLabel: PGK_LABELS[optIdx],
        originalKey: opt.originalKey,
        text: opt.text,
      })),
    };
  });

  // 3. Sample & shuffle 5 Essay questions from 10-item bank
  const shuffledEssayPool = fisherYatesShuffle(ESSAY_QUESTION_BANK, rng);
  const selectedEssay = shuffledEssayPool.slice(0, 5);

  const essayQuestions: RenderedEssayQuestion[] = selectedEssay.map((q, idx) => ({
    index: 46 + idx,
    type: 'ESSAY',
    questionId: q.questionId,
    topic: q.topic,
    prompt: q.prompt,
    maxScore: q.maxScore,
    kunciJawabanRingkas: q.kunciJawabanRingkas,
    rubrik: q.rubrik,
  }));

  return {
    seedString,
    seedHash,
    pgQuestions,
    pgkQuestions,
    essayQuestions,
    allQuestions: [...pgQuestions, ...pgkQuestions, ...essayQuestions],
  };
}
