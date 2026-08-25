import type { PhotoMemory } from '../types/memory';
import photo1 from '../assets/photos/photo1_childhood.png';
import photo2 from '../assets/photos/photo2_fair_caps.png';
import photo3 from '../assets/photos/photo3_growing_up.png';
import photo4 from '../assets/photos/photo4_ferris_wheel.png';
import photo5 from '../assets/photos/photo5_rocky_beach.png';
import photo6 from '../assets/photos/photo6_beach_portrait.png';
import photo7 from '../assets/photos/photo7_traditional_final.png';

// Handcrafted aesthetic SVG placeholder illustrations for fallback photo slots
export const createPlaceholderSVG = (title: string, subtitle: string, color: string) => {
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
    title: 'Childhood & Sibling Bond',
    description: 'Where our story and lifelong sibling bond began with endless smiles.',
    imageUrl: photo1,
    customUploaded: true,
    dateLabel: 'Early Days',
  },
  {
    id: 'photo-2',
    slotNumber: 2,
    title: 'Uncle Chips & Outing Stories',
    description: 'Eating snacks, endless talks, matching caps & zero worries.',
    imageUrl: photo2,
    customUploaded: true,
    dateLabel: '1st Class Memories',
  },
  {
    id: 'photo-3',
    slotNumber: 3,
    title: 'Growing Up Together',
    description: 'Growing up together through every phase, fight, and laugh — leaning on each other.',
    imageUrl: photo3,
    customUploaded: true,
    dateLabel: 'Through The Years',
  },
  {
    id: 'photo-4',
    slotNumber: 4,
    title: 'Ferris Wheel & Night Lights',
    description: 'The unexpected chaos, dizzy heights, and silly moments only we remember.',
    imageUrl: photo4,
    customUploaded: true,
    dateLabel: 'Unplanned Moments',
  },
  {
    id: 'photo-5',
    slotNumber: 5,
    title: 'Rocky Beach Adventure',
    description: 'Standing strong against the ocean waves — memories that last forever.',
    imageUrl: photo5,
    customUploaded: true,
    dateLabel: 'Beach Trip',
  },
  {
    id: 'photo-6',
    slotNumber: 6,
    title: 'Akkoi & Brother (Us)',
    description: 'The best big sister I could ever have grown up with.',
    imageUrl: photo6,
    customUploaded: true,
    dateLabel: 'Forever Siblings',
  },
  {
    id: 'photo-7',
    slotNumber: 7,
    title: 'Raksha Bandhan Celebration',
    description: 'Until the next fight... I will always be there for you, Akkoi! 😂❤️',
    imageUrl: photo7,
    customUploaded: true,
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
