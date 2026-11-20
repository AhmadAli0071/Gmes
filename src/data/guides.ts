import birthdayImage from '../assets/images/guides/birthday.jpg';
import anniversaryImage from '../assets/images/guides/anniversary.jpg';
import valentinesImage from '../assets/images/guides/valentines.jpg';
import lastMinuteImage from '../assets/images/use-cases/last-minute.jpg';
import christmasImage from '../assets/images/template_christmas_wonder_1791359394567.jpg';
import thanksgivingImage from '../assets/images/blog/thanksgiving-thank-you.jpg';
import virtualGiftImage from '../assets/images/blog/virtual-gift.jpg';
import digitalChristmasImage from '../assets/images/blog/digital-christmas-gift.jpg';
import holidayShippingImage from '../assets/images/blog/holiday-shipping.jpg';
import budgetGiftImage from '../assets/images/blog/budget-gift.jpg';
import longDistanceBirthdayImage from '../assets/images/blog/long-distance-birthday.jpg';
import valentinesLongDistanceImage from '../assets/images/blog/valentines-long-distance.jpg';
import voiceMessageImage from '../assets/images/blog/voice-message-gift.jpg';
import parentsAbroadImage from '../assets/images/blog/parents-abroad.jpg';
import newYearMessagesImage from '../assets/images/blog/new-year-messages.jpg';
import photoGiftDigitalImage from '../assets/images/blog/photo-gift-digital.jpg';
import giftComparisonImage from '../assets/images/blog/gift-comparison.jpg';
import ecoGiftImage from '../assets/images/blog/eco-friendly-gift.jpg';
import onlineSurpriseImage from '../assets/images/blog/online-surprise.jpg';
import heartfeltMessageImage from '../assets/images/blog/heartfelt-message.jpg';
import giftUniqueImage from '../assets/images/blog/gift-unique.jpg';

export interface GiftGuide {
  title: string;
  excerpt: string;
  path: string;
  image: string;
  alt: string;
  tag: string;
  date?: string;
}

