import { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Send } from 'lucide-react';
import { BRAND_NAME, SITE_METADATA } from '../../config/site';

interface FooterProps {
  onNavigatePage?: (page: 'home' | 'privacy' | 'terms' | 'refund' | 'checkout' | 'moments') => void;
}

export const Footer = ({ onNavigatePage }: FooterProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setIsSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer className="w-full bg-canvas-base border-t border-hairline pt-16 sm:pt-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column: Direct Contact & Disclaimers */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-1">
                  (DIRECT CONTACT)
                </span>
                <a
                  href={`mailto:${SITE_METADATA.supportEmail}`}
                  className="text-xl sm:text-2xl font-semibold text-accent hover:underline block tracking-tight"
                >
                  {SITE_METADATA.supportEmail}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-1">
                  (TELEGRAM)
                </span>
                <a
                  href={`https://t.me/${SITE_METADATA.telegramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-xl font-medium text-white hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  {SITE_METADATA.telegramHandle}
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </a>
              </div>

              {/* 18+ Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-muted-light">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>18+ Adults Only • Discretion &amp; Privacy Assured</span>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5 text-xs text-muted font-normal">
              <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <button
                  type="button"
                  onClick={() => onNavigatePage && onNavigatePage('privacy')}
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onNavigatePage && onNavigatePage('terms')}
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Terms of Service
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onNavigatePage && onNavigatePage('refund')}
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Refund Policy
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column: Quick Links & Socials */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-4">
                (SECTIONS)
              </span>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#about" className="text-muted-light hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#videos" className="text-muted-light hover:text-white transition-colors">
                    Video Reels
                  </a>
                </li>
                <li>
                  <a href="#moments" className="text-muted-light hover:text-white transition-colors">
                    Moments
                  </a>
                </li>
                <li>
                  <a href="#perks" className="text-muted-light hover:text-white transition-colors">
                    What You Get
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-muted-light hover:text-white transition-colors">
                    VIP Access
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-muted-light hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-4">
                (COMMUNITY)
              </span>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href={`https://t.me/${SITE_METADATA.telegramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-light hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Telegram <ArrowUpRight className="w-3 h-3 text-muted" />
                  </a>
                </li>
                <li>
                  <span className="text-muted/60 inline-flex items-center gap-1 cursor-default">
                    Instagram <span className="text-[10px] text-muted/40">(Private)</span>
                  </span>
                </li>
                <li>
                  <span className="text-muted/60 inline-flex items-center gap-1 cursor-default">
                    Twitter / X <span className="text-[10px] text-muted/40">(Coming)</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: VIP Notification / Newsletter */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-2">
                (SPECIAL DROPS)
              </span>
              <p className="text-sm text-muted leading-relaxed">
                Receive direct notification for seasonal photo drops, rare limited content sets, and private live video Q&amp;A sessions.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-white placeholder-muted focus:outline-none focus:border-accent text-sm transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full border border-white/15 bg-white/[0.04] hover:bg-accent hover:border-accent hover:text-black text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isSubscribed ? 'Notified!' : 'Stay Updated'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              {isSubscribed && (
                <p className="text-xs text-accent text-center mt-2 animate-in fade-in">
                  ✓ You’re on the priority notification list!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Signature Full-Width Vermilion Orange Banner (Signature element from reference) */}
      <div className="w-full bg-accent text-black py-12 sm:py-20 px-4 sm:px-8 overflow-hidden select-none">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="w-full sm:w-auto">
            <h2 className="text-[18vw] sm:text-[13vw] font-anton leading-none tracking-tight uppercase text-black m-0 p-0">
              {BRAND_NAME}
            </h2>
          </div>

          <div className="sm:text-right max-w-sm">
            <p className="text-lg sm:text-2xl font-anton uppercase tracking-tight text-black leading-tight">
              Unfiltered moments.<br />
              Raw beauty.<br />
              Direct connection.
            </p>
            <p className="text-xs font-medium text-black/80 mt-2 font-mono uppercase tracking-wider">
              Exclusive VIP Community • 18+
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
