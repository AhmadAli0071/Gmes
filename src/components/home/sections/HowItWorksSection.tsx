import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Reveal } from './Reveal';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    n: '1',
    title: 'Add your memories',
    body: 'Upload photos, record a voice note and type a heartfelt message.',
  },
  {
    n: '2',
    title: 'Choose a gift box',
    body: 'Pick a design that fits the occasion, from birthdays to anniversaries.',
  },
  {
    n: '3',
    title: 'Share one link',
    body: 'Send it on WhatsApp, text or email. They tap the link and unwrap it.',
  },
];

export const HowItWorksSection: React.FC = () => {
  const { openCreator } = useApp();

  return (
    <section className="relative overflow-hidden bg-[#FAF7FF]" aria-labelledby="how-it-works-title">
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="how-it-works-title"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E1B4B] text-balance"
            >
              How to Send a Virtual Gift in 3 Easy Steps
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
              From idea to unwrapping in about a minute.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-[#EAE4F9] bg-white p-6 shadow-[0_18px_40px_-32px_rgba(30,27,75,0.45)]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-sm font-bold text-white">
                  {step.n}
                </span>
                <h3 className="mt-4 text-base font-extrabold tracking-tight text-[#1E1B4B]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-9">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openCreator()}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F0479B] px-7 py-3 text-sm font-bold text-white shadow-[0_16px_38px_-16px_rgba(240,71,155,0.8)] transition-all hover:-translate-y-0.5 hover:brightness-110 cursor-pointer"
            >
              Start Creating
            </button>
            <a
              href="/how-it-works"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#6D28D9] hover:text-[#5B21B6] transition-colors"
            >
              Full guide
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
