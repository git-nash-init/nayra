import React from 'react';
import { FORMATTED_PRICE } from '../../config/site';
import { Reveal } from '../ui/Reveal';
import { toRoman } from '../../lib/roman';

const CONTENTS = [
  {
    title: 'Direct conversation',
    desc: 'Replies in real time, spontaneous voice notes and personal conversation on Telegram.',
  },
  {
    title: 'The photograph vault',
    desc: 'Uncompressed, high-resolution sets from private shoots that never reach a public feed.',
  },
  {
    title: 'Daily films',
    desc: 'Behind-the-scenes clips, travel diaries and personal greetings in full portrait format.',
  },
  {
    title: 'A private room',
    desc: 'A verified, respectful space without spam, entered through a single-use invitation.',
  },
];

export const ValuePillars: React.FC = () => {
  return (
    <section id="pillars" className="py-24 sm:py-36 bg-canvas-base border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contents-page heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <p className="eyebrow text-muted">In this edition</p>
            <h2 className="font-display text-5xl sm:text-6xl leading-[1.02] tracking-tighter text-white mt-6">
              What you <em className="text-accent-light">receive</em>
            </h2>
            <p className="text-muted mt-6 leading-[1.85] max-w-sm">
              Everything included in your one-time <span className="text-white">{FORMATTED_PRICE}</span> membership.
            </p>
          </div>

          {/* Index list */}
          <ol className="lg:col-span-8 border-t border-hairline">
            {CONTENTS.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 100}
                className="grid grid-cols-[3rem_1fr] sm:grid-cols-[5rem_1fr_1.2fr] gap-x-4 sm:gap-x-8 gap-y-2 py-9 sm:py-11 border-b border-hairline items-baseline"
              >
                <span className="font-display italic text-accent text-2xl sm:text-3xl">{toRoman(i + 1)}</span>
                <h3 className="font-display text-2xl sm:text-3xl text-white leading-snug">{item.title}</h3>
                <p className="col-start-2 sm:col-start-3 text-muted leading-[1.8] text-[15px]">{item.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
