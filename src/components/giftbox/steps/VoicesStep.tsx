import React, { useEffect, useRef, useState } from 'react';
import PlayIcon from '../PlayIcon';
import type { RevealStep } from '../types';

const BARS = Array.from({ length: 14 }, (_, j) => 6 + Math.round(Math.abs(Math.sin(j * 1.3)) * 18));

interface VoicesStepProps {
  step: Extract<RevealStep, { type: 'voices' }>;
  /** Host-level mute switch (the gift screen's speaker toggle). */
  muted?: boolean;
}

/** step: { type: 'voices', title?, voices: [{ name, duration, src? }] } */
const VoicesStep: React.FC<VoicesStepProps> = ({ step, muted = false }) => {
  const voices = step.voices || [];
  const [playing, setPlaying] = useState(-1);
  const audios = useRef<Record<number, HTMLAudioElement>>({});

  useEffect(() => {
    const store = audios.current;
    return () => Object.values(store).forEach((a) => a.pause());
  }, []);

  useEffect(() => {
    const store = audios.current;
    Object.values(store).forEach((a) => {
      a.muted = muted;
      if (muted) a.pause();
    });
    if (muted) setPlaying(-1);
  }, [muted]);

  const toggle = (k: number) => {
    Object.values(audios.current).forEach((a) => a.pause());
    if (playing === k) {
      setPlaying(-1);
      return;
    }
    if (muted) return;

    const src = voices[k].src;
    if (src) {
      const a = (audios.current[k] = audios.current[k] || new Audio(src));
      a.muted = false;
      a.onended = () => setPlaying(-1);
      a.play().catch(() => setPlaying(-1));
    }
    setPlaying(k);
  };

  return (
    <>
      <h2>{step.title || (voices.length > 1 ? 'Voices for you' : 'Press play')}</h2>
      <div className="vlist">
        {voices.map((v, k) => (
          <button
            type="button"
            key={`${v.name}-${k}`}
            className="vrow"
            style={{ '--k': k } as React.CSSProperties}
            onClick={() => toggle(k)}
            aria-pressed={playing === k}
            aria-label={`${playing === k ? 'Pause' : 'Play'} voice note from ${v.name}`}
          >
            <span className="play">
              <PlayIcon />
            </span>
            <span className="txt">
              <b>{v.name}</b>
              <small>{v.duration}</small>
            </span>
            <span className={'wave' + (playing === k ? ' go' : '')} aria-hidden="true">
              {BARS.map((h, i) => (
                <span key={i} style={{ '--i': i, '--h': `${h}px` } as React.CSSProperties} />
              ))}
            </span>
          </button>
        ))}
      </div>
      <span className="meta">
        {voices.length > 1
          ? `${voices.length} voice notes. Tap one to listen`
          : voices[0]?.duration
            ? `Voice note, ${voices[0].duration}`
            : ''}
      </span>
    </>
  );
};

export default VoicesStep;
