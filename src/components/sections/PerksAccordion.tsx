import { Accordion, AccordionItem } from '../ui/Accordion';
import { FORMATTED_PRICE } from '../../config/site';
import { toRoman } from '../../lib/roman';

const footnoteClass = 'eyebrow text-accent-light/80';

export const PerksAccordion = () => {
  const accordionItems: AccordionItem[] = [
    {
      id: 'step-1',
      index: toRoman(1),
      title: 'Preview the work',
      subtitle: 'Photographs and films on this page',
      content: (
        <div className="space-y-4">
          <p>
            Everything on this page comes from the private channel itself, from travel diaries and festive
            albums to candid voice notes. What you see here is the same unedited aesthetic you will find inside.
          </p>
          <p className={footnoteClass}>Full resolution · No algorithmic filtering</p>
        </div>
      ),
    },
    {
      id: 'step-2',
      index: toRoman(2),
      title: `A single pass, ${FORMATTED_PRICE}`,
      subtitle: 'No recurring fees',
      content: (
        <div className="space-y-4">
          <p>
            There are no monthly renewals and no surprise charges. One payment of {FORMATTED_PRICE} opens the
            private Telegram channel and its complete archive.
          </p>
          <p className={footnoteClass}>Instant confirmation · Encrypted processing</p>
        </div>
      ),
    },
    {
      id: 'step-3',
      index: toRoman(3),
      title: 'Your invitation arrives',
      subtitle: 'Delivered the moment payment is verified',
      content: (
        <div className="space-y-4">
          <p>
            As soon as your payment is confirmed, your personal invitation appears on screen and is sent to your
            Telegram username. One tap and you are inside.
          </p>
          <p className={footnoteClass}>Single-use link · Mobile, desktop or web Telegram</p>
        </div>
      ),
    },
    {
      id: 'step-4',
      index: toRoman(4),
      title: 'Say hello',
      subtitle: 'Conversation with Nayra',
      content: (
        <div className="space-y-4">
          <p>
            Introduce yourself, reply to the daily posts and send a message. Nayra reads what arrives and answers
            with personal notes and voice messages through the week.
          </p>
          <p className={footnoteClass}>A respectful circle · Real conversation</p>
        </div>
      ),
    },
  ];

  return (
    <section id="perks" className="py-24 sm:py-36 bg-canvas-base border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 sm:mb-20 items-end">
          <div className="lg:col-span-7">
            <p className="font-display italic text-accent text-2xl">IV.</p>
            <p className="eyebrow text-muted mt-2">How it works</p>
            <h2 className="font-display text-5xl sm:text-7xl leading-[0.98] tracking-tighter text-white mt-6">
              Four quiet <em className="text-accent-light">steps</em>
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted text-base sm:text-[17px] leading-[1.85] max-w-md">
            From the first preview to your first conversation in the private channel.
          </p>
        </div>

        <div className="max-w-4xl ml-auto">
          <Accordion items={accordionItems} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
};
