import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="size-8 text-primary flex items-center justify-center relative">
            <span className="material-symbols-outlined !text-3xl relative z-10 group-hover:text-accent-green transition-colors">hub</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors font-display">Imkan.ai</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Methodology', 'Cases', 'About', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-primary text-sm font-medium transition-colors tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
            <button className="bg-primary hover:bg-white hover:text-background-dark text-background-dark font-semibold px-5 py-2 rounded-sm text-sm transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)]">
                Start Project
            </button>
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden text-white hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background-dark/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
           {['Services', 'Methodology', 'Cases', 'About', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-primary text-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full bg-primary text-background-dark font-bold py-3 rounded-sm">
            Start Project
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;