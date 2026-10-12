import React from 'react';
import { Box, Layers, Mic, Zap } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const FEATURES = [
  {
    icon: Box,
    title: '3D unboxing reveal',
    body: 'Ribbon unties, lid lifts and confetti pops. It feels like handing them a real present.',
    tint: 'from-violet-500 to-fuchsia-500',
  },
  {
    icon: Layers,
    title: 'Mood-matched cards',
    body: 'Pick magical, romantic, playful, elegant or festive — art, palette and fonts change with it.',
    tint: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Mic,
    title: 'Voice note inside',
    body: 'Record 20 seconds so they hear your voice, not just another typed message.',
    tint: 'from-amber-400 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Sent in 60 seconds',
    body: 'One shareable link. No app, no account for them — it just opens and unwraps.',
    tint: 'from-sky-500 to-violet-500',
  },
];

export const FeaturesSection: React.FC = () => (
  <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24">
    <Reveal>
      <SectionHeading
        eyebrow="Why GEMS"
        title={
          <>
            Everything a WhatsApp sticker{' '}
            <span className="bg-gradient-to-r from-[#6D28D9] to-fuchsia-500 bg-clip-text text-transparent">
              isn't
            </span>
            .
          </>
        }
        subtitle="Photos, a voice note, music and motion wrapped into one link — everything a digital gift should be, and nothing it shouldn't."
      />
    </Reveal>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((f, i) => {
        const Icon = f.icon;
        return (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="group h-full rounded-3xl border border-[#E4E4E7] bg-white p-6 shadow-xs hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(109,40,217,0.55)] hover:border-violet-200 transition-all duration-300">
              <div
                className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.tint} shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
              >
                <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-base font-extrabold text-[#18181B] tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[#71717A] leading-relaxed">{f.body}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);
