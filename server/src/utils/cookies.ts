import type { Request, Response } from 'express';
import { env } from '../config/env';

export const SESSION_COOKIE = 'gems_sid';
export const OWNER_HEADER = 'x-owner-token';

const base = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
};

export function setSessionCookie(res: Response, token: string): void {
  res.cookie(SESSION_COOKIE, token, {
    ...base,
    secure: env.cookieSecure,
    maxAge: env.sessionDays * 24 * 60 * 60 * 1000,
  });
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, { ...base, secure: env.cookieSecure });
}

/** Device secret a logged-out visitor sends with every gift request. */
export function ownerTokenOf(req: Request): string | null {
  const header = req.get(OWNER_HEADER);
  const source = header || req.body?.ownerToken || req.query?.ownerToken;
  if (typeof source === 'string' && source.length >= 16 && source.length <= 128) {
    return source;
  }
  return null;
}
