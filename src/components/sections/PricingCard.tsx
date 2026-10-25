import React from 'react';
import { Check, Shield, ArrowUpRight, Sparkles, Lock } from 'lucide-react';
import { BRAND_NAME, FORMATTED_PRICE, MEMBERSHIP_INCLUSIONS } from '../../config/site';
import { Button } from '../ui/Button';

interface PricingCardProps {
  onJoinClick?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ onJoinClick }) => {
  return (
    <section id="pricing" className="py-20 sm:py-32 bg-canvas-base border-b border-hairline relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header (Echoing reference "PRICING") */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-muted block">
            (TELEGRAM ACCESS PASS)
          </span>
          <h2 className="text-5xl sm:text-7xl font-anton tracking-tight text-white uppercase leading-none">
            MEMBERSHIP ACCESS
          </h2>
          <p className="text-muted text-base sm:text-lg font-normal">
            Direct, unfiltered access to {BRAND_NAME}’s private Telegram channel. One fixed price with complete clarity.
          </p>
        </div>

        {/* Singular Transparent Pricing Card */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-canvas-surface border border-accent/40 p-8 sm:p-12 relative shadow-[0_0_50px_rgba(255,73,37,0.12)]">
          {/* Top Pill: Recommended / Official */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="px-4 py-1 rounded-full bg-accent text-black text-xs font-bold uppercase tracking-widest shadow-md">
              OFFICIAL VIP PASS
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-anton tracking-wide text-white uppercase">
                {BRAND_NAME} Private Channel
              </h3>
              <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">
                Direct Telegram Channel Invitation
              </p>
            </div>

            {/* Price Presentation: Strictly ₹499 INR, NO fake crossed out price or invented discount */}
            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl sm:text-6xl font-anton text-white tracking-tight leading-none">
                  {FORMATTED_PRICE}
                </span>
                <span className="text-xs font-mono text-muted uppercase">INR</span>
              </div>
              <span className="text-xs text-muted block mt-1 font-mono">
                One-time access pass
              </span>
            </div>
          </div>

          {/* Inclusions Checklist */}
          <div className="py-8 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted">
              What’s Included:
            </p>
            <ul className="space-y-3.5">
              {MEMBERSHIP_INCLUSIONS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted-light">
                  <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA & Delivery Guarantee */}
          <div className="pt-4 space-y-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onJoinClick}
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full text-sm sm:text-base py-4 font-semibold shadow-[0_0_30px_rgba(255,73,37,0.3)]"
            >
              Get Telegram Access — {FORMATTED_PRICE}
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted pt-2">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-accent" />
                Secure Checkout
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Instant Link Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent" />
                18+ Adults Only
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
