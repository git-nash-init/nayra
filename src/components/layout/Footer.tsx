import { useState } from 'react';
import { BRAND_NAME, SITE_METADATA } from '../../config/site';

interface FooterProps {
  onNavigatePage?: (page: 'home' | 'privacy' | 'terms' | 'refund' | 'checkout' | 'moments') => void;
}

const SECTION_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Films', href: '#videos' },
  { label: 'Moments', href: '#moments' },
  { label: 'The Membership', href: '#pricing' },
  { label: 'Questions', href: '#faq' },
];

const linkClass = 'text-muted-light hover:text-accent-light transition-colors duration-200';

export const Footer = ({ onNavigatePage }: FooterProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const telegramUrl = `https://t.me/${SITE_METADATA.telegramHandle.replace('@', '')}`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setIsSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer className="w-full bg-canvas-base border-t border-hairline overflow-hidden">
      {/* Masthead */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-12 text-center select-none">
        <p className="eyebrow text-accent">The Private Edition</p>
        <h2 className="font-display text-[22vw] sm:text-[15vw] lg:text-[13rem] leading-[0.85] tracking-masthead text-accent mt-6 pl-[0.18em]">
          {BRAND_NAME}
        </h2>
        <p className="font-display italic text-lg sm:text-2xl text-muted-light mt-6">
          Unfiltered moments, kept close.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="rule-gold" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Contact */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <span className="eyebrow text-muted-dark block mb-2">Correspondence</span>
              <a
                href={`mailto:${SITE_METADATA.supportEmail}`}
                className="font-display text-2xl sm:text-3xl text-white hover:text-accent-light transition-colors duration-200"
              >
                {SITE_METADATA.supportEmail}
              </a>
            </div>
            <div>
              <span className="eyebrow text-muted-dark block mb-2">Telegram</span>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display italic text-xl text-white hover:text-accent-light transition-colors duration-200"
              >
                {SITE_METADATA.telegramHandle}
              </a>
            </div>
            <p className="eyebrow text-muted">Strictly 18+ · Discretion assured</p>
          </div>

          {/* Sections */}
          <div className="lg:col-span-2">
            <span className="eyebrow text-muted-dark block mb-5">Contents</span>
            <ul className="space-y-3 text-[15px]">
              {SECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div className="lg:col-span-2">
            <span className="eyebrow text-muted-dark block mb-5">Elsewhere</span>
            <ul className="space-y-3 text-[15px]">
              <li>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Telegram
                </a>
              </li>
              <li className="text-muted-dark">
                Instagram <span className="font-display italic">(private)</span>
              </li>
              <li className="text-muted-dark">
                X <span className="font-display italic">(soon)</span>
              </li>
            </ul>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-4 space-y-5">
            <span className="eyebrow text-muted-dark block">Private drops</span>
            <p className="text-[15px] text-muted leading-relaxed">
              A quiet note when a seasonal photo set, a rare edition or a live session is released.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-0 py-3 bg-transparent border-0 border-b border-hairline text-white placeholder:text-muted-dark focus:outline-none focus:border-accent text-[15px] transition-colors duration-200"
                required
              />
              <button
                type="submit"
                className="eyebrow px-6 py-3 border border-accent text-accent-light hover:bg-accent hover:text-black transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                {isSubscribed ? 'Noted' : 'Notify me'}
              </button>
            </form>

            {isSubscribed && (
              <p className="font-display italic text-accent">You are on the private list.</p>
            )}
          </div>
        </div>
      </div>

      {/* Legal line */}
      <div className="border-t border-hairline">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-dark">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button type="button" onClick={() => onNavigatePage?.('privacy')} className="link-couture text-muted">
              Privacy Policy
            </button>
            <button type="button" onClick={() => onNavigatePage?.('terms')} className="link-couture text-muted">
              Terms of Service
            </button>
            <button type="button" onClick={() => onNavigatePage?.('refund')} className="link-couture text-muted">
              Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
