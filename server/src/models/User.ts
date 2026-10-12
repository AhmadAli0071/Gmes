import { Schema, model } from 'mongoose';

export type UserRole = 'user' | 'admin';
export type UserPlan = 'free' | 'premium' | 'pro';

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: UserRole;
  plan: UserPlan;
  planExpiresAt: string | null;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    passwordHash: { type: String, default: null },
    googleId: { type: String, default: null },
    avatarUrl: { type: String, default: null },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    plan: { type: String, enum: ['free', 'premium', 'pro'], default: 'free' },
    planExpiresAt: { type: Date, default: null },
    stripeCustomerId: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
// Sparse-ish: only Google accounts carry a googleId, and it must stay unique.
userSchema.index(
  { googleId: 1 },
  { unique: true, partialFilterExpression: { googleId: { $type: 'string' } } }
);

export const User = model('User', userSchema);

export function toPublicUser(user: any): PublicUser {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl ?? null,
    role: user.role ?? 'user',
    plan: user.plan ?? 'free',
    planExpiresAt: user.planExpiresAt ? new Date(user.planExpiresAt).toISOString() : null,
  };
}
