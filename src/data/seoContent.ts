/**
 * Single source of truth for the site's search metadata and on-page copy.
 *
 * Everything here is crawled: the JSON-LD built from these objects lands in
 * index.html, the FAQ list powers both the visible accordion and the
 * FAQPage schema, and the page titles/descriptions are applied by
 * `src/lib/seo.ts` whenever the route changes.
 */

export const SITE = {
  name: 'GEMS',
  legalName: 'GEMS',
  /** Replace with the production origin — used by canonical, OG and sitemap. */
  url: 'http://40.160.149.176',
  locale: 'en_US',
  tagline: 'Make Every Moment a Gift',
  email: 'hello@gems.example.com',
  description:
    'Create a virtual gift online in 60 seconds. Add photos, a voice note and a message inside a 3D gift box, then share one link — no app, free to start.',
} as const;

/* -------------------------------------------------------------------------- */
/* Target keywords                                                            */
/* -------------------------------------------------------------------------- */

export const KEYWORDS = {
  /** Head terms — one per major section, used in headings and body copy. */
  shortTail: [
    'virtual gift',
    'digital gift',
    'online gift',
    'personalized gift',
    'gift ideas',
    'digital greeting card',
    'video message',
    'birthday gift',
    'surprise gift',
    'e-gift',
  ],
  /** Longer, lower-competition phrases the landing page is written around. */
  longTail: [
    'send a virtual gift online',
    'create a digital gift box online free',
    'send photos and a voice note as a gift',
    'personalized digital gift for long distance',
    'birthday surprise video message online',
    '3D gift unwrapping experience online',
    'free online greeting card maker with photos',
    'send a gift by link without an app',
    'last minute virtual gift ideas that feel personal',
    'anniversary gift with voice message online',
    'make an animated gift card online',
    'send a surprise gift to someone far away',
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Per-route meta tags                                                         */
/* -------------------------------------------------------------------------- */

export interface PageMeta {
  /** Hash path, e.g. `` for home, `#/pricing` for pricing. */
  path: string;
  title: string;
  description: string;
}

export const PAGES: Record<string, PageMeta> = {
  home: {
    path: '#/',
    title: 'Send a Virtual Gift Online Free in 60s | GEMS',
    description: SITE.description,
  },
  explore: {
    path: '#/explore',
    title: 'Gift Designs & Templates — 36 Virtual Gift Ideas | GEMS',
    description:
      'Browse 36 digital gift designs across 12 occasions. Steal a template, add your photos and voice note, and send a virtual gift by link in under a minute.',
  },
  'how-it-works': {
    path: '#/how-it-works',
    title: 'How to Send a Virtual Gift in 3 Steps | GEMS',
    description:
      'Learn how to send a personalized digital gift online: pick a design, add photos and a voice note, then share one link. No app or account needed for them.',
  },
  pricing: {
    path: '#/pricing',
    title: 'Pricing — Send a Digital Gift Free or from $4.99 | GEMS',
    description:
      'Send a virtual gift free, unlock a Premium gift for $4.99, or go Pro for unlimited personalized digital gifts with HD unboxing animations.',
  },
  create: {
    path: '#/create',
    title: 'Create a Virtual Gift Box | GEMS',
    description:
      'Build your own interactive digital gift box — add photos, record a voice note, write your message and share a single link.',
  },
};

/* -------------------------------------------------------------------------- */
/* FAQ — mirrored by FAQPage JSON-LD in index.html                             */
/* -------------------------------------------------------------------------- */

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'What is a virtual gift?',
    a: 'A virtual gift (or digital gift) is a present you send online as a link instead of a physical parcel. With GEMS you wrap photos, a voice note and a written message inside an animated 3D gift box that the recipient unwraps in their browser — no wrapping paper, no delivery wait, no app to install.',
  },
  {
    q: 'How do I send a digital gift without an app?',
    a: 'Build the box in your browser, press Create Gift, and you instantly get a shareable link and a QR code. Send that link over WhatsApp, iMessage, email or any chat you already use. They tap it and the gift opens right there — nothing to download and no account to make.',
  },
  {
    q: 'Can I add photos and a voice note inside the gift?',
    a: 'Yes. Drop in your photos, record a voice note in your own voice so they hear you rather than read you, write the message, and choose a mood. The mood restyles the card artwork, palette and fonts to match the moment — magical, romantic, playful, elegant or festive.',
  },
  {
    q: 'Does the recipient need an account to open the gift?',
    a: 'No. That is the whole point of GEMS: one link opens the gift on any phone, tablet or laptop, straight in the browser. Your recipient never signs up, installs anything, or pays anything.',
  },
  {
    q: 'Is GEMS free to use?',
    a: 'Yes — creating and sending a virtual gift is free with the $0 plan, which includes basic unboxing templates, your personalized message and an instant shareable link. A one-off Premium gift ($4.99) adds premium templates, up to 4 photos, a voice note and animation effects, while GEMS Pro is for people who send gifts regularly.',
  },
  {
    q: 'What occasions can I send a virtual gift for?',
    a: 'Twelve occasions are covered out of the box — birthday, Valentine’s Day, Christmas, anniversary, graduation, wedding, Halloween, Mother’s Day, Father’s Day, thank you and congratulations — plus a generic box for just-because moments. Each occasion ships with its own palette, artwork and copy.',
  },
  {
    q: 'How long does it take to make one?',
    a: 'Most people finish in under 60 seconds. Pick a design, add a photo or two, record a short voice note, type the message and hit send. The gift is ready to share the moment you are done.',
  },
  {
    q: 'What makes GEMS different from an e-gift card?',
    a: 'An e-gift card sends a code. GEMS sends an experience: the ribbon unties, the lid lifts, confetti pops, and inside is your photo, your voice and your words. It is closer to handing someone a real present than to forwarding a voucher.',
  },
];

