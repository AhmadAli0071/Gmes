import { Router } from 'express';
import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { asyncHandler, ApiError } from '../middleware/error';
import { uploadLimiter } from '../middleware/rateLimit';
import { env } from '../config/env';
import { detectType, MAX_UPLOAD_BYTES } from '../utils/magicBytes';

export const uploadsRoot = path.resolve(process.cwd(), env.uploadsDir);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES.video, files: 1 },
});

export const mediaRouter = Router();

mediaRouter.post(
  '/',
  uploadLimiter,
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const requested = String(req.body?.kind || 'photo');
    const kind: 'photo' | 'voice' | 'video' =
      requested === 'voice' ? 'voice' : requested === 'video' ? 'video' : 'photo';

    const file = req.file;
    if (!file) throw ApiError.badRequest('missing_file', 'No file received.');

    const type = detectType(file.buffer);
    if (!type) throw new ApiError(415, 'unsupported_file', 'Unsupported file format.');

    const expected = kind === 'photo' ? 'image' : kind === 'voice' ? 'audio' : 'video';
    if (type.kind !== expected) {
      throw new ApiError(415, 'wrong_file_kind', `${kind} uploads must be ${expected} files.`);
    }
    if (file.size > MAX_UPLOAD_BYTES[kind]) {
      throw new ApiError(413, 'file_too_large', `${kind} files are limited to ${MAX_UPLOAD_BYTES[kind]} bytes.`);
    }

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const dir = path.join(uploadsRoot, String(now.getFullYear()), month);
    await fs.mkdir(dir, { recursive: true });

    const name = `${Date.now().toString(36)}-${crypto.randomBytes(6).toString('hex')}.${type.ext}`;
    await fs.writeFile(path.join(dir, name), file.buffer);

    res.status(201).json({
      url: `/uploads/${now.getFullYear()}/${month}/${name}`,
      mime: type.mime,
      size: file.size,
    });
  })
);
