import React from 'react';
import { GIFT_GUIDES } from '../../../data/guides';
import { Reveal } from './Reveal';
import { ArrowRight, BookOpen } from 'lucide-react';

export const GiftTipsSection: React.FC = () => (
  <section aria-labelledby="gift-tips-title" className="relative bg-white">
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6D28D9]">
              <BookOpen className="h-3 w-3" />
              Gift guides
            </span>
            <h2
              id="gift-tips-title"
              className="mt-4 text-3xl font-extrabold tracking-tight text-[#1E1B4B] text-balance sm:text-4xl"
            >
              Gift Ideas and Tips
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B7280] sm:text-base">
              Thoughtful ideas for birthdays, anniversaries and the people you miss.
            </p>
          </div>
          <a
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-bold text-[#6D28D9] transition-colors hover:text-[#5B21B6] sm:self-auto"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {GIFT_GUIDES.slice(0, 3).map((guide, i) => (
          <Reveal key={guide.path} delay={i * 0.08}>
            <a
              href={guide.path}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#EAE4F9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_24px_50px_-30px_rgba(109,40,217,0.6)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE9FE]">
                <img
                  src={guide.image}
                  alt={guide.alt}
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={563}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#6D28D9] backdrop-blur">
                  {guide.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-extrabold leading-snug tracking-tight text-[#1E1B4B] transition-colors group-hover:text-[#6D28D9]">
                  {guide.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                  {guide.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center justify-between border-t border-zinc-100 pt-3 text-xs font-semibold">
                  <span className="text-zinc-400">{guide.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-[#6D28D9]">
                    Read guide
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
