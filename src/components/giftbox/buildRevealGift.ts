import type { GiftData } from '../../types';
import type { RevealGift, RevealStep } from './types';

const fmt = (seconds?: number) => {
  const total = Math.max(0, Math.round(seconds || 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

interface BuildOptions {
  /** Shown in the heading after the box opens. */
  title?: string;
  subtitle?: string;
}

/**
 * Maps a GEMS `GiftData` record onto the step deck the reveal expects:
 * message → note, photos → polaroid pile, voice note → player, video → player.
 * Steps with no content are simply omitted.
 */
export function buildRevealGift(
  gift: Partial<GiftData>,
  options: BuildOptions = {}
): RevealGift {
  const recipient = gift.recipientName?.trim() || 'Someone Special';
  const sender = gift.senderName?.trim() || 'A friend';
  const photos = gift.photos || [];

  const steps: RevealStep[] = [];

  steps.push({
    type: 'note',
    text:
      gift.message?.trim() ||
      'Wishing you endless joy, laughter, and sweet moments today and always!',
    signature: `Love, ${sender}`,
  });

  if (photos.length > 0) {
    steps.push({
      type: 'photos',
      photos: photos.map((src, i) => ({ src, caption: `Memory ${i + 1}` })),
    });
  }

  if (gift.voiceNoteUrl) {
    steps.push({
      type: 'voices',
      voices: [
        {
          name: sender,
          duration: fmt(gift.voiceNoteDuration),
          src: gift.voiceNoteUrl,
        },
      ],
    });
  }

  if (gift.videoUrl) {
    steps.push({
      type: 'videos',
      videos: [{ title: 'A video for you', src: gift.videoUrl }],
    });
  }

  return {
    recipient,
    sender,
    title: options.title,
    subtitle: options.subtitle,
    steps,
  };
}
