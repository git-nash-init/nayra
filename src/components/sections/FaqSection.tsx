import React from 'react';
import { Accordion, AccordionItem } from '../ui/Accordion';
import { FAQS } from '../../config/site';

export const FaqSection: React.FC = () => {
  const faqItems: AccordionItem[] = FAQS.map((faq, index) => ({
    id: `faq-${index}`,
    index: (index + 1).toString().padStart(2, '0'),
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));

  return (
    <section id="faq" className="py-20 sm:py-32 bg-canvas-base border-b border-hairline relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-2">
              (COMMON QUESTIONS)
            </span>
            <h2 className="text-4xl sm:text-6xl font-anton tracking-tight text-white uppercase leading-none">
              FREQUENTLY ASKED
            </h2>
          </div>

          <p className="text-muted text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Everything you need to know about channel access, payment verification, and community rules.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion items={faqItems} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
};
