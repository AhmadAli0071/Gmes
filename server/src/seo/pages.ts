import { FAQS, PAGES, SITE } from '../../../src/data/seoContent';
import { LANDING_PAGES } from '../../../src/data/landingPages';

interface Faq {
  q: string;
  a: string;
}

interface SeoPage {
  path: string;
  title: string;
  description: string;
  content: string;
  faqs?: Faq[];
  schemaId?: string;
}

const BLOG_PREVIEWS = [
  {
    title: 'Virtual Birthday Gift Ideas',
    excerpt: 'Celebrate together, wherever you are, with photos, a voice note and one link.',
    path: '/virtual-birthday-gift',
  },
  {
    title: 'Digital Anniversary Gift Ideas',
    excerpt: 'Relive your love story, one memory at a time, in a 3D gift box.',
    path: '/anniversary-digital-gift',
  },
  {
    title: "Valentine's Day Virtual Gift Ideas",
    excerpt: 'Romantic ideas that feel personal because every photo and word comes from you.',
    path: '/valentines-day-virtual-gift',
  },
  {
    title: 'Long Distance Relationship Gifts',
    excerpt: 'Close the distance with your voice, your photos and a message they can replay.',
    path: '/long-distance-gift-ideas',
  },
  {
    title: 'Christmas Digital Gift Card Ideas',
    excerpt: 'Holiday magic in one link - photos, a voice note and a festive 3D gift box.',
    path: '/christmas-digital-gift-card',
  },
  {
    title: 'Surprise a Long Distance Partner on Their Birthday',
    excerpt: 'A simple plan across time zones - timing tips, gift ideas and mistakes to avoid.',
    path: '/long-distance-birthday-surprise',
  },
  {
    title: "Last-Minute Christmas Gifts That Aren't Gift Cards",
    excerpt: 'Thoughtful ideas you can finish in an afternoon - digital, local and handmade.',
    path: '/last-minute-christmas-gift-ideas',
  },
];

