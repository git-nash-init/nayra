import React, { useState } from 'react';
import { Plus } from 'lucide-react';

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
    <div className="w-full divide-y divide-white/10 border-t border-b border-white/10">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className="transition-colors group hover:bg-white/[0.015]">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full py-6 sm:py-8 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4 sm:gap-8 pr-4">
                <span className="font-mono text-base sm:text-lg text-muted">
                  {item.index}
                  <span className="text-accent font-bold">.</span>
                </span>
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold tracking-tight text-white group-hover:text-muted-light transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs sm:text-sm text-muted mt-1 font-normal">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen
                    ? 'border-accent bg-accent text-black rotate-45'
                    : 'border-white/15 text-accent group-hover:border-accent group-hover:bg-accent/10'
                }`}
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
              </div>
            </button>

            {/* Accordion Content */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100 pb-6 sm:pb-8' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
              }`}
            >
              <div className="overflow-hidden pl-10 sm:pl-16 pr-4 text-muted text-sm sm:text-base leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
