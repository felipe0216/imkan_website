import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Methodology from './components/Methodology';
import WhyUs from './components/WhyUs';
import CaseStudies from './components/CaseStudies';
import Team from './components/Team';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-background-dark">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Methodology />
        <WhyUs />
        <CaseStudies />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default App;