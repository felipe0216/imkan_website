import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section highlighting with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['home', 'services', 'methodology', 'why-us', 'cases', 'about'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Toggle mobile menu with scroll lock
  const toggleMenu = () => {
    if (!isOpen) {
      // Lock body scroll BEFORE opening menu
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      // Store scroll position for later restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
      setIsOpen(true);
    } else {
      // Restore scroll position when closing
      const scrollY = document.body.getAttribute('data-scroll-y');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.removeAttribute('data-scroll-y');
      window.scrollTo(0, parseInt(scrollY || '0'));
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'Services', target: 'services' },
    { name: 'Methodology', target: 'methodology' },
    { name: 'Why Us', target: 'why-us' },
    { name: 'Cases', target: 'cases' },
    { name: 'About', target: 'about' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Close menu first (this will restore scroll)
    if (isOpen) {
      toggleMenu();
    }
    
    // Then scroll to target after a brief delay
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 90; // Height of the fixed header plus some breathing room
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
        ? 'bg-[#05080a]/80 backdrop-blur-xl border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      {/* Decorative Gradient Line on Scroll */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center md:flex-1 md:justify-center md:min-w-0">
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, 'home')}
            className="flex items-center group relative z-50"
          >
            <img
              src="/images/logos/imkan-logo-horizontal.png"
              alt="imkan.ai"
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Desktop Nav - Centered Island Style */}
        <div className="hidden md:block flex-shrink-0">
          <nav className="flex items-center gap-0.5 p-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-white/10 hover:bg-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.target;
              return (
                <a
                  key={link.name}
                  href={`#${link.target}`}
                  onClick={(e) => handleScrollTo(e, link.target)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 relative group overflow-hidden whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-primary/20 shadow-[0_0_15px_rgba(37,226,244,0.3)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Active Indicator Glow */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-primary rounded-full"></div>
                  )}
                  {/* Hover Glow (only when not active) */}
                  {!isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full group-hover:w-1/3 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* CTA & Actions */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6 md:flex-1 md:justify-end md:min-w-0">
          <a 
            href="https://imkandotai.sharepoint.com/sites/imkan/Shared%20Documents/Forms/AllItems.aspx?viewid=6a263fc2%2Dbe1d%2D4abb%2Dbbea%2D47dd4893d73e"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold group"
          >
            <span>Portal</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">arrow_outward</span>
          </a>
          <button 
            onClick={onOpenContact}
            className="relative overflow-hidden bg-white text-black font-bold text-xs lg:text-sm px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl hover:bg-primary transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(37,226,244,0.4)] group whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <span className="material-symbols-outlined text-base lg:text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">chevron_right</span>
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-white hover:text-primary transition-colors"
          onClick={toggleMenu}
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#05080a] z-40 overflow-auto transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,226,244,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,226,244,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Content Container - Always Centered */}
        <div 
          className={`min-h-full flex flex-col items-center justify-center gap-6 px-6 py-24 transition-all duration-300 ${
            isOpen 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}
        >
          <nav className="flex flex-col items-center gap-5 relative z-10 w-full max-w-md">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={`#${link.target}`}
                onClick={(e) => handleScrollTo(e, link.target)}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300 hover:from-primary hover:to-white transition-all duration-500 transform hover:scale-105 hover:tracking-wide text-center"
                style={{ 
                  transitionDelay: isOpen ? `${idx * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button 
            onClick={onOpenContact}
            className="mt-6 bg-primary text-black font-bold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-xl shadow-[0_0_30px_rgba(37,226,244,0.3)] hover:shadow-[0_0_50px_rgba(37,226,244,0.6)] transition-all relative z-10 whitespace-nowrap"
            style={{
              transitionDelay: isOpen ? '300ms' : '0ms',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
            }}
          >
            Get in Touch
          </button>

          <a 
            href="https://imkandotai.sharepoint.com/sites/imkan/Shared%20Documents/Forms/AllItems.aspx?viewid=6a263fc2%2Dbe1d%2D4abb%2Dbbea%2D47dd4893d73e"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-base sm:text-lg font-bold group relative z-10"
            style={{
              transitionDelay: isOpen ? '350ms' : '0ms',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
            }}
          >
            <span>Portal</span>
            <span className="material-symbols-outlined text-xl sm:text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">arrow_outward</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;