export function sortNewestFirst<T extends { path: string; date?: string }>(guides: T[]): T[] {
  return [...guides].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

export const BLOG_POSTS: GiftGuide[] = [
  {
    title: 'How to Surprise Someone Online: 15 Creative Ideas',
    excerpt:
      '15 creative online surprise ideas for partners, friends and family far away, from virtual parties to voice note gifts.',
    path: '/surprise-someone-online-creative-ideas',
    image: onlineSurpriseImage,
    alt: 'Surprised woman celebrating with colleagues at a party',
    tag: 'Surprises',
    date: '2026-11-20',
  },
  {
    title: 'How to Write a Heartfelt Message (With Examples)',
    excerpt:
      'Write a heartfelt message for any occasion with a simple formula, gift note tips and examples for mom, partners and friends.',
    path: '/write-heartfelt-message-any-occasion',
    image: heartfeltMessageImage,
    alt: 'Person handwriting a personal letter with a pen',
    tag: 'Messages',
    date: '2026-11-20',
  },
  {
    title: 'Gifts for Someone Who Has Everything: Unique Ideas',
    excerpt:
      'Meaningful, sentimental and experience gift ideas for dads, grandparents and others who already have everything.',
    path: '/gift-ideas-for-people-who-have-everything',
    image: giftUniqueImage,
    alt: 'Hands wrapping a red gift box with white ribbon',
    tag: 'Gift ideas',
    date: '2026-11-20',
  },
  {
    title: 'How to Record a Voice Message Gift (With Script Ideas)',
    excerpt:
      'Learn how to record a voice message gift on your phone, what to say, and simple script ideas for birthdays, partners and family.',
    path: '/voice-message-gift-script-ideas',
    image: voiceMessageImage,
    alt: 'Man recording a voice message on his smartphone',
    tag: 'Voice messages',
    date: '2026-11-20',
  },
  {
    title: 'Gifts for Parents Far Away: Digital Gift Ideas',
    excerpt:
      'Digital gift ideas to surprise mom and dad abroad, skip customs fees, and send love to family in another country.',
    path: '/digital-gifts-for-parents-living-abroad',
    image: parentsAbroadImage,
    alt: 'Senior couple enjoying a video call with family on a tablet',
    tag: 'Family abroad',
    date: '2026-11-20',
  },
  {
    title: 'New Year Messages for Loved Ones: 2027 Wishes',
    excerpt:
      'Heartfelt New Year messages for family, friends and long distance partners, plus resolution message ideas.',
    path: '/new-year-resolution-messages-loved-ones',
    image: newYearMessagesImage,
    alt: 'Crowd celebrating New Year with fireworks over the city',
    tag: 'New Year',
    date: '2026-11-20',
  },
  {
    title: 'Personalized Photo Gift Ideas Without Printing',
    excerpt:
      'Photo gift ideas with no printing - choose photos, build a photo story and make a digital gift that feels personal.',
    path: '/personal-photo-gift-without-printing',
    image: photoGiftDigitalImage,
    alt: 'Couple smiling while looking through a photo album together',
    tag: 'Photo gifts',
    date: '2026-11-20',
  },
  {
    title: 'Digital Gifts vs Physical Gifts: Which Is Better?',
    excerpt:
      'Compare the pros, cons, cost, waste and thoughtfulness of digital and physical gifts so you can pick the right one.',
    path: '/digital-gifts-vs-physical-gifts',
    image: giftComparisonImage,
    alt: 'Two hands exchanging a beautifully wrapped gift box',
    tag: 'Gift guides',
    date: '2026-11-20',
  },
  {
    title: 'Eco-Friendly Gift Ideas for a Low-Waste Holiday',
    excerpt:
      'Sustainable gift ideas for a low-waste holiday, from zero waste presents to digital gifts that need no wrapping paper.',
    path: '/sustainable-gift-ideas-eco-friendly-holiday',
    image: ecoGiftImage,
    alt: 'Eco-friendly gift wrapped with natural leaves and candles',
    tag: 'Eco-friendly',
    date: '2026-11-20',
  },
  {
    title: 'How to Say Thank You on Thanksgiving: Heartfelt Message Ideas',
    excerpt:
      'Ready-to-use messages for family, friends and coworkers, plus tips to make each one sound like you.',
    path: '/thanksgiving-thank-you-messages',
    image: thanksgivingImage,
    alt: 'Thanksgiving dinner table with roasted turkey and autumn side dishes',
    tag: 'Thanksgiving',
    date: '2026-11-04',
  },
  {
    title: 'What Is a Virtual Gift? A Complete Beginner\u2019s Guide',
    excerpt:
      'The meaning, common types, benefits and how to send a personal digital gift in minutes.',
    path: '/what-is-a-virtual-gift',
    image: virtualGiftImage,
    alt: 'Woman using a smartphone while holding a small gift bag',
    tag: 'Virtual gifts',
    date: '2026-11-04',
  },
  {
    title: 'Best Digital Gift Ideas for Christmas 2026',
    excerpt:
      'No-shipping Christmas ideas, from voice messages to photo videos, for parents and family abroad.',
    path: '/digital-gift-ideas-for-christmas',
    image: digitalChristmasImage,
    alt: 'Laptop and wrapped Christmas gifts on a red and black background',
    tag: 'Christmas',
    date: '2026-11-04',
  },
  {
    title: 'How to Avoid Shipping Delays This Holiday Season',
    excerpt:
      'Key 2026 shipping deadlines, common delay causes and instant backups if you miss the cutoff.',
    path: '/holiday-shipping-deadlines-2026',
    image: holidayShippingImage,
    alt: 'Delivery parcels stacked at the front door',
    tag: 'Holiday shipping',
    date: '2026-11-04',
  },
  {
    title: 'Black Friday Alternatives: Meaningful Gifts That Cost Less',
    excerpt:
      'Free and low-cost gift ideas built on time, attention and shared memories instead of discounts.',
    path: '/black-friday-alternatives',
    image: budgetGiftImage,
    alt: 'Hands wrapping a handmade gift in brown paper and twine',
    tag: 'Budget gifts',
    date: '2026-11-04',
  },
  {
    title: 'Surprise a Long Distance Partner on Their Birthday',
    excerpt:
      'A simple plan across time zones - timing tips, gift ideas and mistakes to avoid.',
    path: '/long-distance-birthday-surprise',
    image: longDistanceBirthdayImage,
    alt: 'Woman celebrating a birthday over a video call with cake and candles',
    tag: 'Long distance',
    date: '2026-10-29',
  },
  {
    title: "Last-Minute Christmas Gifts That Aren't Gift Cards",
    excerpt:
      'Thoughtful ideas you can finish in an afternoon - digital, local and handmade options.',
    path: '/last-minute-christmas-gift-ideas',
    image: christmasImage,
    alt: 'Last-minute Christmas gifts including a festive virtual gift box',
    tag: 'Christmas',
    date: '2026-10-29',
  },
  {
    title: 'Instant Gift Ideas You Can Send in Minutes',
    excerpt:
      'Forgot a gift? Voice notes, playlists and digital gift boxes that arrive in minutes.',
    path: '/instant-gift-ideas',
    image: lastMinuteImage,
    alt: 'Instant gift ideas sent in minutes from a phone',
    tag: 'Instant gifts',
    date: '2026-10-29',
  },
  {
    title: "Valentine's Day Gifts for Long Distance Couples",
    excerpt:
      'Planning tips, digital ideas and ways to make February 14 feel close from afar.',
    path: '/valentines-day-gifts-long-distance-couples',
    image: valentinesLongDistanceImage,
    alt: 'Man surprising his partner with red roses and a Valentine\u2019s gift',
    tag: "Valentine's Day",
    date: '2026-10-29',
  },
  {
    title: 'How to Make a Photo Memory Video or Slideshow Gift',
    excerpt:
      'Pick photos, shape the story, add music or a voice note and share a gift they replay.',
    path: '/photo-memory-video-gift',
    image: anniversaryImage,
    alt: 'Photo memory slideshow gift with a romantic photo timeline',
    tag: 'Photo gifts',
    date: '2026-10-29',
  },
];

export const GIFT_GUIDES: GiftGuide[] = [
  {
    title: 'Virtual Birthday Gift Ideas',
    excerpt:
      'Celebrate together, wherever you are, with photos, a voice note and one link.',
    path: '/virtual-birthday-gift',
    image: birthdayImage,
    alt: '3D virtual birthday gift box with photos and confetti',
    tag: 'Birthday',
  },
  {
    title: 'Digital Anniversary Gift Ideas',
    excerpt: 'Relive your love story, one memory at a time, in a 3D gift box.',
    path: '/anniversary-digital-gift',
    image: anniversaryImage,
    alt: '3D anniversary gift box with photos and a voice note',
    tag: 'Anniversary',
  },
  {
    title: "Valentine's Day Virtual Gift Ideas",
    excerpt: 'Romantic ideas that feel personal because every photo and word comes from you.',
    path: '/valentines-day-virtual-gift',
    image: valentinesImage,
    alt: 'Romantic virtual gift box with rose petals',
    tag: "Valentine's Day",
  },
  {
    title: 'Long Distance Relationship Gifts',
    excerpt: 'Close the distance with your voice, your photos and a message they can replay.',
    path: '/long-distance-gift-ideas',
    image: valentinesImage,
    alt: 'Long distance gift box with photos and a voice note',
    tag: 'Long distance',
  },
  {
    title: 'Christmas Digital Gift Card Ideas',
    excerpt:
      'Holiday magic in one link - photos, a voice note and a message inside a festive 3D gift box.',
    path: '/christmas-digital-gift-card',
    image: christmasImage,
    alt: 'Christmas digital gift card with a festive 3D gift box and holiday lights',
    tag: 'Christmas',
  },
  ...BLOG_POSTS,
];
