import React from 'react';
import { FAQS } from '../../../data/seoContent';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { ArrowRight, Plus } from 'lucide-react';

/**
 * FAQ block. The same `FAQS` array is rendered as FAQPage JSON-LD, so the
 * schema and the visible copy can never drift apart.
 */
export const FaqSection: React.FC = () => (
  <section
    id="faq"
    aria-labelledby="faq-title"
    className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24 scroll-mt-24"
  >
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
      <Reveal className="lg:sticky lg:top-28">
        <SectionHeading
          align="left"
          eyebrow="Questions"
          title={<span id="faq-title">Everything you asked before sending.</span>}
          subtitle="Virtual gifting, explained in plain English — what it is, how it reaches them, and what it costs."
        />
        <a
          href="#/how-it-works"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#6D28D9] hover:text-[#5B21B6] hover:gap-2.5 transition-all"
        >
          Read the step-by-step guide
          <ArrowRight className="w-4 h-4" />
        </a>
      </Reveal>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <Reveal key={faq.q} delay={Math.min(i * 0.05, 0.25)}>
            <details className="group rounded-2xl border border-[#E4E4E7] bg-white shadow-xs open:border-violet-300 open:shadow-[0_20px_45px_-28px_rgba(109,40,217,0.6)] transition-all">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm sm:text-[15px] font-extrabold text-[#18181B] tracking-tight leading-snug">
                  {faq.q}
                </h3>
                <span
                  aria-hidden
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F5F3FF] text-[#6D28D9] transition-transform duration-300 group-open:rotate-45 group-open:bg-[#6D28D9] group-open:text-white"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
              </summary>
              <p className="px-5 pb-5 -mt-1 text-sm text-[#71717A] leading-relaxed">{faq.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
