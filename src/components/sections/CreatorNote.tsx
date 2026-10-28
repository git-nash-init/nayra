import React from 'react';
import { BRAND_NAME, FORMATTED_PRICE } from '../../config/site';
import { HERO_MEDIA } from '../../config/media';
import { Button } from '../ui/Button';
import { MediaFrame } from '../ui/MediaFrame';
import { Reveal } from '../ui/Reveal';

interface CreatorNoteProps {
  onJoinClick?: () => void;
}

export const CreatorNote: React.FC<CreatorNoteProps> = ({ onJoinClick }) => {
  return (
    <section className="py-24 sm:py-36 bg-canvas-base border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Portrait */}
          <Reveal as="figure" className="lg:col-span-5">
            <MediaFrame
              src={HERO_MEDIA.about.src}
              alt="Nayra in a cream knit, natural and relaxed"
              aspectRatio="4/5"
              inset
            />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="font-display italic text-muted-light">Natural, candid, unedited.</span>
              <span className="eyebrow text-muted-dark shrink-0">Plate II</span>
            </figcaption>
          </Reveal>

          {/* Letter */}
          <Reveal delay={120} className="lg:col-span-7 space-y-10">
            <p className="eyebrow text-accent">A personal note</p>

            <blockquote className="font-display italic text-3xl sm:text-4xl lg:text-[3.1rem] leading-[1.22] tracking-tighter text-white">
              <span className="text-accent">“</span>The internet feels so loud lately. On Telegram I can slow down, be
              completely myself, and talk with the people who appreciate my work.<span className="text-accent">”</span>
            </blockquote>

            <p className="text-muted text-base sm:text-[17px] leading-[1.9] max-w-xl">
              I check in every day, between shoots and travel. The channel is a quiet, personal space where you
              can ask me anything, tell me about your day, and see the unfiltered moments that make me who I am.
            </p>

            <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <div>
                <p className="font-display text-3xl tracking-masthead text-white">{BRAND_NAME}</p>
                <p className="eyebrow text-muted mt-1">Model & creator</p>
              </div>
              <Button variant="primary" size="md" onClick={onJoinClick}>
                Write to me · {FORMATTED_PRICE}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
