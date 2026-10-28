/**
 * Central Configuration for NAYRA Official Website
 * Single Source of Truth for Brand, Pricing, URLs, and Copy.
 */

export const BRAND_NAME = 'NAYRA';
export const SUBSCRIPTION_PRICE_INR = 499;
export const CURRENCY_SYMBOL = '₹';
export const FORMATTED_PRICE = `${CURRENCY_SYMBOL}${SUBSCRIPTION_PRICE_INR}`;

export const SITE_METADATA = {
  title: 'NAYRA | The Private Edition',
  tagline: 'Unfiltered moments, personal stories, and private daily conversations.',
  shortBio: 'Creator & Model. Sharing raw behind-the-scenes moments, daily photosets, and private real-time chats.',
  heroHeadline: 'Unfiltered moments, real connection.',
  heroSubheadline: 'Private photo & video previews, raw daily stories, and real-time 1-on-1 chat on Telegram.',
  badgeText: 'On Telegram',
  statusText: 'Now accepting members',
  ageNotice: '18+ Adults Only',
  supportEmail: 'support@nayra.vip',
  telegramHandle: '@nayra_official',
  pricing: {
    amount: SUBSCRIPTION_PRICE_INR,
    formatted: FORMATTED_PRICE,
    currency: 'INR',
    symbol: CURRENCY_SYMBOL,
  },
};

export const NAVIGATION_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Films', href: '#videos' },
  { label: 'Moments', href: '#moments' },
  { label: 'How it works', href: '#perks' },
  { label: 'Membership', href: '#pricing' },
  { label: 'Questions', href: '#faq' },
];

export const MEMBERSHIP_INCLUSIONS = [
  'Full, uninterrupted access to the private Telegram channel',
  'The photograph vault, every set uncompressed',
  'Behind-the-scenes films and daily video diaries',
  'Personal replies and voice notes from Nayra herself',
  'A respectful private room, free of ads and spam',
  'Your invitation, delivered the moment payment clears',
];

export const ACCESS_STEPS = [
  {
    step: '01',
    title: 'Explore Previews',
    description: 'Browse the genuine photo and video samples here on the site to see the vibe and aesthetic.',
  },
  {
    step: '02',
    title: 'One-Time Verification',
    description: 'Complete the ₹499 membership checkout with your Telegram handle for secure invite generation.',
  },
  {
    step: '03',
    title: 'Instant Channel Invite',
    description: 'Receive your unique, verified invitation link to enter the private Telegram channel immediately.',
  },
  {
    step: '04',
    title: 'Start Chatting',
    description: 'Join the conversation, explore the uncompressed archives, and chat with Nayra in real time.',
  },
];

export const FAQS = [
  {
    question: 'What is included with the ₹499 Telegram access?',
    answer: 'You receive instant access to Nayra’s private Telegram channel where she posts daily uncompressed photo sets, raw video reels, voice notes, and engages in real-time conversations with members.',
  },
  {
    question: 'How do I receive my channel invite after payment?',
    answer: 'Once your payment of ₹499 is confirmed, you will immediately be shown your private invitation link on the confirmation page and it will also be sent to your provided Telegram handle/email.',
  },
  {
    question: 'Is this an auto-renewing subscription or a one-time payment?',
    answer: 'This is currently processed as a straightforward ₹499 payment for direct access to the private Telegram channel. No surprise recurring charges or hidden fees.',
  },
  {
    question: 'Is this service strictly for adults (18+)?',
    answer: 'Yes. All content and chat participation are strictly intended for consenting adults aged 18 and older. Age confirmation is required at checkout.',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'Once live gateway integration is completed, standard Indian and international options including UPI (GPay, PhonePe, Paytm), credit/debit cards, and net banking will be available.',
  },
  {
    question: 'What if my payment is pending or fails?',
    answer: 'If an amount is debited but your link is delayed, our support team can verify the transaction reference and manually deliver your channel invite within hours at support@nayra.vip.',
  },
  {
    question: 'Can I talk with Nayra directly?',
    answer: 'Yes. Nayra reads and replies to messages herself, answers questions and shares voice notes in the private channel.',
  },
];
