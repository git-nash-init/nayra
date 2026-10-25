import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../../config/media';

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Top Bar: Counter & Close */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-10 pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-canvas-surface/80 border border-hairline text-xs font-mono text-muted tracking-wider">
          {currentIndex + 1} / {items.length}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto p-2.5 rounded-full bg-canvas-surface/80 hover:bg-accent hover:text-black border border-hairline text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-accent hover:text-black border border-white/10 text-white transition-all z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-accent hover:text-black border border-white/10 text-white transition-all z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[82vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.src}
          alt={currentItem.title}
          className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl border border-white/10"
        />

        {/* Caption */}
        <div className="mt-4 text-center max-w-xl">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent font-mono">
              {currentItem.category}
            </span>
            <span className="text-white/30">•</span>
            <h4 className="text-sm sm:text-base font-medium text-white">{currentItem.title}</h4>
          </div>
          {currentItem.description && (
            <p className="text-xs text-muted mt-1">{currentItem.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
