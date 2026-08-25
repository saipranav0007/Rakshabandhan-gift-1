import type { PhotoMemory } from '../types/memory';

// Handcrafted aesthetic SVG placeholder illustrations for empty photo slots
const createPlaceholderSVG = (title: string, subtitle: string, color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14141e"/>
        <stop offset="100%" stop-color="#0a0a0f"/>
      </linearGradient>
      <radialGradient id="r" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <pattern id="pattern" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="rgba(245,158,11,0.08)"/>
      </pattern>
    </defs>
    <rect width="600" height="750" fill="url(#g)"/>
    <rect width="600" height="750" fill="url(#pattern)"/>
    <rect width="600" height="750" fill="url(#r)"/>
    
    <!-- Decorative border -->
    <rect x="25" y="25" width="550" height="700" fill="none" stroke="rgba(245,158,11,0.2)" stroke-width="1.5" stroke-dasharray="8 6"/>
    <rect x="35" y="35" width="530" height="680" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

    <!-- Central Icon -->
    <g transform="translate(300, 300)">
      <circle r="65" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.3)" stroke-width="1.5"/>
      <path d="M-22,-15 C-22,-28 22,-28 22,-15 C22,12 -22,12 -22,-15 Z" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="0" cy="-2" r="18" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="0" cy="-2" r="8" fill="${color}" opacity="0.6"/>
      <path d="M-30,35 Q0,20 30,35" stroke="rgba(245,158,11,0.4)" stroke-width="2" fill="none"/>
    </g>

    <!-- Texts -->
    <text x="300" y="440" font-family="'Cinzel', serif" font-size="24" font-weight="700" fill="#fef3c7" text-anchor="middle" letter-spacing="2">${title.toUpperCase()}</text>
    <text x="300" y="480" font-family="'Caveat', cursive" font-size="22" fill="${color}" text-anchor="middle">${subtitle}</text>
    <text x="300" y="550" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">Tap to add our real photograph</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const DEFAULT_PHOTOS: PhotoMemory[] = [
  {
    id: 'photo-1',
    slotNumber: 1,
    title: 'Childhood',
    description: 'Where our story and lifelong sibling bond began.',
    imageUrl: createPlaceholderSVG('Childhood', 'Our early days together', '#f59e0b'),
    customUploaded: false,
    dateLabel: 'Early Days',
  },
  {
    id: 'photo-2',
    slotNumber: 2,
    title: 'Uncle Chips Days',
    description: 'Eating Uncle Chips around 1st class, telling endless stories.',
    imageUrl: createPlaceholderSVG('Uncle Chips Days', 'Stories, snacks & zero worries', '#f43f5e'),
    customUploaded: false,
    dateLabel: '1st Class Memories',
  },
  {
    id: 'photo-3',
    slotNumber: 3,
    title: 'Growing Up',
    description: 'Growing up together through every phase and fight.',
    imageUrl: createPlaceholderSVG('Growing Up', 'From little kids to who we are', '#e11d48'),
    customUploaded: false,
    dateLabel: 'Through The Years',
  },
  {
    id: 'photo-4',
    slotNumber: 4,
    title: 'One of our random memories',
    description: 'The unexpected chaos and silly moments only we remember.',
    imageUrl: createPlaceholderSVG('Random Memory', 'Pure sibling chaos', '#fbbf24'),
    customUploaded: false,
    dateLabel: 'Unplanned Moments',
  },
  {
    id: 'photo-5',
    slotNumber: 5,
    title: 'Recent Memory',
    description: 'Time keeps moving, but our bond stays exactly the same.',
    imageUrl: createPlaceholderSVG('Recent Memory', 'Still us, always', '#f59e0b'),
    customUploaded: false,
    dateLabel: 'Recent Times',
  },
  {
    id: 'photo-6',
    slotNumber: 6,
    title: 'Us',
    description: 'The best big sister I could ever have grown up with.',
    imageUrl: createPlaceholderSVG('Us', 'Akkoi & Brother', '#e11d48'),
    customUploaded: false,
    dateLabel: 'Forever Siblings',
  },
  {
    id: 'photo-7',
    slotNumber: 7,
    title: 'One Last Memory',
    description: 'Until the next fight. 😂❤️',
    imageUrl: createPlaceholderSVG('One Last Memory', 'Until the next fight 😂❤️', '#fbbf24'),
    customUploaded: false,
    dateLabel: 'Always & Forever',
  },
];

export const BROTHER_PROMISE_TEXT = `No matter what happens,

I promise I will be there — at every time, in every situation, for you.

You can fight with me.

You can get angry with me.

You can even call me the most annoying brother in the world. 😂

But whenever you need me,

I'll be there.

That's the promise I can give you.

And please... don't expect costly gifts from me. 😭😂

You know I'm still your brother.

But jokes apart...

I'll always be there for you, Akkoi. ❤️

— Your Brother`;
