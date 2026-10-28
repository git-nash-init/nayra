import React, { useEffect } from 'react';
import { MediaItem } from '../../config/media';
import { MediaFrame } from './MediaFrame';

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const controlClass =
  'eyebrow text-muted-light hover:text-accent-light transition-colors duration-200 px-3 py-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent';

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-canvas-base"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Top bar: counter and close */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-hairline">
        <span className="font-display italic text-accent text-lg">
          {currentIndex + 1}
          <span className="text-muted-dark"> / {items.length}</span>
        </span>
        <button type="button" onClick={onClose} className={controlClass} aria-label="Close lightbox">
          Close
        </button>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center gap-2 sm:gap-6 px-2 sm:px-8 py-6">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className={`${controlClass} hidden sm:block`}
          aria-label="Previous image"
        >
          Prev
        </button>

        <figure className="h-full max-w-4xl flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <MediaFrame
            key={currentItem.id}
            src={currentItem.src}
            alt={currentItem.title}
            loading="eager"
            className="max-h-[70vh] min-h-[40vh] min-w-[260px] flex items-center justify-center"
            imgClassName="max-h-[70vh] w-auto h-auto max-w-full object-contain"
          />
          <figcaption className="mt-5 text-center max-w-xl">
            <span className="eyebrow text-accent">{currentItem.category}</span>
            <p className="font-display italic text-lg sm:text-xl text-white mt-1">{currentItem.title}</p>
            {currentItem.description && (
              <p className="text-sm text-muted mt-1">{currentItem.description}</p>
            )}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className={`${controlClass} hidden sm:block`}
          aria-label="Next image"
        >
          Next
        </button>
      </div>

      {/* Mobile prev/next */}
      <div className="sm:hidden flex items-center justify-between px-4 pb-6" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onPrev} className={controlClass} aria-label="Previous image">
          Prev
        </button>
        <button type="button" onClick={onNext} className={controlClass} aria-label="Next image">
          Next
        </button>
      </div>
    </div>
  );
};
