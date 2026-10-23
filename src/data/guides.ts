import birthdayImage from '../assets/images/guides/birthday.jpg';
import anniversaryImage from '../assets/images/guides/anniversary.jpg';
import valentinesImage from '../assets/images/guides/valentines.jpg';
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
      'Holiday magic in one link — photos, a voice note and a message inside a festive 3D gift box.',
    path: '/christmas-digital-gift-card',
    image: christmasImage,
    alt: 'Christmas digital gift card with a festive 3D gift box and holiday lights',
    tag: 'Christmas',
    readTime: '5 min read',
  },
];
