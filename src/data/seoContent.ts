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
  /** Replace with the production origin - used by canonical, OG and sitemap. */
  url: 'https://gemsvg.com',
  locale: 'en_US',
  tagline: 'Make Every Moment a Gift',
  email: 'hello@gems.example.com',
  description:
    'Create a virtual gift in 60 seconds. Add photos, a voice note and a message inside a 3D gift box, then share one link. No app needed. Free to start.',
} as const;

/* -------------------------------------------------------------------------- */
/* Target keywords                                                            */
/* -------------------------------------------------------------------------- */

export const KEYWORDS = {
  /** Head terms - one per major section, used in headings and body copy. */
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
  /** Route path, e.g. `/` for home, `/pricing` for pricing. */
  path: string;
  title: string;
  description: string;
}

export const PAGES: Record<string, PageMeta> = {
  home: {
    path: '/',
    title: 'Send a Virtual Gift Online | Free 3D Digital Gift Box | GEMS',
    description: SITE.description,
  },
  explore: {
    path: '/explore',
    title: 'Gift Designs & Templates - 36 Virtual Gift Ideas | GEMS',
    description:
      'Browse 36 digital gift designs across 12 occasions. Steal a template, add your photos and voice note, and send a virtual gift by link in under a minute.',
  },
  'how-it-works': {
    path: '/how-it-works',
    title: 'How to Send a Virtual Gift in 3 Steps | GEMS',
    description:
      'Learn how to send a personalized digital gift online: pick a design, add photos and a voice note, then share one link. No app or account needed for them.',
  },
  pricing: {
    path: '/pricing',
    title: 'Pricing - Send a Digital Gift Free or from $4.99 | GEMS',
    description:
      'Send a virtual gift free, unlock a Premium gift for $4.99, or go Pro for unlimited personalized digital gifts with HD unboxing animations.',
  },
  create: {
    path: '/create',
    title: 'Create a Virtual Gift Box | GEMS',
    description:
      'Build your own interactive digital gift box - add photos, record a voice note, write your message and share a single link.',
  },
  blog: {
    path: '/blog',
    title: 'Gift Ideas and Tips - Birthdays, Anniversaries & More | GEMS',
    description:
      'Practical gift ideas and tips for birthdays, anniversaries, Valentine’s Day, long distance relationships and the holidays. Create a personal 3D gift box in minutes.',
  },
  'virtual-birthday-gift': {
    path: '/virtual-birthday-gift',
    title: 'Virtual Birthday Gift Ideas | Send a 3D Gift Box',
    description:
      'Send a virtual birthday gift with photos, a voice note and a message in a 3D gift box. Share it with one link and surprise someone now. Try GEMS.',
  },
  'anniversary-digital-gift': {
    path: '/anniversary-digital-gift',
    title: 'Digital Anniversary Gift Ideas | GEMS 3D Gift Box',
    description:
      'Create a digital anniversary gift with photos, a voice note and a love message inside a 3D gift box. Share one link and celebrate your story now.',
  },
  'valentines-day-virtual-gift': {
    path: '/valentines-day-virtual-gift',
    title: "Valentine's Day Virtual Gift Ideas | GEMS Gift Box",
    description:
      'Send a Valentine’s Day virtual gift with photos, a voice note and a love message in a 3D gift box. One link and one sweet surprise. Try GEMS now.',
  },
  'long-distance-gift-ideas': {
    path: '/long-distance-gift-ideas',
    title: 'Long Distance Relationship Gifts | GEMS Gift Box',
    description:
      'Find long distance relationship gifts that feel closer. Send photos, a voice note and a message inside a 3D gift box with one link. Try GEMS now.',
  },
  'christmas-digital-gift-card': {
    path: '/christmas-digital-gift-card',
    title: 'Christmas Digital Gift Card Ideas | GEMS Gift Box',
    description:
      'Send a Christmas digital gift card with photos, a voice note and a holiday message in a 3D gift box. One link, one warm surprise. Try GEMS today.',
  },
  'long-distance-birthday-surprise': {
    path: '/long-distance-birthday-surprise',
    title: 'Surprise a Long Distance Partner on Their Birthday',
    description:
      'Plan a long distance birthday surprise that feels personal. Get timing tips, gift ideas and a simple step-by-step guide to make them feel closer.',
  },
  'last-minute-christmas-gift-ideas': {
    path: '/last-minute-christmas-gift-ideas',
    title: "Last-Minute Christmas Gifts That Aren't Gift Cards",
    description:
      'Need a Christmas gift fast? These easy last-minute ideas feel thoughtful, arrive on time and go beyond gift cards. Find options for every budget.',
  },
};

/* -------------------------------------------------------------------------- */
/* FAQ - FAQPage JSON-LD is injected by lib/seo.ts on the homepage.           */
/* -------------------------------------------------------------------------- */

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'What is a virtual gift?',
    a: 'A virtual gift is a digital present made of photos, a voice note and a personal message, delivered as an interactive 3D gift box through one link.',
  },
  {
    q: 'How do I send a virtual gift online?',
    a: 'Add your photos, record a voice note, write your message and pick a gift box. Then share the link on WhatsApp, text or email.',
  },
  {
    q: 'Does the receiver need an app or an account?',
    a: 'No. They open the link on any phone or computer and unwrap the gift - nothing to download and no account to create.',
  },
  {
    q: 'Is GEMS really free?',
    a: 'Yes. You can create and share a gift for free with basic templates, your personal message and an instant link. Optional paid upgrades add premium designs, HD unboxing animations and unlimited gifting - the pricing page lists exactly what each plan includes.',
  },
  {
    q: 'Can I send a virtual gift to someone in another country?',
    a: 'Yes. There is no shipping or customs, so it arrives instantly anywhere in the world.',
  },
  {
    q: 'Can I add a voice note to my gift?',
    a: 'Yes. You can record it right in your browser. A voice makes the gift feel personal.',
  },
  {
    q: 'Which occasions work best?',
    a: 'Birthdays, anniversaries, Valentine’s Day, graduations, weddings, Mother’s Day, Father’s Day and thank you gifts.',
  },
  {
    q: 'How long does my gift link stay active?',
    a: 'There is no expiry date. Your gift link stays active until you delete the gift from your dashboard.',
  },
];

/* -------------------------------------------------------------------------- */
/* Gift ideas - long-tail landing copy, rendered as linked cards               */
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
    body: 'A last-minute birthday surprise that still feels handmade - photos from the year, a voice note, and a box that opens on their screen at midnight.',
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
    body: 'Record the message you would say out loud. Hearing your voice is the part they replay - not the text they skim.',
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
    body: 'Class photos, a proud message and confetti that actually pops - the graduation card their group chat screenshots.',
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
