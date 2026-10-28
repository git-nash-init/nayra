import React, { useState } from 'react';

interface MediaFrameProps {
  src: string;
  alt: string;
  /** CSS aspect ratio such as "4/5"; omit when the parent sets the height */
  aspectRatio?: string;
  /** Draws the champagne passe-partout line inside the photo */
  inset?: boolean;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  onClick?: () => void;
}

/**
 * Photograph with a skeleton loader. The skeleton holds the space with a slow
 * champagne sheen until the image has decoded, then the photo fades in.
 */
export const MediaFrame: React.FC<MediaFrameProps> = ({
  src,
  alt,
  aspectRatio,
  inset = false,
  className = '',
  imgClassName = 'w-full h-full object-cover object-top',
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-canvas-surface ${inset ? 'frame-inset' : ''} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onClick={onClick}
    >
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        ref={(img) => {
          // Cached images can finish before React attaches onLoad
          if (img && img.complete && img.naturalWidth > 0 && !loaded) setLoaded(true);
        }}
        className={`block transition-opacity duration-700 ease-couture ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  );
};
