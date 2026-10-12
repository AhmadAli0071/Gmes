import React, { useEffect, useState } from 'react';
import type { RevealStep } from '../types';

interface PhotosStepProps {
  step: Extract<RevealStep, { type: 'photos' }>;
}

/** step: { type: 'photos', title?, photos: [{ src?, caption? }] }  (no src = gradient placeholder) */
const PhotosStep: React.FC<PhotosStepProps> = ({ step }) => {
  const photos = step.photos || [];
  const n = photos.length;
  const [top, setTop] = useState(0);

  // after the last photo is flicked away, bring the pile back
  useEffect(() => {
    if (n > 1 && top >= n) {
      const t = window.setTimeout(() => setTop(0), 700);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [top, n]);

  const next = () => n > 1 && top < n && setTop((t) => t + 1);
  const title = step.title || (n > 1 ? 'Remember these days?' : 'Remember this day?');

  return (
    <>
      <h2>{title}</h2>
      <div
        className="pile"
        onClick={next}
        {...(n > 1
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': 'Show next photo',
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  next();
                }
              },
            }
          : {})}
      >
        {photos.map((p, k) => {
          const d = k - top;
          const rot = (k % 2 ? 1 : -1) * (2 + (k % 3) * 2);
          const style: Record<string, string | number> = {
            '--dl': `${k * 0.3}s`,
            '--hue': 335 - k * 42,
            zIndex: n - k,
          };
          if (d < 0) {
            style.transform = 'translate(130%,-30px) rotate(28deg)';
            style.opacity = 0;
            style.pointerEvents = 'none';
          } else {
            style.transform = `translateY(${d * 9}px) rotate(${d ? rot : -1}deg) scale(${1 - d * 0.04})`;
            style.opacity = d > 3 ? 0 : 1;
          }
          return (
            <div
              key={k}
              className={'polaroid pp' + (p.src ? ' real' : '')}
              style={style as React.CSSProperties}
            >
              <div
                role="img"
                aria-label={p.caption || `Photo ${k + 1}`}
                style={p.src ? { backgroundImage: `url(${p.src})` } : undefined}
              />
              <span>{p.caption}</span>
            </div>
          );
        })}
      </div>
      <div className="ctr">{n > 1 ? `${Math.min(top + 1, n)} of ${n}` : ''}</div>
      <span className="meta">
        {n > 1 ? 'Tap the top photo to see the next one' : photos[0]?.note || ''}
      </span>
    </>
  );
};

export default PhotosStep;
