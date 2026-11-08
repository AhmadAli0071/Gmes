import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, ApiError, validate } from '../middleware/error';
import { writeLimiter } from '../middleware/rateLimit';
import { ContactMessage } from '../models/ContactMessage';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short.').max(80),
  email: z
    .string()
    .trim()
    .min(5)
    .max(254)
    .regex(EMAIL_RE, 'Enter a valid email address'),
  message: z.string().trim().min(10, 'Tell us a little more (10+ characters).').max(4000),
});

export const contactRouter = Router();

contactRouter.post(
  '/',
  writeLimiter,
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    await ContactMessage.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    res.status(201).json({ ok: true });
  })
);

/** Inbox for the admin console - staff only. */
contactRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw ApiError.forbidden('admin_only', 'Admin access required.');
    }
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json({
      messages: messages.map((m) => ({
        id: String(m._id),
        name: m.name,
        email: m.email,
        message: m.message,
        createdAt: m.createdAt,
      })),
    });
  })
);
