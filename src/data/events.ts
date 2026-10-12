import { EventTheme, EventSlug } from '../types';

export const EVENTS: EventTheme[] = [
  {
    id: 'evt-halloween',
    slug: 'halloween',
    name: 'Halloween',
    tagline: 'Spooky surprises with unforgettable style',
    iconName: 'Ghost',
    emoji: '🎃',
    startDate: '10-01',
    endDate: '10-31',
    primaryAccent: '#EA580C', // Orange
    secondaryAccent: '#18181B', // Dark charcoal
    subtleAccentBg: '#FFF7ED',
    heroTitle: 'Virtual Gifts for Halloween',
    heroSubtitle: 'Create a spooky surprise they will remember long after the candles burn down.',
    callToAction: 'Create Halloween Gift',
    badgeText: 'Halloween is Coming',
    description: 'Enchanting mysterious cards, playful spooky notes, and glowing twilight surprises.',
    defaultAnimation: 'sparkles',
    active: true,
  },
  {
    id: 'evt-christmas',
    slug: 'christmas',
    name: 'Christmas',
    tagline: 'Warm holiday magic and heartfelt greetings',
    iconName: 'Sparkles',
    emoji: '🎄',
    startDate: '11-15',
    endDate: '12-26',
    primaryAccent: '#DC2626', // Holiday Red
    secondaryAccent: '#15803D', // Pine Green
    subtleAccentBg: '#FEF2F2',
    heroTitle: 'Virtual Gifts for Christmas',
    heroSubtitle: 'Share warm cozy holiday joy with friends and family across the globe in seconds.',
    callToAction: 'Create Christmas Gift',
    badgeText: 'Holiday Season',
    description: 'Festive snowfall animations, golden ribbons, warm acoustic carols, and cherished memories.',
    defaultAnimation: 'snow',
    active: false,
  },
  {
    id: 'evt-valentines',
    slug: 'valentines',
    name: "Valentine's Day",
    tagline: 'Romantic gestures from the heart',
    iconName: 'Heart',
    emoji: '❤️',
    startDate: '02-01',
    endDate: '02-15',
    primaryAccent: '#E11D48', // Rose Pink/Red
    secondaryAccent: '#FDA4AF', // Soft Blush
    subtleAccentBg: '#FFF1F2',
    heroTitle: "Virtual Gifts for Valentine's Day",
    heroSubtitle: 'Express genuine love and sweet affection with an unforgettable interactive gesture.',
    callToAction: "Create Valentine's Gift",
    badgeText: 'Season of Love',
    description: 'Floating heart petals, warm romantic typography, and intimate voice recordings.',
    defaultAnimation: 'hearts',
    active: false,
  },
  {
    id: 'evt-birthday',
    slug: 'birthday',
    name: 'Birthday',
    tagline: 'Celebrate another wonderful year',
    iconName: 'PartyPopper',
    emoji: '🎂',
    startDate: '01-01',
    endDate: '12-31',
    primaryAccent: '#8B5CF6', // Purple/Violet
    secondaryAccent: '#EC4899', // Fun Pink
    subtleAccentBg: '#F5F3FF',
    heroTitle: 'Virtual Birthday Gifts',
    heroSubtitle: 'Make their birthday extraordinary with confetti bursts, photo memories, and love.',
    callToAction: 'Create Birthday Gift',
    badgeText: 'Everyday Celebration',
    description: 'Bursting confetti cannons, vibrant party palettes, and joyful birthday songs.',
    defaultAnimation: 'confetti',
    active: false,
  },
  {
    id: 'evt-mothers-day',
    slug: 'mothers-day',
    name: "Mother's Day",
    tagline: 'Gratitude for the world’s best moms',
    iconName: 'Flower2',
    emoji: '💐',
    startDate: '05-01',
    endDate: '05-14',
    primaryAccent: '#DB2777', // Soft Floral Magenta
    secondaryAccent: '#F472B6', // Warm Rose
    subtleAccentBg: '#FDF2F8',
    heroTitle: "Virtual Gifts for Mother's Day",
    heroSubtitle: 'Send Mom a breathtaking digital gift she can treasure on her phone forever.',
    callToAction: "Create Mother's Day Gift",
    badgeText: 'Honor Mom',
    description: 'Blush floral motifs, gentle piano harmonies, and touching family memories.',
    defaultAnimation: 'hearts',
    active: false,
  },
  {
    id: 'evt-fathers-day',
    slug: 'fathers-day',
    name: "Father's Day",
    tagline: 'Thoughtful appreciation for Dad',
    iconName: 'Smile',
    emoji: '👨',
    startDate: '06-01',
    endDate: '06-20',
    primaryAccent: '#2563EB', // Royal Blue
    secondaryAccent: '#1E3A8A', // Deep Navy
    subtleAccentBg: '#EFF6FF',
    heroTitle: "Virtual Gifts for Father's Day",
    heroSubtitle: 'A sleek, meaningful way to thank Dad for everything he does.',
    callToAction: "Create Father's Day Gift",
    badgeText: 'Cheers to Dad',
    description: 'Refined deep navy textures, classic vintage typography, and personal voice notes.',
    defaultAnimation: 'sparkles',
    active: false,
  },
  {
    id: 'evt-graduation',
    slug: 'graduation',
    name: 'Graduation',
    tagline: 'Honoring hard work and bright futures',
    iconName: 'GraduationCap',
    emoji: '🎓',
    startDate: '05-15',
    endDate: '06-30',
    primaryAccent: '#D97706', // Gold/Amber
    secondaryAccent: '#1E3A8A', // Deep Academic Navy
    subtleAccentBg: '#FFFBEB',
    heroTitle: 'Virtual Graduation Celebrations',
    heroSubtitle: 'Celebrate their milestone with gold confetti, high praise, and heartfelt advice.',
    callToAction: 'Create Graduation Gift',
    badgeText: 'Class of 2026',
    description: 'Golden sparkles, triumphant brass fanfare, and memory book collages.',
    defaultAnimation: 'sparkles',
    active: false,
  },
  {
    id: 'evt-wedding',
    slug: 'wedding',
    name: 'Wedding & Bridal',
    tagline: 'Toasts to lifelong happiness',
    iconName: 'Sparkle',
    emoji: '💍',
    startDate: '06-01',
    endDate: '09-30',
    primaryAccent: '#B45309', // Champagne Gold
    secondaryAccent: '#F43F5E', // Rose
    subtleAccentBg: '#FFFBEB',
    heroTitle: 'Virtual Wedding Greetings',
    heroSubtitle: 'An elegant digital keepsake to congratulate the newlyweds from anywhere in the world.',
    callToAction: 'Create Wedding Gift',
    badgeText: 'Love & Union',
    description: 'Champagne silk accents, editorial serif lettering, and timeless romantic melodies.',
    defaultAnimation: 'hearts',
    active: false,
  },
  {
    id: 'evt-anniversary',
    slug: 'anniversary',
    name: 'Anniversary',
    tagline: 'Marking each chapter together',
    iconName: 'Flame',
    emoji: '🥂',
    startDate: '01-01',
    endDate: '12-31',
    primaryAccent: '#9333EA', // Royal Purple
    secondaryAccent: '#C084FC',
    subtleAccentBg: '#FAF5FF',
    heroTitle: 'Virtual Anniversary Gifts',
    heroSubtitle: 'Relive your favorite memories together with a private digital keepsake.',
    callToAction: 'Create Anniversary Gift',
    badgeText: 'Milestone Love',
    description: 'Rich velvet textures, intimate photo timelines, and sentimental notes.',
    defaultAnimation: 'hearts',
    active: false,
  },
  {
    id: 'evt-thank-you',
    slug: 'thank-you',
    name: 'Thank You',
    tagline: 'Express sincere appreciation',
    iconName: 'HeartHandshake',
    emoji: '🙏',
    startDate: '01-01',
    endDate: '12-31',
    primaryAccent: '#0D9488', // Emerald/Teal
    secondaryAccent: '#2DD4BF',
    subtleAccentBg: '#F0FDFA',
    heroTitle: 'Virtual Thank You Cards',
    heroSubtitle: 'Say thank you in a way they will never forget.',
    callToAction: 'Create Thank You Gift',
    badgeText: 'Gratitude',
    description: 'Subtle clean cards, heartfelt appreciation quotes, and elegant warm themes.',
    defaultAnimation: 'sparkles',
    active: false,
  },
  {
    id: 'evt-congratulations',
    slug: 'congratulations',
    name: 'Congratulations',
    tagline: 'Applauding big wins and new beginnings',
    iconName: 'Trophy',
    emoji: '🎉',
    startDate: '01-01',
    endDate: '12-31',
    primaryAccent: '#6D28D9', // Brand Purple
    secondaryAccent: '#A78BFA',
    subtleAccentBg: '#F5F3FF',
    heroTitle: 'Virtual Congratulations Gifts',
    heroSubtitle: 'Send applause, confetti, and big love for new jobs, promotions, or new homes.',
    callToAction: 'Create Congrats Gift',
    badgeText: 'Big Achievements',
    description: 'Celebratory fireworks, upbeat rhythms, and high-energy unboxing surprises.',
    defaultAnimation: 'confetti',
    active: false,
  },
  {
    id: 'evt-other',
    slug: 'other',
    name: 'Just Because / Other',
    tagline: 'A spontaneous surprise for any day',
    iconName: 'Sparkles',
    emoji: '✨',
    startDate: '01-01',
    endDate: '12-31',
    primaryAccent: '#6D28D9',
    secondaryAccent: '#A78BFA',
    subtleAccentBg: '#FAF5FF',
    heroTitle: 'Send a Surprise Just Because',
    heroSubtitle: 'No occasion needed to brighten someone’s day with a heartfelt digital present.',
    callToAction: 'Create Surprise Gift',
    badgeText: 'Thinking of You',
    description: 'Minimal warm greetings, spontaneous love notes, and sweet digital tokens.',
    defaultAnimation: 'sparkles',
    active: false,
  },
];

