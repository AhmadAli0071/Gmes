import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Reveal } from './Reveal';

const ROWS = [
  { label: 'Personal photos', ecard: 'Limited', giftCard: 'No', gems: 'Yes' },
  { label: 'Your own voice', ecard: 'No', giftCard: 'No', gems: 'Yes' },
  { label: 'Unwrapping experience', ecard: 'No', giftCard: 'No', gems: 'Yes, in 3D' },
  { label: 'Delivery time', ecard: 'Minutes', giftCard: 'Minutes', gems: 'About 60 seconds' },
  { label: 'Shipping needed', ecard: 'No', giftCard: 'No', gems: 'No' },
];

export const ComparisonSection: React.FC = () => {
  const { openCreator } = useApp();

  return (
    <section
      className="relative overflow-hidden bg-[#FAF7FF]"
      aria-labelledby="comparison-title"
    >
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              id="comparison-title"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E1B4B] text-balance"
            >
              Why a Virtual Gift Feels Better Than an E-Card
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#6B7280]">
              E-cards get skipped. Gift cards feel empty. A GEMS gift carries your face, your
              voice and your memories.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 overflow-x-auto rounded-2xl border border-[#EAE4F9] shadow-[0_24px_60px_-40px_rgba(30,27,75,0.55)]">
            <table className="w-full min-w-[680px] border-collapse text-center">
              <caption className="sr-only">
                E-card, gift card and GEMS virtual gift compared
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[38%] bg-[#120C33] px-6 py-4" />
                  <th
                    scope="col"
                    className="bg-[#120C33] px-6 py-4 text-sm font-bold text-white"
                  >
                    E-card
                  </th>
                  <th
                    scope="col"
                    className="bg-[#120C33] px-6 py-4 text-sm font-bold text-white"
                  >
                    Gift card
                  </th>
                  <th
                    scope="col"
                    className="bg-[#6D3DF5] px-6 py-4 text-sm font-bold text-white"
                  >
                    GEMS virtual gift
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-[#EFEAFA]">
                    <th
                      scope="row"
                      className="bg-white px-6 py-4 text-left text-sm font-normal text-[#4B5563]"
                    >
                      {row.label}
                    </th>
                    <td className="bg-white px-6 py-4 text-sm text-[#4B5563]">
                      {row.ecard}
                    </td>
                    <td className="bg-white px-6 py-4 text-sm text-[#4B5563]">
                      {row.giftCard}
                    </td>
                    <td className="bg-[#F1EAFF] px-6 py-4 text-sm font-bold text-[#6D3DF5]">
                      {row.gems}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="mt-8 text-center">
          <button
            onClick={() => openCreator()}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F0479B] px-8 py-3 text-sm font-bold text-white shadow-[0_16px_38px_-16px_rgba(240,71,155,0.8)] transition-all hover:-translate-y-0.5 hover:brightness-110 cursor-pointer"
          >
            Try It Free
          </button>
        </Reveal>
      </div>
    </section>
  );
};
