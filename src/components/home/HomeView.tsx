import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { TEMPLATES } from '../../data/templates';
import { EventSlug, TemplateVibe, GiftTemplate } from '../../types';
import { GiftBoxInteractive } from '../common/GiftBoxInteractive';
import {
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  Heart,
  Music,
  Check,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setCurrentView,
    activeEvent,
    allEvents,
    setSelectedEventSlug,
    setCurrentDraft,
  } = useApp();

  // Occasion filter for the templates section
  const [selectedOccasion, setSelectedOccasion] = useState<EventSlug | 'all'>('all');
  // Vibe filter
  const [selectedVibe, setSelectedVibe] = useState<TemplateVibe>('all');

  // Hero interactive gift preview state
  const [heroGiftOpened, setHeroGiftOpened] = useState(false);

  const occasionsList: { slug: EventSlug; name: string; emoji: string }[] = [
    { slug: 'halloween', name: 'Halloween', emoji: '🎃' },
    { slug: 'christmas', name: 'Christmas', emoji: '🎄' },
    { slug: 'valentines', name: "Valentine's", emoji: '❤️' },
    { slug: 'birthday', name: 'Birthday', emoji: '🎂' },
    { slug: 'mothers-day', name: "Mother's Day", emoji: '💐' },
    { slug: 'fathers-day', name: "Father's Day", emoji: '👨' },
    { slug: 'graduation', name: 'Graduation', emoji: '🎓' },
    { slug: 'wedding', name: 'Wedding', emoji: '💍' },
    { slug: 'anniversary', name: 'Anniversary', emoji: '🥂' },
  ];

  const vibeTabs: { id: TemplateVibe; label: string; emoji: string }[] = [
    { id: 'all', label: 'All', emoji: '✨' },
    { id: 'romantic', label: 'Romantic', emoji: '❤️' },
    { id: 'funny', label: 'Funny', emoji: '🎉' },
    { id: 'elegant', label: 'Elegant', emoji: '🤍' },
    { id: 'cute', label: 'Cute', emoji: '🌸' },
    { id: 'magical', label: 'Magical', emoji: '🌌' },
    { id: 'minimal', label: 'Minimal', emoji: '🌿' },
  ];

  const handleStartGift = (occasionSlug?: EventSlug) => {
    if (occasionSlug) {
      setSelectedEventSlug(occasionSlug);
      setCurrentDraft((prev) => ({
        ...prev,
        eventSlug: occasionSlug,
      }));
    }
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUseTemplate = (tpl: GiftTemplate) => {
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

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesOccasion = selectedOccasion === 'all' || tpl.eventSlug === selectedOccasion;
    const matchesVibe = selectedVibe === 'all' || tpl.vibe === selectedVibe;
    return matchesOccasion && matchesVibe;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-between">
      <div>
        {/* 1. MINIMAL HERO */}
        <section className="pt-14 pb-8 sm:pt-20 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#18181B] tracking-tight leading-[1.1] text-balance">
            Make someone smile today.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#71717A] max-w-lg mx-auto leading-relaxed">
            Create a beautiful digital gift and send it instantly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleStartGift()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] active:bg-[#4C1D95] rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Create a Gift →</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('templates-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#18181B] bg-white hover:bg-zinc-50 border border-[#E4E4E7] rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <span>Explore Gifts</span>
            </button>
          </div>
        </section>

        {/* 2. INTERACTIVE GIFT PREVIEW (Visual Centerpiece of the Homepage) */}
        <section className="px-4 sm:px-6 max-w-xl mx-auto pb-14">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E4E7] shadow-xl relative overflow-hidden transition-all">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 text-xs">
              <span className="font-semibold text-zinc-400 uppercase tracking-wider text-[11px]">
                Interactive Gift Experience
              </span>
              {heroGiftOpened && (
                <button
                  onClick={() => setHeroGiftOpened(false)}
                  className="text-[#6D28D9] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Wrap Box</span>
                </button>
              )}
            </div>

            <div className="py-2 flex flex-col items-center text-center">
              <GiftBoxInteractive
                gift={{
                  recipientName: 'Sarah Jenkins',
                  senderName: 'Ahmad',
                  message:
                    'Sarah, you make every ordinary day feel like an adventure! Wishing you the happiest celebration filled with love, laughter, and sweet moments. So grateful for you! ✨',
                  photos: [
                    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=80',
                  ],
                  voiceNoteUrl: 'mock-voice.mp3',
                  voiceNoteDuration: 24,
                  boxColor: '#6D28D9',
                  ribbonColor: '#F59E0B',
                  mood: 'magical',
                  animationEffect: 'sparkles',
                }}
                isOpened={heroGiftOpened}
                onOpen={() => setHeroGiftOpened(!heroGiftOpened)}
                interactive={true}
                mode="preview"
              />

              <div className="mt-3 w-full">
                <button
                  onClick={() => handleStartGift('birthday')}
                  className="w-full py-3 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Send a gift like this in 60s →</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CURRENT EVENT MINI BANNER (Contextual recommendation, small as requested) */}
        <section className="px-4 sm:px-6 max-w-4xl mx-auto pb-16">
          <div
            className="rounded-2xl p-4 sm:p-5 border border-zinc-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors"
            style={{ backgroundColor: activeEvent.subtleAccentBg }}
          >
            <div className="flex items-center gap-3 text-left">
              <span className="text-3xl p-2 bg-white rounded-xl shadow-2xs">
                {activeEvent.emoji}
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  {activeEvent.name}
                </span>
                <p className="text-sm font-bold text-zinc-900">
                  {activeEvent.heroTitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleStartGift(activeEvent.slug)}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white rounded-xl shadow-2xs hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer shrink-0"
              style={{ backgroundColor: activeEvent.primaryAccent }}
            >
              {activeEvent.callToAction} →
            </button>
          </div>
        </section>

        {/* 4. "What are you celebrating?" (MAIN content of homepage) */}
        <section id="templates-section" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
              What are you celebrating?
            </h2>
            <p className="text-xs text-[#71717A] mt-1">
              Tap an occasion to filter gift templates below.
            </p>
          </div>

          {/* Horizontal / Scrollable Visual Occasion Selector Cards */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none">
            <button
              onClick={() => setSelectedOccasion('all')}
              className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center min-w-[90px] transition-all cursor-pointer ${
                selectedOccasion === 'all'
                  ? 'border-[#6D28D9] bg-purple-50/70 text-[#6D28D9] ring-2 ring-[#6D28D9]/20 font-bold'
                  : 'border-[#E4E4E7] bg-white text-zinc-700 hover:border-zinc-300'
              }`}
            >
              <span className="text-2xl mb-1">✨</span>
              <span className="text-xs whitespace-nowrap">All</span>
            </button>

            {occasionsList.map((occ) => (
              <button
                key={occ.slug}
                onClick={() => setSelectedOccasion(occ.slug)}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center min-w-[105px] transition-all cursor-pointer ${
                  selectedOccasion === occ.slug
                    ? 'border-[#6D28D9] bg-purple-50/70 text-[#6D28D9] ring-2 ring-[#6D28D9]/20 font-bold'
                    : 'border-[#E4E4E7] bg-white text-zinc-700 hover:border-zinc-300'
                }`}
              >
                <span className="text-2xl mb-1">{occ.emoji}</span>
                <span className="text-xs whitespace-nowrap">{occ.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 5. "Pick a vibe" + TEMPLATE GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#18181B] tracking-tight">
                Pick a vibe
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Explore gift boxes by emotional feel and aesthetics.
              </p>
            </div>

            {/* Vibe Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-zinc-200/60 rounded-2xl overflow-x-auto max-w-full">
              {vibeTabs.map((v) => {
                const count = TEMPLATES.filter((t) =>
                  v.id === 'all'
                    ? selectedOccasion === 'all' || t.eventSlug === selectedOccasion
                    : t.vibe === v.id && (selectedOccasion === 'all' || t.eventSlug === selectedOccasion)
                ).length;

                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVibe(v.id)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedVibe === v.id
                        ? 'bg-white text-[#6D28D9] shadow-sm font-bold scale-102 ring-1 ring-black/5'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
                    }`}
                  >
                    <span>{v.emoji}</span>
                    <span>{v.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        selectedVibe === v.id
                          ? 'bg-purple-100 text-[#6D28D9] font-bold'
                          : 'bg-zinc-200/80 text-zinc-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual Template Grid - styled as actual gift unboxing experiences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleUseTemplate(tpl)}
                className="group bg-white rounded-3xl border border-[#E4E4E7] shadow-xs hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Unboxing Preview Artwork */}
                <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
                  <img
                    src={tpl.coverImage}
                    alt={tpl.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badges */}
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

                  {/* Gradient Scrim at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-[11px] font-medium text-white/90">
                      {tpl.tags.join(' • ')}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
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
                    <span className="text-[11px] text-zinc-400 capitalize font-medium">
                      {tpl.vibe}
                    </span>
                    <span className="text-xs font-semibold text-[#6D28D9] group-hover:translate-x-0.5 transition-transform">
                      Use this design →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-14 bg-white rounded-3xl border border-zinc-200 shadow-sm max-w-md mx-auto p-6">
              <span className="text-4xl block mb-2">🎁</span>
              <p className="text-base font-bold text-zinc-800">No {selectedVibe} templates under this occasion</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                Explore all {selectedVibe} vibe templates across all celebrations or reset filters.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedOccasion('all')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs cursor-pointer"
                >
                  View All {selectedVibe.toUpperCase()} Gifts
                </button>
                <button
                  onClick={() => {
                    setSelectedOccasion('all');
                    setSelectedVibe('all');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-xl cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 6. SMALL BOTTOM CALL TO ACTION */}
        <section className="px-4 sm:px-6 max-w-3xl mx-auto pb-20 text-center">
          <div className="p-8 bg-white rounded-3xl border border-[#E4E4E7] shadow-xs">
            <h3 className="text-2xl font-extrabold text-[#18181B] tracking-tight">
              Create something they'll remember.
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#71717A]">
              Under 60 seconds from your idea to their surprise unboxing.
            </p>
            <button
              onClick={() => handleStartGift()}
              className="mt-5 inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-transform hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Create a Gift →</span>
            </button>
          </div>
        </section>
      </div>

      {/* 7. MINIMAL FOOTER */}
      <footer className="bg-white border-t border-[#E4E4E7] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-zinc-900 tracking-tight">GEMS</span>
            <span>·</span>
            <span>Make Every Moment a Gift.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <button onClick={() => setCurrentView('explore')} className="hover:text-zinc-900 cursor-pointer">
              Explore
            </button>
            <button onClick={() => setCurrentView('how-it-works')} className="hover:text-zinc-900 cursor-pointer">
              How It Works
            </button>
            <button onClick={() => setCurrentView('pricing')} className="hover:text-zinc-900 cursor-pointer">
              Pricing
            </button>
            <button onClick={() => setCurrentView('admin')} className="hover:text-zinc-900 cursor-pointer">
              Admin
            </button>
          </div>

          <div>
            © {new Date().getFullYear()} GEMS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
