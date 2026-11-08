import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles } from 'lucide-react';

const PRO_MONTHLY = 12;
const PRO_YEARLY_MONTHLY = 9.6;

export const PricingView: React.FC = () => {
  const { openCreator, showToast } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = (planName: string) => {
    if (planName === 'Free') {
      openCreator();
      return;
    }
    // Early access: paid tiers are free right now - never mention billing plumbing.
    showToast(
      `${planName} is free during early access - you're all set! Enjoy full access.`,
      'success'
    );
    openCreator();
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
          Create a free gift anytime. Premium and Pro are free for everyone during early access.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="mt-6 inline-flex items-center gap-2 p-1 bg-zinc-200/60 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            aria-pressed={billingCycle === 'monthly'}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            aria-pressed={billingCycle === 'yearly'}
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
        <div className="bg-white rounded-3xl p-8 border-2 border-[#6D28D9] shadow-[0_24px_60px_-24px_rgba(109,40,217,0.55)] relative flex flex-col justify-between transform md:-translate-y-2 overflow-hidden">
          {/* Gold premium ribbon across the top */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300"
          />
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#3B0764] text-[11px] font-black rounded-full shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>EARLY ACCESS · FREE</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-1.5">
              Premium Gift
              <span className="text-amber-400">👑</span>
            </h3>
            <p className="mt-1 text-xs text-zinc-500">Single one-time unforgettable delivery</p>

            <div className="mt-6 flex items-baseline gap-2 font-mono flex-wrap">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
                Free
              </span>
              <span className="text-lg text-zinc-400 line-through">$4.99</span>
              <span className="text-xs text-zinc-500">/ per gift</span>
            </div>
            <p className="mt-1.5 text-xs font-semibold text-emerald-600">
              Free during early access - you will not be charged.
            </p>

            <ul className="mt-8 space-y-3 text-xs text-zinc-700">
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>All Premium unboxing templates</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Add up to 4 cherished photos</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Personal voice note recording</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Background ambient sound tracks</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Snow, confetti & sparkles animations</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-500">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>No GEMS watermark branding</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100">
            <button
              onClick={() => handleSelectPlan('Premium Gift')}
              className="w-full py-3.5 text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] to-fuchsia-600 hover:from-[#5B21B6] hover:to-fuchsia-700 rounded-xl shadow-md transition-all transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Create Premium Gift - Free</span>
            </button>
          </div>
        </div>

        {/* GEMS PRO */}
        <div className="bg-white rounded-3xl p-8 border border-[#E4E4E7] shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">GEMS Pro</h3>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-200">
                Free now
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">For thoughtful recurring gifters</p>

            <div className="mt-6 flex items-baseline gap-2 font-mono flex-wrap">
              <span className="text-4xl font-extrabold text-emerald-600">Free</span>
              <span className="text-lg text-zinc-400 line-through">
                ${billingCycle === 'monthly' ? PRO_MONTHLY : PRO_YEARLY_MONTHLY}
              </span>
              <span className="text-xs text-zinc-500">/ month</span>
            </div>
            <p className="mt-1.5 text-xs font-semibold text-emerald-600">
              Free during early access - cancel-free, no card needed.
            </p>

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
              Start Pro Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
