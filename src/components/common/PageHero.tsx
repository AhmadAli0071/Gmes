import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/**
 * The same dark blue gradient hero the home page opens with - reused at the
 * top of every content page so the site keeps one consistent look. The
 * navbar detects these pages and goes transparent/light over them.
 */
export const PageHero: React.FC<PageHeroProps> = ({ label, title, subtitle, children }) => {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      className="relative overflow-hidden -mt-[65px]"
      aria-label={title}
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

      <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-[135px] text-center sm:px-6 sm:pb-16 sm:pt-[160px] lg:px-8">
        {label && (
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur"
          >
            {label}
          </motion.span>
        )}

        <motion.h1
          {...fadeUp(label ? 0.08 : 0)}
          className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-white text-balance"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            {...fadeUp(0.16)}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div {...fadeUp(0.24)} className="mt-8">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
};
