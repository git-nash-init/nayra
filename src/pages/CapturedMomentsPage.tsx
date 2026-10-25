import { useState, useMemo, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, MediaItem } from '../config/media';
import { SITE_METADATA } from '../config/site';

interface CapturedMomentsPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export function CapturedMomentsPage({ onBack, onCheckout }: CapturedMomentsPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number>(0);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') {
        const next = (lightboxIdx + 1) % filtered.length;
        setLightboxIdx(next);
        setLightbox(filtered[next]);
      }
      if (e.key === 'ArrowLeft') {
        const prev = (lightboxIdx - 1 + filtered.length) % filtered.length;
        setLightboxIdx(prev);
        setLightbox(filtered[prev]);
      }
    },
    [lightbox, lightboxIdx, filtered]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (item: MediaItem, idx: number) => {
    setLightbox(item);
    setLightboxIdx(idx);
  };

  const categoryCount = (cat: string) =>
    cat === 'All' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* ── Sticky Top Header ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              id="gallery-back-button"
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase py-2 px-3 rounded-lg hover:bg-white/5 border border-white/10"
              aria-label="Back to home"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>BACK TO HOME</span>
            </button>
            <span className="text-white/20 hidden sm:inline">|</span>
            <button
              onClick={onBack}
              className="text-white font-display text-lg font-black tracking-tight hidden sm:block hover:text-[#ff4925] transition-colors"
            >
              NAYRA<span className="text-[#ff4925]">•</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/40 font-mono text-xs hidden md:inline">
              {GALLERY_ITEMS.length} VAULT PREVIEWS
            </span>
            <button
              onClick={onCheckout}
              id="gallery-top-checkout-btn"
              className="bg-[#ff4925] text-white px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-[#e03e1e] transition-all font-bold shadow-md shadow-[#ff4925]/20 flex items-center gap-1.5"
            >
              <span>CHAT WITH ME — {SITE_METADATA.pricing.formatted}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="flex-1">
        {/* Page Hero Header */}
        <div className="border-b border-white/8 py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#ff4925] uppercase mb-4">
              <span>NAYRA OFFICIAL ARCHIVE</span>
              <span className="text-white/30">•</span>
              <span>ALL {GALLERY_ITEMS.length} PHOTO PREVIEWS</span>
              <span className="text-white/30">•</span>
              <span>2 EXCLUSIVE VIDEO REELS</span>
            </div>

            <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-black uppercase tracking-tight text-white leading-none">
              CAPTURED <span className="text-[#ff4925]">MOMENTS</span>
            </h1>

            <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-5 leading-relaxed font-sans">
              Explore the entire public collection of preview stills from Nayra's shoots, travels, festive celebrations, and candid daily life.
              To unlock full uncompressed high-resolution albums, private raw videos, and 1-on-1 direct messaging, join the private Telegram channel.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={onCheckout}
                className="inline-flex items-center gap-2 bg-[#ff4925] hover:bg-[#e03e1e] text-white px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase transition-all font-bold shadow-md"
              >
                <span>UNLOCK ENTIRE HD VAULT — {SITE_METADATA.pricing.formatted}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <span className="text-white/40 text-xs font-mono">
                100% Uncompressed · Instant Access · Discreet
              </span>
            </div>
          </div>
        </div>

        {/* ── Filter Bar (Sticky) ─────────────────────────────────────────── */}
        <div className="sticky top-16 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 py-4 px-4 sm:px-8 lg:px-16">
          <div className="max-w-[1440px] mx-auto flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 border ${
                    activeFilter === cat
                      ? 'bg-[#ff4925] text-white border-[#ff4925] font-bold shadow-md shadow-[#ff4925]/20'
                      : 'border-white/12 text-white/60 hover:text-white hover:border-white/30 bg-white/[0.02]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      activeFilter === cat ? 'bg-white/20 text-white' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {categoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>

            <span className="text-white/40 font-mono text-xs hidden sm:block">
              SHOWING {filtered.length} OF {GALLERY_ITEMS.length} PHOTOS
            </span>
          </div>
        </div>

        {/* ── Gallery Masonry Grid ───────────────────────────────────────── */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-white/40 font-mono">
              No photos found in category "{activeFilter}".
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item, idx)}
                  className="group relative w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 cursor-pointer break-inside-avoid mb-4 block transition-all duration-300 hover:shadow-xl hover:shadow-[#ff4925]/10"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') openLightbox(item, idx);
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105 block"
                    loading={idx < 8 ? 'eager' : 'lazy'}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[10px] tracking-widest text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white bg-[#ff4925] px-2 py-0.5 rounded font-bold shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Center expand icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full border border-white/60 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                    {item.description && (
                      <p className="text-white/60 text-xs mt-0.5 line-clamp-2 font-mono">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Section-Level CTA Banner ───────────────────────────────────── */}
        <section className="border-t border-white/10 py-20 px-4 sm:px-8 text-center bg-gradient-to-b from-transparent via-[#ff4925]/5 to-transparent">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-mono tracking-[0.25em] text-[#ff4925] uppercase mb-3">
              PREVIEW ONLY • 100% EXCLUSIVE TELEGRAM VAULT
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white mb-5 leading-tight">
              Ready for the uncompressed experience?
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
              Every photo in this archive is only a preview. In Nayra's private Telegram channel, members receive full uncompressed HD photo drops,
              raw behind-the-scenes video reels, voice notes, and real-time private 1-on-1 chats.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onCheckout}
                id="gallery-bottom-cta-checkout"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ff4925] hover:bg-[#e03e1e] text-white px-9 py-4 rounded-full font-mono text-xs tracking-widest uppercase transition-all font-bold shadow-lg shadow-[#ff4925]/25 hover:scale-105"
              >
                <span>JOIN PRIVATE CHAT — {SITE_METADATA.pricing.formatted}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={onBack}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-7 py-4 rounded-full font-mono text-xs tracking-widest uppercase transition-colors"
              >
                Back to Home
              </button>
            </div>
            <p className="text-white/30 font-mono text-[11px] mt-5">
              18+ Adults Only · Instant Telegram Link Delivery · One-time Payment
            </p>
          </div>
        </section>
      </main>

      {/* ── Sticky Bottom Checkout Bar ───────────────────────────────────── */}
      <aside className="sticky bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 py-3.5 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-white font-semibold text-xs sm:text-sm">
              Unlock the <span className="text-[#ff4925]">full uncompressed albums</span> &amp; chat with Nayra
            </p>
            <p className="text-white/50 text-[11px] font-mono mt-0.5">
              One-time payment of {SITE_METADATA.pricing.formatted} · Instant invitation delivered
            </p>
          </div>
          <button
            onClick={onCheckout}
            id="gallery-sticky-checkout-btn"
            className="w-full sm:w-auto shrink-0 bg-[#ff4925] hover:bg-[#e03e1e] text-white px-7 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all font-bold shadow-md shadow-[#ff4925]/25 flex items-center justify-center gap-2"
          >
            <span>JOIN FOR {SITE_METADATA.pricing.formatted}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Lightbox Modal ──────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/96 flex items-center justify-center backdrop-blur-md"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 bg-black/40 flex items-center justify-center transition-all z-20"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prev = (lightboxIdx - 1 + filtered.length) % filtered.length;
              setLightboxIdx(prev);
              setLightbox(filtered[prev]);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 bg-black/40 flex items-center justify-center transition-all z-20"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image & details */}
          <div
            className="max-w-4xl max-h-[92vh] flex flex-col items-center px-16 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="font-mono text-xs tracking-widest text-[#ff4925] uppercase font-bold">
                {lightbox.category}
              </span>
              <p className="text-white font-semibold text-lg mt-1">{lightbox.title}</p>
              {lightbox.description && (
                <p className="text-white/50 text-xs font-mono mt-1 max-w-lg">{lightbox.description}</p>
              )}
              <div className="mt-3 flex items-center justify-center gap-4 text-xs font-mono">
                <span className="text-white/40">
                  {lightboxIdx + 1} / {filtered.length} &nbsp;·&nbsp; Use ← → keys
                </span>
                <button
                  onClick={() => {
                    setLightbox(null);
                    onCheckout();
                  }}
                  className="bg-[#ff4925] hover:bg-[#e03e1e] text-white px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase transition-colors"
                >
                  Unlock Full HD Vault
                </button>
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next = (lightboxIdx + 1) % filtered.length;
              setLightboxIdx(next);
              setLightbox(filtered[next]);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 bg-black/40 flex items-center justify-center transition-all z-20"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default CapturedMomentsPage;
