import React from 'react';
import { Accordion, AccordionItem } from '../ui/Accordion';
import { FAQS } from '../../config/site';
import { toRoman } from '../../lib/roman';

export const FaqSection: React.FC = () => {
  const faqItems: AccordionItem[] = FAQS.map((faq, index) => ({
    id: `faq-${index}`,
    index: toRoman(index + 1),
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));

  return (
    <section id="faq" className="py-24 sm:py-36 bg-canvas-base border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 sm:mb-20 items-end">
          <div className="lg:col-span-7">
            <p className="font-display italic text-accent text-2xl">VI.</p>
            <p className="eyebrow text-muted mt-2">Questions</p>
            <h2 className="font-display text-5xl sm:text-7xl leading-[0.98] tracking-tighter text-white mt-6">
              Before you <em className="text-accent-light">join</em>
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted text-base sm:text-[17px] leading-[1.85] max-w-md">
            Access, payment, verification and the house rules of the private channel.
          </p>
        </div>

        <div className="max-w-4xl ml-auto">
          <Accordion items={faqItems} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
};
