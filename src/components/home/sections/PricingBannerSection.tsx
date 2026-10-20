import React from 'react';
import { Reveal } from './Reveal';

export const PricingBannerSection: React.FC = () => (
  <section className="bg-white px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
    <Reveal>
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12"
        style={{
          background: 'linear-gradient(100deg, #7C3FEC 0%, #9D4EDD 38%, #E2469F 100%)',
        }}
      >
        <div className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-white/15 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-28 -right-10 h-64 w-64 rounded-full bg-amber-200/20 blur-[90px]" />

        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            Free to Start, Simple to Upgrade
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Create your first gift for free. Upgrade only if you want premium templates, HD
            unboxing animations or unlimited gifts.
          </p>
          <a
            href="/pricing"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#6D28D9] transition-all hover:-translate-y-0.5 hover:bg-[#F5F3FF]"
          >
            See Pricing
          </a>
        </div>
      </div>
    </Reveal>
  </section>
);
