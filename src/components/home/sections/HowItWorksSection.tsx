import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Pick a design',
    body: 'Start from 36 gift designs across 12 occasions — or a blank box and make it yours.',
  },
  {
    n: '02',
    title: 'Add your magic',
    body: 'Drop in photos, record a voice note, write the message and choose the mood.',
  },
  {
    n: '03',
    title: 'Send the link',
    body: 'They tap once and watch it unwrap — no account, no app, pure surprise.',
  },
];

export const HowItWorksSection: React.FC = () => {
  const { openCreator } = useApp();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F3FF]/70 to-transparent" />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps. One happy person."
            subtitle="No design skills, no downloads, no last-minute panic."
          />
        </Reveal>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          {/* connector */}
          <div className="hidden md:block absolute top-9 left-[16%] right-[16%] h-px bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300" />

          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="relative">
              <div className="text-center">
                <div className="mx-auto grid h-18 w-18 place-items-center rounded-3xl bg-gradient-to-br from-[#6D28D9] to-fuchsia-500 text-white text-xl font-extrabold shadow-[0_20px_45px_-18px_rgba(109,40,217,0.9)] ring-8 ring-white">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-[#18181B] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[#71717A] leading-relaxed max-w-xs mx-auto">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <button
            onClick={() => openCreator()}
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-[0_18px_40px_-16px_rgba(109,40,217,0.9)] transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start your first gift</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};
