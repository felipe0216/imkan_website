import React, { useEffect, useRef, useState } from 'react';

const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Refs for each step container
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // We want to trigger when the element is somewhat in the center of the viewport
      const triggerPoint = window.innerHeight * 0.5;

      const checkStep = (ref: React.RefObject<HTMLDivElement | null>, stepIndex: number) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          // Check if the element is crossing the middle of the screen
          if (rect.top < triggerPoint + 100 && rect.bottom > triggerPoint - 100) {
            setActiveStep(stepIndex);
          }
        }
      };

      checkStep(step1Ref, 1);
      checkStep(step2Ref, 2);
      checkStep(step3Ref, 3);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="methodology" ref={sectionRef} className="relative w-full px-6 py-24 bg-background-dark overflow-hidden">
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
          <div ref={step1Ref} className={`md:text-right md:pr-12 md:py-12 order-1 group transition-opacity duration-700 ${activeStep === 1 ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}>
            <div className={`glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 border-white/5 ${activeStep === 1 ? 'bg-primary/5 border-primary/50 shadow-[0_0_30px_rgba(37,226,244,0.1)]' : ''}`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
              <h3 className={`text-3xl font-bold mb-2 transition-colors ${activeStep === 1 ? 'text-white' : 'text-gray-500'}`}>THINK</h3>
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
            <div className={`w-14 h-14 rounded-full bg-background-dark border-2 transition-all duration-500 flex items-center justify-center ${activeStep === 1 ? 'border-primary shadow-[0_0_20px_rgba(37,226,244,0.6)] scale-110' : 'border-slate-800 opacity-30'}`}>
              <span className={`material-symbols-outlined text-2xl transition-colors ${activeStep === 1 ? 'text-primary' : 'text-slate-600'}`}>psychology</span>
            </div>
          </div>

          <div className="hidden md:block order-3"></div>

          <div className="hidden md:block order-4"></div>

          {/* Icon 2 */}
          <div className="hidden md:flex flex-col items-center justify-center relative z-10 py-12 order-5">
            <div className={`w-14 h-14 rounded-full bg-background-dark border-2 transition-all duration-500 flex items-center justify-center ${activeStep === 2 ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-110' : 'border-slate-800 opacity-30'}`}>
              <span className={`material-symbols-outlined text-2xl transition-colors ${activeStep === 2 ? 'text-emerald-500' : 'text-slate-600'}`}>build</span>
            </div>
          </div>

          {/* Step 2: Build */}
          <div ref={step2Ref} className={`md:pl-12 md:py-12 order-6 group transition-opacity duration-700 ${activeStep === 2 ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}>
            <div className={`glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 border-white/5 ${activeStep === 2 ? 'bg-emerald-500/5 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : ''}`}>
              <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-500/10 rounded-br-full -ml-4 -mt-4 transition-transform group-hover:scale-150"></div>
              <h3 className={`text-3xl font-bold mb-2 transition-colors ${activeStep === 2 ? 'text-white' : 'text-gray-500'}`}>BUILD</h3>
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
          <div ref={step3Ref} className={`md:text-right md:pr-12 md:py-12 order-7 group transition-opacity duration-700 ${activeStep === 3 ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}>
            <div className={`glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 border-white/5 ${activeStep === 3 ? 'bg-purple-500/5 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : ''}`}>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500/10 rounded-tl-full -mr-4 -mb-4 transition-transform group-hover:scale-150"></div>
              <h3 className={`text-3xl font-bold mb-2 transition-colors ${activeStep === 3 ? 'text-white' : 'text-gray-500'}`}>EVOLVE</h3>
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
            <div className={`w-14 h-14 rounded-full bg-background-dark border-2 transition-all duration-500 flex items-center justify-center ${activeStep === 3 ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-110' : 'border-slate-800 opacity-30'}`}>
              <span className={`material-symbols-outlined text-2xl transition-colors ${activeStep === 3 ? 'text-purple-500' : 'text-slate-600'}`}>rocket_launch</span>
            </div>
          </div>

          <div className="hidden md:block order-9"></div>

        </div>
      </div>
    </section>
  );
};

export default Methodology;