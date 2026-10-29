import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TEMPLATES } from '../../data/templates';
import { EVENTS } from '../../data/events';
import { GiftTemplate, EventSlug } from '../../types';
import { Search, Sparkles, SearchX } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { applyTemplate } = useApp();
  const [search, setSearch] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState<EventSlug | 'all'>('all');

  // Every occasion the platform ships with - kept in sync with `EVENTS`.
  const occasions: { slug: EventSlug; label: string; emoji: string }[] = EVENTS.map((e) => ({
    slug: e.slug,
    label: e.name,
    emoji: e.emoji,
  }));

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesOccasion = selectedOccasion === 'all' || tpl.eventSlug === selectedOccasion;
    const matchesSearch =
      tpl.title.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesOccasion && matchesSearch;
  });

  const handleUse = (tpl: GiftTemplate) => applyTemplate(tpl);

  const clearFilters = () => {
    setSearch('');
    setSelectedOccasion('all');
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight">
          Find a gift they'll love.
        </h1>
        <p className="mt-1 text-xs text-[#71717A]">
          Browse handcrafted unboxing presentations and digital keepsakes.
        </p>
      </div>

      {/* Search & Occasion Filter Pills */}
      <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden />
          <label htmlFor="template-search" className="sr-only">
            Search gifts
          </label>
          <input
            id="template-search"
            type="search"
            placeholder="Search gifts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E4E4E7] rounded-xl text-xs focus:ring-2 focus:ring-[#6D28D9] focus:outline-none"
          />
        </div>

        {/* Occasion Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedOccasion('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedOccasion === 'all'
                ? 'bg-zinc-900 text-white'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            All Occasions
          </button>
          {occasions.map((occ) => (
            <button
              key={occ.slug}
              onClick={() => setSelectedOccasion(occ.slug)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedOccasion === occ.slug
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              <span>{occ.emoji}</span>
              <span>{occ.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Template Grid (Large visuals, minimal text) */}
      {filtered.length === 0 ? (
        <div className="mt-16 mx-auto max-w-sm text-center bg-white rounded-3xl border border-[#E4E4E7] p-10 shadow-xs">
          <SearchX className="w-8 h-8 text-zinc-300 mx-auto" aria-hidden />
          <h3 className="mt-3 text-base font-bold text-zinc-900">No gifts match that</h3>
          <p className="mt-1 text-xs text-zinc-500">
            Try a different search term or clear the occasion filter.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => handleUse(tpl)}
              aria-label={`Use template ${tpl.title}`}
              className="group bg-white rounded-3xl border border-[#E4E4E7] shadow-xs hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between text-left w-full"
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
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#6D28D9] transition-colors">
                  {tpl.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 line-clamp-1">
                  {tpl.tags.join(' • ')}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-500 capitalize">{tpl.vibe}</span>
                <span className="font-semibold text-[#6D28D9] group-hover:translate-x-0.5 transition-transform">
                  Use this gift →
                </span>
              </div>
            </div>
          </button>
        ))}
        </div>
      )}
    </div>
  );
};