const SITE_STYLES = `
<style>
.seo-fallback{max-width:56rem;margin:0 auto;padding:3rem 1.25rem 4rem;font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;color:#1E1B4B;line-height:1.7;background:#FAF7FF}
.seo-fallback h1{font-size:clamp(2rem,5vw,3.2rem);line-height:1.06;letter-spacing:-.035em;margin:0 0 1rem;font-weight:800}
.seo-fallback h2{font-size:clamp(1.35rem,3vw,1.8rem);line-height:1.2;letter-spacing:-.02em;margin:2.2rem 0 .6rem;font-weight:800}
.seo-fallback h3{font-size:1.05rem;line-height:1.35;margin:1.4rem 0 .35rem;font-weight:800}
.seo-fallback p{margin:.65rem 0;color:#374151}
.seo-fallback a{color:#6D28D9;font-weight:700;text-decoration-thickness:1px;text-underline-offset:2px}
.seo-fallback ul{padding-left:1.25rem;margin:.65rem 0}
.seo-fallback li{margin:.3rem 0;color:#374151}
.seo-fallback .seo-eyebrow{font-size:.72rem;text-transform:uppercase;letter-spacing:.14em;font-weight:800;color:#6D28D9;margin:0 0 .6rem}
.seo-fallback .seo-actions{display:flex;flex-wrap:wrap;gap:.6rem;margin:1.4rem 0}
.seo-fallback .seo-cta{display:inline-block;padding:.75rem 1.15rem;border-radius:999px;background:#6D28D9;color:#fff;text-decoration:none;font-weight:800}
.seo-fallback .seo-secondary{display:inline-block;padding:.75rem 1.15rem;border-radius:999px;border:1px solid #C4B5FD;color:#5B21B6;text-decoration:none;font-weight:800}
.seo-fallback table{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.92rem}
.seo-fallback th,.seo-fallback td{border:1px solid #E9E2F7;padding:.6rem;text-align:left;vertical-align:top}
.seo-fallback th{background:#F5F1FF;color:#1E1B4B}
.seo-fallback .seo-faq{border-top:1px solid #E9E2F7;margin-top:1.6rem;padding-top:.5rem}
.seo-fallback .seo-faq h3{font-size:1rem}
.seo-fallback .seo-related{display:flex;flex-wrap:wrap;gap:.5rem 1rem;margin:1rem 0}
</style>`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderRichText(text: string): string {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let cursor = 0;
  let html = '';

  for (const match of text.matchAll(linkPattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(text.slice(cursor, index));
    const label = match[1];
    const href = match[2].startsWith('/') ? match[2] : '/';
    html += `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    cursor = index + match[0].length;
  }

  return html + escapeHtml(text.slice(cursor));
}

function faqHtml(faqs: Faq[]): string {
  return faqs
    .map(
      (faq) =>
        `<div><h3>${escapeHtml(faq.q)}</h3><p>${escapeHtml(faq.a)}</p></div>`
    )
    .join('');
}

function faqSchema(faqs: Faq[], id: string): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return `<script type="application/ld+json" id="${id}">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function canonicalUrl(path: string): string {
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
}

function renderHead(page: SeoPage): string {
  const url = canonicalUrl(page.path);
  const schema = page.faqs && page.schemaId ? faqSchema(page.faqs, page.schemaId) : '';

  return `<!-- Primary -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="GEMS" />
    <meta name="rating" content="general" />

    <!-- Open Graph -->
    <meta property="og:locale" content="${SITE.locale}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE.name}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="https://gemsvg.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="GEMS - a 3D virtual gift box ready to unwrap" />
    <meta property="og:image:type" content="image/png" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:url" content="${escapeHtml(url)}" />
    <meta name="twitter:image" content="https://gemsvg.com/og-image.png" />
    <meta name="twitter:image:alt" content="GEMS - a 3D virtual gift box ready to unwrap" />
    ${schema}${SITE_STYLES}`;
}

const HOME_PAGE: SeoPage = {
  path: '/',
  title: PAGES.home.title,
  description: PAGES.home.description,
  schemaId: 'gems-faq',
  faqs: FAQS,
  content: `
<div class="seo-fallback">
  <main>
    <p class="seo-eyebrow">Free to start · No app needed · Works on any phone</p>
    <h1>Send a Virtual Gift Online: A Free Digital Gift Box in 60 Seconds</h1>
    <p>Build a personal gift with photos, a voice note and a message, then share it as one link. GEMS wraps everything in a 3D gift box that opens with a small surprise, so the person you miss can feel close in under a minute.</p>
    <div class="seo-actions">
      <a class="seo-cta" href="/create">Create a virtual gift</a>
      <a class="seo-secondary" href="/how-it-works">See how it works</a>
    </div>

    <h2>How to Send a Virtual Gift in 3 Easy Steps</h2>
    <h3>1. Add your memories</h3>
    <p>Upload the photos that tell your story, record a short voice note and write the words you want them to hear.</p>
    <h3>2. Choose a gift box</h3>
    <p>Pick a design that matches the occasion, from birthday confetti to romantic rose petals.</p>
    <h3>3. Share one link</h3>
    <p>Send the link by text, email or social media. They open it on any phone or computer with no app and no account.</p>

    <h2>A Digital Gift for Every Occasion</h2>
    <ul>
      <li><a href="/virtual-birthday-gift">Virtual birthday gift</a></li>
      <li><a href="/anniversary-digital-gift">Digital anniversary gift</a></li>
      <li><a href="/valentines-day-virtual-gift">Valentine's Day virtual gift</a></li>
      <li><a href="/christmas-digital-gift-card">Christmas digital gift card</a></li>
      <li>Mother's Day and Father's Day gifts</li>
      <li>Graduation, wedding and thank you gifts</li>
      <li>Halloween and just because surprises</li>
    </ul>

    <h2>Why a Virtual Gift Feels Better Than an E-Card</h2>
    <table>
      <thead><tr><th>Features</th><th>E-card</th><th>GEMS virtual gift</th></tr></thead>
      <tbody>
        <tr><td>Your photos</td><td>No</td><td>Yes</td></tr>
        <tr><td>Unwrapping experience</td><td>No</td><td>3D reveal</td></tr>
        <tr><td>Delivery time</td><td>Minutes</td><td>Instant</td></tr>
        <tr><td>Shipping needed</td><td>No</td><td>No</td></tr>
        <tr><td>Price</td><td>Free to $5</td><td>Free to start</td></tr>
      </tbody>
    </table>

    <h2>Perfect for Long Distance, Last Minute and Just Because</h2>
    <h3>Long distance</h3>
    <p>Miles apart? Send a gift that feels like you are in the room. Read our <a href="/long-distance-gift-ideas">long distance gift ideas</a>.</p>
    <h3>Last minute</h3>
    <p>Forgot a date? Create a heartfelt gift in about a minute, with no shipping delays.</p>
    <h3>Family abroad</h3>
    <p>Surprise your parents or friends in another country the moment you finish.</p>
    <h3>Just because</h3>
    <p>Small surprises make big memories.</p>

    <h2>A Small Gift. A Moment They Keep.</h2>
    <p>No app for them, no account to create, and a link that opens on any phone. Your photos, voice and words stay together in one link they can revisit anytime.</p>

    <h2>Free to Start, Simple to Upgrade</h2>
    <p>Create your first gift for free. Upgrade only if you want premium templates, HD unboxing animations or unlimited gifts. <a href="/pricing">See pricing</a>.</p>

    <div class="seo-faq">
      <h2>Frequently Asked Questions</h2>
      ${faqHtml(FAQS)}
    </div>

    <h2>Gift Ideas and Tips</h2>
    <ul>
      ${BLOG_PREVIEWS.map(
        (guide) =>
          `<li><a href="${guide.path}">${escapeHtml(guide.title)}</a> - ${escapeHtml(guide.excerpt)}</li>`
      ).join('')}
    </ul>
    <p><a href="/blog">View all articles</a></p>

    <h2>Ready to Surprise Someone?</h2>
    <p>Make a gift they will remember in 60 seconds.</p>
    <a class="seo-cta" href="/create">Create their gift</a>
  </main>
</div>`,
};

const LANDING_PAGE_CONTENT: SeoPage[] = LANDING_PAGES.map((page) => ({
  path: `/${page.slug}`,
  title: page.metaTitle,
  description: page.metaDescription,
  schemaId: `gems-landing-faq-${page.slug}`,
  faqs: page.faqs,
  content: `
<div class="seo-fallback">
  <main>
    <p class="seo-eyebrow">${escapeHtml(page.keyword)}</p>
    <h1>${escapeHtml(page.h1)}</h1>
    <p>${escapeHtml(page.intro)}</p>
    ${page.blocks
      .map((block) => {
        if (block.kind === 'h2') return `<h2>${escapeHtml(block.text)}</h2>`;
        if (block.kind === 'h3') return `<h3>${escapeHtml(block.text)}</h3>`;
        if (block.kind === 'p') return `<p>${renderRichText(block.text)}</p>`;
        return `<ul>${block.items.map((item) => `<li>${renderRichText(item)}</li>`).join('')}</ul>`;
      })
      .join('')}
    <h2>${escapeHtml(page.ctaHeading)}</h2>
    <p>${escapeHtml(page.ctaBody)}</p>
    <a class="seo-cta" href="/create">Create your gift</a>
    <div class="seo-related">
      ${page.related
        .map(
          (link) => `<a href="${escapeHtml(link.path)}">${escapeHtml(link.label)}</a>`
        )
        .join('')}
    </div>
    <div class="seo-faq">
      <h2>Frequently Asked Questions</h2>
      ${faqHtml(page.faqs)}
    </div>
  </main>
</div>`,
}));

const BLOG_ARTICLES = BLOG_PREVIEWS.slice(-2);

const BLOG_PAGE: SeoPage = {
  path: PAGES.blog.path,
  title: PAGES.blog.title,
  description: PAGES.blog.description,
  content: `
<div class="seo-fallback">
  <main>
    <p class="seo-eyebrow">Gift guides</p>
    <h1>Gift Ideas and Tips</h1>
    <p>Practical ideas for birthdays, anniversaries, Valentine's Day, long distance relationships and the holidays - all built around photos, your voice and a message that lasts.</p>
    <ul>
      ${BLOG_ARTICLES.map(
        (guide) =>
          `<li><a href="${guide.path}">${escapeHtml(guide.title)}</a> - ${escapeHtml(guide.excerpt)}</li>`
      ).join('')}
    </ul>
    <a class="seo-cta" href="/create">Create a virtual gift</a>
  </main>
</div>`,
};

const SIMPLE_PAGES: SeoPage[] = [
  {
    path: PAGES.explore.path,
    title: PAGES.explore.title,
    description: PAGES.explore.description,
    content: `
<div class="seo-fallback">
  <main>
    <p class="seo-eyebrow">Gift designs</p>
    <h1>Find a gift they'll love.</h1>
    <p>Browse handcrafted unboxing presentations and digital keepsakes for birthdays, anniversaries, Valentine's Day and long distance relationships.</p>
    <ul>
      <li><a href="/virtual-birthday-gift">Virtual birthday gift ideas</a></li>
      <li><a href="/anniversary-digital-gift">Digital anniversary gift ideas</a></li>
      <li><a href="/valentines-day-virtual-gift">Valentine's Day virtual gift ideas</a></li>
      <li><a href="/long-distance-gift-ideas">Long distance relationship gifts</a></li>
      <li><a href="/christmas-digital-gift-card">Christmas digital gift card ideas</a></li>
    </ul>
    <a class="seo-cta" href="/create">Create your gift</a>
  </main>
</div>`,
  },
  {
    path: PAGES['how-it-works'].path,
    title: PAGES['how-it-works'].title,
    description: PAGES['how-it-works'].description,
    content: `
<div class="seo-fallback">
  <main>
    <p class="seo-eyebrow">The experience</p>
    <h1>Designed for Pure Delight</h1>
    <p>GEMS turns thoughtful words into an interactive unboxing moment your loved ones will remember forever.</p>
    <h2>Choose a Curated Template</h2>
    <p>Pick a design built around an emotion, from birthday confetti to candlelit romance.</p>
    <h2>Add Photos, a Voice Note and Your Message</h2>
    <p>Place your favorite memories inside the box, record a short voice note and write the words you want them to hear.</p>
    <h2>Share One Link</h2>
    <p>Send it by text, email or social media. They open it in any browser with no app and no account.</p>
    <a class="seo-cta" href="/create">Create a virtual gift</a>
  </main>
</div>`,
  },
  {
    path: PAGES.pricing.path,
    title: PAGES.pricing.title,
    description: PAGES.pricing.description,
    content: `
<div class="seo-fallback">
  <main>
    <p class="seo-eyebrow">Pricing</p>
    <h1>Simple, Transparent Gifting</h1>
    <p>Create a free gift anytime, or upgrade to high-definition unboxing animations and voice notes.</p>
    <h2>Free</h2>
    <p>Basic unboxing templates, a personalized message and an instant shareable link. Free forever.</p>
    <h2>Premium Gift</h2>
    <p>All premium unboxing templates, up to four photos, a personal voice note and an ad-free experience for $4.99 per gift.</p>
    <h2>Pro</h2>
    <p>Unlimited gifts, every premium template and HD unboxing animations. Pro starts at $12 per month.</p>
    <a class="seo-cta" href="/create">Start free</a>
  </main>
</div>`,
  },
];

export const SEO_PAGES: Record<string, SeoPage> = [
  HOME_PAGE,
  ...LANDING_PAGE_CONTENT,
  BLOG_PAGE,
  ...SIMPLE_PAGES,
].reduce(
  (pages, page) => ({ ...pages, [page.path]: page }),
  {} as Record<string, SeoPage>
);

function injectIntoShell(shell: string, page: SeoPage): string {
  const startMarker = '<!-- SEO_HEAD_START -->';
  const endMarker = '<!-- SEO_HEAD_END -->';
  const start = shell.indexOf(startMarker);
  const end = shell.indexOf(endMarker);
  const withHead =
    start !== -1 && end !== -1
      ? shell.slice(0, start + startMarker.length) +
        '\n' +
        renderHead(page) +
        '\n    ' +
        shell.slice(end)
      : shell.replace('</head>', `${renderHead(page)}</head>`);

  return withHead.replace('<div id="root"></div>', `<div id="root">${page.content}</div>`);
}

export function renderSeoPage(path: string, shell: string): string | null {
  const page = SEO_PAGES[path];
  return page ? injectIntoShell(shell, page) : null;
}
