import { useState } from 'react';
import { HOMEPAGE_GALLERY_TILES, GALLERY_ITEMS } from '../../config/media';
import { SITE_METADATA } from '../../config/site';
import { MediaFrame } from '../ui/MediaFrame';
import { Lightbox } from '../ui/Lightbox';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { toRoman } from '../../lib/roman';

interface PhotoGalleryProps {
  onViewMore: () => void;
  onCheckout: () => void;
}

const textControl =
  'eyebrow text-muted hover:text-accent-light transition-colors duration-200 focus:outline-none focus-visible:text-accent';

export function PhotoGallery({ onViewMore, onCheckout }: PhotoGalleryProps) {
  // Selected photograph per tile: { [tileId]: imageIndex }
  const [tileOptionIndex, setTileOptionIndex] = useState<{ [key: string]: number }>({});
  const [lightbox, setLightbox] = useState<{ tileId: string; index: number } | null>(null);

  const setTileOption = (tileId: string, idx: number) => {
    setTileOptionIndex((prev) => ({ ...prev, [tileId]: idx }));
  };

  const stepTile = (tileId: string, total: number, delta: number) => {
    setTileOptionIndex((prev) => ({
      ...prev,
      [tileId]: ((prev[tileId] || 0) + delta + total) % total,
    }));
  };

  const lightboxTile = lightbox ? HOMEPAGE_GALLERY_TILES.find((t) => t.id === lightbox.tileId) : undefined;

  return (
    <>
      <section id="moments" className="bg-canvas-base py-24 sm:py-36 border-b border-hairline">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
            <div>
              <p className="font-display italic text-accent text-2xl">III.</p>
              <p className="eyebrow text-muted mt-2">
                Photographs · {GALLERY_ITEMS.length} previews
              </p>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tighter text-white mt-6">
                Captured <em className="text-accent-light">moments</em>
              </h2>
            </div>
            <button type="button" onClick={onViewMore} className="link-couture eyebrow text-accent-light self-start lg:self-auto whitespace-nowrap">
              View the full archive ({GALLERY_ITEMS.length})
            </button>
          </div>

          {/* Four themed plates, offset in a staggered rhythm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-16">
            {HOMEPAGE_GALLERY_TILES.map((tile, tileIdx) => {
              const activeIdx = tileOptionIndex[tile.id] || 0;
              const currentImage = tile.images[activeIdx] || tile.images[0];
              const totalImages = tile.images.length;

              return (
                <Reveal
                  key={tile.id}
                  delay={tileIdx * 120}
                  className={tileIdx % 2 === 1 ? 'sm:mt-20' : ''}
                >
                  <figure>
                    <p className="eyebrow text-muted-dark mb-4">{tile.tag}</p>

                    <button
                      type="button"
                      onClick={() => setLightbox({ tileId: tile.id, index: activeIdx })}
                      className="block w-full text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas-base"
                      aria-label={`Open photograph: ${currentImage.title}`}
                    >
                      <MediaFrame
                        key={currentImage.id}
                        src={currentImage.src}
                        alt={currentImage.title}
                        aspectRatio="4/5"
                        inset
                      />
                    </button>

                    <figcaption className="mt-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-xl text-white leading-snug">{tile.themeTitle}</p>
                        <span className="eyebrow text-accent shrink-0">{currentImage.category}</span>
                      </div>
                      <p className="font-display italic text-muted mt-1 line-clamp-1">
                        {currentImage.title}
                      </p>

                      {/* Numeral tabs: one per photograph in this plate */}
                      <div className="mt-5 pt-4 border-t border-hairline flex items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1" role="tablist" aria-label={`${tile.themeTitle} photographs`}>
                          {tile.images.map((img, oIdx) => (
                            <button
                              key={img.id}
                              type="button"
                              role="tab"
                              aria-selected={activeIdx === oIdx}
                              onClick={() => setTileOption(tile.id, oIdx)}
                              className={`font-display text-sm pb-1 border-b transition-colors duration-200 focus:outline-none focus-visible:text-accent ${
                                activeIdx === oIdx
                                  ? 'text-accent-light border-accent'
                                  : 'text-muted-dark border-transparent hover:text-muted-light'
                              }`}
                              aria-label={`Photograph ${oIdx + 1}: ${img.title}`}
                            >
                              {toRoman(oIdx + 1)}
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <button type="button" onClick={() => stepTile(tile.id, totalImages, -1)} className={textControl} aria-label="Previous photograph">
                            Prev
                          </button>
                          <button type="button" onClick={() => stepTile(tile.id, totalImages, 1)} className={textControl} aria-label="Next photograph">
                            Next
                          </button>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>

          {/* Archive invitation */}
          <Reveal className="mt-24 sm:mt-32">
            <div className="border border-hairline p-[6px]">
              <div className="border border-hairline px-6 py-12 sm:px-14 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
                <div className="max-w-xl">
                  <p className="eyebrow text-accent">The complete archive</p>
                  <h3 className="font-display text-3xl sm:text-4xl text-white mt-4 leading-tight">
                    All {GALLERY_ITEMS.length} photographs, <em className="text-accent-light">in one place</em>.
                  </h3>
                  <p className="text-muted mt-4 leading-[1.85]">
                    Browse by festive, traditional, outdoor, travel and candid. Members receive every set in full,
                    uncompressed resolution.
                  </p>
                </div>

                <div className="flex flex-col items-center lg:items-end gap-5 shrink-0">
                  <Button variant="solid" size="md" onClick={onCheckout} id="gallery-checkout-btn">
                    Join · {SITE_METADATA.pricing.formatted}
                  </Button>
                  <Button variant="secondary" size="md" onClick={onViewMore} id="view-more-gallery-btn">
                    View the archive
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {lightboxTile && lightbox && (
        <Lightbox
          items={lightboxTile.images}
          currentIndex={lightbox.index}
          isOpen
          onClose={() => setLightbox(null)}
          onNext={() =>
            setLightbox((prev) => prev && { ...prev, index: (prev.index + 1) % lightboxTile.images.length })
          }
          onPrev={() =>
            setLightbox((prev) =>
              prev && { ...prev, index: (prev.index - 1 + lightboxTile.images.length) % lightboxTile.images.length }
            )
          }
        />
      )}
    </>
  );
}

export default PhotoGallery;
