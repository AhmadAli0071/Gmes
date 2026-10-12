import { api } from '../lib/api';
import { EventSlug, GiftData, GiftMood } from '../types';

export interface GiftPayload {
  recipientName: string;
  senderName: string;
  message: string;
  templateId: string;
  eventSlug: string;
  mood: string;
  fontStyle: string;
  musicTrack: string;
  animationEffect: string;
  photos: string[];
  voiceNoteUrl: string | null;
  voiceNoteDuration: number;
  videoUrl: string | null;
  boxColor: string;
  ribbonColor: string;
  status: 'draft' | 'published';
}

const str = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const dayOnly = (value: unknown): string => {
  const text = str(value);
  return text ? text.slice(0, 10) : new Date().toISOString().slice(0, 10);
};

export function fromApi(raw: any): GiftData {
  return {
    id: str(raw.id),
    shareCode: str(raw.shareCode),
    recipientName: str(raw.recipientName, 'Someone Special'),
    senderName: str(raw.senderName, 'A Friend'),
    message: str(raw.message),
    templateId: str(raw.templateId),
    eventSlug: str(raw.eventSlug, 'other') as EventSlug,
    mood: str(raw.mood, 'magical') as GiftMood,
    fontStyle: str(raw.fontStyle, 'modern') as GiftData['fontStyle'],
    musicTrack: str(raw.musicTrack, 'none') as GiftData['musicTrack'],
    animationEffect: str(raw.animationEffect, 'confetti') as GiftData['animationEffect'],
    photos: Array.isArray(raw.photos) ? raw.photos.filter((p: unknown) => typeof p === 'string') : [],
    voiceNoteUrl: raw.voiceNoteUrl || undefined,
    voiceNoteDuration: Number(raw.voiceNoteDuration) || undefined,
    videoUrl: raw.videoUrl || undefined,
    boxColor: str(raw.boxColor, '#6D28D9'),
    ribbonColor: str(raw.ribbonColor, '#F59E0B'),
    createdAt: dayOnly(raw.createdAt),
    viewsCount: Number(raw.viewsCount) || 0,
    status: raw.status === 'draft' ? 'draft' : 'published',
  };
}

export async function listGifts(): Promise<GiftData[]> {
  const data = await api<{ gifts: any[] }>('/api/gifts');
  return (data.gifts || []).map(fromApi);
}

export async function getGiftByCode(shareCode: string): Promise<GiftData> {
  const data = await api<{ gift: any }>(`/api/gifts/${encodeURIComponent(shareCode)}`);
  return fromApi(data.gift);
}

export async function createGift(payload: GiftPayload): Promise<GiftData> {
  const data = await api<{ gift: any }>('/api/gifts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return fromApi(data.gift);
}

export async function updateGift(id: string, payload: Partial<GiftPayload>): Promise<GiftData> {
  const data = await api<{ gift: any }>(`/api/gifts/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return fromApi(data.gift);
}

export async function deleteGift(id: string): Promise<void> {
  await api(`/api/gifts/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

/** Fire-and-forget open counter — a slow network must not stall the unboxing. */
export function recordGiftView(shareCode: string): void {
  void api(`/api/gifts/${encodeURIComponent(shareCode)}/events`, {
    method: 'POST',
    body: JSON.stringify({ type: 'view' }),
  }).catch(() => undefined);
}
