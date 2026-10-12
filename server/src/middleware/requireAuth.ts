import type { NextFunction, Request, Response } from 'express';
import { ApiError } from './error';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return next(ApiError.unauthorized('auth_required', 'Sign in first.'));
  next();
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return next(ApiError.unauthorized('auth_required', 'Sign in first.'));
  if (req.user.role !== 'admin') return next(ApiError.forbidden('admin_only'));
  next();
}
