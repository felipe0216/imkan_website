import React from 'react';

const Methodology: React.FC = () => {
  return (
    <section id="methodology" className="relative w-full py-24 bg-[#00181c] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Our Framework</h2>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            The Logic of <span className="text-primary font-medium">Delivery</span>
          </h1>
        </div>

        {/* Process Flow */}
        <div className="relative grid md:grid-cols-3 gap-8">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0"></div>

            {/* Step 1: Think */}
            <div className="relative z-10 group">
                <div className="flex flex-col items-center text-center">
                    <div className="size-24 rounded-full bg-background-dark border-2 border-white/10 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] flex items-center justify-center transition-all duration-300 mb-8 relative">
                        <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                        <span className="material-symbols-outlined text-4xl text-white group-hover:text-primary transition-colors">psychology</span>
                        <div className="absolute -top-3 bg-background-dark px-2 text-primary font-mono text-xs">01</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">THINK</h3>
                    <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">Context-First</p>
                    <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                        Deep discovery. We deconstruct the problem space before writing code. Aligning technical possibilities with business reality.
                    </p>
                </div>
            </div>

            {/* Step 2: Build */}
            <div className="relative z-10 group">
                <div className="flex flex-col items-center text-center">
                    <div className="size-24 rounded-full bg-background-dark border-2 border-white/10 group-hover:border-accent-green group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center transition-all duration-300 mb-8 relative">
                         <div className="absolute inset-0 rounded-full bg-accent-green/5 scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                        <span className="material-symbols-outlined text-4xl text-white group-hover:text-accent-green transition-colors">construction</span>
                        <div className="absolute -top-3 bg-background-dark px-2 text-accent-green font-mono text-xs">02</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">BUILD</h3>
                    <p className="text-accent-green text-xs font-bold tracking-widest uppercase mb-4">Engineering Excellence</p>
                    <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                        Production-grade systems. Rapid prototyping meets robust architecture. We build resilient data foundations.
                    </p>
                </div>
            </div>

            {/* Step 3: Evolve */}
            <div className="relative z-10 group">
                <div className="flex flex-col items-center text-center">
                    <div className="size-24 rounded-full bg-background-dark border-2 border-white/10 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.3)] flex items-center justify-center transition-all duration-300 mb-8 relative">
                        <div className="absolute inset-0 rounded-full bg-purple-400/5 scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                        <span className="material-symbols-outlined text-4xl text-white group-hover:text-purple-400 transition-colors">rocket_launch</span>
                         <div className="absolute -top-3 bg-background-dark px-2 text-purple-400 font-mono text-xs">03</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">EVOLVE</h3>
                    <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">Continuous Scaling</p>
                    <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                        Delivery is just the start. We implement feedback loops that allow systems to learn and scale with your growth.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Methodology;