import { BRAND_NAME, FORMATTED_PRICE } from '../../config/site';
import { HERO_MEDIA } from '../../config/media';
import { Button } from '../ui/Button';
import { MediaFrame } from '../ui/MediaFrame';

interface HeroProps {
  onJoinClick?: () => void;
  onExploreVideos?: () => void;
}

const EDITION_STRIP = ['Photographs', 'Films', 'Voice notes', 'Private conversation', 'By invitation'];

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onExploreVideos }) => {
  return (
    <section className="relative pt-28 sm:pt-32 bg-canvas-base">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Masthead, as on a magazine cover */}
        <h1 className="sr-only">{BRAND_NAME}, the private edition</h1>
        <div
          className="font-display text-accent text-center leading-[0.8] tracking-masthead whitespace-nowrap text-[17.5vw] lg:text-[12.5rem] pl-[0.18em] select-none"
          aria-hidden="true"
        >
          {BRAND_NAME.split('').map((letter, i) => (
            <span
              key={i}
              className="inline-block animate-letter-in"
              style={{ animationDelay: `${150 + i * 110}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Issue line */}
        <div className="mt-6 sm:mt-8 border-y border-hairline py-3 flex items-center justify-between gap-4 eyebrow text-muted">
          <span>The Private Edition</span>
          <span className="hidden sm:inline font-display italic normal-case tracking-normal text-sm text-accent-light">
            Volume I
          </span>
          <span>Strictly 18+</span>
        </div>

        {/* Cover story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-14 sm:py-20">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-8 animate-letter-in" style={{ animationDelay: '700ms' }}>
            <p className="eyebrow text-accent">Official private channel</p>

            <h2 className="font-display text-[2.6rem] sm:text-6xl lg:text-[4.6rem] leading-[1.02] tracking-tighter text-white">
              Unfiltered moments,
              <br />
              <em className="text-accent-light">real</em> connection.
            </h2>

            <p className="text-base sm:text-lg text-muted leading-[1.85] max-w-md">
              Step into my private world on Telegram. Daily photographs, unreleased films, voice notes and
              conversations I answer myself.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-5 pt-2">
              <Button variant="solid" size="lg" onClick={onJoinClick}>
                Join the private channel · {FORMATTED_PRICE}
              </Button>
              <Button variant="secondary" size="lg" onClick={onExploreVideos}>
                Watch the films
              </Button>
            </div>

            <p className="eyebrow text-muted-dark pt-2">One-time pass · Instant invitation · No spam</p>
          </div>

          <figure className="lg:col-span-6 order-1 lg:order-2">
            <MediaFrame
              src={HERO_MEDIA.main.src}
              alt={HERO_MEDIA.main.alt}
              width={HERO_MEDIA.main.width}
              height={HERO_MEDIA.main.height}
              loading="eager"
              fetchPriority="high"
              inset
              aspectRatio="4/5"
              className="w-full max-w-xl mx-auto lg:max-w-none"
            />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 max-w-xl mx-auto lg:max-w-none">
              <span className="font-display italic text-muted-light">
                Nayra, photographed for the private channel.
              </span>
              <span className="eyebrow text-muted-dark shrink-0">Plate I</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Edition strip */}
      <div className="border-y border-hairline">
        <ul className="max-w-[1400px] mx-auto px-4 sm:px-8 py-5 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 eyebrow text-muted">
          {EDITION_STRIP.map((item, i) => (
            <li key={item} className="flex items-center gap-x-4 sm:gap-x-6">
              {i > 0 && <span className="text-accent hidden sm:inline" aria-hidden="true">·</span>}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