/* -------------------------------------------------------------------------- */
/* Gift ideas — long-tail landing copy, rendered as linked cards               */
/* -------------------------------------------------------------------------- */

export interface GiftIdea {
  title: string;
  body: string;
  /** Event slug the card opens the creator with. */
  eventSlug:
    | 'birthday'
    | 'valentines'
    | 'anniversary'
    | 'graduation'
    | 'wedding'
    | 'christmas'
    | 'mothers-day'
    | 'fathers-day'
    | 'halloween';
  emoji: string;
}

export const GIFT_IDEAS: GiftIdea[] = [
  {
    title: 'Birthday gift online',
    body: 'A last-minute birthday surprise that still feels handmade — photos from the year, a voice note, and a box that opens on their screen at midnight.',
    eventSlug: 'birthday',
    emoji: '🎂',
  },
  {
    title: 'Long distance gift',
    body: 'When you cannot hand it over, send it. A digital gift box travels instantly across cities and time zones and unwraps on the other side.',
    eventSlug: 'anniversary',
    emoji: '🌍',
  },
  {
    title: 'Anniversary gift with a voice note',
    body: 'Record the message you would say out loud. Hearing your voice is the part they replay — not the text they skim.',
    eventSlug: 'anniversary',
    emoji: '🥂',
  },
  {
    title: 'Valentine’s virtual gift',
    body: 'Romantic artwork, your favourite photo together and a note that lands the moment they open the link.',
    eventSlug: 'valentines',
    emoji: '❤️',
  },
  {
    title: 'Graduation surprise',
    body: 'Class photos, a proud message and confetti that actually pops — the graduation card their group chat screenshots.',
    eventSlug: 'graduation',
    emoji: '🎓',
  },
  {
    title: 'Christmas digital gift card',
    body: 'A festive box with snow and sparkles, ready to forward to family who live a flight away.',
    eventSlug: 'christmas',
    emoji: '🎄',
  },
];
