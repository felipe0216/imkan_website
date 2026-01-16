import React from 'react';
import HeroBackground from './HeroBackground';

interface HeroProps {
  onOpenContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Layer 3: Full-Screen Demo Background (Bottom) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <HeroBackground />
      </div>

      {/* Layer 2: Readability Overlay (Middle) */}
      <div className="absolute inset-0 w-full h-full z-10">
        {/* Primary overlay - ensures text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/70 via-background-dark/50 to-background-dark/75"></div>
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* Center vignette to emphasize hero text */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,15,20,0.4)_100%)]"></div>
        
        {/* Bottom gradient fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
      </div>

      {/* Layer 1: Foreground Content (Top) - Always Dominant */}
      <div className="relative z-20 container max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-8 backdrop-blur-sm cursor-default hover:bg-primary/10 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Vision 2030 Ready
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.95]">
          Possibility? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent-green text-glow animate-text-gradient bg-[length:200%_auto]">
            Engineered<span className="text-primary animate-pulse">!</span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed">
          Empowering the future with elite Data Engineering, <br className="hidden md:block" /> 
          Agentic AI solutions, and autonomous intelligence.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="relative overflow-hidden flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-primary text-background-dark text-base font-bold tracking-wide hover:bg-white hover:shadow-[0_0_20px_rgba(37,226,244,0.5)] transition-all duration-300 group">
            <span className="relative z-10">Explore Our Journey</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform relative z-10">arrow_forward</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer z-0"></div>
          </button>
          
          <button 
            onClick={onOpenContact}
            className="flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-transparent border border-white/20 text-white text-base font-bold tracking-wide hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 z-20">
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </section>
  );
};

export default Hero;