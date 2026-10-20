import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useApp } from '../../../context/AppContext';
import { GiftData } from '../../../types';
import { GiftBoxInteractive } from '../../common/GiftBoxInteractive';
import birthdayCover from '../../../assets/images/guides/birthday.jpg';
import { ArrowRight, Play } from 'lucide-react';

const HERO_GIFT: Partial<GiftData> = {
  recipientName: 'Someone special',
  senderName: 'You',
  message: 'A little box of memories, made in under a minute.',
  photos: [birthdayCover],
  eventSlug: 'birthday',
  mood: 'magical',
  animationEffect: 'confetti',
};

export const HeroSection: React.FC = () => {
  const { openCreator, setCurrentView } = useApp();
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      className="relative overflow-hidden -mt-[65px]"
      aria-label="Send a virtual gift online"
      style={{
        background: 'linear-gradient(110deg, #120C33 0%, #1B104C 45%, #2A1675 100%)',
      }}
    >
      <div className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[#6D3DF5]/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-24 h-[26rem] w-[26rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 20%, #000 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 20%, #000 20%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-[135px] sm:px-6 sm:pb-24 sm:pt-[160px] lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <motion.h1
              {...fadeUp(0)}
              className="mx-auto max-w-3xl text-[clamp(2.35rem,5.2vw,4rem)] font-extrabold leading-[1.06] tracking-tight text-white text-balance lg:mx-0"
            >
              Send a Virtual Gift Online: A Free Digital Gift Box in 60 Seconds
            </motion.h1>

            <motion.p
              {...fadeUp(0.12)}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0"
            >
              Add your photos, record a voice note and write a message. GEMS wraps it all in a
              3D gift box that your person unwraps on their own screen. One link, no app, no
              account for them.
            </motion.p>

            <motion.div
              {...fadeUp(0.24)}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <button
                onClick={() => openCreator()}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F0479B] px-8 py-3.5 text-sm font-bold text-white shadow-[0_18px_45px_-16px_rgba(240,71,155,0.8)] transition-all hover:-translate-y-0.5 hover:brightness-110 cursor-pointer sm:w-auto"
              >
                <span>Create Your Gift Free</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => setCurrentView('how-it-works')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10 cursor-pointer sm:w-auto"
              >
                <Play className="h-4 w-4" />
                <span>See How It Works</span>
              </button>
            </motion.div>

            <motion.p
              {...fadeUp(0.34)}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-[#FBBF24] lg:justify-start"
            >
              <span>Free to start</span>
              <span aria-hidden className="text-[#FBBF24]/50">
                |
              </span>
              <span>No app needed</span>
              <span aria-hidden className="text-[#FBBF24]/50">
                |
              </span>
              <span>Works on any phone</span>
            </motion.p>
          </div>

          <motion.div
            {...fadeUp(0.18)}
            className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#8B5CF6]/35 via-fuchsia-500/10 to-amber-300/20 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] p-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm">
              <GiftBoxInteractive
                gift={HERO_GIFT}
                heightClass="h-[420px] sm:h-[500px] lg:h-[520px]"
                showHeading={false}
              />
            </div>
            <p className="mt-4 text-center text-xs font-semibold tracking-wide text-white/55">
              Tap the box to unwrap a sample gift
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
