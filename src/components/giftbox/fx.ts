const COLORS = ['#ff4f8b', '#ffc95c', '#8f6bff', '#3ee0a8', '#fff'];

const reduced = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Confetti lives on `document.body`, not inside the component: any ancestor
 * with a `transform` would otherwise turn `position: fixed` into a local
 * containing block and fling the particles to the wrong place.
 */
const live = new Set<HTMLElement>();

function spawn(cls: string, vars: Record<string, string>): HTMLElement {
  const el = document.createElement('i');
  el.className = `gbr-fx ${cls}`;
  Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
  document.body.appendChild(el);
  live.add(el);
  window.setTimeout(() => {
    el.remove();
    live.delete(el);
  }, 4200);
  return el;
}

/** Sparkles + confetti bursting out of `originEl`. */
export function burst(originEl?: HTMLElement | null): void {
  if (!originEl || reduced()) return;
  const r = originEl.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height * 0.4;

  for (let j = 0; j < 26; j++) {
    const a = Math.random() * 6.28;
    const d = 90 + Math.random() * 130;
    const n = spawn('spark', {
      '--s': 8 + Math.random() * 16 + 'px',
      '--c': COLORS[j % 5],
      '--x': Math.cos(a) * d + 'px',
      '--y': Math.sin(a) * d - 40 + 'px',
    });
    n.style.left = `${x}px`;
    n.style.top = `${y}px`;
  }

  for (let j = 0; j < 70; j++) {
    const c = spawn('conf', {
      '--c': COLORS[j % 5],
      '--x': `${Math.random() * 340 - 170}px`,
      '--u': `${-(120 + Math.random() * 180)}px`,
      '--r': `${Math.random() * 900}deg`,
      '--t': `${2.2 + Math.random() * 1.6}s`,
    });
    c.style.left = `${x}px`;
    c.style.top = `${y}px`;
    if (j % 3 === 0) c.style.borderRadius = '50%';
  }
}

/** Emojis floating up from a reaction button. */
export function floatEmoji(anchorEl?: HTMLElement | null, emoji?: string): void {
  if (!anchorEl || !emoji || reduced()) return;
  const r = anchorEl.getBoundingClientRect();
  for (let j = 0; j < 6; j++) {
    const f = spawn('fl', { '--x': `${Math.random() * 120 - 60}px` });
    f.textContent = emoji;
    f.style.left = `${r.left + r.width / 2}px`;
    f.style.top = `${r.top}px`;
    f.style.animationDelay = `${j * 90}ms`;
  }
}

/** Drop any particles still in flight (call on unmount). */
export function clearFx(): void {
  live.forEach((el) => el.remove());
  live.clear();
}
