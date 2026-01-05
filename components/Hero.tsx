import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Bio-Synthetic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Abstract Data Landscape - Grid & Glow */}
        <div className="absolute inset-0 bg-background-dark">
            <div className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
        </div>
        
        {/* Floating Nodes/Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-green/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

        {/* Topographic Lines Effect (Simulated with CSS Radial Gradients) */}
        <div className="absolute inset-0 opacity-30" style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(0, 243, 255, 0.05) 46%, transparent 47%), radial-gradient(circle at 50% 50%, transparent 55%, rgba(0, 243, 255, 0.05) 56%, transparent 57%)',
            backgroundSize: '100% 100%'
        }}></div>
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Vision Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-sm animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Vision 2030 Ready
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white mb-6 leading-[0.9]">
          Possibility? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent-green text-glow">
            Engineered!
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-text-muted max-w-3xl mb-12 font-light leading-relaxed">
          From strategy and architecture to engineering, AI, automation, and executive insights. We build the hybrid intelligence of tomorrow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 h-12 px-8 rounded-sm bg-primary text-background-dark text-sm font-bold tracking-wide hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all duration-300 group uppercase">
            <span>Explore Our Journey</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          <button className="flex items-center justify-center gap-2 h-12 px-8 rounded-sm bg-transparent border border-white/10 text-white text-sm font-bold tracking-wide hover:bg-white/5 hover:border-primary/50 hover:text-primary transition-all duration-300 uppercase">
            <span>Contact Founders</span>
          </button>
        </div>
      </div>

      {/* Decorative Technical Markers */}
      <div className="absolute bottom-10 left-10 hidden md:block text-[10px] text-primary/40 font-mono">
         SYS.STATUS: ONLINE<br/>
         LOC: 24.7136° N, 46.6753° E
      </div>
      <div className="absolute bottom-10 right-10 hidden md:block text-[10px] text-primary/40 font-mono text-right">
         LATENCY: 12ms<br/>
         NODE: RIYADH-01
      </div>
    </section>
  );
};

export default Hero;