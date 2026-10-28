import React from 'react';
import { BRAND_NAME } from '../../config/site';
import { Reveal } from '../ui/Reveal';

const VALUES = ['Authentic', 'Real-time', 'Private', 'Close circle'];

export const AboutStatement: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-36 bg-canvas-base border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="font-display italic text-accent text-2xl">I.</p>
            <p className="eyebrow text-muted mt-2">About {BRAND_NAME}</p>
          </div>

          <div className="lg:col-span-9 space-y-12">
            <Reveal>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.6rem] leading-[1.15] tracking-tighter text-white max-w-4xl">
                I believe in <em className="text-accent-light">genuine</em> moments, unfiltered beauty, and
                conversations that feel personal.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-muted text-base sm:text-[17px] leading-[1.9]">
                <p className="drop-cap">
                  Public feeds are crowded with algorithms, advertising and noise. I wanted a private place to
                  share my everyday life as it is, from slow mornings and travel to fashion shoots and late
                  voice notes.
                </p>
                <p>
                  My Telegram channel is where I talk with people directly. I read your messages, reply
                  personally, and share the moments behind the camera that never appear anywhere else.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-10 border-t border-hairline eyebrow text-accent-light">
                {VALUES.map((value, i) => (
                  <li key={value} className="flex items-center gap-x-6">
                    {i > 0 && <span className="text-muted-dark" aria-hidden="true">·</span>}
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
