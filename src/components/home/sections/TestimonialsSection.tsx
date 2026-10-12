import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const TESTIMONIALS = [
  {
    quote:
      'I sent one on my sister\u2019s birthday and she called me crying. The voice note did it — she replayed it four times.',
    name: 'Ayesha K.',
    meta: 'Birthday · London',
    emoji: '🎂',
    grad: 'linear-gradient(135deg,#F472B6,#A855F7)',
  },
  {
    quote:
      'Better than any sticker. The box opening in 3D made our whole group chat jealous, and three friends made one the same week.',
    name: 'Daniel R.',
    meta: 'Graduation · Toronto',
    emoji: '🎓',
    grad: 'linear-gradient(135deg,#FBBF24,#F472B6)',
  },
  {
    quote:
      'We made one for our anniversary in two minutes and it looked like a designer spent a day on it. No app needed for my parents either.',
    name: 'Priya & Sam',
    meta: 'Anniversary · Mumbai',
    emoji: '🥂',
    grad: 'linear-gradient(135deg,#60A5FA,#A855F7)',
  },
];

export const TestimonialsSection: React.FC = () => (
  <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24">
    <Reveal>
      <SectionHeading
        eyebrow="Real reactions"
        title={
          <>
            The screenshots they send{' '}
            <span className="bg-gradient-to-r from-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
              after
            </span>{' '}
            opening.
          </>
        }
        subtitle="Birthdays, graduations, anniversaries — and plenty of just-because."
      />
    </Reveal>

    <div className="mt-12 grid gap-5 md:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.1}>
          <figure className="relative h-full rounded-3xl border border-[#E4E4E7] bg-white p-6 shadow-xs hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(244,114,182,0.6)] transition-all duration-300">
            <Quote className="w-7 h-7 text-violet-200 fill-violet-100" />
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="mt-3 text-sm text-zinc-600 leading-relaxed">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-zinc-100 flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-full text-sm"
                style={{ background: t.grad }}
              >
                {t.emoji}
              </span>
              <span>
                <span className="block text-sm font-extrabold text-[#18181B]">{t.name}</span>
                <span className="block text-[11px] text-zinc-400 font-medium">{t.meta}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </section>
);
