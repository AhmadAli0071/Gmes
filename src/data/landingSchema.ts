import { SITE } from './seoContent';
import type { LandingPage } from './landingPages';

/** Stable Organization id referenced by Article.publisher. */
export const ORGANIZATION_ID = `${SITE.url}/#organization`;

/** FAQPage for a landing page, with the `#faq` fragment id from the brief. */
export function landingFaqSchema(page: LandingPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE.url}/${page.slug}#faq`,
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

/** Article schema for SEO blog posts; `null` for the older landing pages. */
export function landingArticleSchema(page: LandingPage) {
  if (!page.article) return null;

  const url = `${SITE.url}/${page.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: page.h1,
    description: page.metaDescription,
    image: {
      '@type': 'ImageObject',
      url: `${SITE.url}/og-image.png`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: `${SITE.url}/`,
    },
    publisher: { '@id': ORGANIZATION_ID },
    datePublished: page.article.datePublished,
    dateModified: page.article.dateModified,
    inLanguage: 'en-US',
  };
}
