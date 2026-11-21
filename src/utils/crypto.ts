import { TeacherReportPayload } from '../types/exam';

export const ENCRYPTION_VERSION = 'AES-256-GCM-PBKDF2-SHA256-v1';
export const TEACHER_ACCESS_CODE = 'GURU-KKA-2026';

interface EncryptedContainer {
  v: number;
  alg: 'AES-256-GCM';
  kdf: 'PBKDF2-SHA256';
  iter: number;
  salt: string;
  iv: string;
  ct: string;
  sha256: string;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export async function sha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', toArrayBuffer(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function deriveAesGcmKey(
  passphrase: string,
  salt: Uint8Array,
  iterations: number
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    toArrayBuffer(encoder.encode(passphrase)),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: toArrayBuffer(salt),
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptTeacherReport(
  report: TeacherReportPayload
): Promise<{ encryptedPayload: string; integritySha256: string }> {
  const plaintextJson = JSON.stringify(report);
  const integritySha256 = await sha256Hex(plaintextJson);

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const iterations = 100000;

  const aesKey = await deriveAesGcmKey(TEACHER_ACCESS_CODE, salt, iterations);
  const encoder = new TextEncoder();
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: toArrayBuffer(iv) },
    aesKey,
    toArrayBuffer(encoder.encode(plaintextJson))
  );

  const container: EncryptedContainer = {
    v: 1,
    alg: 'AES-256-GCM',
    kdf: 'PBKDF2-SHA256',
    iter: iterations,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    ct: bytesToBase64(new Uint8Array(cipherBuffer)),
    sha256: integritySha256,
  };

  const containerBytes = encoder.encode(JSON.stringify(container));
  return {
    encryptedPayload: bytesToBase64(containerBytes),
    integritySha256,
  };
}

export interface DecryptedResult {
  report: TeacherReportPayload;
  integrityVerified: boolean;
  computedSha256: string;
  recordedSha256: string;
}

export async function decryptTeacherReport(
  rawInput: string,
  accessCode: string
): Promise<DecryptedResult> {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    throw new Error('Data terenkripsi kosong.');
  }

  let encryptedToken = trimmed;

  // Support pasting either full BackupEnvelope JSON, GAS payload JSON, or raw encrypted_payload base64
  if (trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed) as Record<string, unknown>;
      if (typeof parsed.encrypted_payload === 'string') {
        encryptedToken = parsed.encrypted_payload;
      } else if (typeof parsed.rekap_jawaban === 'string') {
        encryptedToken = parsed.rekap_jawaban;
      } else if (
        typeof parsed.alg === 'string' &&
        typeof parsed.ct === 'string' &&
        typeof parsed.iv === 'string'
      ) {
        // Direct container JSON
        encryptedToken = bytesToBase64(new TextEncoder().encode(trimmed));
      } else {
        throw new Error('Field encrypted_payload tidak ditemukan pada JSON.');
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('encrypted_payload')) {
        throw err;
      }
      throw new Error('Format JSON tidak valid.');
    }
  }

  let container: EncryptedContainer;
  try {
    const containerJson = new TextDecoder().decode(base64ToBytes(encryptedToken));
    container = JSON.parse(containerJson) as EncryptedContainer;
  } catch {
    throw new Error('Format ciphertext AES-256-GCM tidak valid atau rusak.');
  }

  if (
    container.alg !== 'AES-256-GCM' ||
    !container.salt ||
    !container.iv ||
    !container.ct
  ) {
    throw new Error('Struktur kontainer enkripsi tidak dikenali.');
  }

  const salt = base64ToBytes(container.salt);
  const iv = base64ToBytes(container.iv);
  const ct = base64ToBytes(container.ct);
  const aesKey = await deriveAesGcmKey(accessCode.trim(), salt, container.iter || 100000);

  let decryptedBuffer: ArrayBuffer;
  try {
    decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: toArrayBuffer(iv) },
      aesKey,
      toArrayBuffer(ct)
    );
  } catch {
    throw new Error(
      'Dekripsi gagal. Pastikan Kode Akses Guru benar dan data tidak rusak/dimodifikasi.'
    );
  }

  const plaintextJson = new TextDecoder().decode(decryptedBuffer);
  const computedSha256 = await sha256Hex(plaintextJson);
  const report = JSON.parse(plaintextJson) as TeacherReportPayload;

  return {
    report,
    integrityVerified: computedSha256 === container.sha256,
    computedSha256,
    recordedSha256: container.sha256,
  };
}
