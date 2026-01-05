import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-10"></div>
        
        {/* Cybernetic Scanner */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_20px_rgba(37,226,244,0.6)] animate-scan z-0"></div>

        {/* Radial Glow */}
        <div className="absolute inset-0 hero-glow"></div>
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-dark to-transparent"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
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
          
          <button className="flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-transparent border border-white/20 text-white text-base font-bold tracking-wide hover:bg-white/5 hover:border-white/40 transition-all duration-300">
            <span>Contact Founders</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </section>
  );
};

export default Hero;