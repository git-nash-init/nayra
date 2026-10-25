import { useState, useCallback, useEffect } from 'react';
import {
  HOMEPAGE_GALLERY_TILES,
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  MediaItem,
} from '../../config/media';
import { SITE_METADATA } from '../../config/site';

interface PhotoGalleryProps {
  onViewMore: () => void;
  onCheckout: () => void;
}

export function PhotoGallery({ onViewMore, onCheckout }: PhotoGalleryProps) {
  // Track selected image option index per tile: { [tileId]: imageIndex }
  const [tileOptionIndex, setTileOptionIndex] = useState<{ [key: string]: number }>({
    'tile-festive': 0,
    'tile-traditional': 0,
    'tile-outdoor': 0,
    'tile-travel': 0,
  });

  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  const setTileOption = (tileId: string, idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTileOptionIndex((prev) => ({
      ...prev,
      [tileId]: idx,
    }));
  };

  const nextTileOption = (tileId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTileOptionIndex((prev) => ({
      ...prev,
      [tileId]: ((prev[tileId] || 0) + 1) % total,
    }));
  };

  const prevTileOption = (tileId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTileOptionIndex((prev) => ({
      ...prev,
      [tileId]: ((prev[tileId] || 0) - 1 + total) % total,
    }));
  };

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxItem) return;
      if (e.key === 'Escape') setLightboxItem(null);
    },
    [lightboxItem]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <section id="moments" className="bg-[#0a0a0a] py-24 px-4 sm:px-8 lg:px-16 border-t border-white/8 relative">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs tracking-[0.25em] text-[#ff4925] font-mono mb-3">
                (PHOTO ARCHIVE)&nbsp;<span className="text-white/40">•</span>&nbsp;{GALLERY_ITEMS.length} EXCLUSIVE PREVIEWS
              </p>
              <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-black uppercase tracking-tight text-white leading-none">
                CAPTURED<br />MOMENTS
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {GALLERY_CATEGORIES.slice(1, 6).map((cat) => (
                  <span
                    key={cat}
                    className="px-3.5 py-1.5 rounded-full text-[11px] tracking-widest font-mono border border-white/10 text-white/50 uppercase"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <button
                onClick={onViewMore}
                className="text-xs font-mono text-[#ff4925] hover:text-[#ff6b4a] underline tracking-widest uppercase transition-colors self-start sm:self-auto"
              >
                View Full Archive ({GALLERY_ITEMS.length}) →
              </button>
            </div>
          </div>

          {/* 4 Themed Tiles with Multi-Image Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {HOMEPAGE_GALLERY_TILES.map((tile) => {
              const activeIdx = tileOptionIndex[tile.id] || 0;
              const currentImage = tile.images[activeIdx] || tile.images[0];
              const totalImages = tile.images.length;

              return (
                <div
                  key={tile.id}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-[#ff4925]/5"
                >
                  {/* Image Display Container */}
                  <div
                    onClick={() => setLightboxItem(currentImage)}
                    className="relative w-full overflow-hidden cursor-pointer"
                    style={{ aspectRatio: '4/5' }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open photo ${currentImage.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setLightboxItem(currentImage);
                    }}
                  >
                    <img
                      key={currentImage.id}
                      src={currentImage.src}
                      alt={currentImage.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Top tags */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="font-mono text-[10px] tracking-widest text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {tile.tag}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-white bg-[#ff4925] px-2.5 py-1 rounded-md font-bold">
                        {currentImage.category}
                      </span>
                    </div>

                    {/* Quick navigation arrows overlay */}
                    <button
                      onClick={(e) => prevTileOption(tile.id, totalImages, e)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
                      aria-label="Previous option"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => nextTileOption(tile.id, totalImages, e)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
                      aria-label="Next option"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Bottom overlay preview label */}
                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                      <p className="text-white font-semibold text-sm drop-shadow-md truncate">
                        {currentImage.title}
                      </p>
                      <p className="text-white/60 text-[11px] font-mono mt-0.5">
                        Option {activeIdx + 1} of {totalImages}
                      </p>
                    </div>
                  </div>

                  {/* Tile Bottom: Separate Options Controls */}
                  <div className="p-4 bg-black/40 border-t border-white/8 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/40 tracking-wider text-[11px]">SELECT OPTION:</span>
                      <span className="text-[#ff4925] font-semibold text-[11px]">
                        {activeIdx + 1} / {totalImages}
                      </span>
                    </div>

                    {/* Separate options pill list */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {tile.images.map((img, oIdx) => (
                        <button
                          key={img.id}
                          onClick={(e) => setTileOption(tile.id, oIdx, e)}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono tracking-wider transition-all duration-200 border ${
                            activeIdx === oIdx
                              ? 'bg-[#ff4925] text-white border-[#ff4925] font-bold shadow-sm'
                              : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/25'
                          }`}
                          aria-label={`Switch to option ${oIdx + 1}: ${img.title}`}
                        >
                          Opt {oIdx + 1}
                        </button>
                      ))}
                    </div>

                    {/* Quick description */}
                    <p className="text-white/40 text-[11px] line-clamp-1 italic mt-1 font-mono">
                      "{currentImage.description || currentImage.title}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* After 4 tiles: Option to View More + Direct Checkout Button */}
          <div className="bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] border border-white/12 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="text-center lg:text-left">
              <span className="font-mono text-xs tracking-[0.25em] text-[#ff4925] uppercase">
                COMPLETE VAULT ARCHIVE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-2">
                Want to see all {GALLERY_ITEMS.length} captured moments?
              </h3>
              <p className="text-white/50 text-sm max-w-xl mt-2 leading-relaxed">
                Filter by Traditional, Festive, Outdoor, Travel, and Candid moments. Or join the private Telegram
                to get the 100% full uncompressed HD releases.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              {/* View More redirects to CAPTURED MOMENTS page */}
              <button
                onClick={onViewMore}
                id="view-more-gallery-btn"
                className="group relative inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/25 hover:border-[#ff4925] px-8 py-4 rounded-full text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-md"
              >
                <span>VIEW ALL CAPTURED MOMENTS ({GALLERY_ITEMS.length})</span>
                <svg className="w-4 h-4 text-[#ff4925] transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Checkout CTA */}
              <button
                onClick={onCheckout}
                id="gallery-checkout-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#ff4925] hover:bg-[#e03e1e] text-white px-8 py-4 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 font-bold shadow-lg shadow-[#ff4925]/20 hover:scale-[1.02]"
              >
                <span>CHAT WITH ME — {SITE_METADATA.pricing.formatted}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for Tile Preview */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxItem(null)}
        >
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 flex items-center justify-center transition-all z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="max-w-3xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxItem.src}
              alt={lightboxItem.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="font-mono text-xs tracking-widest text-[#ff4925] uppercase">
                {lightboxItem.category}
              </span>
              <p className="text-white font-semibold text-base mt-1">{lightboxItem.title}</p>
              {lightboxItem.description && (
                <p className="text-white/50 text-xs font-mono mt-1 max-w-md">{lightboxItem.description}</p>
              )}
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setLightboxItem(null);
                    onViewMore();
                  }}
                  className="text-xs font-mono text-white/60 hover:text-white underline tracking-wider uppercase"
                >
                  View All in Archive →
                </button>
                <button
                  onClick={() => {
                    setLightboxItem(null);
                    onCheckout();
                  }}
                  className="bg-[#ff4925] text-white px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-[#e03e1e]"
                >
                  Unlock Full HD Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PhotoGallery;
