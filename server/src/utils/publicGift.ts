/** Shared shape of a gift as the API hands it to clients. */
export interface PublicGift {
  id: string;
  shareCode: string;
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
  status: string;
  viewsCount: number;
  createdAt: string;
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function toPublicGift(doc: any): PublicGift {
  return {
    id: String(doc._id),
    shareCode: str(doc.shareCode),
    recipientName: str(doc.recipientName),
    senderName: str(doc.senderName),
    message: str(doc.message),
    templateId: str(doc.templateId),
    eventSlug: str(doc.eventSlug, 'other'),
    mood: str(doc.mood, 'magical'),
    fontStyle: str(doc.fontStyle, 'modern'),
    musicTrack: str(doc.musicTrack, 'none'),
    animationEffect: str(doc.animationEffect, 'confetti'),
    photos: Array.isArray(doc.photos) ? doc.photos.filter((p: unknown) => typeof p === 'string') : [],
    voiceNoteUrl: doc.voiceNoteUrl ?? null,
    voiceNoteDuration: Number(doc.voiceNoteDuration) || 0,
    videoUrl: doc.videoUrl ?? null,
    boxColor: str(doc.boxColor, '#6D28D9'),
    ribbonColor: str(doc.ribbonColor, '#F59E0B'),
    status: str(doc.status, 'published'),
    viewsCount: Number(doc.viewsCount) || 0,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
  };
}
