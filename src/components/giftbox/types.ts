export interface RevealPhoto {
  src?: string;
  caption?: string;
  note?: string;
}

export interface RevealVoice {
  name: string;
  duration?: string;
  src?: string;
}

export interface RevealVideo {
  title: string;
  src?: string;
  poster?: string;
}

export type RevealStep =
  | { type: 'note'; title?: string; text: string; signature?: string }
  | { type: 'photos'; title?: string; photos: RevealPhoto[] }
  | { type: 'voices'; title?: string; voices: RevealVoice[] }
  | { type: 'videos'; title?: string; videos: RevealVideo[] };

export interface RevealGift {
  recipient: string;
  sender: string;
  title?: string;
  subtitle?: string;
  steps: RevealStep[];
}

export interface Reaction {
  emoji: string;
  label: string;
}

/** Lifecycle of the 3D box itself. */
export type GiftPhase = 'closed' | 'shake' | 'open' | 'done';

/** Where the reveal is rendered — controls only its backdrop and height. */
export type RevealVariant = 'page' | 'card' | 'bare';
