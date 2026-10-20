import React from 'react';
import { useApp } from '../../../context/AppContext';
import { EventSlug } from '../../../types';
import { Reveal } from './Reveal';

const OCCASIONS: {
  emoji: string;
  title: string;
  body: string;
  slug: EventSlug;
  href: string;
}[] = [
  {
    emoji: '🎂',
    title: 'Birthday',
    body: 'Make their birthday unforgettable',
    slug: 'birthday',
    href: '/virtual-birthday-gift',
  },
  {
    emoji: '🥂',
    title: 'Anniversary',
    body: 'Relive your best moments together',
    slug: 'anniversary',
    href: '/anniversary-digital-gift',
  },
  {
    emoji: '💌',
    title: "Valentine's Day",
    body: 'Say it with photos and your own voice',
    slug: 'valentines',
    href: '/valentines-day-virtual-gift',
  },
  {
    emoji: '🌷',
    title: "Mother's and Father's Day",
    body: 'Show your parents they matter',
    slug: 'mothers-day',
    href: '/create',
  },
  {
    emoji: '🎓',
    title: 'Graduation and Congratulations',
    body: 'Celebrate every big win',
    slug: 'graduation',
    href: '/create',
  },
  {
    emoji: '💍',
    title: 'Wedding',
    body: 'A keepsake for the happy couple',
    slug: 'wedding',
    href: '/create',
  },
  {
    emoji: '🙏',
    title: 'Thank You',
    body: 'Say thanks in a way they remember',
    slug: 'thank-you',
    href: '/create',
  },
  {
    emoji: '🎄',
    title: 'Christmas',
    body: 'Unwrap the holidays together',
    slug: 'christmas',
    href: '/create',
  },
];

export const GiftIdeasSection: React.FC = () => {
  const { openCreator, setSelectedEventSlug } = useApp();

  const handleStart = (slug: EventSlug) => {
    setSelectedEventSlug(slug);
    openCreator({ eventSlug: slug });
  };

  return (
    <section
      id="gift-ideas"
      aria-labelledby="gift-ideas-title"
      className="relative scroll-mt-24 bg-white"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="gift-ideas-title"
              className="text-3xl font-extrabold tracking-tight text-[#1E1B4B] text-balance sm:text-4xl"
            >
              A Digital Gift for Every Occasion
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280] sm:text-base">
              Whether it is a birthday surprise or a thank you from far away, there is a GEMS
              gift box for the moment.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((occasion, i) => (
            <Reveal key={occasion.title} delay={(i % 4) * 0.06}>
              <a
                href={occasion.href}
                onClick={
                  occasion.href === '/create'
                    ? (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleStart(occasion.slug);
                      }
                    : undefined
                }
                aria-label={
                  occasion.href === '/create'
                    ? `Create a ${occasion.title} gift`
                    : `Read the ${occasion.title} gift guide`
                }
                className="group flex h-full w-full flex-col rounded-2xl border border-[#EAE4F9] bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_24px_50px_-30px_rgba(109,40,217,0.6)]"
              >
                <span
                  aria-hidden
                  className="text-3xl leading-none transition-transform duration-300 group-hover:scale-110"
                >
                  {occasion.emoji}
                </span>
                <h3 className="mt-4 text-[15px] font-extrabold leading-snug tracking-tight text-[#1E1B4B]">
                  {occasion.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                  {occasion.body}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
