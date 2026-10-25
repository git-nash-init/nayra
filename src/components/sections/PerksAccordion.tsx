import { Accordion, AccordionItem } from '../ui/Accordion';
import { FORMATTED_PRICE } from '../../config/site';

export const PerksAccordion = () => {
  const accordionItems: AccordionItem[] = [
    {
      id: 'step-1',
      index: '01',
      title: 'Preview The Unfiltered Content',
      subtitle: 'See genuine photo previews and live video clips',
      content: (
        <div className="space-y-3">
          <p>
            Explore the authentic samples featured on this page. Everything shared here represents the raw, unedited aesthetic of the private feed—from casual travel adventures to elegant festive albums and daily candid voice notes.
          </p>
          <p className="text-xs text-muted-light font-mono">
            ✓ Full resolution uncompressed albums • Zero algorithmic filtering
          </p>
        </div>
      ),
    },
    {
      id: 'step-2',
      index: '02',
      title: `One-Time Pass (${FORMATTED_PRICE})`,
      subtitle: 'Clean checkout with zero hidden recurring fees',
      content: (
        <div className="space-y-3">
          <p>
            No hidden monthly renewals or surprise recurring charges. Your {FORMATTED_PRICE} payment grants direct, uninterrupted access to the private Telegram channel and complete archives.
          </p>
          <p className="text-xs text-muted-light font-mono">
            ✓ Instant payment confirmation • Safe, encrypted processing
          </p>
        </div>
      ),
    },
    {
      id: 'step-3',
      index: '03',
      title: 'Instant Telegram Invitation Link',
      subtitle: 'Access delivered automatically upon verification',
      content: (
        <div className="space-y-3">
          <p>
            As soon as your payment is confirmed, your verified invitation link is displayed on the screen and forwarded to your Telegram username. Simply tap the link to enter the private channel right away.
          </p>
          <p className="text-xs text-muted-light font-mono">
            ✓ Single-use secure invite • Works on mobile, desktop, or web Telegram
          </p>
        </div>
      ),
    },
    {
      id: 'step-4',
      index: '04',
      title: 'Say Hello & Chat In Real Time',
      subtitle: 'Connect personally with Nayra',
      content: (
        <div className="space-y-3">
          <p>
            Drop a message in the channel, introduce yourself, and react to daily posts. Nayra personally reads incoming messages and replies with personal text and voice notes throughout the week.
          </p>
          <p className="text-xs text-muted-light font-mono">
            ✓ Respectful VIP community • Real human connection
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="perks" className="py-20 sm:py-32 bg-canvas-base border-b border-hairline relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-2">
              (ACCESS WORKFLOW)
            </span>
            <h2 className="text-4xl sm:text-6xl font-anton tracking-tight text-white uppercase leading-none">
              HOW IT WORKS
            </h2>
          </div>

          <p className="text-muted text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Four simple steps from previewing to chatting in the private VIP channel.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="max-w-4xl mx-auto">
          <Accordion items={accordionItems} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
};
