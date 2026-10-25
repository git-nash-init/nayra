import React from 'react';
import { ArrowUpRight, MessageSquareHeart } from 'lucide-react';
import { BRAND_NAME, FORMATTED_PRICE } from '../../config/site';
import { HERO_MEDIA } from '../../config/media';
import { Button } from '../ui/Button';

interface CreatorNoteProps {
  onJoinClick?: () => void;
}

export const CreatorNote: React.FC<CreatorNoteProps> = ({ onJoinClick }) => {
  return (
    <section className="py-20 sm:py-32 bg-canvas-base border-b border-hairline relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Intimate Letter from Nayra */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-muted flex items-center gap-2">
                <MessageSquareHeart className="w-4 h-4 text-accent" />
                (A PERSONAL NOTE FROM {BRAND_NAME})
              </span>

              {/* Quote Statement (Echoing reference testimonial font & layout) */}
              <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.2]">
                “The internet feels too noisy lately. On Telegram, I can slow down, be completely myself, and actually talk with the people who appreciate my work.”
              </blockquote>
            </div>

            <p className="text-muted text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              I check into the channel every single day between shoots and travel. It’s not a robotic marketing broadcast—it’s an intimate space where you can ask me questions, share your day, and see the unfiltered moments that make me who I am.
            </p>

            {/* Creator Bio Card below quote */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={HERO_MEDIA.about.src}
                  alt={BRAND_NAME}
                  className="w-14 h-14 rounded-full object-cover object-top border-2 border-accent"
                />
                <div>
                  <h4 className="text-lg font-semibold text-white tracking-tight">{BRAND_NAME}</h4>
                  <p className="text-xs text-muted font-mono uppercase tracking-wider">
                    Model &amp; Digital Creator • Verified
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={onJoinClick}
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Join Private Chat — {FORMATTED_PRICE}
              </Button>
            </div>
          </div>

          {/* Right Column: Large Featured Portrait of Nayra */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-canvas-surface border border-hairline shadow-2xl group">
              <img
                src={HERO_MEDIA.about.src}
                alt="Nayra in cozy white knit, natural and approachable"
                loading="lazy"
                className="w-full h-[450px] sm:h-[550px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

              <div className="absolute bottom-6 inset-x-6 z-10 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium text-sm">Natural • Candid • Unedited</p>
                  <p className="text-xs text-muted font-mono uppercase">Private Telegram Daily</p>
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" title="Active" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
