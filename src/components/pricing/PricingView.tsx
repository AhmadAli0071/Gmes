import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles, HelpCircle } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { setCurrentView, showToast } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = (planName: string) => {
    if (planName === 'Free') {
      setCurrentView('create');
    } else {
      showToast(`Selected ${planName}! Ready to build your gift.`);
      setCurrentView('create');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider text-[#6D28D9] uppercase">
          Pricing
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight mt-1">
          Simple, Transparent Gifting
        </h1>
        <p className="mt-3 text-base text-[#71717A]">
          Create a free gift anytime, or upgrade to high-definition unboxing animations and voice notes.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="mt-6 inline-flex items-center gap-2 p-1 bg-zinc-200/60 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <span>Annual (Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {/* FREE */}
        <div className="bg-white rounded-3xl p-8 border border-[#E4E4E7] shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">Free</h3>
            <p className="mt-1 text-xs text-zinc-500">For casual quick greetings</p>

            <div className="mt-6 flex items-baseline gap-1 font-mono">
              <span className="text-4xl font-extrabold text-zinc-900">$0</span>
              <span className="text-xs text-zinc-500">/ forever</span>
            </div>

            <ul className="mt-8 space-y-3 text-xs text-zinc-600">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Basic unboxing templates</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Personalized heartfelt message</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant shareable link</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-400">
                <Check className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>Includes GEMS badge</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100">
            <button
              onClick={() => handleSelectPlan('Free')}
              className="w-full py-3 text-xs font-semibold text-zinc-800 bg-[#FAFAF9] border border-[#E4E4E7] hover:bg-zinc-100 rounded-xl transition-colors"
            >
              Start Free
            </button>
          </div>
        </div>

        {/* PREMIUM GIFT (Highlighted Single Purchase) */}
        <div className="bg-white rounded-3xl p-8 border-2 border-[#6D28D9] shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#6D28D9] text-white text-[11px] font-bold rounded-full shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>MOST POPULAR</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-zinc-900">Premium Gift</h3>
            <p className="mt-1 text-xs text-zinc-500">Single one-time unforgettable delivery</p>

            <div className="mt-6 flex items-baseline gap-1 font-mono">
              <span className="text-4xl font-extrabold text-[#6D28D9]">$4.99</span>
              <span className="text-xs text-zinc-500">/ per gift</span>
            </div>

            <ul className="mt-8 space-y-3 text-xs text-zinc-700">
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0" />
                <span>All Premium unboxing templates</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0" />
                <span>Add up to 4 cherished photos</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0" />
                <span>Personal voice note recording</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0" />
                <span>Background ambient sound tracks</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0" />
                <span>Snow, confetti & sparkles animations</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-500">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0" />
                <span>No GEMS watermark branding</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100">
            <button
              onClick={() => handleSelectPlan('Premium Gift')}
              className="w-full py-3.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-md transition-all transform hover:scale-[1.02]"
            >
              Create Premium Gift
            </button>
          </div>
        </div>

        {/* GEMS PRO */}
        <div className="bg-white rounded-3xl p-8 border border-[#E4E4E7] shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">GEMS Pro</h3>
            <p className="mt-1 text-xs text-zinc-500">For thoughtful recurring gifters</p>

            <div className="mt-6 flex items-baseline gap-1 font-mono">
              <span className="text-4xl font-extrabold text-zinc-900">
                {billingCycle === 'monthly' ? '$12' : '$9.60'}
              </span>
              <span className="text-xs text-zinc-500">/ month</span>
            </div>

            <ul className="mt-8 space-y-3 text-xs text-zinc-600">
              <li className="flex items-center gap-2.5 font-medium text-zinc-800">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited premium gifts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>AI writing assistant with all tones</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Custom short URLs (gems.com/s/sarah)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>High-resolution unboxing physics</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Early access to seasonal themes</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100">
            <button
              onClick={() => handleSelectPlan('GEMS Pro')}
              className="w-full py-3 text-xs font-semibold text-zinc-800 bg-[#FAFAF9] border border-[#E4E4E7] hover:bg-zinc-100 rounded-xl transition-colors"
            >
              Go Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
