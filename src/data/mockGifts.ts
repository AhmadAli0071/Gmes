import { GiftData } from '../types';

export const INITIAL_GIFTS: GiftData[] = [
  {
    id: 'gift-001',
    shareCode: 'gems-x9k2',
    recipientName: 'Sarah Jenkins',
    senderName: 'Ahmad',
    message:
      'Sarah, you make every ordinary day feel like an adventure. Wishing you the happiest birthday filled with all your favorite tunes, endless laughter, and sweet dessert! So grateful for you.',
    templateId: 'tpl-confetti-pastel',
    eventSlug: 'birthday',
    mood: 'playful',
    fontStyle: 'modern',
    musicTrack: 'birthday',
    animationEffect: 'confetti',
    photos: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=80',
    ],
    voiceNoteUrl: 'mock-voice-recording.mp3',
    voiceNoteDuration: 24,
    boxColor: '#8B5CF6',
    ribbonColor: '#EC4899',
    createdAt: '2026-10-02',
    viewsCount: 14,
    status: 'published',
  },
  {
    id: 'gift-002',
    shareCode: 'gems-hol7',
    recipientName: 'Mom & Dad',
    senderName: 'Ahmad',
    message:
      'Merry Christmas! Sending you the warmest hugs and love from across the miles. Cannot wait to sit by the fire together in December and bake holiday treats.',
    templateId: 'tpl-nordic-wonder',
    eventSlug: 'christmas',
    mood: 'festive',
    fontStyle: 'editorial',
    musicTrack: 'festive',
    animationEffect: 'snow',
    photos: [
      'https://images.unsplash.com/photo-1543258103-a62bd9610bd6?w=600&auto=format&fit=crop&q=80',
    ],
    boxColor: '#DC2626',
    ribbonColor: '#15803D',
    createdAt: '2026-10-05',
    viewsCount: 6,
    status: 'published',
  },
  {
    id: 'gift-003',
    shareCode: 'gems-spk3',
    recipientName: 'Leo & Maya',
    senderName: 'Ahmad',
    message:
      'Boo! Hope your spooky season is filled with delicious treats, spine-chilling movies, and fun costumes. Happy Halloween!',
    templateId: 'tpl-spooky-twilight',
    eventSlug: 'halloween',
    mood: 'playful',
    fontStyle: 'modern',
    musicTrack: 'ambient',
    animationEffect: 'sparkles',
    photos: [],
    boxColor: '#EA580C',
    ribbonColor: '#18181B',
    createdAt: '2026-10-06',
    viewsCount: 0,
    status: 'draft',
  },
];

export const AI_MESSAGE_TEMPLATES = {
  sweet: [
    'Just wanted to send a little reminder today of how truly special, wonderful, and deeply loved you are. You bring so much light into the world!',
    'Wishing you the sweetest day filled with little moments that make you smile. You deserve all the good things.',
  ],
  funny: [
    'Another year older, but let’s be real: you still act like we’re twelve. Happy birthday! May your back not hurt when you wake up tomorrow.',
    'I was going to buy you an expensive yacht, but then I remembered you prefer heartfelt digital gifts from people you love. You’re welcome!',
  ],
  romantic: [
    'You are the spark that lights up every room and the calm in every storm. Thank you for loving me exactly as I am. Every single moment with you is my favorite gift.',
    'I fell in love with your laugh first, but now I love every little piece of your heart. Happy anniversary to my soulmate, my best friend, and my forever.',
  ],
  heartfelt: [
    'Words will never be enough to capture how much your kindness and encouragement have shaped my life. Thank you for always believing in me, even when I doubted myself.',
    'Whenever I look back on the moments that truly mattered in my life, your hand was always there. Thank you for being my constant rock.',
  ],
  short: [
    'Thinking of you today and sending the biggest hug across the miles! Love you so much.',
    'Wishing you endless sunshine, laughter, and your favorite coffee today. Cheers to you!',
  ],
};
