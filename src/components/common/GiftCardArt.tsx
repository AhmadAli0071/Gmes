import React from 'react';
import { GiftData } from '../../types';
import { CardDesign, BadgeStyle } from '../../data/moodThemes';

interface GiftCardArtProps {
  gift: Partial<GiftData>;
  design: CardDesign;
  className?: string;
}

const Badge: React.FC<{ style: BadgeStyle; bg: string; color: string; children: React.ReactNode }> = ({
  style,
  bg,
  color,
  children,
}) => {
  if (style === 'ribbon') {
    return (
      <span
        className="relative inline-flex items-center max-w-full px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] shadow-xs"
        style={{ backgroundColor: bg, color }}
      >
        {children}
        <span
          className="absolute -left-2 top-0 h-full w-2 shrink-0"
          style={{ background: `linear-gradient(135deg, ${bg} 50%, transparent 50%)` }}
        />
        <span
          className="absolute -right-2 top-0 h-full w-2 shrink-0"
          style={{ background: `linear-gradient(-135deg, ${bg} 50%, transparent 50%)` }}
        />
      </span>
    );
  }
  if (style === 'tag') {
    return (
      <span
        className="inline-flex items-center max-w-full px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] rounded-sm shadow-xs truncate"
        style={{ backgroundColor: bg, color, transform: 'rotate(-1.5deg)' }}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center max-w-full px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] rounded-full shadow-xs truncate"
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </span>
  );
};

const Frame: React.FC<{ design: CardDesign }> = ({ design }) => {
  const { frameStyle, frameOuter, frameInner, frameWidth } = design;

  if (frameStyle === 'hairline') {
    return (
      <>
        <div
          className="absolute inset-3 rounded-lg pointer-events-none transition-colors duration-500"
          style={{ border: `${Math.max(1, frameWidth / 3)}px solid ${frameOuter}` }}
        />
        <div
          className="absolute inset-[18px] rounded-md pointer-events-none transition-colors duration-500"
          style={{ border: `1px solid ${frameInner}` }}
        />
      </>
    );
  }

  if (frameStyle === 'dashed') {
    return (
      <>
        <div
          className="absolute inset-3 pointer-events-none transition-colors duration-500"
          style={{ border: `${frameWidth}px dashed ${frameOuter}`, borderRadius: '18px' }}
        />
        <div
          className="absolute inset-[26px] pointer-events-none transition-colors duration-500"
          style={{ border: `3px dashed ${frameInner}`, borderRadius: '12px' }}
        />
      </>
    );
  }

  if (frameStyle === 'plaid') {
    return (
      <>
        <div
          className="absolute inset-2.5 pointer-events-none transition-colors duration-500"
          style={{
            border: `${frameWidth}px solid ${frameOuter}`,
            borderRadius: '14px',
          }}
        />
        <div
          className="absolute inset-[30px] pointer-events-none transition-colors duration-500"
          style={{
            border: `4px solid ${frameInner}`,
            borderRadius: '8px',
            backgroundImage: `repeating-linear-gradient(45deg, ${frameInner}22 0 6px, transparent 6px 16px)`,
          }}
        />
      </>
    );
  }

  if (frameStyle === 'double') {
    return (
      <>
        <div
          className="absolute inset-3 pointer-events-none transition-colors duration-500"
          style={{ border: `${frameWidth}px solid ${frameOuter}`, borderRadius: '20px' }}
        />
        <div
          className="absolute inset-[26px] pointer-events-none transition-colors duration-500"
          style={{ border: `3px solid ${frameInner}`, borderRadius: '14px' }}
        />
      </>
    );
  }

  // ornate
  return (
    <>
      <div
        className="absolute inset-3 pointer-events-none transition-colors duration-500"
        style={{
          border: `${frameWidth}px solid ${frameOuter}`,
          borderRadius: '16px',
          boxShadow: `inset 0 0 0 2px ${frameInner}55`,
        }}
      />
      <div
        className="absolute inset-[24px] pointer-events-none transition-colors duration-500"
        style={{ border: `2px solid ${frameInner}`, borderRadius: '10px' }}
      />
    </>
  );
};

const Corners: React.FC<{ design: CardDesign }> = ({ design }) => (
  <>
    {[
      'left-6 top-5',
      'right-6 top-5',
      'left-6 bottom-5',
      'right-6 bottom-5',
    ].map((pos) => (
      <span
        key={pos}
        className={`absolute ${pos} text-lg leading-none pointer-events-none opacity-80 select-none`}
      >
        {design.cornerGlyph}
      </span>
    ))}
  </>
);

