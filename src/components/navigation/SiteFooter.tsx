import React from 'react';
import { Heart } from 'lucide-react';

const PRODUCT_LINKS: { label: string; href: string }[] = [
  { label: 'Gift designs & templates', href: '/explore' },
  { label: 'How to send a virtual gift', href: '/how-it-works' },
  { label: 'Gift ideas & tips', href: '/blog' },
  { label: 'Pricing: free & Premium gifts', href: '/pricing' },
];

const OCCASION_LINKS: { label: string; href: string }[] = [
  { label: 'Virtual birthday gift', href: '/virtual-birthday-gift' },
  { label: "Valentine's Day virtual gift", href: '/valentines-day-virtual-gift' },
  { label: 'Digital anniversary gift', href: '/anniversary-digital-gift' },
  { label: 'Long distance gift ideas', href: '/long-distance-gift-ideas' },
  { label: 'Christmas digital gift card', href: '/christmas-digital-gift-card' },
];

const KNOW_LINKS: { label: string; href: string }[] = [
  { label: 'Free to start, no card needed', href: '/pricing' },
  { label: 'No app or account needed to open', href: '/how-it-works' },
  { label: 'Works on any phone or laptop', href: '/how-it-works' },
  { label: 'Shared as a single link', href: '/how-it-works' },
];

export const SiteFooter: React.FC = () => (
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
            note and your message. One link, no app, made in under 60 seconds.
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
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/65 hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  {link.label}
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
            {OCCASION_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/65 hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Why GEMS">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
            Why GEMS
          </h4>
          <ul className="mt-4 space-y-2.5">
            {KNOW_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/65 hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  {link.label}
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
        <span className="flex items-center gap-1.5">🎁 36 designs · 12 occasions · 5 moods</span>
      </div>
    </div>
  </footer>
);
