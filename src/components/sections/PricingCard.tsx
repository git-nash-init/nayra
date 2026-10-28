import React from 'react';
import { BRAND_NAME, FORMATTED_PRICE, MEMBERSHIP_INCLUSIONS } from '../../config/site';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { toRoman } from '../../lib/roman';

interface PricingCardProps {
  onJoinClick?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ onJoinClick }) => {
  return (
    <section id="pricing" className="py-24 sm:py-36 bg-canvas-base border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="font-display italic text-accent text-2xl">V.</p>
          <p className="eyebrow text-muted mt-2">The membership</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.98] tracking-tighter text-white mt-6">
            By <em className="text-accent-light">invitation</em>
          </h2>
          <p className="text-muted text-base sm:text-[17px] leading-[1.85] mt-6">
            Direct, unfiltered access to {BRAND_NAME}’s private Telegram channel. One price, stated plainly.
          </p>
        </div>

        {/* Double hairline frame, like an engraved invitation card */}
        <Reveal className="max-w-2xl mx-auto border border-accent/60 p-[7px]">
          <div className="border border-hairline px-7 py-12 sm:px-14 sm:py-16">
            <div className="text-center pb-10 border-b border-hairline">
              <p className="eyebrow text-accent">Admit one</p>
              <h3 className="font-display text-3xl sm:text-4xl text-white mt-4">
                The {BRAND_NAME} private channel
              </h3>
              <p className="font-display text-7xl sm:text-8xl text-accent-light mt-8 leading-none">
                {FORMATTED_PRICE}
              </p>
              <p className="eyebrow text-muted mt-4">INR · One-time access pass</p>
            </div>

            <ol className="py-10 space-y-5">
              {MEMBERSHIP_INCLUSIONS.map((item, idx) => (
                <li key={idx} className="grid grid-cols-[2.5rem_1fr] items-baseline text-[15px] sm:text-base text-muted-light leading-relaxed">
                  <span className="font-display italic text-accent">{toRoman(idx + 1)}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <div className="pt-2 space-y-6 text-center">
              <Button variant="solid" size="lg" onClick={onJoinClick} className="w-full">
                Join the private channel · {FORMATTED_PRICE}
              </Button>
              <p className="eyebrow text-muted-dark">
                Secure checkout · Instant invitation · Strictly 18+
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
