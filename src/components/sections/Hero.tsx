import { ArrowUpRight, Play, Shield, Sparkles } from 'lucide-react';
import { BRAND_NAME, FORMATTED_PRICE, SITE_METADATA } from '../../config/site';
import { HERO_MEDIA } from '../../config/media';
import { Button } from '../ui/Button';

interface HeroProps {
  onJoinClick?: () => void;
  onExploreVideos?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onExploreVideos }) => {
  return (
    <section className="relative min-h-[95vh] pt-28 sm:pt-36 pb-16 flex flex-col justify-between overflow-hidden bg-canvas-base">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full relative z-10 flex-grow flex flex-col justify-center">
        {/* Top Eyebrow Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 text-xs font-mono uppercase tracking-wider text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-medium">{SITE_METADATA.badgeText}</span>
            <span className="text-white/20">•</span>
            <span className="text-muted">{SITE_METADATA.statusText}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span className="text-muted-light font-medium">18+ Discretion Guaranteed</span>
          </div>
        </div>

        {/* Center Grid: Dramatic Portrait & Layered Typography (Echoing reference composition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Stacked Giant Display Headline & Tagline */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
                OFFICIAL PRIVATE CHANNEL
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-anton tracking-tight text-white uppercase leading-[0.92]">
                UNFILTERED <br />
                <span className="text-accent">MOMENTS.</span> <br />
                REAL CONNECTION.
              </h1>
            </div>

            <p className="text-base sm:text-xl text-muted-light max-w-lg leading-relaxed font-normal">
              Direct access to my private world. <span className="text-white font-medium">Daily photo albums</span>, unreleased <span className="text-white font-medium">video reels</span>, voice notes, and real-time 1-on-1 conversations on Telegram.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onJoinClick}
                icon={<ArrowUpRight className="w-4 h-4" />}
                className="shadow-[0_0_30px_rgba(255,73,37,0.25)]"
              >
                Chat with me — {FORMATTED_PRICE}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={onExploreVideos}
                icon={<Play className="w-3.5 h-3.5 fill-current" />}
              >
                Watch Previews
              </Button>
            </div>

            {/* Membership highlights pill */}
            <div className="pt-4 flex items-center gap-6 text-xs text-muted font-mono uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                100% Original
              </span>
              <span>•</span>
              <span>Instant Access</span>
              <span>•</span>
              <span>No Spam</span>
            </div>
          </div>

          {/* Right Column: Dramatic Angled Portrait Frame */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Decorative accent glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl blur-2xl opacity-60" />

              {/* Masked Portrait Container echoing the reference diagonal slit */}
              <div className="relative rounded-2xl overflow-hidden bg-canvas-surface border border-hairline shadow-2xl group">
                <img
                  src={HERO_MEDIA.main.src}
                  alt={HERO_MEDIA.main.alt}
                  width={HERO_MEDIA.main.width}
                  height={HERO_MEDIA.main.height}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-[420px] sm:h-[540px] lg:h-[600px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Bottom Card Over Hero */}
                <div className="absolute bottom-6 inset-x-6 p-4 sm:p-5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">
                      {BRAND_NAME}
                    </p>
                    <p className="text-xs text-muted font-mono uppercase tracking-wider mt-0.5">
                      Personal Telegram Channel
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-muted font-mono block">ONE-TIME PASS</span>
                    <span className="text-lg sm:text-xl font-anton text-accent tracking-tight">
                      {FORMATTED_PRICE}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Marquee Ticker */}
      <div className="w-full border-t border-b border-hairline bg-canvas-surface/40 backdrop-blur-sm py-3 mt-12 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4 text-xs font-mono uppercase tracking-widest text-muted">
              <span className="text-white font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                100% UNEDITED MOMENTS
              </span>
              <span>•</span>
              <span>PRIVATE TELEGRAM FEED</span>
              <span>•</span>
              <span className="text-accent font-semibold">1-ON-1 DIRECT CHAT</span>
              <span>•</span>
              <span>HD VIDEO PREVIEWS</span>
              <span>•</span>
              <span>DAILY VOICE MESSAGES</span>
              <span>•</span>
              <span>18+ ADULTS ONLY</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
