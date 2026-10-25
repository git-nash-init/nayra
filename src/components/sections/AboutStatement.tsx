import React from 'react';
import { Sparkles, MessageCircle, Heart, Lock } from 'lucide-react';
import { BRAND_NAME } from '../../config/site';

export const AboutStatement: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-32 bg-canvas-base border-b border-hairline relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Eyebrow Label */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-2">
              (ABOUT {BRAND_NAME})
            </span>
            <div className="w-12 h-0.5 bg-accent mt-3" />
          </div>

          {/* Right Statement & Narrative */}
          <div className="lg:col-span-9 space-y-8">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.2]">
              I believe in <span className="text-accent">genuine moments</span>, unfiltered beauty, and having conversations that actually feel personal.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted text-base sm:text-lg leading-relaxed font-normal pt-4">
              <p>
                Public social feeds are crowded with algorithms, ads, and noise. I wanted a private sanctuary where I can share my everyday life without filters—from cozy morning thoughts and travel adventures to high-fashion shoots and casual late-night voice notes.
              </p>
              <p>
                My private Telegram channel is where I talk with people directly. I read your messages, reply personally, and share the behind-the-scenes moments that never make it anywhere else.
              </p>
            </div>

            {/* Quick Core Values Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">Authentic</span>
                </div>
                <p className="text-xs text-muted">100% natural and unedited perspectives.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-accent">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">Real-Time</span>
                </div>
                <p className="text-xs text-muted">Direct chats and voice replies.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-accent">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">Private</span>
                </div>
                <p className="text-xs text-muted">Discreet, ad-free, respectful space.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-accent">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">Close Circle</span>
                </div>
                <p className="text-xs text-muted">Curated community of genuine supporters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
