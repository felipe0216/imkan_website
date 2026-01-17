import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Methodology from './components/Methodology';
import WhyUs from './components/WhyUs';
import CaseStudies from './components/CaseStudies';
import Team from './components/Team';
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal';

const App: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-background-dark">
      <Navbar onOpenContact={openContactModal} />
      <main>
        <Hero onOpenContact={openContactModal} />
        <Services onOpenContact={openContactModal} />
        <Methodology />
        <WhyUs />
        <CaseStudies onOpenContact={openContactModal} />
        <Team />
      </main>
      <Footer onOpenContact={openContactModal} />
      
      {/* Contact Form Modal */}
      <ContactFormModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
};

export default App;