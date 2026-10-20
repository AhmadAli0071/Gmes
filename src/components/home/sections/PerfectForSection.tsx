import React from 'react';
import { Reveal } from './Reveal';
import { ArrowRight, Clock3, Globe2, Sparkles, Users } from 'lucide-react';
import longDistanceImage from '../../../assets/images/use-cases/long-distance.jpg';
import lastMinuteImage from '../../../assets/images/use-cases/last-minute.jpg';
import familyAbroadImage from '../../../assets/images/use-cases/family-abroad.jpg';
import justBecauseImage from '../../../assets/images/use-cases/just-because.jpg';

const USE_CASES = [
  {
    icon: Globe2,
    image: longDistanceImage,
    alt: 'A purple gift box opening with sparkling light',
    title: 'Long distance',
    body: 'Miles apart? Send a gift that feels like you are in the room.',
    grad: 'from-[#8B5CF6] to-[#6366F1]',
  },
  {
    icon: Clock3,
    image: lastMinuteImage,
    alt: 'A birthday cake and wrapped gift ready on a table',
    title: 'Last minute',
    body: 'Forgot a date? Create a heartfelt gift in about a minute, with no shipping delays.',
    grad: 'from-[#F59E0B] to-[#F0479B]',
  },
  {
    icon: Users,
    image: familyAbroadImage,
    alt: 'A cozy home mantel decorated with warm lights',
    title: 'Family abroad',
    body: 'Surprise your parents or friends in another country the moment you finish.',
    grad: 'from-[#EC4899] to-[#F97316]',
  },
  {
    icon: Sparkles,
    image: justBecauseImage,
    alt: 'A handwritten note surrounded by soft rose petals',
    title: 'Just because',
    body: 'Small surprises make big memories.',
    grad: 'from-[#14B8A6] to-[#8B5CF6]',
  },
];

export const PerfectForSection: React.FC = () => (
  <section className="relative bg-white" aria-labelledby="perfect-for-title">
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <h2
          id="perfect-for-title"
          className="mx-auto max-w-5xl text-center text-2xl font-extrabold tracking-tight text-[#1E1B4B] text-balance sm:text-3xl lg:text-[2.1rem]"
        >
          Perfect for Long Distance, Last Minute and Just Because
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={(i % 4) * 0.06}>
              <div className="group h-full overflow-hidden rounded-2xl border border-[#EAE4F9] bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_24px_50px_-30px_rgba(109,40,217,0.5)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F3FF]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className={`absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${item.grad} text-white shadow-[0_8px_20px_-10px_rgba(30,27,75,0.8)]`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-extrabold tracking-tight text-[#1E1B4B]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">{item.body}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-8 text-center">
        <a
          href="/long-distance-gift-ideas"
          className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#6D28D9] transition-colors hover:text-[#5B21B6]"
        >
          Read our long distance gift ideas
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </div>
  </section>
);
