import React from 'react';

interface Sparkle {
  left: string;
  top: string;
  size: number;
  color: string;
  delay: string;
  duration: string;
}

/** Scattered across the viewport, away from the dense text columns. */
const SPARKLES: Sparkle[] = [
  { left: '7%', top: '10%', size: 13, color: '#A78BFA', delay: '0s', duration: '3.2s' },
  { left: '18%', top: '34%', size: 9, color: '#FCD34D', delay: '1.1s', duration: '3.8s' },
  { left: '12%', top: '62%', size: 11, color: '#F9A8D4', delay: '2.3s', duration: '3.4s' },
  { left: '26%', top: '82%', size: 8, color: '#C4B5FD', delay: '0.6s', duration: '4.2s' },
  { left: '34%', top: '16%', size: 10, color: '#F9A8D4', delay: '3.0s', duration: '3.6s' },
  { left: '44%', top: '70%', size: 12, color: '#A78BFA', delay: '1.7s', duration: '4.0s' },
  { left: '52%', top: '24%', size: 8, color: '#FCD34D', delay: '2.7s', duration: '3.3s' },
  { left: '61%', top: '88%', size: 10, color: '#F9A8D4', delay: '0.4s', duration: '3.9s' },
  { left: '70%', top: '12%', size: 12, color: '#C4B5FD', delay: '2.0s', duration: '3.5s' },
  { left: '78%', top: '46%', size: 9, color: '#A78BFA', delay: '3.4s', duration: '4.1s' },
  { left: '86%', top: '74%', size: 11, color: '#FCD34D', delay: '1.4s', duration: '3.7s' },
  { left: '92%', top: '22%', size: 8, color: '#F9A8D4', delay: '2.9s', duration: '3.1s' },
  { left: '3%', top: '44%', size: 9, color: '#C4B5FD', delay: '1.9s', duration: '4.3s' },
  { left: '96%', top: '56%', size: 10, color: '#A78BFA', delay: '0.9s', duration: '3.6s' },
];

/**
 * Ambient landing-page backdrop: three slow-drifting aurora blobs plus
 * twinkling 4-point sparkles. Pure CSS animation, no per-frame JS, and it
 * sits behind every section so text contrast never changes.
 */
export const AnimatedBackdrop: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <span className="aurora aurora-a" />
    <span className="aurora aurora-b" />
    <span className="aurora aurora-c" />

    {SPARKLES.map((s, i) => (
      <span
        key={i}
        className="aurora-sparkle"
        style={{
          left: s.left,
          top: s.top,
          width: s.size,
          height: s.size,
          background: s.color,
          animationDelay: s.delay,
          animationDuration: s.duration,
        }}
      />
    ))}
  </div>
);
