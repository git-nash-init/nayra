import { useState, useMemo, useEffect } from 'react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../config/media';
import { BRAND_NAME, SITE_METADATA } from '../config/site';
import { Button } from '../components/ui/Button';
import { MediaFrame } from '../components/ui/MediaFrame';
import { Lightbox } from '../components/ui/Lightbox';
import { Reveal } from '../components/ui/Reveal';
import { toRoman } from '../lib/roman';

interface CapturedMomentsPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export function CapturedMomentsPage({ onBack, onCheckout }: CapturedMomentsPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryCount = (cat: string) =>
    cat === 'All' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length;

  return (
    <div className="min-h-screen bg-canvas-base text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-canvas-base border-b border-hairline">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            id="gallery-back-button"
            className="link-couture eyebrow text-muted-light"
            aria-label="Back to home"
          >
            Back to {BRAND_NAME}
          </button>
          <button
            onClick={onBack}
            className="font-display text-xl tracking-masthead text-white hover:text-accent-light transition-colors duration-200 hidden sm:block"
          >
            {BRAND_NAME}
          </button>
          <Button variant="primary" size="sm" onClick={onCheckout} id="gallery-top-checkout-btn">
            Join · {SITE_METADATA.pricing.formatted}
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Title */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-12 text-center">
          <p className="eyebrow text-accent">The archive · {GALLERY_ITEMS.length} photographs</p>
          <h1 className="font-display text-6xl sm:text-8xl lg:text-[8rem] leading-[0.95] tracking-tighter text-white mt-6">
            Captured <em className="text-accent-light">moments</em>
          </h1>
          <p className="text-muted text-base sm:text-[17px] max-w-2xl mx-auto mt-8 leading-[1.85]">
            Preview stills from shoots, travels, festive celebrations and everyday life. Members receive every set
            uncompressed, with the private films, voice notes and conversation.
          </p>
        </div>

        {/* Filters */}
        <nav
          className="sticky top-16 z-30 bg-canvas-base border-y border-hairline"
          aria-label="Filter photographs"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  className={`eyebrow pb-1 border-b transition-colors duration-200 focus:outline-none focus-visible:text-accent ${
                    activeFilter === cat
                      ? 'text-accent-light border-accent'
                      : 'text-muted border-transparent hover:text-white'
                  }`}
                >
                  {cat}
                  <span className="font-display italic normal-case tracking-normal text-muted-dark ml-1.5">
                    {categoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>
            <span className="font-display italic text-muted-dark hidden md:block shrink-0">
              {filtered.length} of {GALLERY_ITEMS.length}
            </span>
          </div>
        </nav>

        {/* Editorial masonry */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14 sm:py-20">
          {filtered.length === 0 ? (
            <p className="text-center py-24 font-display italic text-muted">
              No photographs in “{activeFilter}” yet.
            </p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
              {filtered.map((item, idx) => (
                <Reveal as="figure" key={item.id} className="break-inside-avoid mb-12">
                  <button
                    type="button"
                    onClick={() => setLightboxIdx(idx)}
                    className="block w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas-base"
                    aria-label={`Open ${item.title}`}
                  >
                    <MediaFrame
                      src={item.src}
                      alt={item.title}
                      aspectRatio={item.aspectRatio}
                      loading={idx < 6 ? 'eager' : 'lazy'}
                      inset
                    />
                  </button>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-display italic text-muted-light">{item.title}</span>
                    <span className="eyebrow text-muted-dark shrink-0">
                      {item.category} · {toRoman(idx + 1)}
                    </span>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* Invitation */}
        <section className="border-t border-hairline py-24 sm:py-32 px-4 sm:px-8 text-center">
          <Reveal className="max-w-2xl mx-auto space-y-8">
            <p className="eyebrow text-accent">These are previews</p>
            <h2 className="font-display text-4xl sm:text-6xl text-white leading-tight tracking-tighter">
              The full sets are <em className="text-accent-light">waiting</em>.
            </h2>
            <p className="text-muted text-base sm:text-[17px] leading-[1.85]">
              In the private Telegram channel, members receive uncompressed photo drops, behind-the-scenes films,
              voice notes and real conversation with {BRAND_NAME}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button variant="solid" size="lg" onClick={onCheckout} id="gallery-bottom-cta-checkout">
                Join the private channel · {SITE_METADATA.pricing.formatted}
              </Button>
              <Button variant="secondary" size="lg" onClick={onBack}>
                Back to {BRAND_NAME}
              </Button>
            </div>
            <p className="eyebrow text-muted-dark">Strictly 18+ · Instant invitation · One-time payment</p>
          </Reveal>
        </section>
      </main>

      {/* Sticky invitation bar */}
      <aside className="sticky bottom-0 z-40 bg-canvas-base border-t border-hairline py-3.5 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-display italic text-white text-center sm:text-left">
            Every set, uncompressed, and a conversation with {BRAND_NAME}.
          </p>
          <Button
            variant="solid"
            size="sm"
            onClick={onCheckout}
            id="gallery-sticky-checkout-btn"
            className="w-full sm:w-auto shrink-0"
          >
            Join for {SITE_METADATA.pricing.formatted}
          </Button>
        </div>
      </aside>

      {lightboxIdx !== null && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIdx}
          isOpen
          onClose={() => setLightboxIdx(null)}
          onNext={() => setLightboxIdx((i) => (i === null ? i : (i + 1) % filtered.length))}
          onPrev={() => setLightboxIdx((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))}
        />
      )}
    </div>
  );
}

export default CapturedMomentsPage;
