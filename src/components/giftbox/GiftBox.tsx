import React from 'react';
import type { GiftPhase } from './types';

const CHIPS = [
  { emoji: '\u{1F48C}', dx: -105, dy: -120, r: -12 },
  { emoji: '\u{1F4F7}', dx: -40, dy: -175, r: 8 },
  { emoji: '\u{1F3A4}', dx: 40, dy: -175, r: -8 },
  { emoji: '\u{1F3AC}', dx: 105, dy: -120, r: 12 },
];

interface GiftBoxProps {
  phase: GiftPhase;
  onOpen: () => void;
  sceneRef: React.RefObject<HTMLButtonElement | null>;
  label: string;
}

/** The 3D box. `phase` is 'closed' | 'shake' | 'open' | 'done'. */
const GiftBox: React.FC<GiftBoxProps> = ({ phase, onOpen, sceneRef, label }) => {
  const cls = [
    'scene',
    phase !== 'closed' && 'shake',
    (phase === 'open' || phase === 'done') && 'open',
    phase === 'done' && 'done',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      ref={sceneRef}
      className={cls}
      onClick={onOpen}
      aria-label={label}
      tabIndex={phase === 'done' ? -1 : 0}
    >
      <span className="rays" aria-hidden="true" />
      <span className="shadow" aria-hidden="true" />
      <span className="float">
        <span className="wig">
          <span className="cube">
            <span className="f s fr" />
            <span className="f s bk" />
            <span className="f s rt" />
            <span className="f s lf" />
            <span className="f in" />
            <span className="lid">
              <span className="f ls lfr" />
              <span className="f ls lbk" />
              <span className="f ls lrt" />
              <span className="f ls llf" />
              <span className="f t" />
              <span className="bow">
                <i />
                <i />
                <b />
              </span>
            </span>
          </span>
        </span>
      </span>
      {CHIPS.map((c, i) => (
        <span
          key={c.emoji}
          className="chip"
          aria-hidden="true"
          style={
            {
              '--i': i,
              '--dx': `${c.dx}px`,
              '--dy': `${c.dy}px`,
              '--r': `${c.r}deg`,
            } as React.CSSProperties
          }
        >
          {c.emoji}
        </span>
      ))}
    </button>
  );
};

export default GiftBox;
