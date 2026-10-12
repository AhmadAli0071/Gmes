import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useApp } from '../../../context/AppContext';
import { EventSlug } from '../../../types';
import { GiftBoxInteractive } from '../../common/GiftBoxInteractive';
import { Sparkles, ArrowRight, Play, Star, Zap } from 'lucide-react';

const AVATARS = ['AK', 'DR', 'PS', 'MJ'];

export const HeroSection: React.FC = () => {
  const { openCreator, setSelectedEventSlug } = useApp();
  const [heroGiftOpened, setHeroGiftOpened] = useState(false);
  const reduce = useReducedMotion();

  const handleStartGift = (occasionSlug?: EventSlug) => {
    if (occasionSlug) setSelectedEventSlug(occasionSlug);
    openCreator(occasionSlug ? { eventSlug: occasionSlug } : undefined);
  };

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    // Pulled up under the sticky navbar so the hero gradient starts at the very
    // top of the page and the navbar reads as part of the hero, not a bar above it.
    <section className="relative overflow-hidden -mt-[65px]" aria-label="Send a virtual gift online">
      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(140deg, #171033 0%, #4C1D95 30%, #7C3AED 56%, #C026D3 84%, #F472B6 100%)',
        }}
      />
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/40 blur-[110px]" />
      <div className="pointer-events-none absolute top-24 -right-28 h-[30rem] w-[30rem] rounded-full bg-amber-400/30 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-44 left-1/3 h-[26rem] w-[26rem] rounded-full bg-violet-300/40 blur-[110px]" />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, #000 25%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, #000 25%, transparent 78%)',
        }}
      />
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.5]" />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-[104px] pb-16 sm:pt-[130px] sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* Copy column */}
          <div className="text-center lg:text-left">
            <motion.span
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Free virtual gift box maker
            </motion.span>

            <motion.h1
              {...fadeUp(0.08)}
              className="mt-6 text-[clamp(2.4rem,7vw,4.4rem)] font-extrabold leading-[1.03] tracking-tight text-white text-balance"
            >
              Send a{' '}
              <span className="bg-gradient-to-r from-amber-300 via-fuchsia-300 to-violet-200 bg-clip-text text-transparent">
                virtual gift
              </span>{' '}
              they unwrap online.
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-5 text-base sm:text-lg text-white/75 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Build a digital gift box with your photos, a voice note and your message, then
              share it as one link. No app for them, free to start — ready in under 60 seconds.
            </motion.p>

            <motion.div
              {...fadeUp(0.24)}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => handleStartGift()}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-[#4C1D95] bg-white hover:bg-amber-100 rounded-xl shadow-[0_18px_50px_-15px_rgba(255,255,255,0.7)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Create a Gift</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('templates-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md rounded-xl transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>Explore Gifts</span>
              </button>
            </motion.div>

            <motion.div
              {...fadeUp(0.32)}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {AVATARS.map((n, i) => (
                    <span
                      key={n}
                      className="grid h-9 w-9 place-items-center rounded-full ring-2 ring-white/60 text-[10px] font-bold text-white"
                      style={{
                        background: [
                          'linear-gradient(135deg,#F472B6,#A855F7)',
                          'linear-gradient(135deg,#FBBF24,#F472B6)',
                          'linear-gradient(135deg,#60A5FA,#A855F7)',
                          'linear-gradient(135deg,#34D399,#60A5FA)',
                        ][i],
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    ))}
                  </div>
                  <p className="text-[11px] text-white/65 font-medium">
                    Loved by 12,000+ gifters
                  </p>
                </div>
              </div>

              <span className="hidden sm:block h-9 w-px bg-white/25" />

              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/70">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Free · No app · 60 seconds
              </p>
            </motion.div>
          </div>

          {/* Preview column */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.94, y: 30 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xl"
          >
            {/* Floating feature chips */}
            <span className="hidden sm:flex animate-float-slow absolute -left-4 lg:-left-10 top-12 z-10 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#4C1D95] shadow-lg backdrop-blur">
              🎤 Voice note inside
            </span>
            <span
              className="hidden sm:flex animate-float-slow absolute -right-3 lg:-right-8 top-1/3 z-10 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#4C1D95] shadow-lg backdrop-blur"
              style={{ animationDelay: '1.4s' }}
            >
              ✨ Sparkle reveal
            </span>
            <span
              className="hidden sm:flex animate-float-slow absolute -left-2 lg:-left-6 bottom-16 z-10 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#4C1D95] shadow-lg backdrop-blur"
              style={{ animationDelay: '2.6s' }}
            >
              📸 Photo memories
            </span>

            <div
              className="relative rounded-[2rem] overflow-hidden p-2.5 sm:p-3.5 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.7)] ring-1 ring-[#ffc95c]/45"
              style={{ background: 'linear-gradient(165deg,#3b1f7a 0%,#22124f 45%,#150d33 100%)' }}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ff4f8b] via-[#ffc95c] to-[#ff4f8b]"
              />
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
                heightClass="h-[clamp(400px,52vh,520px)]"
              />
            </div>

            <button
              onClick={() => handleStartGift('birthday')}
              className="mt-4 w-full py-3.5 text-xs font-bold text-[#4C1D95] bg-amber-300 hover:bg-amber-200 rounded-xl shadow-[0_16px_40px_-14px_rgba(252,211,77,0.9)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send a gift like this in 60s</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
