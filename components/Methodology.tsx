import React, { useEffect, useRef, useState } from 'react';

interface MethodStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: string;
  colorClass: string;
  phases: string[];
  image: string;
}

const methodSteps: Record<number, MethodStep> = {
  1: {
    id: 'think',
    title: 'THINK',
    subtitle: 'Context-First Discovery',
    description: 'Before a single line of code is written, we deconstruct the problem space.',
    longDescription: 'We avoid the trap of solutionism. By mapping the terrain of your business needs against technical feasibility, we ensure that what we build solves the right problem. This phase involves deep stakeholder interviews, data maturity assessments, and architectural blueprinting.',
    icon: 'psychology',
    colorClass: 'text-primary',
    phases: ['Stakeholder Interviews', 'Data Maturity Assessment', 'Technical Feasibility Study', 'Architectural Blueprinting'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0syEMF0AI2Td4_32Ins264eiSZjPh9BWtQyKHDk6xcuK3ohFRWG4HcfDKrQ1alBCyruEZ6R4UGIYaGarjZwqkJuPeOOHKZNm_YsGt1JJDnYt5bWZCEkFwZPI7TgMM91_MdN4LhSPMAktFHF48xtbzqg70wVP4SN8dY3UQ-dbwu3pocHPgPMk-weMmLqs7OJ-WxT6Z37hWkMpfQxvCdEquOpNQCI8h5AZA2mMq6IHxDFWQloFs0BCJiF2GzIQ0zbslX5Kg33XWaOyi'
  },
  2: {
    id: 'build',
    title: 'BUILD',
    subtitle: 'Engineering Excellence',
    description: 'Rapid prototyping meets robust architecture. Systems designed for scale.',
    longDescription: 'We write production-grade code from day one. Our engineering culture prioritizes clean, testable, and documented code. Whether it is a data lakehouse or a custom agentic workflow, we build resilient foundations that can handle the scale of tomorrow.',
    icon: 'build',
    colorClass: 'text-emerald-400',
    phases: ['Agile Development Sprints', 'CI/CD Pipeline Setup', 'Automated Testing Suites', 'Cloud Infrastructure IaC'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwUTc-60iyPqbS7h5OTVQWphY7LFpu6Yy2CEwbPgICptkLqSuhr5RIi6UwtORIe9BqlTtB5aTVYYzJGFbxuDApyxMRmJtdJEHxfuxLiNjO6MW2bczLxVGUANeQzwbPA7h0jWgHAcps0yVM778TEiEIvNn02whEfEWzhY1h7lym59twZJ2Yr9Spp_oIl7Z6vXlkfa7h0S_R_MCQDza0ZbCBefSNPUmHDtyC_6qXN3iAMqnkUwXylOnOSTjYUZgvBNZ8Ssf_h7MjXZZd'
  },
  3: {
    id: 'evolve',
    title: 'EVOLVE',
    subtitle: 'Continuous Improvement',
    description: 'Delivery is just the start. We implement feedback loops for continuous scaling.',
    longDescription: 'Software is a living organism. We implement observability, monitoring, and feedback loops that allow the system to learn and improve over time. We train your internal teams to take ownership, ensuring long-term sustainability.',
    icon: 'rocket_launch',
    colorClass: 'text-purple-400',
    phases: ['Performance Monitoring', 'User Feedback Loops', 'Model Retraining', 'Knowledge Transfer'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR4aTbp1qcH_JDidwSq3phITiYRzWtPuqAQeIxNpOn0JA2CZksrAEy-zPb1zbblOhGD8xqR8VLU_dBJEbBnoJGP030cuekjK3zwb0vWUvc6T6dEUibjFLspIWsyoWKetRoqquzh2lIwzy2a-3xLU5MnfNHtEb_FyhQ9wsnwyRweD58OEnl0kElgE_GhjeKd8C95zAvllbmI_JnKGMXgdtxZqR3zmM3i7_MtrcUD7ddYdtcIb0DWydLbz3ewwGMTyhQOvyya2Fy-y5K'
  }
};

const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedStep, setSelectedStep] = useState<MethodStep | null>(null);
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
          <div 
            ref={step1Ref} 
            onClick={() => setSelectedStep(methodSteps[1])}
            className={`md:text-right md:pr-12 md:py-12 order-1 group transition-opacity duration-700 cursor-pointer ${activeStep === 1 ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}
          >
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
                <span className="material-symbols-outlined text-sm text-primary animate-bounce ml-2">open_in_new</span>
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
          <div 
            ref={step2Ref} 
            onClick={() => setSelectedStep(methodSteps[2])}
            className={`md:pl-12 md:py-12 order-6 group transition-opacity duration-700 cursor-pointer ${activeStep === 2 ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}
          >
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
                <span className="material-symbols-outlined text-sm text-emerald-400 animate-bounce ml-2">open_in_new</span>
              </div>
            </div>
          </div>

          {/* Step 3: Evolve */}
          <div 
            ref={step3Ref} 
            onClick={() => setSelectedStep(methodSteps[3])}
            className={`md:text-right md:pr-12 md:py-12 order-7 group transition-opacity duration-700 cursor-pointer ${activeStep === 3 ? 'opacity-100' : 'opacity-30 blur-[1px]'}`}
          >
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
                <span className="material-symbols-outlined text-sm text-purple-400 animate-bounce ml-2">open_in_new</span>
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

      {/* Pop-up Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedStep(null)}
          ></div>
          <div className="relative w-full max-w-4xl bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
             {/* Modal Sidebar / Image */}
             <div className="w-full md:w-1/3 bg-surface-dark relative hidden md:block">
                <img src={selectedStep.image} alt={selectedStep.title} className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-card"></div>
                <div className="absolute bottom-8 left-8">
                   <div className={`size-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${selectedStep.colorClass} mb-4 backdrop-blur-md`}>
                      <span className="material-symbols-outlined text-4xl">{selectedStep.icon}</span>
                   </div>
                   <h3 className="text-white text-xl font-bold leading-tight">{selectedStep.title}</h3>
                </div>
             </div>

             {/* Modal Content */}
             <div className="flex-1 p-8 md:p-10 overflow-y-auto">
                <button 
                  onClick={() => setSelectedStep(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                   <span className="material-symbols-outlined text-3xl">close</span>
                </button>

                <div className="md:hidden mb-6 flex items-center gap-4">
                    <div className={`size-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${selectedStep.colorClass}`}>
                      <span className="material-symbols-outlined text-2xl">{selectedStep.icon}</span>
                   </div>
                   <h3 className="text-white text-xl font-bold">{selectedStep.title}</h3>
                </div>

                <h4 className={`text-sm font-bold uppercase tracking-widest mb-4 ${selectedStep.colorClass}`}>
                   {selectedStep.subtitle}
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 border-b border-white/10 pb-8">
                   {selectedStep.longDescription}
                </p>

                <h5 className="text-white font-bold mb-4">Key Phases</h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {selectedStep.phases.map((phase, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                         <span className={`material-symbols-outlined text-lg mt-0.5 ${selectedStep.colorClass}`}>check_circle</span>
                         <span className="text-gray-400 text-sm">{phase}</span>
                      </li>
                   ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
                   <button onClick={() => setSelectedStep(null)} className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                      Close
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Methodology;