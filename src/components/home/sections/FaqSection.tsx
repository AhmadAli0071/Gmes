import React from 'react';
import { FAQS } from '../../../data/seoContent';
import { Reveal } from './Reveal';
import { ArrowRight, Plus } from 'lucide-react';

/**
 * FAQ block. The same `FAQS` array is rendered as FAQPage JSON-LD, so the
 * schema and the visible copy can never drift apart.
 */
export const FaqSection: React.FC = () => (
  <section
    id="faq"
    aria-labelledby="faq-title"
    className="relative overflow-hidden scroll-mt-24"
    style={{
      background:
        'linear-gradient(115deg, #E9E2FA 0%, #FAF8F1 45%, #FAE8F1 100%)',
    }}
  >
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-28">
          <span className="inline-flex items-center rounded-full border border-[#DDD6FE] bg-white/70 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6D28D9]">
            Questions
          </span>
          <h2
            id="faq-title"
            className="mt-4 text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold leading-[1.05] tracking-tight text-[#0F0A1F] text-balance"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-[#6B7280]">
            Virtual gifting, explained in plain English — what it is, how it reaches them, and
            what it costs.
          </p>
          <a
            href="/how-it-works"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#6D28D9] transition-colors hover:text-[#5B21B6]"
          >
            Read the step-by-step guide
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i * 0.04, 0.2)}>
              <details className="group rounded-xl bg-white shadow-[0_14px_36px_-28px_rgba(30,27,75,0.45)] transition-shadow open:shadow-[0_20px_46px_-28px_rgba(109,40,217,0.5)]">
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
                <p className="-mt-1 px-5 pb-5 text-sm leading-relaxed text-[#6B7280]">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
