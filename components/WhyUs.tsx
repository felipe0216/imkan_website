import React from 'react';

const WhyUs: React.FC = () => {
  return (
    <section className="w-full bg-background-dark relative py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Why Imkan?</h2>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
              A Different Kind of <br/><span className="font-semibold text-white">Consultancy</span>
            </h2>
          </div>
          <div className="pl-6 border-l border-primary/30">
             <p className="text-text-muted text-lg leading-relaxed">
                We bridge the gap between high-level strategy and low-level code. We are engineers first, consultants second.
             </p>
          </div>
        </div>

        {/* Card Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Technical C-Suite */}
          <div className="group glass-card rounded-sm p-8 hover:-translate-y-2 transition-transform duration-300">
             <div className="size-10 rounded-sm bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20">
                <span className="material-symbols-outlined">terminal</span>
             </div>
             <h3 className="text-xl font-bold text-white mb-3">Technical C-Suite</h3>
             <p className="text-text-muted text-sm leading-relaxed">
                Founders with deep engineering expertise, not just slide-makers. Direct access to leadership that speaks your language.
             </p>
          </div>

          {/* Card 2: Speed Over Scale */}
          <div className="group glass-card rounded-sm p-8 hover:-translate-y-2 transition-transform duration-300 border-t-2 border-t-accent-green border-x border-b border-white/5">
             <div className="size-10 rounded-sm bg-accent-green/10 flex items-center justify-center mb-6 text-accent-green border border-accent-green/20">
                <span className="material-symbols-outlined">bolt</span>
             </div>
             <h3 className="text-xl font-bold text-white mb-3">Speed Over Scale</h3>
             <p className="text-text-muted text-sm leading-relaxed">
                Rapid prototyping. We move from concept to pilot in weeks, not quarters. No bloatware, just shipping.
             </p>
          </div>

          {/* Card 3: KSA Sovereign */}
          <div className="group glass-card rounded-sm p-8 hover:-translate-y-2 transition-transform duration-300">
             <div className="size-10 rounded-sm bg-white/10 flex items-center justify-center mb-6 text-white border border-white/20">
                <span className="material-symbols-outlined">shield</span>
             </div>
             <h3 className="text-xl font-bold text-white mb-3">Sovereign & Secure</h3>
             <p className="text-text-muted text-sm leading-relaxed">
                Deeply aligned with Vision 2030. We understand data sovereignty, local regulations, and the Saudi market context.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;