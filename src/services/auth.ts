import { api } from '../lib/api';
import { User } from '../types';

type RawUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role?: 'user' | 'admin';
  plan: 'free' | 'premium' | 'pro';
  planExpiresAt?: string | null;
};

const toUser = (raw: RawUser): User => ({
  id: raw.id,
  name: raw.name,
  email: raw.email,
  avatarUrl: raw.avatarUrl || undefined,
  role: raw.role || 'user',
  plan: raw.plan || 'free',
  planExpiresAt: raw.planExpiresAt || undefined,
});

export async function fetchMe(): Promise<User | null> {
  const data = await api<{ user: RawUser | null }>('/api/auth/me');
  return data.user ? toUser(data.user) : null;
}

export async function register(name: string, email: string, password: string): Promise<User> {
  const data = await api<{ user: RawUser }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  return toUser(data.user);
}

export async function login(email: string, password: string): Promise<User> {
  const data = await api<{ user: RawUser }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return toUser(data.user);
}

export async function logout(): Promise<void> {
  await api('/api/auth/logout', { method: 'POST' });
}

export async function updateMe(patch: {
  name?: string;
  email?: string;
  avatarUrl?: string | null;
}): Promise<User> {
  const data = await api<{ user: RawUser }>('/api/auth/me', {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
  return toUser(data.user);
}

/** Unclaimed guest gifts waiting on this device - the UI asks before claiming. */
export async function getPendingClaims(): Promise<number> {
  const data = await api<{ count: number }>('/api/auth/pending-claims');
  return Number(data.count) || 0;
}

/** Explicitly move this device's guest gifts onto the signed-in account. */
export async function claimDeviceGifts(): Promise<void> {
  await api('/api/auth/claim', { method: 'POST' });
}
