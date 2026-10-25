import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { AboutStatement } from '../components/sections/AboutStatement';
import { VideoShowcase } from '../components/sections/VideoShowcase';
import { PhotoGallery } from '../components/sections/PhotoGallery';
import { ValuePillars } from '../components/sections/ValuePillars';
import { CreatorNote } from '../components/sections/CreatorNote';
import { PerksAccordion } from '../components/sections/PerksAccordion';
import { PricingCard } from '../components/sections/PricingCard';
import { FaqSection } from '../components/sections/FaqSection';
import { FinalCta } from '../components/sections/FinalCta';
import { Footer } from '../components/layout/Footer';

interface HomePageProps {
  onNavigateCheckout: () => void;
  onNavigatePage: (page: 'home' | 'privacy' | 'terms' | 'refund' | 'checkout' | 'moments') => void;
}

export function HomePage({
  onNavigateCheckout,
  onNavigatePage,
}: HomePageProps) {
  const scrollToVideos = () => {
    const el = document.getElementById('videos');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-canvas-base text-white">
      <Navbar onNavigateCheckout={onNavigateCheckout} />

      <main id="main">
        <Hero
          onJoinClick={onNavigateCheckout}
          onExploreVideos={scrollToVideos}
        />
        <AboutStatement />
        <VideoShowcase onJoinClick={onNavigateCheckout} />
        <PhotoGallery
          onViewMore={() => onNavigatePage('moments')}
          onCheckout={onNavigateCheckout}
        />
        <ValuePillars />
        <CreatorNote onJoinClick={onNavigateCheckout} />
        <PerksAccordion />
        <PricingCard onJoinClick={onNavigateCheckout} />
        <FaqSection />
        <FinalCta onJoinClick={onNavigateCheckout} />
      </main>

      <Footer onNavigatePage={onNavigatePage} />
    </div>
  );
}

export default HomePage;
