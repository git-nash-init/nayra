import React, { useState } from 'react';

export interface AccordionItem {
  id: string | number;
  index: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndex = 0,
}) => {
  const [openIds, setOpenIds] = useState<Set<string | number>>(
    new Set(defaultOpenIndex >= 0 && items[defaultOpenIndex] ? [items[defaultOpenIndex].id] : [])
  );

  const toggleItem = (id: string | number) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full divide-y divide-hairline border-t border-b border-hairline">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className="group">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full py-7 sm:py-9 flex items-baseline justify-between text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-expanded={isOpen}
            >
              <div className="flex items-baseline gap-5 sm:gap-10 pr-4">
                <span className="font-display italic text-lg sm:text-xl text-accent w-8 sm:w-12 shrink-0">
                  {item.index}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-3xl text-white group-hover:text-accent-light transition-colors duration-200 leading-snug">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="eyebrow text-muted-dark mt-2">{item.subtitle}</p>
                  )}
                </div>
              </div>

              <span
                className="font-display text-2xl sm:text-3xl text-accent shrink-0 w-6 text-center leading-none"
                aria-hidden="true"
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            <div
              className={`grid transition-all duration-500 ease-couture ${
                isOpen ? 'grid-rows-[1fr] opacity-100 pb-8 sm:pb-10' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
              }`}
            >
              <div className="overflow-hidden pl-[3.25rem] sm:pl-[5.5rem] pr-4 text-muted text-[15px] sm:text-base leading-[1.85] max-w-3xl">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
