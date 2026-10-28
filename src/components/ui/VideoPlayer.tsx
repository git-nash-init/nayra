import { useRef, useState, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  category?: string;
  aspectRatio?: string;
  className?: string;
  hasAudio?: boolean;
}

const controlClass =
  'eyebrow !tracking-[0.24em] px-3 py-2 border transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent';

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
  const [isReady, setIsReady] = useState<boolean>(false);
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
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
    setIsMuted(nextMuted);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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
      className={`relative frame-inset overflow-hidden bg-canvas-surface ${className}`}
      style={{ aspectRatio }}
      onClick={() => togglePlay()}
      role="region"
      aria-label={title || 'Exclusive video preview'}
    >
      {!isReady && !hasError && <div className="skeleton absolute inset-0 z-[1]" aria-hidden="true" />}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        autoPlay
        muted
        loop
        preload="metadata"
        className={`w-full h-full object-cover transition-opacity duration-700 ease-couture ${isReady ? 'opacity-100' : 'opacity-0'}`}
        onLoadedData={() => setIsReady(true)}
        onCanPlay={() => setIsReady(true)}
        onError={() => setHasError(true)}
      />

      {/* Bottom shade so captions stay legible */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Top: chapter label */}
      {category && (
        <span className="absolute top-6 left-6 z-[3] eyebrow text-accent-light">
          {category}
        </span>
      )}

      {/* Bottom: title and text controls */}
      <div className="absolute bottom-6 inset-x-6 z-[3] flex flex-col items-start gap-3">
        {title && (
          <p className="font-display italic text-white text-base sm:text-lg leading-snug pointer-events-none">
            {title}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className={`${controlClass} bg-black/70 border-hairline text-muted-light hover:text-accent-light hover:border-accent`}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className={`${controlClass} ${
              isMuted
                ? 'bg-black/70 border-accent text-accent-light hover:bg-accent hover:text-black'
                : 'bg-accent border-accent text-black hover:bg-accent-light'
            }`}
            aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
          >
            {isMuted ? (hasAudio ? 'Sound on' : 'Unmute') : 'Sound off'}
          </button>
        </div>
      </div>

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-canvas-surface p-4 text-center z-20">
          <p className="font-display italic text-muted">This film could not be loaded.</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
