import React from 'react';
import { FORMATTED_PRICE } from '../../config/site';

export const ValuePillars: React.FC = () => {
  const pillars = [
    {
      num: '01',
      suffix: '+',
      title: 'Direct 1-on-1 Chat',
      desc: 'Real-time text replies, spontaneous voice notes, and direct personal conversations on Telegram.',
    },
    {
      num: '02',
      suffix: '+',
      title: 'HD Photo Vault',
      desc: 'Uncompressed, raw, high-resolution photo sets from private shoots that never hit social algorithms.',
    },
    {
      num: '03',
      suffix: '+',
      title: 'Daily Video Reels',
      desc: 'Behind-the-scenes clips, daily travel vlogs, and intimate greetings in full mobile portrait format.',
    },
    {
      num: '04',
      suffix: '+',
      title: 'Private VIP Space',
      desc: 'A verified, respectful, spam-free sanctuary with single-use invite links and immediate access delivery.',
    },
  ];

  return (
    <section id="pillars" className="py-20 sm:py-32 bg-canvas-base border-b border-hairline relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Header (Echoing reference "NUMBERS DON'T LIE" layout) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-24">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-2">
              (MEMBERSHIP VALUE)
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-anton tracking-tight text-white uppercase leading-none">
              WHAT YOU RECEIVE
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base sm:text-lg text-muted-light font-normal leading-relaxed">
              Transparent, genuine access. Everything you unlock with your one-time <span className="text-white font-semibold">{FORMATTED_PRICE}</span> private membership pass.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/10">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="flex flex-col justify-between space-y-4 lg:px-8 first:lg:pl-0 last:lg:pr-0"
            >
              <div>
                <div className="flex items-baseline font-anton text-6xl sm:text-7xl text-white tracking-tight leading-none mb-3">
                  <span>{pillar.num}</span>
                  <span className="text-accent text-5xl sm:text-6xl ml-0.5">{pillar.suffix}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-sm text-muted leading-relaxed font-normal">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
