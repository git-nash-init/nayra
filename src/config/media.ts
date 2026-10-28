/**
 * Media Registry for NAYRA Official Website
 * ALL 31 model-1 photographs + 2 video reels.
 */

export interface MediaItem {
  id: string;
  title: string;
  category: string;
  src: string;
  poster?: string;
  type: 'image' | 'video';
  aspectRatio: string;
  description?: string;
  hasAudio?: boolean;
}

export const HERO_MEDIA = {
  main: {
    src: '/media/images/nayra-hero-portrait.jpg',
    alt: 'NAYRA dramatic editorial portrait with dark background',
    width: 1440,
    height: 1469,
  },
  about: {
    src: '/media/images/nayra-about-featured.jpg',
    alt: 'Nayra smiling warmly, natural and approachable',
    width: 1440,
    height: 1800,
  },
};

export const FEATURED_VIDEOS: MediaItem[] = [
  {
    id: 'video-reel-01',
    title: 'Daily Unfiltered Moments',
    category: 'Daily diary',
    src: '/media/videos/nayra-video-reel-01.mp4',
    poster: '/media/images/nayra-video-poster-01.jpg',
    type: 'video',
    aspectRatio: '9/16',
    description: 'Behind-the-scenes candid moments, quick greetings, and daily vlog previews.',
  },
  {
    id: 'video-reel-02',
    title: 'Private Stories & Moods',
    category: 'Private stories',
    src: '/media/videos/nayra-video-reel-02.mp4',
    poster: '/media/images/nayra-video-poster-02.jpg',
    type: 'video',
    aspectRatio: '9/16',
    hasAudio: true,
    description: 'A film with sound: greetings, stories and candid moments. Turn the sound on to listen.',
  },
  {
    id: 'video-reel-03',
    title: 'Candid Studio & Moods',
    category: 'Behind the scenes',
    src: '/media/videos/nayra-video-reel-03.mp4',
    poster: '/media/images/nayra-preview-03-sage-elegance.jpg',
    type: 'video',
    aspectRatio: '9/16',
    description: 'Special studio clips, festive celebrations, and candid real-time updates.',
  },
];

