import { Router } from 'express';
import mongoose from 'mongoose';
import { asyncHandler } from '../middleware/error';

export const healthRouter = Router();

healthRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const db = mongoose.connection.readyState === 1 ? 'up' : 'down';
    res.set('Cache-Control', 'no-store');
    res.status(db === 'up' ? 200 : 503).json({ ok: db === 'up', db, uptime: process.uptime() });
  })
);
