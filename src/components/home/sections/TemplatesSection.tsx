import React from 'react';
import { useApp } from '../../../context/AppContext';
import { TEMPLATES } from '../../../data/templates';
import { GiftTemplate } from '../../../types';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Sparkles, ArrowRight } from 'lucide-react';

export const TemplatesSection: React.FC = () => {
  const { setCurrentView, applyTemplate } = useApp();

  // Merges the design tokens into whatever the user has already drafted -
  // their recipient name, message and photos are never overwritten.
  const handleUseTemplate = (tpl: GiftTemplate) => applyTemplate(tpl);

  return (
    <section
      id="templates-section"
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24 scroll-mt-24"
    >
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <SectionHeading
            align="left"
            eyebrow="Gift designs"
            title="Steal one. Make it theirs."
            subtitle={`${TEMPLATES.length} ready-to-send designs - tap any card and it loads straight into the creator.`}
          />
          <button
            type="button"
            onClick={() => setCurrentView('explore')}
            className="group shrink-0 self-start sm:self-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#6D28D9] hover:text-[#5B21B6] cursor-pointer"
          >
            <span>View all {TEMPLATES.length} designs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TEMPLATES.slice(0, 8).map((tpl, i) => (
          <Reveal key={tpl.id} delay={(i % 4) * 0.07}>
            <button
              type="button"
              onClick={() => handleUseTemplate(tpl)}
              className="group w-full text-left h-full bg-white rounded-3xl border border-[#E4E4E7] shadow-xs hover:border-violet-300 hover:shadow-[0_30px_60px_-28px_rgba(109,40,217,0.6)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
                <img
                  src={tpl.coverImage}
                  alt={`${tpl.title} - digital gift design`}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={480}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: tpl.boxColor }}
                  />
                  {tpl.isPremium && (
                    <span className="px-2 py-0.5 bg-zinc-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold rounded-md flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      PREMIUM
                    </span>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white/95">
                    {tpl.tags.join(' • ')}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-zinc-900 group-hover:text-[#6D28D9] transition-colors">
                    {tpl.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 capitalize font-medium">
                    {tpl.vibe}
                  </span>
                  <span className="text-xs font-bold text-[#6D28D9] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Use this design
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
