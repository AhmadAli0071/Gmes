import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventSlug, GiftData } from '../../types';
import { getEventBySlug } from '../../data/events';
import { MOOD_THEMES, moodCssVars } from '../../data/moodThemes';
import { GiftBoxReveal } from '../giftbox/GiftBoxReveal';
import { buildRevealGift } from '../giftbox/buildRevealGift';
import { Sparkles, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';

interface RecipientViewProps {
  gift?: GiftData | null;
}

/** The reveal's own backdrop - kept in sync with `gift-box-reveal.css`. */
const REVEAL_BG =
  'radial-gradient(120% 90% at 50% 100%,#5b2a8f 0%,#2a1861 40%,#120c33 100%) #120c33';

/** Occasions where "Happy <name>" reads wrong - use an occasion-specific line. */
const GREETING_LABEL: Partial<Record<EventSlug, string>> = {
  other: 'Thinking of you',
  wedding: 'Congratulations to the happy couple',
  graduation: 'Congratulations to the graduate',
  'thank-you': 'With heartfelt gratitude',
  congratulations: 'Congratulations',
};

export const RecipientView: React.FC<RecipientViewProps> = ({ gift: propGift }) => {
  const { recipientGift, recipientLoading, closeRecipientView, setCurrentView, startNewGift } = useApp();

  const gift = propGift || recipientGift;

  const [opened, setOpened] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  if (!gift) {
    if (recipientLoading) {
      return (
        <div className="min-h-screen bg-[#120c33] flex flex-col items-center justify-center gap-4 text-center">
          <span
            className="h-9 w-9 rounded-full border-2 border-violet-300/40 border-t-violet-200 animate-spin"
            role="status"
            aria-label="Loading gift"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-200/70">
            Fetching your gift…
          </p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center p-6 text-center">
        <Sparkles className="w-10 h-10 text-[#6D28D9] mb-3" aria-hidden />
        <h2 className="text-xl font-bold text-zinc-900">No gift found</h2>
        <p className="mt-2 text-sm text-zinc-500 max-w-xs">
          This share link is invalid or the gift was created in a different browser.
        </p>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-4 px-4 py-2 bg-[#6D28D9] text-white text-xs font-semibold rounded-xl cursor-pointer"
        >
          Go to GEMS
        </button>
      </div>
    );
  }

  const eventTheme = getEventBySlug(gift.eventSlug || 'birthday');
  const recipientName = gift.recipientName || 'Sarah';
  const senderName = gift.senderName || 'Ahmad';

  const greetingLabel = GREETING_LABEL[gift.eventSlug] || `Happy ${eventTheme.name}`;

  const revealGift = buildRevealGift(gift, {
    title: `${greetingLabel}, ${recipientName} ❤️`,
    subtitle: `Made with love by ${senderName}.`,
  });

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden selection:bg-[#ff4f8b]/40"
      style={{
        background: REVEAL_BG,
        color: '#fff',
        ...moodCssVars(MOOD_THEMES[gift.mood || 'magical']),
      }}
    >
      {/* Top Floating Mini-Bar */}
      <header className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between z-40 bg-black/25 backdrop-blur-md border-b border-white/10 shrink-0">
        <button
          onClick={closeRecipientView}
          className="p-2.5 text-white/70 hover:text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close gift"
        >
          <X className="w-5 h-5" aria-hidden />
        </button>

        <span className="inline-flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
          <span className="text-xs leading-none" aria-hidden>
            {eventTheme.emoji}
          </span>
          {eventTheme.name}
        </span>

        <div className="flex items-center gap-2">
          {opened && (
            <button
              onClick={() => setOpened(false)}
              className="p-2.5 text-white/80 hover:text-white rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-2xs transition-colors cursor-pointer"
              title="Replay gift unboxing"
              aria-label="Replay gift unboxing"
            >
              <RotateCcw className="w-4 h-4" aria-hidden />
            </button>
          )}

          <button
            onClick={toggleSound}
            className="p-2.5 text-white/80 hover:text-white rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-2xs transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute voice note' : 'Unmute voice note'}
            aria-label={soundEnabled ? 'Mute voice note' : 'Unmute voice note'}
            aria-pressed={!soundEnabled}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#ffc95c]" aria-hidden />
            ) : (
              <VolumeX className="w-4 h-4 text-white/50" aria-hidden />
            )}
          </button>
        </div>
      </header>

      {/* Main Experience - one mounted reveal for the whole flow. */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center px-3 py-5">
          <GiftBoxReveal
            variant="bare"
            className="w-full max-w-md"
            gift={revealGift}
            opened={opened}
            onOpen={() => setOpened(true)}
            onReset={() => setOpened(false)}
            muted={!soundEnabled}
          />
        </div>
      </main>

      {/* Recipient Experience Viral Growth Footer */}
      <footer className="w-full py-5 px-4 text-center z-40 bg-black/25 backdrop-blur-md border-t border-white/10 shrink-0">
        <div className="max-w-md mx-auto flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
          <div className="text-center sm:text-left">
            <span className="font-bold text-white block">Make someone smile today</span>
            <span className="text-[11px] text-white/60">
              Send an interactive digital gift in 60s.
            </span>
          </div>

          <button
            onClick={() => startNewGift()}
            className="px-4 py-2.5 bg-[#ff4f8b] hover:bg-[#d92f72] text-white font-semibold rounded-xl shadow-xs transition-transform hover:scale-105 cursor-pointer whitespace-nowrap min-h-[44px] w-full sm:w-auto"
          >
            Create your own GEMS →
          </button>
        </div>
      </footer>
    </div>
  );
};
