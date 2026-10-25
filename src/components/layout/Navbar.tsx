import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BRAND_NAME, NAVIGATION_LINKS, SITE_METADATA } from '../../config/site';
import { Button } from '../ui/Button';

interface NavbarProps {
  onNavigateCheckout?: () => void;
  onNavigateHome?: () => void;
  isSubpage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateCheckout,
  onNavigateHome,
  isSubpage = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (isSubpage && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-canvas-base/90 backdrop-blur-xl border-b border-hairline py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-canvas-base via-canvas-base/60 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Wordmark & Status indicator */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl sm:text-3xl font-anton tracking-tight text-white hover:text-accent transition-colors flex items-center gap-1 focus:outline-none"
            >
              <span>{BRAND_NAME}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent mb-3.5" />
            </a>

            {/* Live Indicator pill (echoing reference top metadata) */}
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-[11px] font-mono uppercase tracking-wider text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-muted-light">{SITE_METADATA.badgeText}</span>
              <span className="text-white/20">•</span>
              <span className="text-muted">{SITE_METADATA.statusText}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          {!isSubpage && (
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAVIGATION_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors cursor-pointer font-medium focus:outline-none focus-visible:text-accent"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right Action: CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={onNavigateCheckout}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Chat with me
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-white font-medium">{SITE_METADATA.badgeText}</span>
              <span className="text-muted ml-auto">₹499 VIP</span>
            </div>

            <nav className="flex flex-col gap-4">
              {NAVIGATION_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left text-2xl font-anton tracking-wide text-white hover:text-accent transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onNavigateCheckout) onNavigateCheckout();
              }}
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full"
            >
              Chat with me — ₹499
            </Button>

            <div className="flex items-center justify-between text-xs text-muted pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                18+ Adult Access
              </span>
              <span>Telegram Verified</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
