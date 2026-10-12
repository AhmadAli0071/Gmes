import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { asyncHandler, ApiError, validate } from '../middleware/error';
import { authLimiter } from '../middleware/rateLimit';
import { requireAuth } from '../middleware/requireAuth';
import { User, toPublicUser } from '../models/User';
import { Session } from '../models/Session';
import { Gift } from '../models/Gift';
import { setSessionCookie, clearSessionCookie, ownerTokenOf } from '../utils/cookies';
import { randomToken } from '../utils/tokens';
import { env } from '../config/env';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emailField = z
  .string()
  .trim()
  .min(5)
  .max(254)
  .regex(EMAIL_RE, 'Enter a valid email address');

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: emailField,
  password: z.string().min(8, 'Password must be at least 8 characters.').max(128),
});

const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1).max(128),
});

const updateSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  avatarUrl: z.string().max(600).nullable().optional(),
});

async function startSession(res: any, userId: unknown): Promise<void> {
  const token = randomToken(32);
  const expiresAt = new Date(Date.now() + env.sessionDays * 24 * 60 * 60 * 1000);
  await Session.create({ token, userId: userId as any, expiresAt });
  setSessionCookie(res, token);
}

export const authRouter = Router();

authRouter.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const email = String(req.body.email).toLowerCase();
    const existing = await User.findOne({ email }).select('_id').lean();
    if (existing) throw ApiError.conflict('email_taken', 'That email is already registered.');

    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      name: req.body.name,
      email,
      passwordHash,
      role: 'user',
      plan: 'free',
    });

    await attachGuestGifts(String(user._id), ownerTokenOf(req));
    await startSession(res, user._id);
    res.status(201).json({ user: toPublicUser(user) });
  })
);

authRouter.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const email = String(req.body.email).toLowerCase();
    const user = await User.findOne({ email });
    if (!user) throw ApiError.unauthorized('invalid_credentials', 'Email or password is incorrect.');
    if (!user.passwordHash) {
      throw ApiError.badRequest('passwordless_account', 'This account signs in with Google.');
    }

    const ok = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!ok) throw ApiError.unauthorized('invalid_credentials', 'Email or password is incorrect.');

    await attachGuestGifts(String(user._id), ownerTokenOf(req));
    await startSession(res, user._id);
    res.json({ user: toPublicUser(user) });
  })
);

/**
 * Google Identity Services: the browser sends the ID token, we let Google
 * verify it via tokeninfo and then open a local session.
 */
authRouter.post(
  '/google',
  authLimiter,
  asyncHandler(async (req, res) => {
    if (!env.googleClientId) throw new ApiError(501, 'google_login_disabled');
    const credential = req.body?.credential;
    if (typeof credential !== 'string' || !credential) throw ApiError.badRequest('missing_credential');

    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
    );
    if (!response.ok) throw ApiError.unauthorized('invalid_google_token');
    const claims: any = await response.json();
    if (claims.aud !== env.googleClientId) throw ApiError.forbidden('wrong_audience');
    if (claims.email_verified !== 'true') throw ApiError.forbidden('email_not_verified');
    if (Number(claims.exp) * 1000 < Date.now()) throw ApiError.unauthorized('token_expired');

    const email = String(claims.email).toLowerCase();
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: claims.name || email.split('@')[0],
        email,
        passwordHash: null,
        googleId: claims.sub,
        avatarUrl: claims.picture || null,
        role: 'user',
        plan: 'free',
      });
    } else if (!user.googleId) {
      user.googleId = claims.sub;
      if (!user.avatarUrl && claims.picture) user.avatarUrl = claims.picture;
      await user.save();
    }

    await attachGuestGifts(String(user._id), ownerTokenOf(req));
    await startSession(res, user._id);
    res.json({ user: toPublicUser(user) });
  })
);

authRouter.post(
  '/logout',
  asyncHandler(async (req, res) => {
    const token = req.cookies?.gems_sid;
    if (token) await Session.deleteOne({ token });
    clearSessionCookie(res);
    res.json({ ok: true });
  })
);

authRouter.get(
  '/me',
  asyncHandler(async (req, res) => {
    res.json({ user: req.user ? toPublicUser(req.user) : null });
  })
);

authRouter.patch(
  '/me',
  requireAuth,
  validate(updateSchema),
  asyncHandler(async (req, res) => {
    const updates: any = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.avatarUrl !== undefined) updates.avatarUrl = req.body.avatarUrl;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ user: toPublicUser(user) });
  })
);

/** Moves a guest's gifts onto the account they just created/signed into. */
async function attachGuestGifts(userId: string, ownerToken: string | null): Promise<void> {
  if (!ownerToken) return;
  await Gift.updateMany({ ownerToken, ownerId: null }, { $set: { ownerId: userId } });
}

authRouter.post(
  '/claim',
  asyncHandler(async (req, res) => {
    const ownerToken = ownerTokenOf(req);
    if (!ownerToken) return res.status(400).json({ error: 'missing_owner_token' });
    if (!req.user) return res.status(401).json({ error: 'auth_required' });
    await attachGuestGifts(String(req.user._id), ownerToken);
    res.json({ ok: true });
  })
);
