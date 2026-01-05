import React from 'react';

const Methodology: React.FC = () => {
  return (
    <section id="methodology" className="relative w-full px-6 py-24 bg-background-dark overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:text-center max-w-3xl mx-auto">
          <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-3">Our Framework</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Context <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">First</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            We don't just write code. We deconstruct problems to align engineering goals with business reality through a rigorous three-stage process.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-start">
          
          {/* Center Line (Desktop) */}
          <div className="hidden md:flex flex-col items-center justify-self-center h-full absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0 w-1">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent relative overflow-hidden">
                {/* Pulse Beam Animation */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-primary to-transparent animate-beam"></div>
            </div>
          </div>

          {/* Step 1: Think */}
          <div className="md:text-right md:pr-12 md:py-12 order-1 group">
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-primary/5 group-hover:border-primary/30">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">THINK</h3>
              <h4 className="text-primary font-medium mb-4 text-sm tracking-wide">CONTEXT-FIRST</h4>
              <p className="text-slate-400 leading-relaxed text-sm">
                Before a single line of code is written, we deconstruct the problem space. We map the terrain of your business needs against technical feasibility.
              </p>
              <div className="mt-6 flex md:justify-end gap-2">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">Discovery</span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">Architecture</span>
              </div>
            </div>
          </div>

          {/* Icon 1 */}
          <div className="hidden md:flex flex-col items-center justify-center relative z-10 py-12 order-2">
            <div className="w-14 h-14 rounded-full bg-background-dark border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(37,226,244,0.4)]">
              <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
            </div>
          </div>

          <div className="hidden md:block order-3"></div>

          <div className="hidden md:block order-4"></div>

          {/* Icon 2 */}
          <div className="hidden md:flex flex-col items-center justify-center relative z-10 py-12 order-5">
            <div className="w-14 h-14 rounded-full bg-background-dark border border-slate-700 group-hover:border-primary flex items-center justify-center transition-colors duration-500">
              <span className="material-symbols-outlined text-slate-400 text-2xl">build</span>
            </div>
          </div>

          {/* Step 2: Build */}
          <div className="md:pl-12 md:py-12 order-6 group">
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-emerald-500/5 group-hover:border-emerald-500/30">
              <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-500/10 rounded-br-full -ml-4 -mt-4 transition-transform group-hover:scale-150"></div>
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">BUILD</h3>
              <h4 className="text-emerald-400 font-medium mb-4 text-sm tracking-wide">ENGINEERING EXCELLENCE</h4>
              <p className="text-slate-400 leading-relaxed text-sm">
                Rapid prototyping meets robust architecture. We build systems designed to handle the scale of tomorrow while delivering value today.
              </p>
              <div className="mt-6 flex gap-2">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">Development</span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">Testing</span>
              </div>
            </div>
          </div>

          {/* Step 3: Evolve */}
          <div className="md:text-right md:pr-12 md:py-12 order-7 group">
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-purple-500/5 group-hover:border-purple-500/30">
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500/10 rounded-tl-full -mr-4 -mb-4 transition-transform group-hover:scale-150"></div>
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">EVOLVE</h3>
              <h4 className="text-purple-400 font-medium mb-4 text-sm tracking-wide">CONTINUOUS IMPROVEMENT</h4>
              <p className="text-slate-400 leading-relaxed text-sm">
                Delivery is just the start. We implement feedback loops that allow systems to learn and scale alongside your organizational growth.
              </p>
              <div className="mt-6 flex md:justify-end gap-2">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">Scaling</span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">Maintenance</span>
              </div>
            </div>
          </div>

          {/* Icon 3 */}
          <div className="hidden md:flex flex-col items-center justify-center relative z-10 py-12 order-8">
            <div className="w-14 h-14 rounded-full bg-background-dark border border-slate-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400 text-2xl">rocket_launch</span>
            </div>
          </div>

          <div className="hidden md:block order-9"></div>

        </div>
      </div>
    </section>
  );
};

export default Methodology;