// ALL 31 images from model-1 folder represented in the gallery archive
export const GALLERY_ITEMS: MediaItem[] = [
  {
    id: 'gallery-01',
    title: 'Golden Hour Jewels',
    category: 'Traditional',
    src: '/media/images/nayra-preview-01-golden-hour.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Intricate gold maang tikka and statement earrings under warm evening light.',
  },
  {
    id: 'gallery-02',
    title: 'Festive Pink Grace',
    category: 'Festive',
    src: '/media/images/nayra-preview-02-festive-yellow.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Vibrant pink ethnic attire with delicate gold jewellery.',
  },
  {
    id: 'gallery-03',
    title: 'Sage Elegance',
    category: 'Outdoor',
    src: '/media/images/nayra-preview-03-sage-elegance.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Graceful embroidered dupatta under a soft city dusk sky.',
  },
  {
    id: 'gallery-04',
    title: 'Dark Floral Portrait',
    category: 'Traditional',
    src: '/media/images/nayra-preview-04-midnight-chic.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Deep midnight blue traditional suit with delicate silver details.',
  },
  {
    id: 'gallery-05',
    title: 'Mountain Escape',
    category: 'Travel',
    src: '/media/images/nayra-preview-05-mountain-retreat.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'High-altitude scenic escape surrounded by lush alpine pines.',
  },
  {
    id: 'gallery-06',
    title: 'Morning Light',
    category: 'Casual',
    src: '/media/images/nayra-preview-06-cafe-morning.jpg',
    type: 'image',
    aspectRatio: '3/4',
    description: 'Candid morning light and effortless everyday charm.',
  },
  {
    id: 'gallery-07',
    title: 'Rose Gold Shimmer',
    category: 'Traditional',
    src: '/media/images/nayra-preview-07-rose-gold.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Intricate maang tikka, statement earrings, and soft rose palette.',
  },
  {
    id: 'gallery-08',
    title: 'Winter Warmth',
    category: 'Portrait',
    src: '/media/images/nayra-preview-08-winter-glow.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Cosy winter jacket, rosy cheeks, and a natural direct gaze.',
  },
  {
    id: 'gallery-09',
    title: 'Waterfall Journey',
    category: 'Travel',
    src: '/media/images/nayra-preview-09-waterfall-journey.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Rushing mountain stream and fresh wild mountain air.',
  },
  {
    id: 'gallery-10',
    title: 'Sunny Day Candid',
    category: 'Outdoor',
    src: '/media/images/nayra-preview-10-outdoor-sunshine.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Denim jacket and candid outdoor park smile.',
  },
  {
    id: 'gallery-11',
    title: 'Rooftop Dusk',
    category: 'Outdoor',
    src: '/media/images/nayra-preview-11-sunset-balcony.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Warm breeze overlooking city skyline at dusk.',
  },
  {
    id: 'gallery-12',
    title: 'Festive Bangles',
    category: 'Festive',
    src: '/media/images/nayra-preview-12-festive-joy.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Traditional glass bangles, joyous celebration, vibrant yellow.',
  },
  {
    id: 'gallery-13',
    title: 'Editorial Hero Portrait',
    category: 'Portrait',
    src: '/media/images/nayra-hero-portrait.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Dramatic chiaroscuro editorial studio close-up portrait.',
  },
  {
    id: 'gallery-14',
    title: 'Approach Warmth',
    category: 'Portrait',
    src: '/media/images/nayra-about-featured.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Warm and personal smiling portrait in white knit wear.',
  },
  {
    id: 'gallery-15',
    title: 'Golden Sunset Studio',
    category: 'Portrait',
    src: '/media/images/nayra-video-poster-01.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Terrace golden hour lighting and intimate serene gaze.',
  },
  {
    id: 'gallery-16',
    title: 'Striped Blinds Mood',
    category: 'Portrait',
    src: '/media/images/nayra-video-poster-02.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Sensory interior lighting with subtle stripe shadow patterns.',
  },
  {
    id: 'gallery-17',
    title: 'Winter Selfie',
    category: 'Portrait',
    src: '/media/images/nayra-extra-15.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Natural indoor selfie in a cosy puffer jacket.',
  },
  {
    id: 'gallery-18',
    title: 'Mehndi Yellow Elegance',
    category: 'Festive',
    src: '/media/images/nayra-extra-16.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Vibrant yellow salwar with gold bangles and fresh mehndi.',
  },
  {
    id: 'gallery-19',
    title: 'Garden Charm',
    category: 'Traditional',
    src: '/media/images/nayra-extra-17.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Dark embroidered floral suit with ornate bangles, garden backdrop.',
  },
  {
    id: 'gallery-20',
    title: 'Soft Morning Glow',
    category: 'Portrait',
    src: '/media/images/nayra-extra-18.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Luminous natural morning skin in a cosy puffer jacket.',
  },
  {
    id: 'gallery-21',
    title: 'Waterfall Flannel',
    category: 'Travel',
    src: '/media/images/nayra-extra-19.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Orange plaid flannel at a roaring mountain waterfall.',
  },
  {
    id: 'gallery-22',
    title: 'Golden Drape',
    category: 'Festive',
    src: '/media/images/nayra-extra-20.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Back-view drape of embroidered yellow dupatta, chandelier earrings.',
  },
  {
    id: 'gallery-23',
    title: 'Mehndi Gaze',
    category: 'Festive',
    src: '/media/images/nayra-extra-21.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Festive mehndi hands, kaleere, and a playful over-the-shoulder look.',
  },
  {
    id: 'gallery-24',
    title: 'Mint Sunset Smile',
    category: 'Outdoor',
    src: '/media/images/nayra-extra-22.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Mint green embroidered suit glowing in rooftop golden hour.',
  },
  {
    id: 'gallery-25',
    title: 'Yellow Back Grace',
    category: 'Festive',
    src: '/media/images/nayra-extra-23.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Elegant back-pose in yellow embroidered suit with gold jhumkas.',
  },
  {
    id: 'gallery-26',
    title: 'Garden Floral Blossom',
    category: 'Traditional',
    src: '/media/images/nayra-extra-24.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Smiling portrait in dark floral print suit among garden blooms.',
  },
  {
    id: 'gallery-27',
    title: 'Mint Rooftop Joy',
    category: 'Outdoor',
    src: '/media/images/nayra-extra-25.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Joyful rooftop moment in embroidered mint suit at sunset.',
  },
  {
    id: 'gallery-28',
    title: 'Mint Laugh Candid',
    category: 'Outdoor',
    src: '/media/images/nayra-extra-26.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Candid joyful laughter in a mint green embroidered dupatta suit.',
  },
  {
    id: 'gallery-29',
    title: 'Haldi Celebration',
    category: 'Festive',
    src: '/media/images/nayra-extra-27.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Haldi ceremony in a yellow suit, with mehndi and marigold decor.',
  },
  {
    id: 'gallery-30',
    title: 'Kashmir Meadows',
    category: 'Travel',
    src: '/media/images/nayra-extra-28.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'Breathtaking Kashmir alpine meadow in black embroidered ensemble.',
  },
  {
    id: 'gallery-31',
    title: 'Cafe Candidly',
    category: 'Casual',
    src: '/media/images/nayra-extra-29.jpg',
    type: 'image',
    aspectRatio: '4/5',
    description: 'An unposed cafe selfie in a white tee.',
  },
];

