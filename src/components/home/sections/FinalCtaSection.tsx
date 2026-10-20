import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Reveal } from './Reveal';

export const FinalCtaSection: React.FC = () => {
  const { openCreator } = useApp();

  return (
    <section
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      style={{
        background: 'linear-gradient(110deg, #120C33 0%, #1B104C 45%, #311986 100%)',
      }}
      aria-labelledby="final-cta-title"
    >
      <div className="pointer-events-none absolute -top-28 right-1/4 h-72 w-72 rounded-full bg-[#6D3DF5]/30 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-[110px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            id="final-cta-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance"
          >
            Ready to Surprise Someone?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/75">
            Make a gift they will remember in under 60 seconds.
          </p>
          <button
            onClick={() => openCreator()}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F0479B] px-8 py-3.5 text-sm font-bold text-white shadow-[0_18px_45px_-16px_rgba(240,71,155,0.8)] transition-all hover:-translate-y-0.5 hover:brightness-110 cursor-pointer"
          >
            Create Your Gift Free
          </button>
        </Reveal>
      </div>
    </section>
  );
};
