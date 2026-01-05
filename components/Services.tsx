import React from 'react';

const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-24 bg-background-dark">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Capabilities</h2>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">What We Do</h2>
          </div>
          <p className="text-text-muted max-w-lg text-lg text-right md:text-right">
            Architecting the intelligence layer for modern enterprises.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Card 1: Strategy (Tall) */}
          <div className="md:col-span-1 md:row-span-2 glass-card rounded-xl p-8 relative group overflow-hidden hover:border-primary/40 transition-all duration-500 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="size-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined">explore</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">AI, Data Strategy & Architecture</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Setting direction, priorities, and guardrails. We align technical capabilities with business goals.
            </p>
            
            <div className="mt-auto">
               <span className="material-symbols-outlined text-primary/20 text-[120px] absolute -bottom-8 -right-8 group-hover:text-primary/10 transition-colors rotate-12">architecture</span>
            </div>
          </div>

          {/* Card 2: Data Engineering (Wide) */}
          <div className="md:col-span-2 md:row-span-1 glass-card rounded-xl p-8 relative group overflow-hidden hover:border-accent-green/40 transition-all duration-500 flex flex-col justify-center">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
             <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent-green/5 to-transparent"></div>
             
             <div className="relative z-10 flex items-start gap-6">
                <div className="size-12 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <span className="material-symbols-outlined">database</span>
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-2">Data Engineering & Platforms</h3>
                   <p className="text-text-muted text-sm leading-relaxed max-w-md">
                      Turning raw data into reliable, AI-ready foundations. We build the pipelines that fuel intelligence.
                   </p>
                </div>
             </div>
          </div>

          {/* Card 3: Agentic AI (Box) */}
          <div className="md:col-span-1 md:row-span-1 glass-card rounded-xl p-8 relative group overflow-hidden hover:border-purple-400/40 transition-all duration-500 flex flex-col justify-between">
             <div className="size-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
               <span className="material-symbols-outlined">smart_toy</span>
             </div>
             <div>
               <h3 className="text-lg font-bold text-white mb-2">Agentic AI</h3>
               <p className="text-text-muted text-xs leading-relaxed">
                  Embedding intelligence into real-world workflows with autonomous agents.
               </p>
             </div>
          </div>

          {/* Card 4: Decision Intelligence (Wide Bottom) */}
          <div className="md:col-span-3 md:row-span-1 glass-card rounded-xl p-8 relative group overflow-hidden hover:border-blue-400/40 transition-all duration-500 flex items-center justify-between">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 w-full">
                <div className="flex items-center gap-6 flex-1">
                   <div className="size-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
                     <span className="material-symbols-outlined">insights</span>
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2">Decision Intelligence</h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                         Translating complex data into clarity and tangible business impact. bridging the gap between data science and C-suite decisions.
                      </p>
                   </div>
                </div>
                <div className="hidden md:block w-px h-16 bg-white/10"></div>
                <div className="flex-shrink-0">
                   <span className="text-blue-400 font-mono text-xs block mb-2">IMPACT METRIC</span>
                   <span className="text-3xl font-bold text-white">10x ROI</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;