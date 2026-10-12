import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodType } from 'zod';

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message?: string) {
    super(message || code);
    this.status = status;
    this.code = code;
  }

  static badRequest(code: string, message?: string) {
    return new ApiError(400, code, message);
  }
  static unauthorized(code = 'unauthorized', message?: string) {
    return new ApiError(401, code, message);
  }
  static forbidden(code = 'forbidden', message?: string) {
    return new ApiError(403, code, message);
  }
  static notFound(code = 'not_found', message?: string) {
    return new ApiError(404, code, message);
  }
  static conflict(code: string, message?: string) {
    return new ApiError(409, code, message);
  }
}

export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown> | unknown
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function validate(schema: ZodType, key: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[key]);
    if (!result.success) {
      const issue = result.error.issues?.[0];
      return next(
        ApiError.badRequest(
          issue?.path?.length ? `invalid_${key}_${String(issue.path[0])}` : `invalid_${key}`,
          issue?.message
        )
      );
    }
    (req as any)[key] = result.data;
    next();
  };
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: 'not_found' });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.code, message: err.message });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'validation_failed', message: err.issues?.[0]?.message });
    return;
  }
  if (err?.code === 'LIMIT_FILE_SIZE') {
    res.status(413).json({ error: 'file_too_large', message: 'Upload exceeds the size limit.' });
    return;
  }
  if (err?.code === 11000) {
    res.status(409).json({ error: 'duplicate_value', message: 'That value is already taken.' });
    return;
  }
  if (err?.name === 'BSONError' || err?.name === 'CastError') {
    res.status(400).json({ error: 'invalid_id' });
    return;
  }
  console.error('[api]', err);
  res.status(500).json({ error: 'internal_error', message: 'Something went wrong.' });
}
