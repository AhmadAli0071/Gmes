import React from 'react';
import { useApp } from '../../../context/AppContext';
import { GIFT_IDEAS } from '../../../data/seoContent';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { ArrowRight } from 'lucide-react';

/**
 * Long-tail landing copy: one card per high-intent search phrase
 * ("birthday gift online", "long distance gift", …) that links straight into
 * the creator with that occasion pre-selected.
 */
export const GiftIdeasSection: React.FC = () => {
  const { openCreator, setSelectedEventSlug } = useApp();

  const handleStart = (slug: (typeof GIFT_IDEAS)[number]['eventSlug']) => {
    setSelectedEventSlug(slug);
    openCreator({ eventSlug: slug });
  };

  return (
    <section
      id="gift-ideas"
      aria-labelledby="gift-ideas-title"
      className="relative overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF5FF]/80 to-transparent" />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Virtual gift ideas"
            title={
              <span id="gift-ideas-title">
                A virtual gift for{' '}
                <span className="bg-gradient-to-r from-[#6D28D9] to-fuchsia-500 bg-clip-text text-transparent">
                  every occasion
                </span>
                .
              </span>
            }
            subtitle="Stuck on what to send? These are the personalized digital gifts people search for most — each one opens the creator with the occasion already picked, so you are one photo away from sending it."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GIFT_IDEAS.map((idea, i) => (
            <Reveal key={idea.title} delay={(i % 3) * 0.08}>
              <a
                href="#/create"
                onClick={(event) => {
                  event.preventDefault();
                  handleStart(idea.eventSlug);
                }}
                className="group flex h-full flex-col rounded-3xl border border-[#E4E4E7] bg-white p-6 shadow-xs hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-[0_30px_60px_-28px_rgba(109,40,217,0.55)] transition-all duration-300"
              >
                <span
                  aria-hidden
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#F5F3FF] to-[#FCE7F3] text-2xl shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                >
                  {idea.emoji}
                </span>

                <h3 className="mt-5 text-base font-extrabold text-[#18181B] tracking-tight">
                  {idea.title}
                </h3>
                <p className="mt-2 text-sm text-[#71717A] leading-relaxed flex-1">{idea.body}</p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#6D28D9] group-hover:gap-2.5 transition-all">
                  Start this gift
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 mx-auto max-w-3xl text-center text-sm text-[#71717A] leading-relaxed">
            Whether it is a birthday gift online, an anniversary voice note, a graduation
            surprise or a just-because digital greeting card, the format is the same: photos,
            your voice and your words, wrapped in a 3D box and delivered as a single link that
            opens on any phone — no app, no account, no delivery cut-off.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
