import React, { useEffect, useMemo, useRef, useState } from 'react';
import GiftBox from './GiftBox';
import NoteStep from './steps/NoteStep';
import PhotosStep from './steps/PhotosStep';
import VoicesStep from './steps/VoicesStep';
import VideosStep from './steps/VideosStep';
import FinalStep from './steps/FinalStep';
import { burst, clearFx } from './fx';
import type { GiftPhase, Reaction, RevealGift, RevealVariant } from './types';
import './gift-box-reveal.css';

const STEP_COMPONENT = {
  note: NoteStep,
  photos: PhotosStep,
  voices: VoicesStep,
  videos: VideosStep,
} as const;

const OPEN_SHAKE_MS = 600;
const OPEN_DONE_MS = 2700;

export interface GiftBoxRevealProps {
  gift: RevealGift;
  /** Controlled open state — the host owns it so it can replay / reset. */
  opened: boolean;
  /** Called when the recipient taps the sealed box. */
  onOpen?: () => void;
  /** Called by "Open it again". Defaults to `onOpen` (which toggles). */
  onReset?: () => void;
  /** Fired once the open animation finishes. */
  onOpened?: () => void;
  onReact?: (reaction: Reaction) => void;
  /** Host-level mute switch for voice notes. */
  muted?: boolean;
  /** Hide the built-in heading (host renders its own). */
  showHeading?: boolean;
  variant?: RevealVariant;
  className?: string;
}

/**
 * A 3D gift box that opens with an animated reveal, then walks the recipient
 * through the gift: a note, photos, voice notes, videos, and a reaction card.
 * Fully controlled — `opened` drives the sequence.
 */
export const GiftBoxReveal: React.FC<GiftBoxRevealProps> = ({
  gift,
  opened,
  onOpen,
  onReset,
  onOpened,
  onReact,
  muted = false,
  showHeading = true,
  variant = 'page',
  className = '',
}) => {
  const { recipient, sender, steps = [] } = gift;
  const [anim, setAnim] = useState<'idle' | 'shake' | 'open'>('idle');
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLButtonElement>(null);

  // Latest callbacks in refs so the open-sequence effect never goes stale.
  const cbs = useRef({ onOpened });
  cbs.current = { onOpened };

  const total = steps.length + 1; // + reactions card
  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        d: 1.5 + Math.random() * 3,
      })),
    []
  );

  useEffect(() => () => clearFx(), []);

  // The sealed → open sequence, driven by the controlled `opened` flag.
  useEffect(() => {
    if (!opened) {
      setAnim('idle');
      setIdx(0);
      setDone(false);
      return undefined;
    }
    setAnim('shake');
    const timers = [
      window.setTimeout(() => {
        setAnim('open');
        burst(sceneRef.current);
      }, OPEN_SHAKE_MS),
      window.setTimeout(() => {
        setIdx(0);
        setDone(true);
        cbs.current.onOpened?.();
      }, OPEN_DONE_MS),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [opened]);

  // Confetti when the reactions card appears.
  useEffect(() => {
    if (!done || idx !== total - 1) return undefined;
    const t = window.setTimeout(() => burst(sceneRef.current), 300);
    return () => window.clearTimeout(t);
  }, [done, idx, total]);

  const phase: GiftPhase = !opened ? 'closed' : done ? 'done' : anim === 'shake' ? 'shake' : 'open';

  const handleBoxClick = () => {
    if (phase !== 'closed') return;
    onOpen?.();
  };

  const handleReset = () => {
    if (onReset) onReset();
    else onOpen?.();
  };

  const active = idx < steps.length ? steps[idx] : null;
  const variantCls = variant === 'card' ? 'gbr-card' : variant === 'bare' ? 'gbr-bare' : '';

  const content = (
    <>
      {stars.map((s, i) => (
        <i
          key={i}
          className="star"
          aria-hidden="true"
          style={{ left: `${s.left}%`, top: `${s.top}%`, '--d': `${s.d}s` } as React.CSSProperties}
        />
      ))}
      <i
        className="orb"
        aria-hidden="true"
        style={
          {
            background: '#ff4f8b',
            width: 260,
            height: 260,
            left: '5%',
            top: '10%',
            '--x': '8vw',
            '--y': '8vh',
            '--d': '9s',
          } as React.CSSProperties
        }
      />
      <i
        className="orb"
        aria-hidden="true"
        style={
          {
            background: '#6b4bff',
            width: 320,
            height: 320,
            left: '60%',
            top: '55%',
            '--x': '6vw',
            '--y': '-10vh',
            '--d': '12s',
          } as React.CSSProperties
        }
      />
      <i
        className="orb"
        aria-hidden="true"
        style={
          {
            background: '#ffc95c',
            width: 180,
            height: 180,
            left: '70%',
            top: '5%',
            '--x': '-6vw',
            '--y': '12vh',
            '--d': '10s',
          } as React.CSSProperties
        }
      />

      <div className="gbr-main">
        {showHeading && (
          <>
            <h1>
              {done
                ? gift.title || `A gift for ${recipient}`
                : `${recipient}, ${sender} sent you something`}
            </h1>
            <p className="sub">
              {phase === 'open'
                ? 'Surprise!'
                : done
                  ? gift.subtitle || `Something from ${sender} in every layer.`
                  : "It's waiting inside."}
            </p>
          </>
        )}

        <GiftBox
          phase={phase}
          onOpen={handleBoxClick}
          sceneRef={sceneRef}
          label={`Open your gift box from ${sender}`}
        />
        {phase === 'closed' && <p className="hint">Tap the box to open it</p>}

        {done && (
          <section className="deck" aria-live="polite">
            <div className="wrap">
              <div className="card" key={idx}>
                {active ? (
                  active.type === 'note' ? (
                    <NoteStep step={active} sender={sender} />
                  ) : active.type === 'photos' ? (
                    <PhotosStep step={active} />
                  ) : active.type === 'voices' ? (
                    <VoicesStep step={active} muted={muted} />
                  ) : (
                    <VideosStep step={active} />
                  )
                ) : (
                  <FinalStep sender={sender} onReact={onReact} />
                )}
              </div>
            </div>
            <div className="nav">
              <button type="button" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>
                Back
              </button>
              <div className="dots" aria-hidden="true">
                {Array.from({ length: total }, (_, i) => (
                  <i key={i} className={i === idx ? 'a' : ''} />
                ))}
              </div>
              <button
                type="button"
                className="next"
                disabled={idx === total - 1}
                onClick={() => setIdx((i) => i + 1)}
              >
                {idx === total - 1 ? 'Done' : 'Next'}
              </button>
            </div>
            <button type="button" className="again" onClick={handleReset}>
              Open it again
            </button>
          </section>
        )}
      </div>
    </>
  );

  if (variant === 'bare') {
    return (
      <div ref={rootRef} className={`gbr gbr-bare ${className}`.trim()}>
        {content}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`gbr ${variantCls} ${className}`.trim()}>
      {content}
    </div>
  );
};

export default GiftBoxReveal;
