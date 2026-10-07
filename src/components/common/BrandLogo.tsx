import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }[size];

  const textSizes = {
    sm: 'text-base font-bold tracking-tight',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-bold tracking-tight',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric gemstone icon with faceted jewel lines & subtle sparkle */}
      <div className={`relative ${iconDimensions} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        >
          {/* Outer Gem Outline */}
          <path
            d="M8 4L24 4L30 11L16 28L2 11L8 4Z"
            fill="url(#gem_grad)"
            stroke="#5B21B6"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Facet lines */}
          <path
            d="M8 4L16 11M24 4L16 11M16 11L16 28M2 11L30 11M8 4L2 11M24 4L30 11"
            stroke="#DDD6FE"
            strokeWidth="1"
            strokeOpacity="0.85"
            strokeLinejoin="round"
          />
          {/* Sparkle top right */}
          <path
            d="M24 2L24.8 3.8L27 4.2L25.2 5.5L25.8 7.5L24 6.2L22.2 7.5L22.8 5.5L21 4.2L23.2 3.8L24 2Z"
            fill="#FBBF24"
            className="animate-pulse"
          />
          <defs>
            <linearGradient
              id="gem_grad"
              x1="2"
              y1="4"
              x2="28"
              y2="28"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7C3AED" />
              <stop offset="0.5" stopColor="#6D28D9" />
              <stop offset="1" stopColor="#4C1D95" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showWordmark && (
        <span className={`${textSizes} text-[#18181B] font-extrabold tracking-tight`}>
          GEMS
        </span>
      )}
    </div>
  );
};
