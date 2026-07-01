import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Methodology from './components/Methodology';
import WhyUs from './components/WhyUs';
import CaseStudies from './components/CaseStudies';
import Team from './components/Team';
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal';
import Careers from './components/Careers';

const normalizePath = (pathname: string) => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const App: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // Client-side routing via the History API (SWA rewrites unknown routes to index.html).
  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = normalizePath(to);
    if (target !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, '', target);
    }
    setPath(target);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const isCareers = path === '/careers';

  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-background-dark">
      <Navbar onOpenContact={openContactModal} onNavigate={navigate} currentPath={path} />

      {isCareers ? (
        <Careers onOpenContact={openContactModal} />
      ) : (
        <main>
          <Hero onOpenContact={openContactModal} />
          <Services onOpenContact={openContactModal} />
          <Methodology />
          <WhyUs />
          <CaseStudies onOpenContact={openContactModal} />
          <Team />
        </main>
      )}

      <Footer onOpenContact={openContactModal} onNavigate={navigate} currentPath={path} />

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
};

export default App;
