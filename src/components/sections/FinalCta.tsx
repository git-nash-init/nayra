import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { BRAND_NAME, FORMATTED_PRICE } from '../../config/site';
import { Button } from '../ui/Button';

interface FinalCtaProps {
  onJoinClick?: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onJoinClick }) => {
  return (
    <section className="py-24 sm:py-36 bg-canvas-base relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.08] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10 space-y-8">
        <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
          <MessageCircle className="w-3.5 h-3.5" />
          DIRECT REAL-TIME ACCESS
        </span>

        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-anton tracking-tight text-white uppercase leading-none max-w-4xl mx-auto">
          ENTER THE PRIVATE CIRCLE
        </h2>

        <p className="text-muted text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
          Unfiltered moments, uncompressed HD photo albums, daily video reels, and real 1-on-1 conversations with {BRAND_NAME}.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onJoinClick}
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="text-base px-10 py-4 shadow-[0_0_35px_rgba(255,73,37,0.35)]"
          >
            Chat with me — {FORMATTED_PRICE}
          </Button>
        </div>

        <p className="text-xs font-mono text-muted uppercase tracking-wider">
          Instant invitation delivery • 18+ Adults Only
        </p>
      </div>
    </section>
  );
};
