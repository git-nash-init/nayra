import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  category?: string;
  aspectRatio?: string;
  className?: string;
  hasAudio?: boolean;
}

export const VideoPlayer = ({
  src,
  poster,
  title,
  category,
  aspectRatio = '9/16',
  className = '',
  hasAudio = false,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Default to muted for browser autoplay policy compliance
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [src]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1.0;
      // If it was paused, play it
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`relative group rounded-2xl overflow-hidden bg-canvas-surface border border-hairline transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-[#ff4925]/10 ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlay}
      role="region"
      aria-label={title || 'Exclusive video preview'}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        autoPlay
        muted
        loop
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        onError={() => setHasError(true)}
      />

      {/* Dark overlay gradient for readable controls and typography */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

      {/* Top Bar: Category Tag & Audio Indicator / Unmute Toggle */}
      <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between z-10 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {category && (
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15">
              {category}
            </span>
          )}

          {hasAudio && (
            <span className="flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#ff4925]/90 text-white font-bold shadow-sm animate-pulse">
              <Music className="w-2.5 h-2.5" />
              <span>SOUND</span>
            </span>
          )}
        </div>

        {/* Primary Interactive Mute/Unmute Button with High Visibility */}
        <button
          type="button"
          onClick={toggleMute}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 text-xs font-mono font-medium focus:outline-none cursor-pointer shadow-lg ${
            isMuted
              ? 'bg-black/80 hover:bg-[#ff4925] text-white border-white/30 hover:border-[#ff4925] hover:text-white'
              : 'bg-emerald-500/90 hover:bg-emerald-600 text-white border-emerald-400 font-bold'
          }`}
          title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#ff4925] group-hover:text-white" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">
                {hasAudio ? 'UNMUTE AUDIO' : 'UNMUTE'}
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-white animate-bounce" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
                SOUND ON
              </span>
            </>
          )}
        </button>
      </div>

      {/* Center Play/Pause indicator on hover or pause */}
      {(!isPlaying || isHovered) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-transform duration-300 transform scale-100 group-hover:scale-110 shadow-xl">
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current text-white/90" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5 text-[#ff4925]" />
            )}
          </div>
        </div>
      )}

      {/* Prominent Center/Bottom Tap to Unmute Banner if video has audio and is muted */}
      {hasAudio && isMuted && (
        <div
          onClick={toggleMute}
          className="absolute inset-x-4 bottom-16 sm:bottom-18 z-10 cursor-pointer bg-black/75 hover:bg-[#ff4925]/90 backdrop-blur-md border border-[#ff4925]/40 hover:border-white/40 p-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl group/btn"
        >
          <Volume2 className="w-4 h-4 text-[#ff4925] group-hover/btn:text-white transition-colors" />
          <span className="text-white text-xs font-mono tracking-wider uppercase font-semibold">
            TAP HERE TO UNMUTE AUDIO 🔊
          </span>
        </div>
      )}

      {/* Bottom Title & State */}
      {title && (
        <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-10 flex flex-col pointer-events-none">
          <p className="text-white font-medium text-sm sm:text-base leading-snug drop-shadow-md">
            {title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#ff4925] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/70 font-mono">
              {hasAudio ? 'Exclusive Sound Reel' : 'Exclusive Preview'}
            </span>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-canvas-surface p-4 text-center z-20">
          <p className="text-xs text-muted">Preview video loading error</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
