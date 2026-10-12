import { useEffect } from 'react';
import { FAQS, PAGES, PageMeta, SITE } from '../data/seoContent';

/* -------------------------------------------------------------------------- */
/* URLs                                                                        */
/* -------------------------------------------------------------------------- */

/** Absolute URL for a hash route, e.g. `#/pricing` -> `https://site/#/pricing`. */
export function canonicalUrl(path: string): string {
  const base = SITE.url.replace(/\/+$/, '');
  const rest = (path || '').replace(/^#\/?/, '');
  return rest ? `${base}/#/${rest}` : `${base}/`;
}

/** Absolute URL for a root-relative asset (`/og-image.png`). */
export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/+$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/* -------------------------------------------------------------------------- */
/* Head tag writers                                                            */
/* -------------------------------------------------------------------------- */

function setMeta(kind: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${kind}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(kind, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string): void {
  const selector = `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Adds or replaces a `application/ld+json` block keyed by its script id. */
export function setJsonLd(id: string, data: unknown): void {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function setRobots(content: string): void {
  setMeta('name', 'robots', content);
}

/** Applies title/description/canonical/OG for the route currently on screen. */
export function applyPageMeta(page: PageMeta, options: { noindex?: boolean } = {}): void {
  const url = canonicalUrl(page.path);

  document.title = page.title;

  setMeta('name', 'description', page.description);
  setLink('canonical', url);

  setMeta('property', 'og:title', page.title);
  setMeta('property', 'og:description', page.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:site_name', SITE.name);

  setMeta('name', 'twitter:title', page.title);
  setMeta('name', 'twitter:description', page.description);
  setMeta('name', 'twitter:url', url);

  // Private screens (dashboard, admin, settings, a single shared gift) must
  // never be indexed; public marketing screens are indexable by default.
  setRobots(options.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

  setJsonLd('gems-breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('#/') },
      ...(page.path === '#/'
        ? []
        : [
            {
              '@type': 'ListItem',
              position: 2,
              name: page.title.split('|')[0].trim(),
              item: url,
            },
          ]),
    ],
  });
}

const NOINDEX_VIEWS = new Set(['recipient', 'dashboard', 'admin', 'settings']);

/**
 * Structured data that is derived from on-page copy, so it is injected once
 * the app boots and can never disagree with what the visitor reads.
 * (Organization / WebSite / SoftwareApplication live statically in index.html.)
 */
export function injectContentSchema(): void {
  setJsonLd('gems-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  });

  setJsonLd('gems-howto', {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to send a virtual gift online',
    description:
      'Create a personalized digital gift box with photos, a voice note and a message, then share it as one link — no app required.',
    totalTime: 'PT1M',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Pick a gift design',
        text: 'Choose from 36 gift designs across 12 occasions, or start from a blank box.',
      },
      {
        '@type': 'HowToStep',
        name: 'Add your photos, voice note and message',
        text: 'Drop in photos, record a short voice note in your own voice, write the message and choose the mood.',
      },
      {
        '@type': 'HowToStep',
        name: 'Send the link',
        text: 'Copy the shareable link or QR code and send it over WhatsApp, email or any chat. They open it in their browser and the box unwraps.',
      },
    ],
  });
}

/** Keeps the document head in sync with the current route. */
export function usePageMeta(view: string): void {
  useEffect(() => {
    const noindex = NOINDEX_VIEWS.has(view);
    const page = PAGES[view];
    if (page) applyPageMeta(page, { noindex });
    else if (noindex) setRobots('noindex, nofollow');
  }, [view]);
}
