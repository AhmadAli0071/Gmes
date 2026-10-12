import React from 'react';
import { useApp } from '../../../context/AppContext';
import { EventSlug } from '../../../types';

const OCCASIONS: { slug: EventSlug; name: string; emoji: string }[] = [
  { slug: 'birthday', name: 'Birthday', emoji: '🎂' },
  { slug: 'valentines', name: "Valentine's", emoji: '❤️' },
  { slug: 'christmas', name: 'Christmas', emoji: '🎄' },
  { slug: 'anniversary', name: 'Anniversary', emoji: '🥂' },
  { slug: 'graduation', name: 'Graduation', emoji: '🎓' },
  { slug: 'wedding', name: 'Wedding', emoji: '💍' },
  { slug: 'halloween', name: 'Halloween', emoji: '🎃' },
  { slug: 'mothers-day', name: "Mother's Day", emoji: '💐' },
  { slug: 'fathers-day', name: "Father's Day", emoji: '👨' },
];

export const OccasionMarquee: React.FC = () => {
  const { openCreator, setSelectedEventSlug } = useApp();

  const handleStartGift = (occasionSlug: EventSlug) => {
    setSelectedEventSlug(occasionSlug);
    openCreator({ eventSlug: occasionSlug });
  };

  const pills = OCCASIONS.map((o) => (
    <button
      key={o.slug}
      type="button"
      onClick={() => handleStartGift(o.slug)}
      aria-label={`Start a ${o.name} gift`}
      className="inline-flex items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-5 py-2.5 text-xs font-bold text-zinc-700 shadow-xs hover:border-[#A78BFA] hover:bg-[#F5F3FF] hover:text-[#6D28D9] transition-colors cursor-pointer whitespace-nowrap"
    >
      <span className="text-base leading-none" aria-hidden>
        {o.emoji}
      </span>
      <span>{o.name}</span>
      <span className="text-[#A78BFA]" aria-hidden>
        →
      </span>
    </button>
  ));

  return (
    <section className="relative overflow-hidden border-b border-[#E4E4E7] bg-white/70 backdrop-blur-sm py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee">
          <div className="flex gap-3 pr-3">{pills}</div>
          <div className="flex gap-3 pr-3" aria-hidden>
            {pills}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
        One link · Any occasion · Works on every phone
      </p>
    </section>
  );
};
