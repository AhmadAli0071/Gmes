import React, { useMemo, useState } from 'react';
import { BLOG_POSTS, sortNewestFirst } from '../../data/guides';
import { SiteFooter } from '../navigation/SiteFooter';
import { PageHero } from '../common/PageHero';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const POSTS_PER_PAGE = 12;

export const BlogView: React.FC = () => {
  const sorted = useMemo(() => sortNewestFirst(BLOG_POSTS), []);
  const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE);
  const [page, setPage] = useState(1);

  const visible = sorted.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#FAF7FF]">
      <PageHero
        label="Gift Guides"
        title="Gift Ideas and Tips"
        subtitle="Practical ideas for birthdays, anniversaries, Valentine's Day, long distance relationships and the holidays - all built around photos, your voice and a message that lasts."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((guide) => (
            <a
              key={guide.path}
              href={guide.path}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#EAE4F9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_28px_60px_-36px_rgba(109,40,217,0.55)]"
            >
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[#EDE9FE]">
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
                  <h2 className="text-base font-extrabold leading-snug tracking-tight text-[#1E1B4B] transition-colors group-hover:text-[#6D28D9]">
                    {guide.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280] line-clamp-3">
                    {guide.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center justify-end border-t border-zinc-100 pt-3 text-xs font-semibold">
                    <span className="inline-flex items-center gap-1 text-[#6D28D9]">
                      Read guide
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </div>
            </a>
          ))}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === 1}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4B5FD] bg-white px-5 py-2.5 text-sm font-bold text-[#6D28D9] transition-colors hover:bg-[#F5F3FF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setPage(n);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-current={page === n ? 'page' : undefined}
                className={`h-10 w-10 rounded-full text-sm font-bold transition-colors ${
                  page === n
                    ? 'bg-[#6D28D9] text-white shadow-[0_10px_24px_-12px_rgba(109,40,217,0.8)]'
                    : 'border border-[#EAE4F9] bg-white text-[#6D28D9] hover:bg-[#F5F3FF]'
                }`}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4B5FD] bg-white px-5 py-2.5 text-sm font-bold text-[#6D28D9] transition-colors hover:bg-[#F5F3FF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </section>

      <SiteFooter />
    </div>
  );
};
