import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TEMPLATES } from '../../data/templates';
import { GiftTemplate, EventSlug } from '../../types';
import { Search, Sparkles } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { setCurrentDraft, setCurrentView } = useApp();
  const [search, setSearch] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState<EventSlug | 'all'>('all');

  const occasions: { slug: EventSlug; label: string; emoji: string }[] = [
    { slug: 'christmas', label: 'Christmas', emoji: '🎄' },
    { slug: 'birthday', label: 'Birthday', emoji: '🎂' },
    { slug: 'valentines', label: "Valentine's", emoji: '❤️' },
    { slug: 'halloween', label: 'Halloween', emoji: '🎃' },
    { slug: 'anniversary', label: 'Anniversary', emoji: '💍' },
    { slug: 'graduation', label: 'Graduation', emoji: '🎓' },
    { slug: 'mothers-day', label: "Mother's Day", emoji: '💐' },
  ];

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesOccasion = selectedOccasion === 'all' || tpl.eventSlug === selectedOccasion;
    const matchesSearch =
      tpl.title.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesOccasion && matchesSearch;
  });

  const handleUse = (tpl: GiftTemplate) => {
    setCurrentDraft({
      templateId: tpl.id,
      eventSlug: tpl.eventSlug,
      mood: tpl.mood,
      fontStyle: tpl.fontStyle,
      musicTrack: tpl.musicTrack,
      animationEffect: tpl.animationEffect,
      boxColor: tpl.boxColor,
      ribbonColor: tpl.ribbonColor,
    });
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
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
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => handleUse(tpl)}
            className="group bg-white rounded-3xl border border-[#E4E4E7] shadow-xs hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
              <img
                src={tpl.coverImage}
                alt={tpl.title}
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
                <span className="text-zinc-400 capitalize">{tpl.vibe}</span>
                <span className="font-semibold text-[#6D28D9] group-hover:translate-x-0.5 transition-transform">
                  Use this gift →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
