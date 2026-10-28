import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { RefundPolicy } from './pages/RefundPolicy';
import { CapturedMomentsPage } from './pages/CapturedMomentsPage';

export type PageView = 'home' | 'checkout' | 'privacy' | 'terms' | 'refund' | 'moments';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  useEffect(() => {
    // Sync with browser hash on initial load and hashchange
    const syncHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#checkout') setCurrentPage('checkout');
      else if (hash === '#privacy') setCurrentPage('privacy');
      else if (hash === '#terms') setCurrentPage('terms');
      else if (hash === '#refund') setCurrentPage('refund');
      else if (
        hash === '#moments-gallery' ||
        hash === '#captured-moments' ||
        hash === '#gallery' ||
        hash === '#all-moments'
      ) {
        setCurrentPage('moments');
      } else if (
        !hash ||
        hash === '#' ||
        hash.startsWith('#about') ||
        hash.startsWith('#videos') ||
        hash.startsWith('#moments') ||
        hash.startsWith('#perks') ||
        hash.startsWith('#pricing') ||
        hash.startsWith('#faq')
      ) {
        setCurrentPage('home');
      }
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else if (page === 'moments') {
      window.location.hash = 'captured-moments';
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-canvas-base min-h-screen text-white">
      <div className="grain" aria-hidden="true" />
      {currentPage === 'home' && (
        <HomePage
          onNavigateCheckout={() => navigateTo('checkout')}
          onNavigatePage={navigateTo}
        />
      )}

      {currentPage === 'moments' && (
        <CapturedMomentsPage
          onBack={() => navigateTo('home')}
          onCheckout={() => navigateTo('checkout')}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage
          onBackToHome={() => navigateTo('home')}
          onNavigatePage={navigateTo}
        />
      )}

      {currentPage === 'privacy' && (
        <PrivacyPolicy onBackToHome={() => navigateTo('home')} />
      )}

      {currentPage === 'terms' && (
        <TermsOfService onBackToHome={() => navigateTo('home')} />
      )}

      {currentPage === 'refund' && (
        <RefundPolicy onBackToHome={() => navigateTo('home')} />
      )}
    </div>
  );
}

export default App;
