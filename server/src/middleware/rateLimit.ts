import type { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

const disabled = process.env.NODE_ENV === 'test';

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 240,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: () => disabled,
});

/** Blocks credential-stuffing on /register + /login. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: () => disabled,
  message: { error: 'too_many_attempts', message: 'Too many attempts. Try again later.' },
});

export const writeLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: () => disabled,
});

export const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 25,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: () => disabled,
  message: { error: 'too_many_uploads', message: 'Slow down with the uploads.' },
});

export function noStore(_req: Request, res: Response, next: () => void) {
  res.set('Cache-Control', 'no-store');
  next();
}
