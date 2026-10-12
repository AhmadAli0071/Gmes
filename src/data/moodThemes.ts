import type { CSSProperties } from 'react';
import { GiftMood } from '../types';

export interface MoodTheme {
  accent: string;
  accentHover: string;
  accentDeep: string;
  soft: string;
  softStrong: string;
  ring: string;
  border: string;
  strong: string;
  page: string;
  glow: string;
}

/**
 * Full palette per mood. Components read these through CSS custom properties
 * (`--mood-*`), so switching the mood repaints the entire screen — not just the box.
 */
export const MOOD_THEMES: Record<GiftMood, MoodTheme> = {
  magical: {
    accent: '#6D28D9',
    accentHover: '#5B21B6',
    accentDeep: '#4C1D95',
    soft: '#F5F3FF',
    softStrong: '#EDE9FE',
    ring: 'rgba(109, 40, 217, 0.22)',
    border: '#DDD6FE',
    strong: '#5B21B6',
    page: '#FAF9FF',
    glow: 'rgba(139, 92, 246, 0.35)',
  },
  romantic: {
    accent: '#E11D48',
    accentHover: '#BE123C',
    accentDeep: '#9F1239',
    soft: '#FFF1F2',
    softStrong: '#FFE4E6',
    ring: 'rgba(225, 29, 72, 0.22)',
    border: '#FECDD3',
    strong: '#BE123C',
    page: '#FFF9FA',
    glow: 'rgba(244, 63, 94, 0.32)',
  },
  playful: {
    accent: '#DB2777',
    accentHover: '#BE185D',
    accentDeep: '#9D174D',
    soft: '#FDF2F8',
    softStrong: '#FCE7F3',
    ring: 'rgba(219, 39, 119, 0.22)',
    border: '#FBCFE8',
    strong: '#BE185D',
    page: '#FFF9FC',
    glow: 'rgba(236, 72, 153, 0.32)',
  },
  elegant: {
    accent: '#3F3F46',
    accentHover: '#27272A',
    accentDeep: '#18181B',
    soft: '#FAFAFA',
    softStrong: '#F4F4F5',
    ring: 'rgba(63, 63, 70, 0.22)',
    border: '#E4E4E7',
    strong: '#27272A',
    page: '#FAFAF9',
    glow: 'rgba(245, 158, 11, 0.30)',
  },
  festive: {
    accent: '#DC2626',
    accentHover: '#B91C1C',
    accentDeep: '#991B1B',
    soft: '#FEF2F2',
    softStrong: '#FEE2E2',
    ring: 'rgba(220, 38, 38, 0.22)',
    border: '#FECACA',
    strong: '#B91C1C',
    page: '#FFFBFB',
    glow: 'rgba(21, 128, 61, 0.30)',
  },
};

/** Display names + glyphs for the mood chips in the UI. */
export const MOOD_META: Record<GiftMood, { name: string; emoji: string }> = {
  magical: { name: 'Magical', emoji: '✨' },
  romantic: { name: 'Romantic', emoji: '❤️' },
  playful: { name: 'Playful', emoji: '🎉' },
  elegant: { name: 'Elegant', emoji: '🤍' },
  festive: { name: 'Festive', emoji: '🎄' },
};

