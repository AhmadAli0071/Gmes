import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, ApiError, validate } from '../middleware/error';
import { writeLimiter } from '../middleware/rateLimit';
import { Gift } from '../models/Gift';
import { ownerTokenOf } from '../utils/cookies';
import { toPublicGift } from '../utils/publicGift';
import { uniqueShareCode } from '../utils/tokens';

const mediaList = z.array(z.string().max(600)).max(8);

const giftFields = {
  recipientName: z.string().trim().min(1, 'Recipient name is required.').max(80),
  senderName: z.string().trim().min(1, 'Your name is required.').max(80),
  message: z.string().max(4000).default(''),
  templateId: z.string().max(64).default(''),
  eventSlug: z.string().max(32).default('other'),
  mood: z.string().max(24).default('magical'),
  fontStyle: z.string().max(24).default('modern'),
  musicTrack: z.string().max(24).default('none'),
  animationEffect: z.string().max(24).default('confetti'),
  photos: mediaList.default([]),
  voiceNoteUrl: z.string().max(600).nullable().default(null),
  voiceNoteDuration: z.number().int().min(0).max(1200).default(0),
  videoUrl: z.string().max(600).nullable().default(null),
  boxColor: z.string().max(32).default('#6D28D9'),
  ribbonColor: z.string().max(32).default('#F59E0B'),
  status: z.enum(['draft', 'published']).default('published'),
};

const createSchema = z.object({
  ...giftFields,
  // .nullish(): clients may send `ownerToken: null` when they have no device token yet.
  ownerToken: z.string().min(16).max(128).nullish(),
});

const updateSchema = z
  .object(
    Object.fromEntries(
      Object.entries(giftFields).map(([key, schema]) => [key, (schema as any).optional()])
    ) as Record<string, z.ZodType>
  )
  .refine((value) => Object.keys(value).length > 0, 'Nothing to update.');

export const giftsRouter = Router();

type Scope = { filter: Record<string, unknown> };

/** Only the owner — by account, or by the guest device token — may list/manage. */
function scopeOf(req: any): Scope {
  if (req.user) return { filter: { ownerId: req.user._id } };
  const ownerToken = ownerTokenOf(req);
  if (ownerToken) return { filter: { ownerToken } };
  throw ApiError.unauthorized('auth_required', 'Sign in to see your gifts.');
}

function canManage(gift: any, req: any): boolean {
  if (req.user && gift.ownerId && String(gift.ownerId) === String(req.user._id)) return true;
  const ownerToken = ownerTokenOf(req);
  return Boolean(ownerToken && gift.ownerToken && ownerToken === gift.ownerToken);
}

giftsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const { filter } = scopeOf(req);
    const docs = await Gift.find(filter).sort({ createdAt: -1 });
    res.json({ gifts: docs.map(toPublicGift) });
  })
);

giftsRouter.post(
  '/',
  writeLimiter,
  validate(createSchema),
  asyncHandler(async (req, res) => {
    const ownerToken = ownerTokenOf(req);
    if (!req.user && !ownerToken) {
      throw ApiError.unauthorized('auth_required', 'Missing device token.');
    }

    const shareCode = await uniqueShareCode(async (code) => Boolean(await Gift.exists({ shareCode: code })));

    const gift = await Gift.create({
      ...req.body,
      shareCode,
      ownerToken,
      ownerId: req.user ? req.user._id : null,
    });

    res.status(201).json({ gift: toPublicGift(gift) });
  })
);

giftsRouter.get(
  '/:shareCode',
  asyncHandler(async (req, res) => {
    const gift = await Gift.findOne({ shareCode: String(req.params.shareCode) });
    if (!gift) throw ApiError.notFound('gift_not_found', 'This gift link is invalid or expired.');
    if (gift.status === 'draft') {
      const ownerToken = ownerTokenOf(req);
      const isOwner =
        (req.user && gift.ownerId && String(gift.ownerId) === String(req.user._id)) ||
        Boolean(ownerToken && gift.ownerToken === ownerToken);
      if (!isOwner) throw ApiError.notFound('gift_not_found');
    }
    res.set('Cache-Control', 'no-store');
    res.json({ gift: toPublicGift(gift) });
  })
);

giftsRouter.post(
  '/:shareCode/events',
  asyncHandler(async (req, res) => {
    const type = req.body?.type === 'open' ? 'open' : 'view';
    const gift = await Gift.findOneAndUpdate(
      { shareCode: String(req.params.shareCode) },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );
    if (!gift) throw ApiError.notFound('gift_not_found');
    res.json({ ok: true, type, viewsCount: gift.viewsCount });
  })
);

giftsRouter.patch(
  '/:id',
  writeLimiter,
  validate(updateSchema),
  asyncHandler(async (req, res) => {
    const gift = await Gift.findById(req.params.id);
    if (!gift) throw ApiError.notFound('gift_not_found');
    if (!canManage(gift, req)) throw ApiError.forbidden('not_owner');

    for (const [key, value] of Object.entries(req.body)) {
      (gift as any)[key] = value;
    }
    await gift.save();
    res.json({ gift: toPublicGift(gift) });
  })
);

giftsRouter.delete(
  '/:id',
  writeLimiter,
  asyncHandler(async (req, res) => {
    const gift = await Gift.findById(req.params.id);
    if (!gift) throw ApiError.notFound('gift_not_found');
    if (!canManage(gift, req)) throw ApiError.forbidden('not_owner');
    await gift.deleteOne();
    res.json({ ok: true });
  })
);
