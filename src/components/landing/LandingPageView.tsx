import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getLandingPage } from '../../data/landingPages';
import { landingArticleSchema, landingFaqSchema } from '../../data/landingSchema';
import { LandingView } from '../../types';
import { setJsonLd } from '../../lib/seo';
import { SiteFooter } from '../navigation/SiteFooter';
import { Reveal } from '../home/sections/Reveal';
import { ArrowRight, Check, Plus, Sparkles } from 'lucide-react';
import { LANDING_IMAGES } from './landingImages';

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^)]+)\)/g;

/** Renders copy that may contain `[label](/internal-path)` links. */
const RichText: React.FC<{ text: string }> = ({ text }) => {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let index = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <a
        key={`link-${index++}`}
        href={match[2]}
        className="font-semibold text-[#6D28D9] underline decoration-[#C4B5FD] underline-offset-2 transition-colors hover:text-[#5B21B6]"
      >
        {match[1]}
      </a>
    );
    cursor = start + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
};

export const LandingPageView: React.FC<{ slug: LandingView }> = ({ slug }) => {
  const { openCreator, setCurrentView } = useApp();
  const page = getLandingPage(slug);
  const layout = page.layout ?? 'classic';
  const centeredArticle = layout === 'banner' || layout === 'magazine';

  useEffect(() => {
    const faqId = `gems-landing-faq-${page.slug}`;
    const articleId = `gems-landing-article-${page.slug}`;
    const article = landingArticleSchema(page);

    setJsonLd(faqId, landingFaqSchema(page));
    if (article) setJsonLd(articleId, article);

    return () => {
      document.getElementById(faqId)?.remove();
      document.getElementById(articleId)?.remove();
    };
  }, [page]);

  const heroBlobs = (
    <>
      <div className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[#6D3DF5]/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-24 h-[26rem] w-[26rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 20%, #000 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 20%, #000 20%, transparent 75%)',
        }}
      />
    </>
  );

  const heroCopy = (centered: boolean) => (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur">
        <Sparkles className="h-3 w-3 text-amber-300" />
        {page.keyword}
      </span>

      <h1
        id="landing-title"
        className={`mt-6 font-extrabold leading-[1.08] tracking-tight text-white text-balance ${
          centered
            ? 'mx-auto max-w-3xl text-[clamp(2.15rem,5vw,3.6rem)] text-center'
            : 'max-w-2xl text-[clamp(2rem,4vw,3.1rem)]'
        }`}
      >
        {page.h1}
      </h1>

      <p
        className={`mt-5 max-w-2xl text-base leading-relaxed text-white/75 ${
          centered ? 'mx-auto text-center' : ''
        }`}
      >
        {page.intro}
      </p>

      <div
        className={`mt-9 flex flex-col gap-3 sm:flex-row ${
          centered ? 'items-center justify-center' : 'items-stretch sm:items-center'
        }`}
      >
        <button
          onClick={() => openCreator()}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F0479B] px-8 py-3.5 text-sm font-bold text-white shadow-[0_18px_45px_-16px_rgba(240,71,155,0.8)] transition-all hover:-translate-y-0.5 hover:brightness-110 cursor-pointer sm:w-auto"
        >
          <span>Create Your Gift Free</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <button
          onClick={() => setCurrentView('how-it-works')}
          className="inline-flex w-full items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10 cursor-pointer sm:w-auto"
        >
          See How It Works
        </button>
      </div>

      <p
        className={`mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#FBBF24] ${
          centered ? 'justify-center' : ''
        }`}
      >
        <span>Free to start</span>
        <span aria-hidden className="text-[#FBBF24]/50">
          |
        </span>
        <span>No app needed</span>
        <span aria-hidden className="text-[#FBBF24]/50">
          |
        </span>
        <span>Works on any phone</span>
      </p>
    </>
  );

  const hero =
    layout === 'magazine' && page.image ? (
      <section
        className="relative overflow-hidden -mt-[65px]"
        aria-labelledby="landing-title"
      >
        <img
          src={LANDING_IMAGES[page.image.key]}
          alt={page.image.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(18,12,51,0.97) 0%, rgba(18,12,51,0.88) 45%, rgba(42,22,117,0.62) 100%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-[150px] text-center sm:px-6 sm:pt-[170px]">
          {heroCopy(true)}
        </div>
      </section>
    ) : layout === 'split' ? (
      <section
        className="relative overflow-hidden -mt-[65px]"
        style={{
          background: 'linear-gradient(110deg, #120C33 0%, #1B104C 45%, #2A1675 100%)',
        }}
        aria-labelledby="landing-title"
      >
        {heroBlobs}
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-[140px] sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-[150px]">
          <div>{heroCopy(false)}</div>
          {page.image && (
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-white/10 blur-2xl" />
              <img
                src={LANDING_IMAGES[page.image.key]}
                alt={page.image.alt}
                className="relative aspect-[4/3] w-full rounded-[2rem] border border-white/15 object-cover shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
              />
            </div>
          )}
        </div>
      </section>
    ) : (
      <section
        className="relative overflow-hidden -mt-[65px]"
        style={{
          background: 'linear-gradient(110deg, #120C33 0%, #1B104C 45%, #2A1675 100%)',
        }}
        aria-labelledby="landing-title"
      >
        {heroBlobs}
        <div
          className={`relative mx-auto max-w-4xl px-4 text-center sm:px-6 ${
            layout === 'compact' ? 'pb-24 pt-[125px]' : layout === 'soft' ? 'pb-16 pt-[135px]' : 'pb-20 pt-[140px]'
          }`}
        >
          {heroCopy(true)}
          {layout === 'soft' && page.image && (
            <div className="mt-10 flex justify-center">
              <img
                src={LANDING_IMAGES[page.image.key]}
                alt={page.image.alt}
                className="h-40 w-64 rounded-3xl border border-white/25 object-cover shadow-[0_25px_70px_-25px_rgba(0,0,0,0.8)] sm:h-48 sm:w-80"
              />
            </div>
          )}
        </div>
      </section>
    );

  const articleBlocks = (
    <Reveal>
      {page.blocks.map((block, i) => {
        if (block.kind === 'h2') {
          return (
            <h2
              key={i}
              className="mt-10 text-2xl font-extrabold tracking-tight text-[#1E1B4B] first:mt-0 sm:text-[1.75rem]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.kind === 'h3') {
          return (
            <h3 key={i} className="mt-7 text-lg font-extrabold tracking-tight text-[#1E1B4B]">
              {block.text}
            </h3>
          );
        }
        if (block.kind === 'ul') {
          return (
            <ul key={i} className="mt-4 space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#8B5CF6]"
                    strokeWidth={3}
                  />
                  <span className="text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.kind === 'table') {
          return (
            <div key={i} className="mt-5 overflow-x-auto rounded-xl border border-[#EAE4F9]">
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr className="bg-[#FAF7FF]">
                    {block.headers.map((header) => (
                      <th
                        key={header}
                        className="border-b border-[#EAE4F9] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#1E1B4B]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row[0]} className="odd:bg-white even:bg-[#FCFAFF]">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cell}
                          className={`border-b border-[#F1ECFA] px-4 py-3 leading-relaxed text-[#4B5563] ${
                            cellIndex === 0 ? 'font-semibold text-[#1E1B4B]' : ''
                          }`}
                        >
                          <RichText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={i} className="mt-4 text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
            <RichText text={block.text} />
          </p>
        );
      })}
    </Reveal>
  );

  const relatedList = (className: string) => (
    <ul className={className}>
      {page.related.map((link) => (
        <li key={link.path}>
          <a
            href={link.path}
            className="group flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[#1E1B4B] transition-colors hover:bg-[#F5F3FF] hover:text-[#6D28D9]"
          >
            <span>{link.label}</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#A78BFA] transition-transform group-hover:translate-x-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-white">
      {hero}

      {/* Article */}
      <section className="bg-white">
        {layout === 'banner' && page.image && (
          <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
            <img
              src={LANDING_IMAGES[page.image.key]}
              alt={page.image.alt}
              className="h-56 w-full rounded-3xl object-cover shadow-[0_30px_70px_-40px_rgba(30,27,75,0.7)] sm:h-80"
            />
          </div>
        )}

        {layout === 'compact' && page.image && (
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <img
              src={LANDING_IMAGES[page.image.key]}
              alt={page.image.alt}
              className="relative z-10 -mt-16 h-48 w-full rounded-3xl border-4 border-white object-cover shadow-[0_30px_60px_-30px_rgba(30,27,75,0.6)] sm:h-64"
            />
          </div>
        )}

        <div
          className={`mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${
            centeredArticle ? 'max-w-3xl' : 'max-w-6xl'
          }`}
        >
          {centeredArticle ? (
            <article className="min-w-0">
              {articleBlocks}

              <div className="mt-10 rounded-2xl border border-[#EAE4F9] bg-[#FAF7FF] p-6">
                <h2 className="text-xl font-extrabold tracking-tight text-[#1E1B4B]">
                  Make yours in 60 seconds
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  Add photos, record a voice note and write your message - then share one link.
                </p>
                <button
                  onClick={() => openCreator()}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F0479B] px-7 py-3 text-sm font-bold text-white shadow-[0_16px_38px_-16px_rgba(240,71,155,0.8)] cursor-pointer"
                >
                  Create Your Gift Free
                </button>
              </div>

              <nav
                aria-label="Related gift guides"
                className="mt-8 rounded-2xl border border-[#EAE4F9] bg-white p-6"
              >
                <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                  Related gift guides
                </h2>
                {relatedList('mt-3 space-y-1')}
              </nav>
            </article>
          ) : (
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
              <article className="min-w-0">
                {articleBlocks}

                <div className="mt-10 rounded-2xl border border-[#EAE4F9] bg-[#FAF7FF] p-6 lg:hidden">
                  <h2 className="text-xl font-extrabold tracking-tight text-[#1E1B4B]">
                    Make yours in 60 seconds
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                    Add photos, record a voice note and write your message - then share one
                    link.
                  </p>
                  <button
                    onClick={() => openCreator()}
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F0479B] px-7 py-3 text-sm font-bold text-white shadow-[0_16px_38px_-16px_rgba(240,71,155,0.8)] cursor-pointer"
                  >
                    Create Your Gift Free
                  </button>
                </div>

                <nav
                  aria-label="Related gift guides"
                  className="mt-8 rounded-2xl border border-[#EAE4F9] bg-white p-6 lg:hidden"
                >
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                    Related gift guides
                  </h2>
                  {relatedList('mt-3 space-y-1')}
                </nav>
              </article>

              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-5">
                  <div
                    className="relative overflow-hidden rounded-2xl p-6 text-white shadow-[0_22px_50px_-24px_rgba(124,63,236,0.7)]"
                    style={{
                      background:
                        'linear-gradient(145deg, #7C3FEC 0%, #B14BD8 55%, #E2469F 100%)',
                    }}
                  >
                    <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-white/20 blur-[50px]" />
                    <div className="relative">
                      <Sparkles className="h-6 w-6 text-amber-200" />
                      <h2 className="mt-3 text-xl font-extrabold tracking-tight">
                        Send a gift like this
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/85">
                        Photos, a voice note and your message inside one 3D gift box. Ready in
                        under 60 seconds.
                      </p>
                      <button
                        onClick={() => openCreator()}
                        className="mt-5 w-full rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#6D28D9] transition-all hover:-translate-y-0.5 hover:bg-[#F5F3FF] cursor-pointer"
                      >
                        Create Your Gift Free
                      </button>
                      <p className="mt-3 text-center text-[11px] font-medium text-white/70">
                        Free to start · No app needed
                      </p>
                    </div>
                  </div>

                  <nav
                    aria-label="Related gift guides"
                    className="rounded-2xl border border-[#EAE4F9] bg-white p-5"
                  >
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                      Related gift guides
                    </h2>
                    {relatedList('mt-3 space-y-1')}
                    <a
                      href="/how-it-works"
                      className="mt-3 inline-flex items-center gap-1.5 border-t border-zinc-100 px-2 pt-3 text-xs font-bold text-[#6D28D9] transition-colors hover:text-[#5B21B6]"
                    >
                      How GEMS works
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </nav>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-labelledby="landing-faq-title"
        className={`relative overflow-hidden scroll-mt-24 ${
          layout === 'banner' ? 'border-t border-[#EAE4F9] bg-white' : ''
        }`}
        style={
          layout === 'banner'
            ? undefined
            : { background: 'linear-gradient(115deg, #E9E2FA 0%, #FAF8F1 45%, #FAE8F1 100%)' }
        }
      >
        <div
          className={`relative mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${
            layout === 'magazine' ? 'max-w-5xl' : 'max-w-3xl'
          }`}
        >
          <Reveal>
            <h2
              id="landing-faq-title"
              className="text-center text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className={`mt-8 ${layout === 'magazine' ? 'grid gap-3 md:grid-cols-2' : 'space-y-3'}`}>
            {page.faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={Math.min(i * 0.04, 0.16)}>
                <details className="group h-full rounded-xl bg-white shadow-[0_14px_36px_-28px_rgba(30,27,75,0.45)] transition-shadow open:shadow-[0_20px_46px_-28px_rgba(109,40,217,0.5)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm font-bold leading-snug tracking-tight text-[#18181B] sm:text-[15px]">
                      {faq.q}
                    </h3>
                    <span
                      aria-hidden
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F3EEFF] text-[#7C3AED] transition-transform duration-300 group-open:rotate-45 group-open:bg-[#7C3AED] group-open:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  </summary>
                  <p className="-mt-1 px-5 pb-5 text-sm leading-relaxed text-[#6B7280]">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
        style={{
          background: 'linear-gradient(110deg, #120C33 0%, #1B104C 45%, #311986 100%)',
        }}
        aria-labelledby="landing-cta-title"
      >
        <div className="pointer-events-none absolute -top-28 right-1/4 h-72 w-72 rounded-full bg-[#6D3DF5]/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-[110px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h2
              id="landing-cta-title"
              className="text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl"
            >
              {page.ctaHeading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              {page.ctaBody}
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

      <SiteFooter />
    </div>
  );
};