const Divider: React.FC<{ design: CardDesign }> = ({ design }) => {
  const { dividerStyle, dividerColor, dividerGlyph } = design;

  if (dividerStyle === 'rule') {
    return (
      <div className="flex items-center justify-center gap-3 my-3">
        <span className="h-px w-16 bg-current opacity-30" style={{ color: dividerColor }} />
        <span className="text-xs" style={{ color: dividerColor }}>
          {dividerGlyph}
        </span>
        <span className="h-px w-16 bg-current opacity-30" style={{ color: dividerColor }} />
      </div>
    );
  }

  if (dividerStyle === 'dashed') {
    return (
      <div className="flex items-center justify-center gap-3 my-3">
        <span className="h-0 w-16 border-t-2 border-dashed" style={{ borderColor: dividerColor }} />
        <span className="text-sm">{dividerGlyph}</span>
        <span className="h-0 w-16 border-t-2 border-dashed" style={{ borderColor: dividerColor }} />
      </div>
    );
  }

  if (dividerStyle === 'double') {
    return (
      <div className="flex items-center justify-center gap-3 my-3">
        <span className="h-[3px] w-16 border-y" style={{ borderColor: dividerColor }} />
        <span className="text-sm" style={{ color: dividerColor }}>
          {dividerGlyph}
        </span>
        <span className="h-[3px] w-16 border-y" style={{ borderColor: dividerColor }} />
      </div>
    );
  }

  // ornament
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <span className="h-px w-16" style={{ background: dividerColor }} />
      <span
        className="grid h-7 w-7 place-items-center rounded-full text-xs"
        style={{ background: `${dividerColor}1A`, color: dividerColor }}
      >
        {dividerGlyph}
      </span>
      <span className="h-px w-16" style={{ background: dividerColor }} />
    </div>
  );
};

/**
 * Flat 2D greeting-card preview. Renders the exact same mood design that the
 * 3D canvas card uses, so designers see it live without opening the box.
 */
export const GiftCardArt: React.FC<GiftCardArtProps> = ({ gift, design, className = '' }) => {
  const recipient = gift.recipientName?.trim() || 'Someone Special';
  const sender = gift.senderName?.trim() || 'A Friend';
  const message =
    gift.message?.trim() ||
    'Wishing you endless joy, laughter, and sweet moments today and always!';
  const fontStyle = gift.fontStyle || 'editorial';

  const fontClass =
    fontStyle === 'handwritten'
      ? 'font-["Caveat",cursive] text-xl sm:text-2xl tracking-normal leading-snug'
      : fontStyle === 'editorial'
      ? 'font-["Playfair_Display",Georgia,serif] text-sm sm:text-base italic leading-relaxed'
      : 'font-sans text-sm leading-relaxed';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl shadow-lg transition-colors duration-500 ${className}`}
      style={{
        aspectRatio: '4 / 5',
        background: `linear-gradient(150deg, ${design.paper[0]} 0%, ${design.paper[1]} 34%, ${design.paper[2]} 70%, ${design.paper[3]} 100%)`,
        border: `1px solid ${design.letterBorder}`,
      }}
    >
      <Frame design={design} />
      <Corners design={design} />

      <div className="relative h-full w-full px-8 py-6 sm:px-11 sm:py-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mt-2 sm:mt-4">
          <Badge style={design.badgeStyle} bg={design.badgeBg} color={design.badgeText}>
            For {recipient}
          </Badge>
        </div>

        {/* Greeting */}
        <p
          className="mt-3 sm:mt-5 text-base sm:text-xl font-extrabold tracking-tight leading-tight break-words transition-colors duration-500"
          style={{ color: design.greetingColor }}
        >
          Dearest {recipient}
        </p>

        <Divider design={design} />

        {/* Message */}
        <p
          className={`${fontClass} text-balance italic px-1 transition-colors duration-500 flex-1 min-h-0 overflow-hidden flex items-center`}
          style={{ color: design.bodyColor }}
        >
          “{message}”
        </p>

        {/* Signature */}
        <div className="mt-auto w-full pt-3 sm:pt-4 shrink-0">
          <div
            className="mx-auto mb-2 sm:mb-3 h-px w-24 transition-colors duration-500"
            style={{ background: design.letterDividerColor }}
          />
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            With all my love
          </p>
          <p
            className="mt-1 text-base sm:text-lg font-bold transition-colors duration-500"
            style={{ color: design.signatureColor }}
          >
            {sender}
          </p>
        </div>
      </div>
    </div>
  );
};
