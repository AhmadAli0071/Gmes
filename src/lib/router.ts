import { LANDING_VIEWS, ViewRoute } from '../types';

/* -------------------------------------------------------------------------- */
/* Path-based routing - the URL (no `#`) is the source of truth, so back/      */
/* forward, refresh and shared `/g/{shareCode}` links all resolve correctly.   */
/* -------------------------------------------------------------------------- */

export const ROUTES: ViewRoute[] = [
  'home',
  'create',
  'explore',
  'how-it-works',
  'pricing',
  'dashboard',
  'admin',
  'settings',
  'blog',
  ...LANDING_VIEWS,
];

/** `/create/` and `//create` are the same screen as `/create`. */
function normalize(pathname: string): string {
  return pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';
}

/** Parses a pathname. `null` means "not a route we own" (asset, typo, ...). */
export function pathToRoute(pathname: string): { view: ViewRoute; giftCode?: string } | null {
  const path = normalize(pathname);
  if (path === '/') return { view: 'home' };

  const raw = path.slice(1);
  if (raw.startsWith('g/')) {
    const code = decodeURIComponent(raw.slice(2)).trim();
    return code ? { view: 'recipient', giftCode: code } : null;
  }

  const match = ROUTES.find((route) => route === raw);
  return match ? { view: match } : null;
}

export function routeToPath(view: ViewRoute, giftCode?: string): string {
  if (view === 'recipient') return giftCode ? `/g/${encodeURIComponent(giftCode)}` : '/';
  if (view === 'home') return '/';
  return `/${view}`;
}

/**
 * Fired after `writePath` updates the URL. `AppContext` listens for it the same
 * way it listens for `popstate`.
 */
export const ROUTE_EVENT = 'gems:route';

/**
 * Pushes the URL for a view.
 *
 * The follow-up notification is deferred to a macrotask on purpose: that is
 * how `hashchange` used to behave, and the recipient-mode bookkeeping
 * (`arriving`, `viewBeforeRecipient`) reads a ref that React only updates once
 * the current update has been flushed.
 */
export function writePath(view: ViewRoute, giftCode?: string): void {
  const target = routeToPath(view, giftCode);
  if (window.location.pathname === target) return;
  window.history.pushState(null, '', target);
  window.setTimeout(() => window.dispatchEvent(new Event(ROUTE_EVENT)), 0);
}

/** Registers the URL -> state sync. Returns the unsubscribe function. */
export function onRouteChange(handler: () => void): () => void {
  window.addEventListener('popstate', handler);
  window.addEventListener(ROUTE_EVENT, handler);
  return () => {
    window.removeEventListener('popstate', handler);
    window.removeEventListener(ROUTE_EVENT, handler);
  };
}

/**
 * Called once before the first render.
 *
 * - Old hash links (`/#/g/abc`, `/#/pricing`) are rewritten in place so every
 *   share link ever sent keeps working.
 * - Anything we do not recognise lands on `/` instead of rendering home under
 *   a bogus URL.
 */
export function bootstrapRoute(): void {
  const { hash, pathname, search } = window.location;

  // A legacy hash wins: it is the more specific of the two.
  const candidate = hash.startsWith('#/') ? hash.slice(1) : pathname;
  const parsed = candidate.split('?')[0];

  if (pathToRoute(parsed)) {
    if (candidate !== pathname) window.history.replaceState(null, '', candidate + search);
  } else {
    window.history.replaceState(null, '', '/');
  }
}
