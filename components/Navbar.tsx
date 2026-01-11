import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsOpen(false);
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

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, 'home')}
          className="flex items-center gap-3 group relative z-50"
        >
          
        <div className="flex flex-col">
  <span
    className="
      text-[24px] md:text-[26px] font-bold tracking-tight leading-none
      text-transparent bg-clip-text
      bg-gradient-to-r from-primary/70 via-white/80 to-accent-green/70
      bg-[length:200%_auto] animate-text-gradient
      drop-shadow-[0_0_10px_rgba(255,255,255,0.10)]
    "
  >
    imkan

    {/* POP DOT – slightly smaller */}
    <span
      className="
        inline-block align-middle mx-[5px]
        w-[8px] h-[8px] md:w-[9px] md:h-[9px]
        rounded-full
        bg-primary
        shadow-[0_0_12px_rgba(37,226,244,0.45)]
        ring-1 ring-white/20
        translate-y-[-1px]
      "
      aria-hidden="true"
    />

    ai
  </span>
</div>



        </a>

        {/* Desktop Nav - Centered Island Style */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <nav className="flex items-center gap-0.5 p-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-white/10 hover:bg-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.target}`}
                onClick={(e) => handleScrollTo(e, link.target)}
                className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group overflow-hidden whitespace-nowrap"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Hover Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full group-hover:w-1/3 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              </a>
            ))}
          </nav>
        </div>

        {/* CTA & Actions */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6">
          <button className="hidden lg:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold group">
            <span>Portal</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">arrow_outward</span>
          </button>
          <button className="relative overflow-hidden bg-white text-black font-bold text-xs lg:text-sm px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl hover:bg-primary transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(37,226,244,0.4)] group whitespace-nowrap">
            <span className="relative z-10 flex items-center gap-2">
              Start Project
              <span className="material-symbols-outlined text-base lg:text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">chevron_right</span>
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-white hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#05080a] z-40 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,226,244,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,226,244,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <nav className="flex flex-col items-center gap-6 relative z-10">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={`#${link.target}`}
              onClick={(e) => handleScrollTo(e, link.target)}
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300 hover:from-primary hover:to-white transition-all duration-500 transform hover:scale-105 hover:tracking-wide"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <button className="mt-8 bg-primary text-black font-bold text-xl px-12 py-4 rounded-xl shadow-[0_0_30px_rgba(37,226,244,0.3)] hover:shadow-[0_0_50px_rgba(37,226,244,0.6)] transition-shadow relative z-10">
          Start Project
        </button>
      </div>
    </header>
  );
};

export default Navbar;