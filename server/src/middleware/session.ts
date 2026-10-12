import type { NextFunction, Request, Response } from 'express';
import { Session } from '../models/Session';
import { SESSION_COOKIE } from '../utils/cookies';

/**
 * Resolves the session cookie into `req.user` (or `null`). Never blocks the
 * request: a missing/expired session just means "anonymous".
 */
export async function attachUser(req: Request, _res: Response, next: NextFunction) {
  try {
    req.user = null;
    const token = req.cookies?.[SESSION_COOKIE];
    if (typeof token !== 'string' || !token) return next();

    const session = await Session.findOne({ token }).populate('userId');
    if (!session || !session.expiresAt || session.expiresAt.getTime() <= Date.now()) {
      if (session) await Session.deleteOne({ _id: session._id });
      return next();
    }
    req.user = session.userId || null;
    next();
  } catch (err) {
    next(err);
  }
}
