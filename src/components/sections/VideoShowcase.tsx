import { FEATURED_VIDEOS } from '../../config/media';
import { VideoPlayer } from '../ui/VideoPlayer';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { FORMATTED_PRICE } from '../../config/site';
import { toRoman } from '../../lib/roman';

interface VideoShowcaseProps {
  onJoinClick?: () => void;
}

// Asymmetric spread: one lead film, two offset beside it, like a magazine layout
const SPREAD = [
  'lg:col-span-4 xl:col-span-5',
  'lg:col-span-4 lg:mt-28',
  'md:col-span-2 md:max-w-sm md:mx-auto lg:max-w-none lg:mx-0 lg:col-span-4 xl:col-span-3 lg:mt-56',
];

export const VideoShowcase = ({ onJoinClick }: VideoShowcaseProps) => {
  return (
    <section id="videos" className="py-24 sm:py-36 bg-canvas-base border-b border-hairline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 sm:mb-24 items-end">
          <div className="lg:col-span-7">
            <p className="font-display italic text-accent text-2xl">II.</p>
            <p className="eyebrow text-muted mt-2">The films · {FEATURED_VIDEOS.length} previews with sound</p>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tighter text-white mt-6">
              Moving <em className="text-accent-light">pictures</em>
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted text-base sm:text-[17px] leading-[1.85] max-w-md">
            Short films from shoots, travels and quiet evenings. Turn the sound on to hear my voice, or join the
            channel for the full daily films.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-8 lg:gap-10 items-start">
          {FEATURED_VIDEOS.map((video, i) => (
            <Reveal key={video.id} delay={i * 140} className={SPREAD[i] ?? 'lg:col-span-4'}>
              <VideoPlayer
                src={video.src}
                poster={video.poster}
                title={video.title}
                category={`Film ${toRoman(i + 1)}`}
                aspectRatio="9/16"
                hasAudio={video.hasAudio}
                className="w-full"
              />
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="eyebrow text-accent">{video.category}</span>
                {video.hasAudio && <span className="eyebrow text-muted-dark">With sound</span>}
              </div>
              {video.description && (
                <p className="text-sm text-muted mt-2 leading-relaxed">{video.description}</p>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 sm:mt-28">
          <div className="border-y border-hairline py-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <p className="font-display text-2xl sm:text-3xl text-white">
              The full daily films live in the <em className="text-accent-light">private channel</em>.
            </p>
            <Button variant="primary" size="md" onClick={onJoinClick} className="shrink-0">
              Join for {FORMATTED_PRICE}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default VideoShowcase;