export const moodCssVars = (theme: MoodTheme): CSSProperties =>
  ({
    '--mood-accent': theme.accent,
    '--mood-accent-hover': theme.accentHover,
    '--mood-accent-deep': theme.accentDeep,
    '--mood-soft': theme.soft,
    '--mood-soft-strong': theme.softStrong,
    '--mood-ring': theme.ring,
    '--mood-border': theme.border,
    '--mood-strong': theme.strong,
    '--mood-page': theme.page,
    '--mood-glow': theme.glow,
  }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* GIFT CARD ARTWORK — per-mood card design tokens                     */
/* Used by: the 2D flat preview (GiftCardArt) and the keepsake letter. */
/* ------------------------------------------------------------------ */

export type FrameStyle = 'ornate' | 'double' | 'dashed' | 'hairline' | 'plaid';
export type DividerStyle = 'ornament' | 'double' | 'dashed' | 'rule';
export type BadgeStyle = 'pill' | 'tag' | 'ribbon';

export interface CardDesign {
  /** 4-stop canvas gradient for the story card paper */
  paper: [string, string, string, string];
  /** Frame around the card */
  frameStyle: FrameStyle;
  frameOuter: string;
  frameInner: string;
  frameWidth: number;
  /** Glyphs drawn in the four corners */
  cornerGlyph: string;
  /** Glyph in the greeting divider */
  dividerGlyph: string;
  dividerStyle: DividerStyle;
  dividerColor: string;
  /** "FOR SARAH" badge */
  badgeStyle: BadgeStyle;
  badgeBg: string;
  badgeText: string;
  greetingColor: string;
  bodyColor: string;
  signatureColor: string;
  /** 3D card bevel / edge metal */
  bevelColor: number;
  /** Polaroid photo cards */
  polaroidFrame: string;
  polaroidPin: number;
  captionBg: string;
  captionText: string;
  captionGlyph: string;
  /** HTML letter card (under the 3D stage) */
  letterBg: string;
  letterBorder: string;
  letterBadgeBg: string;
  letterBadgeText: string;
  letterPattern: string;
  letterDividerColor: string;
}

export const CARD_DESIGNS: Record<GiftMood, CardDesign> = {
  magical: {
    paper: ['#FFFFFF', '#FAF5FF', '#F3E8FF', '#EDE9FE'],
    frameStyle: 'ornate',
    frameOuter: '#7C3AED',
    frameInner: '#D4AF37',
    frameWidth: 16,
    cornerGlyph: '✨',
    dividerGlyph: '✨',
    dividerStyle: 'ornament',
    dividerColor: '#7C3AED',
    badgeStyle: 'pill',
    badgeBg: '#6D28D9',
    badgeText: '#FFFFFF',
    greetingColor: '#18181B',
    bodyColor: '#3F3F46',
    signatureColor: '#6D28D9',
    bevelColor: 0x7c3aed,
    polaroidFrame: '#FFFFFF',
    polaroidPin: 0xd4af37,
    captionBg: '#FFFFFF',
    captionText: '#18181B',
    captionGlyph: '✨',
    letterBg: 'linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 55%, #F3E8FF 100%)',
    letterBorder: '#DDD6FE',
    letterBadgeBg: '#EDE9FE',
    letterBadgeText: '#6D28D9',
    letterPattern:
      'radial-gradient(circle at 12% 18%, rgba(124,58,237,0.10) 0 2px, transparent 3px), radial-gradient(circle at 78% 12%, rgba(212,175,55,0.16) 0 2px, transparent 3px), radial-gradient(circle at 88% 72%, rgba(124,58,237,0.08) 0 2px, transparent 3px)',
    letterDividerColor: '#DDD6FE',
  },
  romantic: {
    paper: ['#FFF7F7', '#FFF1F2', '#FFE4E6', '#FECDD3'],
    frameStyle: 'double',
    frameOuter: '#E11D48',
    frameInner: '#FDA4AF',
    frameWidth: 14,
    cornerGlyph: '🌹',
    dividerGlyph: '❤️',
    dividerStyle: 'ornament',
    dividerColor: '#FB7185',
    badgeStyle: 'ribbon',
    badgeBg: '#E11D48',
    badgeText: '#FFFFFF',
    greetingColor: '#881337',
    bodyColor: '#4C0519',
    signatureColor: '#E11D48',
    bevelColor: 0xe11d48,
    polaroidFrame: '#FFF1F2',
    polaroidPin: 0xe11d48,
    captionBg: '#FFF1F2',
    captionText: '#881337',
    captionGlyph: '❤️',
    letterBg: 'linear-gradient(180deg, #FFFFFF 0%, #FFF1F2 55%, #FFE4E6 100%)',
    letterBorder: '#FECDD3',
    letterBadgeBg: '#FFE4E6',
    letterBadgeText: '#E11D48',
    letterPattern:
      'radial-gradient(circle at 15% 20%, rgba(225,29,72,0.10) 0 3px, transparent 4px), radial-gradient(circle at 82% 15%, rgba(251,113,133,0.14) 0 3px, transparent 4px), radial-gradient(circle at 70% 78%, rgba(225,29,72,0.08) 0 3px, transparent 4px)',
    letterDividerColor: '#FECDD3',
  },
  playful: {
    paper: ['#FFFFFF', '#FFFBF5', '#FFF4E6', '#FFE8CC'],
    frameStyle: 'dashed',
    frameOuter: '#F97316',
    frameInner: '#EC4899',
    frameWidth: 18,
    cornerGlyph: '🎉',
    dividerGlyph: '🎉',
    dividerStyle: 'dashed',
    dividerColor: '#F97316',
    badgeStyle: 'tag',
    badgeBg: '#DB2777',
    badgeText: '#FFFFFF',
    greetingColor: '#1F2937',
    bodyColor: '#374151',
    signatureColor: '#DB2777',
    bevelColor: 0xec4899,
    polaroidFrame: '#FFF7ED',
    polaroidPin: 0xf97316,
    captionBg: '#FFF7ED',
    captionText: '#1F2937',
    captionGlyph: '🎉',
    letterBg: 'linear-gradient(180deg, #FFFFFF 0%, #FFF7ED 55%, #FFE8CC 100%)',
    letterBorder: '#FED7AA',
    letterBadgeBg: '#FFE4E6',
    letterBadgeText: '#DB2777',
    letterPattern:
      'radial-gradient(circle at 18% 22%, rgba(236,72,153,0.14) 0 4px, transparent 5px), radial-gradient(circle at 80% 18%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 65% 80%, rgba(234,179,8,0.18) 0 4px, transparent 5px)',
    letterDividerColor: '#FED7AA',
  },
  elegant: {
    paper: ['#FFFFFF', '#FAFAFA', '#F4F4F5', '#E4E4E7'],
    frameStyle: 'hairline',
    frameOuter: '#27272A',
    frameInner: '#D4AF37',
    frameWidth: 6,
    cornerGlyph: '🤍',
    dividerGlyph: '—',
    dividerStyle: 'rule',
    dividerColor: '#A1A1AA',
    badgeStyle: 'tag',
    badgeBg: '#27272A',
    badgeText: '#F5D78E',
    greetingColor: '#18181B',
    bodyColor: '#3F3F46',
    signatureColor: '#27272A',
    bevelColor: 0xd4af37,
    polaroidFrame: '#FAFAFA',
    polaroidPin: 0xd4af37,
    captionBg: '#FAFAFA',
    captionText: '#18181B',
    captionGlyph: '🤍',
    letterBg: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 55%, #F4F4F5 100%)',
    letterBorder: '#E4E4E7',
    letterBadgeBg: '#F4F4F5',
    letterBadgeText: '#27272A',
    letterPattern:
      'repeating-linear-gradient(135deg, rgba(39,39,42,0.045) 0 1px, transparent 1px 14px)',
    letterDividerColor: '#E4E4E7',
  },
  festive: {
    paper: ['#FFFFFF', '#FFFEF7', '#FEF2F2', '#FEE2E2'],
    frameStyle: 'plaid',
    frameOuter: '#15803D',
    frameInner: '#DC2626',
    frameWidth: 20,
    cornerGlyph: '❄️',
    dividerGlyph: '❄️',
    dividerStyle: 'ornament',
    dividerColor: '#15803D',
    badgeStyle: 'pill',
    badgeBg: '#DC2626',
    badgeText: '#FFFFFF',
    greetingColor: '#14532D',
    bodyColor: '#1F2937',
    signatureColor: '#15803D',
    bevelColor: 0xdc2626,
    polaroidFrame: '#FFFEF7',
    polaroidPin: 0xdc2626,
    captionBg: '#FFFEF7',
    captionText: '#14532D',
    captionGlyph: '❄️',
    letterBg: 'linear-gradient(180deg, #FFFFFF 0%, #FFFEF7 50%, #FEF2F2 100%)',
    letterBorder: '#FECACA',
    letterBadgeBg: '#FEE2E2',
    letterBadgeText: '#DC2626',
    letterPattern:
      'repeating-linear-gradient(45deg, rgba(220,38,38,0.07) 0 6px, transparent 6px 18px), repeating-linear-gradient(-45deg, rgba(21,128,61,0.07) 0 6px, transparent 6px 18px)',
    letterDividerColor: '#FECACA',
  },
};
