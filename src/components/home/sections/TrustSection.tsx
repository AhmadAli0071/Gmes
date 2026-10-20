import React from 'react';
import { Gift, Smartphone, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

const REASONS = [
  {
    icon: Gift,
    title: 'Made in under 60 seconds',
    copy: 'Add photos, record a voice note, write your message and share one link.',
    grad: 'linear-gradient(135deg,#F472B6,#A855F7)',
  },
  {
    icon: Smartphone,
    title: 'Nothing for them to install',
    copy: 'Recipients open the gift in any browser — no app, no signup and no password.',
    grad: 'linear-gradient(135deg,#FBBF24,#F472B6)',
  },
  {
    icon: Sparkles,
    title: 'A moment they can replay',
    copy: 'Your photos, voice and words stay together in one link they can revisit anytime.',
    grad: 'linear-gradient(135deg,#60A5FA,#A855F7)',
  },
];

export const TrustSection: React.FC = () => (
  <section aria-labelledby="trust-title">
    <div className="bg-[#F8F4FF] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <Reveal>
        <h2
          id="trust-title"
          className="mx-auto max-w-4xl text-center text-3xl font-extrabold tracking-tight text-[#1E1B4B] text-balance sm:text-4xl lg:text-[2.6rem]"
        >
          A Small Gift. A Moment They Keep.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#6B7280] sm:text-base">
          No app for them, no account to create, and a link that opens on any phone.
        </p>
      </Reveal>
    </div>

    <div
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      style={{
        background:
          'linear-gradient(112deg, #E6DDF9 0%, #FBF8F0 42%, #FBF1DF 62%, #FBE5EE 100%)',
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {REASONS.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <Reveal key={reason.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_22px_50px_-30px_rgba(30,27,75,0.35)]">
                <span
                  aria-hidden
                  className="grid h-11 w-11 place-items-center rounded-2xl text-white"
                  style={{ background: reason.grad }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-[#1E1B4B]">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{reason.copy}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
