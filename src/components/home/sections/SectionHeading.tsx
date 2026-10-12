import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}) => (
  <div className={align === 'center' ? 'max-w-2xl mx-auto text-center' : 'max-w-2xl'}>
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#F5F3FF] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6D28D9]">
      {eyebrow}
    </span>
    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#18181B] text-balance">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-sm sm:text-base text-[#71717A] leading-relaxed">{subtitle}</p>
    )}
  </div>
);
