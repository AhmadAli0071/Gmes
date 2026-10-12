import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Smartphone, ShieldCheck, Zap } from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { openCreator } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold tracking-wider text-[#6D28D9] uppercase">
          The Experience
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight mt-1">
          Designed for Pure Delight
        </h1>
        <p className="mt-3 text-base text-[#71717A]">
          GEMS turns thoughtful words into an interactive unboxing moment your loved ones will remember forever.
        </p>
      </div>

      {/* 3 Core Steps Detailed */}
      <div className="space-y-12">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E4E4E7] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex items-center justify-center">
            <div className="w-32 h-32 rounded-3xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-mono text-5xl font-extrabold border border-purple-100">
              01
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-2xl font-bold text-zinc-900">Choose a Curated Template</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Every GEMS template is designed around an emotion — from cozy Christmas hearths with gentle snowfall to electric birthday confetti and candlelit romance. Pick what speaks to you.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 font-medium">
              <span>· 12 Event Themes</span>
              <span>· Bespoke Color Palettes</span>
              <span>· Ambient Audio Tracks</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E4E4E7] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex items-center justify-center order-first md:order-last">
            <div className="w-32 h-32 rounded-3xl bg-pink-50 text-[#DB2777] flex items-center justify-center font-mono text-5xl font-extrabold border border-pink-100">
              02
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-2xl font-bold text-zinc-900">Make It Truly Personal</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Write your heartfelt note, or use the built-in message helper for tones from heartfelt to playful banter. Attach your favorite photo memories and record an audio greeting.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 font-medium">
              <span>· Message Helper</span>
              <span>· Photo Carousel</span>
              <span>· 60-Second Voice Notes</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E4E4E7] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex items-center justify-center">
            <div className="w-32 h-32 rounded-3xl bg-amber-50 text-[#D97706] flex items-center justify-center font-mono text-5xl font-extrabold border border-amber-100">
              03
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-2xl font-bold text-zinc-900">Send the Magic Anywhere</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              You get a private, distraction-free link. Drop it directly into WhatsApp, Telegram, Instagram DM, or iMessage. When they open it, their device turns into a personalized gift box.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 font-medium">
              <span>· No App Installation</span>
              <span>· Works on Any Phone</span>
              <span>· Instant Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Features Bento */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-[#E4E4E7]">
          <Smartphone className="w-5 h-5 text-[#6D28D9] mb-3" />
          <h4 className="text-sm font-bold text-zinc-900">Mobile-First Physics</h4>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            Optimized for 60fps haptics and touch unwrapping on iPhones and Android devices.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E4E4E7]">
          <ShieldCheck className="w-5 h-5 text-[#6D28D9] mb-3" />
          <h4 className="text-sm font-bold text-zinc-900">Private & Secure</h4>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            Unlisted links accessible only to people you send them to. Never indexed on public search.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E4E4E7]">
          <Zap className="w-5 h-5 text-[#6D28D9] mb-3" />
          <h4 className="text-sm font-bold text-zinc-900">Under 60 Seconds</h4>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            Zero clunky forms or 10-step checkouts. Straightforward magic in under a minute.
          </p>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="mt-16 text-center">
        <button
          onClick={() => openCreator()}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-md transition-all transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Try It Now — Create a Gift</span>
        </button>
      </div>
    </div>
  );
};
