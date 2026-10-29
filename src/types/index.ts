export type EventSlug =
  | 'christmas'
  | 'halloween'
  | 'valentines'
  | 'birthday'
  | 'mothers-day'
  | 'fathers-day'
  | 'graduation'
  | 'wedding'
  | 'anniversary'
  | 'thank-you'
  | 'congratulations'
  | 'other';

export interface EventTheme {
  id: string;
  slug: EventSlug;
  name: string;
  tagline: string;
  iconName: string;
  emoji: string;
  startDate: string;
  endDate: string;
  primaryAccent: string;
  secondaryAccent: string;
  subtleAccentBg: string;
  heroTitle: string;
  heroSubtitle: string;
  callToAction: string;
  badgeText: string;
  description: string;
  defaultAnimation: 'confetti' | 'sparkles' | 'hearts' | 'snow';
  active: boolean;
}

export type TemplateVibe =
  | 'all'
  | 'romantic'
  | 'funny'
  | 'elegant'
  | 'cute'
  | 'magical'
  | 'minimal';

export type GiftMood =
  | 'magical'
  | 'romantic'
  | 'playful'
  | 'elegant'
  | 'festive';

export interface GiftTemplate {
  id: string;
  title: string;
  description: string;
  vibe: TemplateVibe;
  eventSlug: EventSlug;
  isPremium: boolean;
  coverImage: string;
  mood: GiftMood;
  fontStyle: 'modern' | 'handwritten' | 'editorial';
  musicTrack: 'acoustic' | 'ambient' | 'birthday' | 'festive' | 'none';
  animationEffect: 'confetti' | 'sparkles' | 'hearts' | 'snow';
  boxColor: string;
  ribbonColor: string;
  tags: string[];
}

export interface GiftData {
  id: string;
  shareCode: string;
  recipientName: string;
  senderName: string;
  message: string;
  templateId: string;
  eventSlug: EventSlug;
  mood: GiftMood;
  fontStyle: 'modern' | 'handwritten' | 'editorial';
  musicTrack: 'acoustic' | 'ambient' | 'birthday' | 'festive' | 'none';
  animationEffect: 'confetti' | 'sparkles' | 'hearts' | 'snow';
  photos: string[];
  voiceNoteUrl?: string;
  voiceNoteDuration?: number;
  videoUrl?: string;
  boxColor: string;
  ribbonColor: string;
  createdAt: string;
  viewsCount: number;
  status: 'draft' | 'published';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: 'user' | 'admin';
  plan: 'free' | 'premium' | 'pro';
  planExpiresAt?: string;
}

export const LANDING_VIEWS = [
  'virtual-birthday-gift',
  'anniversary-digital-gift',
  'valentines-day-virtual-gift',
  'long-distance-gift-ideas',
  'christmas-digital-gift-card',
  'long-distance-birthday-surprise',
  'last-minute-christmas-gift-ideas',
  'instant-gift-ideas',
  'valentines-day-gifts-long-distance-couples',
  'photo-memory-video-gift',
] as const;

export type LandingView = (typeof LANDING_VIEWS)[number];

export type ViewRoute =
  | 'home'
  | 'create'
  | 'explore'
  | 'how-it-works'
  | 'pricing'
  | 'dashboard'
  | 'recipient'
  | 'admin'
  | 'settings'
  | 'blog'
  | LandingView;

