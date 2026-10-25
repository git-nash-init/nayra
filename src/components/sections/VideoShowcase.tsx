import { Sparkles, ArrowUpRight, Volume2 } from 'lucide-react';
import { FEATURED_VIDEOS } from '../../config/media';
import { VideoPlayer } from '../ui/VideoPlayer';
import { Button } from '../ui/Button';
import { FORMATTED_PRICE } from '../../config/site';

interface VideoShowcaseProps {
  onJoinClick?: () => void;
}

export const VideoShowcase = ({ onJoinClick }: VideoShowcaseProps) => {
  return (
    <section id="videos" className="py-20 sm:py-32 bg-canvas-base border-b border-hairline relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                (VIDEO PREVIEWS)
              </span>
              <span className="text-[#ff4925]">•</span>
              <span className="text-xs font-mono text-[#ff4925] uppercase tracking-wider font-semibold">
                3 EXCLUSIVE REELS
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> AUDIO INCLUDED
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-anton tracking-tight text-white uppercase leading-none">
              LIVE MOMENTS &amp; REELS
            </h2>
          </div>

          <p className="text-muted text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Direct video clips from Nayra's shoots, travels, and personal voice stories. Tap unmute anytime to listen to the audio, or join the channel for complete daily uncut videos.
          </p>
        </div>

        {/* Video Player Grid — 3 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {FEATURED_VIDEOS.map((video) => (
            <div key={video.id} className="flex flex-col space-y-4">
              <VideoPlayer
                src={video.src}
                poster={video.poster}
                title={video.title}
                category={video.category}
                aspectRatio="9/16"
                hasAudio={video.hasAudio}
                className="w-full shadow-2xl"
              />
              <div className="px-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                    {video.title}
                  </h3>
                  <span className="shrink-0 text-xs font-mono text-[#ff4925] uppercase tracking-wider font-bold">
                    {video.category}
                  </span>
                </div>
                {video.description && (
                  <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Access Callout below videos */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-canvas-surface border border-hairline max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-semibold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#ff4925]" />
              Want the full daily video feed?
            </h4>
            <p className="text-xs sm:text-sm text-muted">
              Get instant access to Nayra’s private Telegram channel archive for {FORMATTED_PRICE}.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={onJoinClick}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="shrink-0"
          >
            Join Channel
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
