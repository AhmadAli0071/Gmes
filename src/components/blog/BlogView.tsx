import React from 'react';
import { GIFT_GUIDES } from '../../data/guides';
import { SiteFooter } from '../navigation/SiteFooter';
import { ArrowRight, BookOpen } from 'lucide-react';

export const BlogView: React.FC = () => (
  <div className="min-h-screen bg-[#FAF7FF]">
    <section className="relative overflow-hidden border-b border-[#EAE4F9] bg-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#8B5CF6]/10 blur-[90px]" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6D28D9]">
          <BookOpen className="h-3 w-3" />
          Gift guides
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-[#1E1B4B] text-balance sm:text-5xl">
          Gift Ideas and Tips
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6B7280] sm:text-base">
          Practical ideas for birthdays, anniversaries, Valentine&apos;s Day, long distance
          relationships and the holidays — all built around photos, your voice and a message
          that lasts.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2">
        {GIFT_GUIDES.map((guide) => (
          <a
            key={guide.path}
            href={guide.path}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#EAE4F9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_28px_60px_-36px_rgba(109,40,217,0.55)] sm:flex-row"
          >
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[#EDE9FE] sm:aspect-auto sm:w-52">
                <img
                  src={guide.image}
                  alt={guide.alt}
                  loading="eager"
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
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-extrabold leading-snug tracking-tight text-[#1E1B4B] transition-colors group-hover:text-[#6D28D9]">
                  {guide.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
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
        ))}
      </div>
    </section>

    <SiteFooter />
  </div>
);
