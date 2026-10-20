import { LandingView } from '../types';

/**
 * Long-form SEO landing pages. Copy is kept verbatim from the approved briefs
 * so the H1/FAQ/schema stay aligned; `[label](/path)` marks internal links.
 */

export interface LandingFaq {
  q: string;
  a: string;
}

export type LandingBlock =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] };

export interface LandingPage {
  slug: LandingView;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  blocks: LandingBlock[];
  ctaHeading: string;
  ctaBody: string;
  faqs: LandingFaq[];
  related: { label: string; path: string }[];
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: 'virtual-birthday-gift',
    keyword: 'virtual birthday gift',
    metaTitle: 'Virtual Birthday Gift Ideas | Send a 3D Gift Box',
    metaDescription:
      'Send a virtual birthday gift with photos, a voice note and a message in a 3D gift box. Share it with one link and surprise someone now. Try GEMS.',
    h1: 'Virtual Birthday Gift: Celebrate Together, Wherever You Are',
    intro:
      'Missed birthdays hurt. A package stuck in transit or a card that arrives a week late rarely says what you meant. A virtual birthday gift fixes that by delivering your wishes the moment you choose. With GEMS, you place photos, a voice note and a written message inside a 3D gift box and send it through one link, so the person opens it right when the day begins.',
    blocks: [
      { kind: 'h2', text: 'Why More People Send an Online Birthday Gift' },
      {
        kind: 'p',
        text: 'An online birthday gift has no shipping window, no sizing worries and no customs fees. That makes it a reliable choice for last minute birthday gift ideas, especially when you remember the date the night before. For families across the USA spread over different states and countries, it also means nobody is left out of the celebration.',
      },
      { kind: 'h2', text: 'How a Birthday Gift Box Works' },
      {
        kind: 'p',
        text: 'You collect your photos, record a short voice note and write your message. GEMS arranges them inside a 3D gift box that opens with a small reveal. You then copy the link and send it by text, email or social media, so the birthday person can unwrap everything on their own phone or computer.',
      },
      { kind: 'h2', text: 'Birthday Gift Ideas by Person' },
      { kind: 'h3', text: 'For a partner' },
      {
        kind: 'p',
        text: 'Build a personalized virtual birthday gift around your story. Add a birthday gift box with photos from your first trip, then finish with a message about what you admire most this year. Planning a bigger romantic date? Our [digital anniversary gift ideas](/anniversary-digital-gift) follow a similar approach.',
      },
      { kind: 'h3', text: 'For a best friend' },
      {
        kind: 'p',
        text: 'Pick the funniest photos you share, add an inside joke and record a birthday surprise with voice message that makes them laugh before they finish their coffee. Friends often remember the laughter more than the present itself, so keep the tone playful.',
      },
      { kind: 'h3', text: 'For parents and relatives overseas' },
      {
        kind: 'p',
        text: 'A birthday gift for someone far away works best when it carries your voice. Let your parents or grandparents hear you say happy birthday, then show the photos that remind them how close you still are. For more ideas, read our guide to [long distance relationship gifts](/long-distance-gift-ideas).',
      },
      { kind: 'h2', text: 'Make the Surprise Feel Personal' },
      {
        kind: 'ul',
        items: [
          'Choose photos from different years so the box feels like a timeline.',
          'Keep your voice note under a minute so it sounds warm, not rehearsed.',
          'Mention one specific memory instead of a general wish.',
        ],
      },
      {
        kind: 'p',
        text: 'Timing matters too. Send the link at midnight for a first thing surprise, or choose a quiet evening when they can listen to your voice without rushing.',
      },
      {
        kind: 'p',
        text: "Looking ahead to February? Our [Valentine's Day virtual gift page](/valentines-day-virtual-gift) shares romantic ideas built the same way.",
      },
    ],
    ctaHeading: 'Send a Birthday They Will Remember',
    ctaBody:
      'Whether the birthday is today or next week, create a virtual birthday gift with GEMS and share it with one link. A few minutes of effort can become the part of the day they remember most, and your gift can arrive before the cake is even cut.',
    faqs: [
      {
        q: 'What goes inside a virtual birthday gift?',
        a: 'Photos, a voice note and a written message sit inside a 3D gift box. The recipient opens everything from one shared link.',
      },
      {
        q: 'How long does it take to make a birthday gift box?',
        a: 'Most people finish in a few minutes once their photos and message are ready. That makes it a handy last minute option.',
      },
      {
        q: 'Where should I send the birthday link?',
        a: 'Send it by text, email or any chat app the person already uses. Choose a time when they are likely to be free to open it.',
      },
      {
        q: 'Which photos suit a birthday gift box best?',
        a: 'Pick clear, happy photos from different moments you share. A mix of old and recent pictures tells a fuller story.',
      },
      {
        q: 'Who enjoys a virtual birthday gift most?',
        a: 'It is perfect for people who live far away and for anyone who values memories over objects. Partners, friends and grandparents love it.',
      },
    ],
    related: [
      { label: 'Digital anniversary gift ideas', path: '/anniversary-digital-gift' },
      { label: "Valentine's Day virtual gift", path: '/valentines-day-virtual-gift' },
      { label: 'Long distance relationship gifts', path: '/long-distance-gift-ideas' },
    ],
  },
  {
    slug: 'anniversary-digital-gift',
    keyword: 'digital anniversary gift',
    metaTitle: 'Digital Anniversary Gift Ideas | GEMS 3D Gift Box',
    metaDescription:
      'Create a digital anniversary gift with photos, a voice note and a love message inside a 3D gift box. Share one link and celebrate your story now.',
    h1: 'Digital Anniversary Gift Ideas to Relive Your Love Story',
    intro:
      'Every anniversary quietly asks the same question: how do we show what this year meant? A digital anniversary gift answers it with something only the two of you share. Using GEMS, you put photos, a voice note and a heartfelt message inside a 3D gift box and send it in one link. Your partner opens it slowly, memory by memory, and the day feels special even when your schedules do not match.',
    blocks: [
      { kind: 'h2', text: 'What Makes a Romantic Digital Gift Different' },
      {
        kind: 'p',
        text: 'Store bought presents are often forgotten within weeks. A romantic digital gift for husband or wife stays with you because it holds real moments. It can be reopened on a tired Monday or a quiet anniversary dinner, and it never needs wrapping or postage. If you want unique anniversary gift ideas that do not repeat what every couple buys, personal media is hard to beat. Couples across the USA who balance work, travel and family often find that a digital gift is the one present that always arrives on time.',
      },
      { kind: 'h2', text: 'Anniversary Ideas by Year' },
      {
        kind: 'ul',
        items: [
          'Year one: a first anniversary gift for him or her can retrace your first date, your first trip and the moment you knew.',
          'Years two to five: add an anniversary gift box with photos that shows how your life together has grown.',
          'Ten years and beyond: let a short anniversary voice message say what a printed card cannot.',
        ],
      },
      { kind: 'h2', text: 'How to Build Your Anniversary Gift Box' },
      {
        kind: 'p',
        text: 'Gather photos first, ideally from three or four stages of your relationship. Record your voice note in a quiet room and speak as if your partner is sitting beside you. Then write a short message, arrange everything inside the 3D gift box and copy your link.',
      },
      { kind: 'h2', text: 'What to Say in Your Anniversary Message' },
      {
        kind: 'p',
        text: 'Start with one memory only the two of you understand. Add what you appreciate about your partner today, and finish with something you look forward to next year. Honest and specific beats long and polished, and a few plain sentences in your own words will always feel more romantic than a borrowed poem. An anniversary gift when you are apart can still feel close, and our [long distance relationship gifts guide](/long-distance-gift-ideas) has more thoughts on that.',
      },
      { kind: 'h2', text: 'Share the Moment at the Right Time' },
      {
        kind: 'p',
        text: 'Send your link at breakfast, just before dinner or at midnight when the date changes. Some couples save the link and reopen it every anniversary to see how their story has grown. For a similar surprise on another occasion, see our [virtual birthday gift page](/virtual-birthday-gift), or browse a [Valentine\u2019s Day virtual gift](/valentines-day-virtual-gift) for February ideas.',
      },
    ],
    ctaHeading: 'Ready to Tell Your Story?',
    ctaBody:
      'Create a digital anniversary gift on GEMS and give your partner a keepsake that only the two of you could have made. It takes minutes to create, yet it can be replayed for years.',
    faqs: [
      {
        q: 'What is a digital anniversary gift?',
        a: 'It is a personal online present made from your photos, voice and words. GEMS places them inside a 3D gift box you share by link.',
      },
      {
        q: 'What should I say in an anniversary voice message?',
        a: 'Share one favorite memory and one thing you are grateful for. Speak naturally, since warmth matters more than perfect wording.',
      },
      {
        q: 'How many photos should I add?',
        a: 'A handful of meaningful photos works better than dozens. Choose moments from different stages of your relationship.',
      },
      {
        q: 'When is the best time to send it?',
        a: 'Send it first thing in the morning or at a quiet moment you will both enjoy. Timing it for midnight adds extra magic.',
      },
      {
        q: 'Which couples enjoy this gift most?',
        a: 'It suits newlyweds, long term partners and couples who live apart. Anyone who values memories over objects will love it.',
      },
    ],
    related: [
      { label: 'Virtual birthday gift', path: '/virtual-birthday-gift' },
      { label: "Valentine's Day virtual gift", path: '/valentines-day-virtual-gift' },
      { label: 'Long distance relationship gifts', path: '/long-distance-gift-ideas' },
    ],
  },
  {
    slug: 'valentines-day-virtual-gift',
    keyword: "valentine's day virtual gift",
    metaTitle: "Valentine's Day Virtual Gift Ideas | GEMS Gift Box",
    metaDescription:
      'Send a Valentine\u2019s Day virtual gift with photos, a voice note and a love message in a 3D gift box. One link and one sweet surprise. Try GEMS now.',
    h1: "Valentine's Day Virtual Gift Ideas for Someone You Love",
    intro:
      "Valentine's Day should feel romantic, not rushed. Yet sold out flowers, delayed shipping and full restaurants can turn it into a scramble. A Valentine's Day virtual gift lets you skip the stress. With GEMS, you create a 3D gift box with photos, a voice note and a loving message, then send it with one link. It feels personal because every photo, word and sound comes from you.",
    blocks: [
      { kind: 'h2', text: "Seven Romantic Valentine's Surprise Ideas" },
      {
        kind: 'ul',
        items: [
          "Build a Valentine's gift box with photos from your first date to this year.",
          "Record a Valentine's voice message gift that shares three reasons you love them.",
          'Write ten short lines that each begin with I love how you.',
          'Choose a photo that makes you both laugh and explain why it matters to you.',
          'Plan a future date and describe it in your message.',
          'Mention a song that reminds you of them.',
          'End with a promise for the year ahead.',
        ],
      },
      { kind: 'h2', text: "Why a Virtual Valentine's Gift for Boyfriend or Girlfriend Wins" },
      {
        kind: 'ul',
        items: [
          'Speed: a virtual gift is ready today, while shipped items can arrive late.',
          'Meaning: your own voice and photos carry more feeling than a generic card.',
          'Lasting value: the box can be reopened long after the chocolates are gone.',
          'Flexibility: you can prepare early and send it at the exact moment you choose.',
        ],
      },
      { kind: 'h2', text: "Last Minute Valentine's Day Gift Ideas That Still Feel Thoughtful" },
      {
        kind: 'p',
        text: "Forgot to plan? A romantic Valentine's surprise online can be finished the same afternoon. Gather your favorite photos, record a short voice message and write two sincere lines. Thoughtfulness comes from detail, not preparation time. You do not need design skills either, because the 3D gift box handles the presentation for you.",
      },
      { kind: 'h2', text: "How the Valentine's Gift Box Works" },
      {
        kind: 'p',
        text: 'Upload your photos, record your voice and write your message. GEMS wraps them in a 3D gift box that opens with a small reveal, and you share it through a single link. Your Valentine can open it at breakfast, on a lunch break or after dinner, whichever suits them.',
      },
      { kind: 'h2', text: 'Tips for a Message That Feels Sincere' },
      {
        kind: 'p',
        text: 'Write the way you speak. Use their nickname, mention a detail only they would notice and avoid clich\u00e9s from greeting cards. If recording a voice message feels awkward, take a breath, smile and talk as if you are sitting across from them. Sincere beats perfect every time.',
      },
      { kind: 'h2', text: 'For Long Distance Couples and Special Milestones' },
      {
        kind: 'p',
        text: "A Valentine's Day gift for long distance couples feels warmer when it carries your voice, and our [long distance relationship gifts page](/long-distance-gift-ideas) shares more ideas. Celebrating a relationship milestone too? A [digital anniversary gift](/anniversary-digital-gift) follows the same simple idea. Need something for a friend with a February birthday? Try a [virtual birthday gift](/virtual-birthday-gift).",
      },
    ],
    ctaHeading: 'Make February 14 Unforgettable',
    ctaBody:
      "Create your Valentine's gift box on GEMS and let them open it with a smile. It takes only a few minutes, and it may be the part of February 14 they talk about most.",
    faqs: [
      {
        q: "What makes a Valentine's voice message gift special?",
        a: 'Your voice carries tone and emotion that text cannot. Hearing it makes the gift feel like you are right there.',
      },
      {
        q: "How early can I prepare a Valentine's gift box?",
        a: 'Prepare it days ahead, then send the link on February 14. The surprise stays hidden until you share it.',
      },
      {
        q: "What should I write in a Valentine's message?",
        a: 'Share one memory, one reason you love them and one hope for the year. Keep it short and sincere.',
      },
      {
        q: 'Which photos should I choose?',
        a: 'Pick photos with genuine smiles from places that matter to you. A mix of old and new pictures works best.',
      },
      {
        q: "Who can I send a virtual Valentine's gift to?",
        a: "Send it to a partner, close friend or family member you appreciate. Valentine's Day is for all kinds of love.",
      },
    ],
    related: [
      { label: 'Virtual birthday gift', path: '/virtual-birthday-gift' },
      { label: 'Digital anniversary gift', path: '/anniversary-digital-gift' },
      { label: 'Long distance relationship gifts', path: '/long-distance-gift-ideas' },
    ],
  },
  {
    slug: 'long-distance-gift-ideas',
    keyword: 'long distance relationship gifts',
    metaTitle: 'Long Distance Relationship Gifts | GEMS Gift Box',
    metaDescription:
      'Find long distance relationship gifts that feel closer. Send photos, a voice note and a message inside a 3D gift box with one link. Try GEMS now.',
    h1: 'Long Distance Relationship Gifts That Bring You Closer',
    intro:
      'Distance is rarely about miles. It is about missing small moments: a laugh at dinner, a hand to hold, a voice at the end of a day. The best long distance relationship gifts recreate those moments instead of filling a box with things. With GEMS, you send photos, a voice note and a heartfelt message inside a 3D gift box through one link.',
    blocks: [
      { kind: 'h2', text: 'Match the Gift to the Feeling' },
      {
        kind: 'ul',
        items: [
          'When you miss their voice: send a long distance gift with voice message they can replay at night.',
          'When time zones clash: record a good morning note they open when they wake up.',
          'When you feel left out of their day: share photos of your routine so they see your world.',
          'When the reunion feels far away: write about the first thing you will do together.',
        ],
      },
      { kind: 'h2', text: 'Why Your Voice Matters So Much' },
      {
        kind: 'p',
        text: 'Text messages are quick, but they lose tone. A voice note carries warmth, laughter and the small pauses that make someone sound like themselves. Hearing your voice can calm a hard day better than a paragraph of words, which is why many people see it as the heart of any gift for a partner in another state or country.',
      },
      { kind: 'h2', text: 'Long Distance Gift Ideas for Boyfriend or Girlfriend' },
      {
        kind: 'p',
        text: 'Some of the most thoughtful long distance gifts are also the simplest. Create a gift box with photos of favorite shared places, add a message that mentions one inside joke, and finish with a plan for your next visit. If you search for long distance gift ideas for boyfriend or girlfriend, choose personal media over generic items, since it carries your presence.',
      },
      { kind: 'h2', text: 'Gifts for Long Distance Couples on Special Dates' },
      {
        kind: 'p',
        text: 'Occasions make distance feel louder, so plan ahead. A [digital anniversary gift](/anniversary-digital-gift) helps you mark another year together. A [Valentine\u2019s Day virtual gift](/valentines-day-virtual-gift) brings romance to February. A [virtual birthday gift](/virtual-birthday-gift) keeps you in the room when the candles are lit.',
      },
      { kind: 'h2', text: 'Build a Small Ritual Around Your Surprises' },
      {
        kind: 'p',
        text: 'Not every gift needs a reason. A gift for someone you miss can arrive on a random Wednesday and change their whole week. Many couples turn long distance relationship surprise ideas into a monthly habit, and a short voice message often becomes their favorite part. Consistency tells your partner they are on your mind.',
      },
      { kind: 'h2', text: 'How to Send Your Gift Box' },
      {
        kind: 'p',
        text: 'Collect photos, record your voice note, write a short message and arrange them inside the 3D gift box. Copy the link and send it whenever you like, with no shipping delays between you and the surprise.',
      },
    ],
    ctaHeading: 'Start Closing the Distance Today',
    ctaBody:
      'Create a long distance gift with GEMS and let your partner feel your presence with a single tap. No stamps, no waiting and no customs forms stand in the way.',
    faqs: [
      {
        q: 'What are the most thoughtful long distance gifts?',
        a: 'Gifts that carry your voice, photos and words feel closest. A GEMS 3D gift box combines all three in one link.',
      },
      {
        q: 'How often should I send a surprise to my partner?',
        a: 'Send one on special dates and a few on ordinary days. Small, regular surprises show steady care.',
      },
      {
        q: 'How do I handle different time zones?',
        a: 'Record a voice note and share the link so they can open it at their own pace. A morning message is a lovely start to their day.',
      },
      {
        q: 'Where can my partner open the gift box?',
        a: 'On a phone or computer anywhere in the world using your link. No shipping or customs are involved.',
      },
      {
        q: 'What should I say in a long distance message?',
        a: 'Mention one shared memory and one thing you look forward to. Honest, simple words feel the most personal.',
      },
    ],
    related: [
      { label: 'Virtual birthday gift', path: '/virtual-birthday-gift' },
      { label: 'Digital anniversary gift', path: '/anniversary-digital-gift' },
      { label: "Valentine's Day virtual gift", path: '/valentines-day-virtual-gift' },
    ],
  },
];

export function getLandingPage(slug: LandingView): LandingPage {
  return LANDING_PAGES.find((page) => page.slug === slug) ?? LANDING_PAGES[0];
}
