import React from 'react';
import { AnimatedBackdrop } from './AnimatedBackdrop';
import { HeroSection } from './sections/HeroSection';
import { OccasionMarquee } from './sections/OccasionMarquee';
import { EventBanner } from './sections/EventBanner';
import { FeaturesSection } from './sections/FeaturesSection';
import { GiftIdeasSection } from './sections/GiftIdeasSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { TemplatesSection } from './sections/TemplatesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FaqSection } from './sections/FaqSection';
import { FinalCtaSection } from './sections/FinalCtaSection';
import { Heart } from 'lucide-react';

const PRODUCT_LINKS: { label: string; href: string }[] = [
  { label: 'Gift designs & templates', href: '#/explore' },
  { label: 'How to send a virtual gift', href: '#/how-it-works' },
  { label: 'Pricing — free & Premium gifts', href: '#/pricing' },
];

const OCCASION_LINKS: { label: string; href: string }[] = [
  { label: 'Birthday gifts online', href: '#/explore' },
  { label: "Valentine's Day virtual gift", href: '#/explore' },
  { label: 'Anniversary gift with voice note', href: '#/explore' },
  { label: 'Long distance gift ideas', href: '#/explore' },
  { label: 'Christmas digital gift card', href: '#/explore' },
  { label: 'Graduation surprise', href: '#/explore' },
];

const KNOW_LINKS: { label: string; href: string }[] = [
  { label: 'Free to start — no card needed', href: '#/pricing' },
  { label: 'They need no app and no account', href: '#/how-it-works' },
  { label: 'Works on any phone or laptop', href: '#/how-it-works' },
  { label: 'Sent as a single shareable link', href: '#/how-it-works' },
];

export const HomeView: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAFAF9] flex flex-col justify-between">
      <AnimatedBackdrop />

      <div className="relative z-10">
        <HeroSection />
        <OccasionMarquee />
        <EventBanner />
        <FeaturesSection />
        <GiftIdeasSection />
        <HowItWorksSection />
        <TemplatesSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 bg-[#0E0724] border-t border-white/10 px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-sm font-black">
                  G
                </span>
                <span className="font-extrabold text-lg text-white tracking-tight">GEMS</span>
              </div>
              <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-xs">
                Send a virtual gift online: a 3D digital gift box holding your photos, a voice
                note and your message — one link, no app, made in under 60 seconds.
              </p>
              <p className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                Made with <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> for
                gifters
              </p>
            </div>

            <nav aria-label="Product">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                Product
              </h4>
              <ul className="mt-4 space-y-2.5">
                {PRODUCT_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/65 hover:text-white hover:translate-x-0.5 transition-all inline-block"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Gift ideas by occasion">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                Gift ideas
              </h4>
              <ul className="mt-4 space-y-2.5">
                {OCCASION_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/65 hover:text-white hover:translate-x-0.5 transition-all inline-block"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Good to know">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                Good to know
              </h4>
              <ul className="mt-4 space-y-2.5">
                {KNOW_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/65 hover:text-white hover:translate-x-0.5 transition-all inline-block"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <span>
              © {new Date().getFullYear()} GEMS — free virtual gift box maker. All rights
              reserved.
            </span>
            <span className="flex items-center gap-1.5">
              🎁 36 designs · 12 occasions · 5 moods
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
