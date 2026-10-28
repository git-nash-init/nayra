import React, { useState, useEffect } from 'react';
import { BRAND_NAME, FORMATTED_PRICE, NAVIGATION_LINKS } from '../../config/site';
import { Button } from '../ui/Button';
import { toRoman } from '../../lib/roman';

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
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-canvas-base border-b border-hairline py-4'
            : 'bg-transparent border-b border-transparent py-6 sm:py-7'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-2xl sm:text-[1.75rem] tracking-masthead text-white hover:text-accent-light transition-colors duration-200 focus:outline-none focus-visible:text-accent"
          >
            {BRAND_NAME}
          </a>

          {!isSubpage && (
            <nav className="hidden md:flex items-center gap-7 lg:gap-10">
              {NAVIGATION_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  className="eyebrow text-muted-light hover:text-accent-light transition-colors duration-200 focus:outline-none focus-visible:text-accent"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="sm"
              onClick={onNavigateCheckout}
              className="hidden sm:inline-flex"
            >
              Join
            </Button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden eyebrow text-white py-2 focus:outline-none focus-visible:text-accent"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-canvas-base md:hidden pt-28 px-6 flex flex-col justify-between pb-10">
          <nav className="flex flex-col">
            {NAVIGATION_LINKS.map((link, i) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-4 border-b border-hairline flex items-baseline gap-5 group"
              >
                <span className="font-display italic text-accent text-sm w-8">{toRoman(i + 1)}</span>
                <span className="font-display text-3xl text-white group-hover:text-accent-light transition-colors duration-200">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-5 pt-8">
            <Button
              variant="solid"
              size="lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateCheckout?.();
              }}
              className="w-full"
            >
              Join the private channel · {FORMATTED_PRICE}
            </Button>
            <p className="eyebrow text-muted text-center">Strictly 18+ · Private Telegram</p>
          </div>
        </div>
      )}
    </>
  );
};
