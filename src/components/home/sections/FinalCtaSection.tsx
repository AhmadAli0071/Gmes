import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Reveal } from './Reveal';
import { Sparkles, ArrowRight, PartyPopper } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { openCreator, setCurrentView } = useApp();

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] px-6 py-14 sm:px-14 sm:py-20 text-center shadow-[0_40px_90px_-40px_rgba(109,40,217,0.8)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(120deg, #4C1D95 0%, #7C3AED 38%, #C026D3 72%, #F59E0B 120%)',
            }}
          />
          <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/25 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-28 -right-10 h-72 w-72 rounded-full bg-amber-300/40 blur-[90px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              maskImage: 'radial-gradient(ellipse at 50% 50%, #000 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 20%, transparent 75%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 grain opacity-40" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 backdrop-blur px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              <PartyPopper className="w-3.5 h-3.5" />
              It takes 60 seconds
            </span>

            <h2 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
              Someone is waiting for
              <br className="hidden sm:block" /> their surprise.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-white/80 max-w-md mx-auto">
              Make the box, drop the memories, share one link. Free to start, no app
              required.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openCreator()}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-[#4C1D95] bg-white hover:bg-amber-100 rounded-xl shadow-[0_20px_50px_-15px_rgba(255,255,255,0.7)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Create a Gift</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => setCurrentView('explore')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md rounded-xl transition-colors cursor-pointer"
              >
                Browse all designs
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
