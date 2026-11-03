import birthdayImage from '../assets/images/guides/birthday.jpg';
import anniversaryImage from '../assets/images/guides/anniversary.jpg';
import valentinesImage from '../assets/images/guides/valentines.jpg';
import longDistanceImage from '../assets/images/use-cases/long-distance.jpg';
import lastMinuteImage from '../assets/images/use-cases/last-minute.jpg';
import familyAbroadImage from '../assets/images/use-cases/family-abroad.jpg';
import heroGiftImage from '../assets/images/hero_gift_unboxing_1791359349622.jpg';
import christmasImage from '../assets/images/template_christmas_wonder_1791359394567.jpg';

export interface GiftGuide {
  title: string;
  excerpt: string;
  path: string;
  image: string;
  alt: string;
  tag: string;
  readTime: string;
}

export const BLOG_POSTS: GiftGuide[] = [
  {
    title: 'Surprise a Long Distance Partner on Their Birthday',
    excerpt:
      'A simple plan across time zones - timing tips, gift ideas and mistakes to avoid.',
    path: '/long-distance-birthday-surprise',
    image: longDistanceImage,
    alt: 'Long distance birthday surprise with a virtual gift box and a video call',
    tag: 'Long distance',
    readTime: '6 min read',
  },
  {
    title: "Last-Minute Christmas Gifts That Aren't Gift Cards",
    excerpt:
      'Thoughtful ideas you can finish in an afternoon - digital, local and handmade options.',
    path: '/last-minute-christmas-gift-ideas',
    image: christmasImage,
    alt: 'Last-minute Christmas gifts including a festive virtual gift box',
    tag: 'Christmas',
    readTime: '6 min read',
  },
  {
    title: 'Instant Gift Ideas You Can Send in Minutes',
    excerpt:
      'Forgot a gift? Voice notes, playlists and digital gift boxes that arrive in minutes.',
    path: '/instant-gift-ideas',
    image: lastMinuteImage,
    alt: 'Instant gift ideas sent in minutes from a phone',
    tag: 'Instant gifts',
    readTime: '6 min read',
  },
  {
    title: "Valentine's Day Gifts for Long Distance Couples",
    excerpt:
      'Planning tips, digital ideas and ways to make February 14 feel close from afar.',
    path: '/valentines-day-gifts-long-distance-couples',
    image: valentinesImage,
    alt: 'Long distance Valentine\u2019s Day gift with a virtual gift box',
    tag: "Valentine's Day",
    readTime: '6 min read',
  },
  {
    title: 'How to Make a Photo Memory Video or Slideshow Gift',
    excerpt:
      'Pick photos, shape the story, add music or a voice note and share a gift they replay.',
    path: '/photo-memory-video-gift',
    image: anniversaryImage,
    alt: 'Photo memory slideshow gift with a romantic photo timeline',
    tag: 'Photo gifts',
    readTime: '7 min read',
  },
  {
    title: 'How to Say Thank You on Thanksgiving: Heartfelt Message Ideas',
    excerpt:
      'Ready-to-use messages for family, friends and coworkers, plus tips to make each one sound like you.',
    path: '/thanksgiving-thank-you-messages',
    image: lastMinuteImage,
    alt: 'A small wrapped gift and cake on a warm table setting',
    tag: 'Thanksgiving',
    readTime: '6 min read',
  },
  {
    title: 'What Is a Virtual Gift? A Complete Beginner\u2019s Guide',
    excerpt:
      'The meaning, common types, benefits and how to send a personal digital gift in minutes.',
    path: '/what-is-a-virtual-gift',
    image: heroGiftImage,
    alt: 'A 3D virtual gift box opening with sparkles',
    tag: 'Virtual gifts',
    readTime: '7 min read',
  },
  {
    title: 'Best Digital Gift Ideas for Christmas 2026',
    excerpt:
      'No-shipping Christmas ideas, from voice messages to photo videos, for parents and family abroad.',
    path: '/digital-gift-ideas-for-christmas',
    image: christmasImage,
    alt: 'Cosy Christmas fireplace with garlands and holiday lights',
    tag: 'Christmas',
    readTime: '6 min read',
  },
  {
    title: 'How to Avoid Shipping Delays This Holiday Season',
    excerpt:
      'Key 2026 shipping deadlines, common delay causes and instant backups if you miss the cutoff.',
    path: '/holiday-shipping-deadlines-2026',
    image: familyAbroadImage,
    alt: 'Cosy holiday fireplace with Christmas garlands and lights',
    tag: 'Holiday shipping',
    readTime: '6 min read',
  },
  {
    title: 'Black Friday Alternatives: Meaningful Gifts That Cost Less',
    excerpt:
      'Free and low-cost gift ideas built on time, attention and shared memories instead of discounts.',
    path: '/black-friday-alternatives',
    image: longDistanceImage,
    alt: 'A purple 3D gift box opening with sparkles',
    tag: 'Budget gifts',
    readTime: '6 min read',
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
    readTime: '5 min read',
  },
  {
    title: 'Digital Anniversary Gift Ideas',
    excerpt: 'Relive your love story, one memory at a time, in a 3D gift box.',
    path: '/anniversary-digital-gift',
    image: anniversaryImage,
    alt: '3D anniversary gift box with photos and a voice note',
    tag: 'Anniversary',
    readTime: '5 min read',
  },
  {
    title: "Valentine's Day Virtual Gift Ideas",
    excerpt: 'Romantic ideas that feel personal because every photo and word comes from you.',
    path: '/valentines-day-virtual-gift',
    image: valentinesImage,
    alt: 'Romantic virtual gift box with rose petals',
    tag: "Valentine's Day",
    readTime: '5 min read',
  },
  {
    title: 'Long Distance Relationship Gifts',
    excerpt: 'Close the distance with your voice, your photos and a message they can replay.',
    path: '/long-distance-gift-ideas',
    image: valentinesImage,
    alt: 'Long distance gift box with photos and a voice note',
    tag: 'Long distance',
    readTime: '5 min read',
  },
  {
    title: 'Christmas Digital Gift Card Ideas',
    excerpt:
      'Holiday magic in one link - photos, a voice note and a message inside a festive 3D gift box.',
    path: '/christmas-digital-gift-card',
    image: christmasImage,
    alt: 'Christmas digital gift card with a festive 3D gift box and holiday lights',
    tag: 'Christmas',
    readTime: '5 min read',
  },
  ...BLOG_POSTS,
];
