import crypto from 'node:crypto';

/** Crockford-ish alphabet without look-alikes (no 0/o, 1/l/i). */
const ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789';

export function randomToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('base64url');
}

function randomCode(length: number): string {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += ALPHABET[crypto.randomInt(ALPHABET.length)];
  }
  return out;
}

/**
 * Collision-checked share code. The old client-side version drew 5 characters
 * from `Math.random()` with no uniqueness check — roughly a 1-in-60M clash per
 * gift, and it was guessable.
 */
export async function uniqueShareCode(
  exists: (code: string) => Promise<boolean>,
  length = 8
): Promise<string> {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = randomCode(length);
    if (!(await exists(code))) return code;
  }
  throw new Error('Could not allocate a unique share code');
}
