import React from 'react';
import { useApp } from '../../../context/AppContext';
import { EventSlug } from '../../../types';
import { Reveal } from './Reveal';

export const EventBanner: React.FC = () => {
  const { activeEvent, setSelectedEventSlug, openCreator } = useApp();

  const handleStartGift = (occasionSlug: EventSlug) => {
    setSelectedEventSlug(occasionSlug);
    openCreator({ eventSlug: occasionSlug });
  };

  return (
    <section className="px-4 sm:px-6 max-w-4xl mx-auto pt-10 sm:pt-14">
      <Reveal>
        <div
          className="rounded-3xl p-4 sm:p-5 border shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors"
          style={{
            backgroundColor: activeEvent.subtleAccentBg,
            borderColor: `${activeEvent.primaryAccent}33`,
          }}
        >
          <div className="flex items-center gap-3 text-left">
            <span className="text-3xl p-2.5 bg-white rounded-2xl shadow-2xs">
              {activeEvent.emoji}
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Trending now · {activeEvent.name}
              </span>
              <p className="text-sm font-bold text-zinc-900">{activeEvent.heroTitle}</p>
            </div>
          </div>

          <button
            onClick={() => handleStartGift(activeEvent.slug)}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-2xs hover:opacity-90 hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer shrink-0"
            style={{ backgroundColor: activeEvent.primaryAccent }}
          >
            {activeEvent.callToAction} →
          </button>
        </div>
      </Reveal>
    </section>
  );
};