export const GALLERY_CATEGORIES = [
  'All',
  'Festive',
  'Traditional',
  'Outdoor',
  'Travel',
  'Portrait',
  'Casual',
];

/**
 * 4 Themed Tile Collections for the Homepage Gallery
 * Each tile holds multiple images with selectable options
 */
export interface GalleryTileCollection {
  id: string;
  themeTitle: string;
  category: string;
  tag: string;
  images: MediaItem[];
}

export const HOMEPAGE_GALLERY_TILES: GalleryTileCollection[] = [
  {
    id: 'tile-festive',
    themeTitle: 'Festive & ceremony',
    category: 'Festive',
    tag: 'Celebration',
    images: [
      GALLERY_ITEMS[1],  // Festive Pink Grace
      GALLERY_ITEMS[11], // Festive Bangles
      GALLERY_ITEMS[17], // Mehndi Yellow
      GALLERY_ITEMS[21], // Golden Drape
      GALLERY_ITEMS[22], // Mehndi Gaze
      GALLERY_ITEMS[24], // Yellow Back Grace
      GALLERY_ITEMS[28], // Haldi Celebration
    ],
  },
  {
    id: 'tile-traditional',
    themeTitle: 'Traditional & heritage',
    category: 'Traditional',
    tag: 'Heritage',
    images: [
      GALLERY_ITEMS[0],  // Golden Hour Jewels
      GALLERY_ITEMS[3],  // Dark Floral Portrait
      GALLERY_ITEMS[6],  // Rose Gold Shimmer
      GALLERY_ITEMS[18], // Garden Charm
      GALLERY_ITEMS[25], // Garden Floral Blossom
    ],
  },
  {
    id: 'tile-outdoor',
    themeTitle: 'Golden hour & rooftop',
    category: 'Outdoor',
    tag: 'Golden hour',
    images: [
      GALLERY_ITEMS[2],  // Sage Elegance
      GALLERY_ITEMS[10], // Rooftop Dusk
      GALLERY_ITEMS[23], // Mint Sunset Smile
      GALLERY_ITEMS[26], // Mint Rooftop Joy
      GALLERY_ITEMS[27], // Mint Laugh Candid
      GALLERY_ITEMS[9],  // Sunny Day Candid
    ],
  },
  {
    id: 'tile-travel',
    themeTitle: 'Travel & unfiltered',
    category: 'Travel',
    tag: 'Unfiltered',
    images: [
      GALLERY_ITEMS[4],  // Mountain Escape
      GALLERY_ITEMS[8],  // Waterfall Journey
      GALLERY_ITEMS[29], // Kashmir Meadows
      GALLERY_ITEMS[20], // Waterfall Flannel
      GALLERY_ITEMS[5],  // Morning Light
      GALLERY_ITEMS[30], // Cafe Candidly
      GALLERY_ITEMS[7],  // Winter Warmth
    ],
  },
];
