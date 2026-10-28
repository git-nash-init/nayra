import React from 'react';
import { BRAND_NAME, FORMATTED_PRICE } from '../../config/site';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

interface FinalCtaProps {
  onJoinClick?: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onJoinClick }) => {
  return (
    <section className="py-28 sm:py-44 bg-canvas-base text-center">
      <Reveal className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-10">
        <p className="eyebrow text-accent">Your invitation</p>

        <h2 className="font-display text-5xl sm:text-7xl lg:text-[6.5rem] leading-[0.98] tracking-tighter text-white max-w-5xl mx-auto">
          Enter the <em className="text-accent-light">private</em> circle.
        </h2>

        <div className="w-16 rule-gold mx-auto" />

        <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-[1.85]">
          Unfiltered moments, uncompressed photographs, daily films and real conversation with {BRAND_NAME}.
        </p>

        <div className="pt-2">
          <Button variant="solid" size="lg" onClick={onJoinClick}>
            Join the private channel · {FORMATTED_PRICE}
          </Button>
        </div>

        <p className="eyebrow text-muted-dark">Instant invitation · Strictly 18+</p>
      </Reveal>
    </section>
  );
};