/** Neutral, always-available fallback — never a seasonal event. */
const FALLBACK_EVENT_ID = 'evt-other';

export function getEventBySlug(slug: EventSlug | string): EventTheme {
  const match = EVENTS.find((e) => e.slug === slug);
  if (match) return match;
  return EVENTS.find((e) => e.id === FALLBACK_EVENT_ID) || EVENTS[EVENTS.length - 1];
}

/** `MM-DD` → a sortable ordinal (coarse, but enough for date-window maths). */
function toOrdinal(monthDay: string): number {
  const [m, d] = monthDay.split('-').map((n) => parseInt(n, 10) || 1);
  return m * 31 + (d || 1);
}

/**
 * True when `date` falls inside the event's `startDate`..`endDate` window.
 * Windows that wrap the new year (end < start) are supported.
 */
function isInWindow(date: Date, startDate: string, endDate: string): boolean {
  const current = (date.getMonth() + 1) * 31 + date.getDate();
  const start = toOrdinal(startDate);
  const end = toOrdinal(endDate);
  if (start <= end) return current >= start && current <= end;
  return current >= start || current <= end;
}

function windowLength(startDate: string, endDate: string): number {
  const length = toOrdinal(endDate) - toOrdinal(startDate);
  return length < 0 ? length + 366 : length;
}

/**
 * The seasonal event for today, derived from each event's declared date
 * window. When several windows overlap, the most specific (shortest) one
 * wins — so year-round occasions like Birthday/Anniversary never shadow
 * Halloween or Valentine's. Falls back to the neutral "Other" theme.
 */
export function getCurrentSeasonalEvent(): EventTheme {
  const now = new Date();
  const candidates = EVENTS.filter((e) => isInWindow(now, e.startDate, e.endDate));

  if (candidates.length > 0) {
    return candidates.reduce((best, event) =>
      windowLength(event.startDate, event.endDate) < windowLength(best.startDate, best.endDate)
        ? event
        : best
    );
  }

  return getEventBySlug('other');
}
