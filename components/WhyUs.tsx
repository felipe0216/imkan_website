import React, { useState } from 'react';

const WhyUs: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="w-full bg-[#0B1215] border-t border-white/5 relative overflow-hidden py-24">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,226,244,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,226,244,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
               <span className="h-px w-8 bg-primary"></span>
               <h2 className="text-primary font-mono text-xs uppercase tracking-[0.2em]">The Imkan Advantage</h2>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-2xl leading-[0.9]">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Without Friction.</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm text-base leading-relaxed font-light border-l border-white/10 pl-6">
            No account managers. No junior-only teams. No endless discovery phases. Just senior engineers building production-grade systems aligned with Vision 2030.
          </p>
        </div>

        {/* Expanded Bento Grid with More Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Founder-Led & Direct Access (Span 7) */}
          <div className="col-span-1 md:col-span-7 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(37,226,244,0.1)]">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             
             <div className="flex flex-col md:flex-row h-full gap-8 relative z-10">
                <div className="flex-1 flex flex-col justify-between">
                   <div>
                      <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                         <span className="material-symbols-outlined text-primary text-2xl">group</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Founder-Led, Hands-On</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                         You work directly with Dr. Syed and Felipe from day one. No account managers. No junior-only teams. No delegation to inexperienced consultants.
                      </p>
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            Direct access to Technical C-Suite
                         </div>
                         <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            Accountability from concept to production
                         </div>
                         <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            15+ years of combined expertise on every project
                         </div>
                      </div>
                   </div>
                   <div className="mt-8 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                      <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                      Senior Experts Only
                   </div>
                </div>

                {/* Visual: Team Connection */}
                <div className="w-full md:w-64 h-48 bg-gradient-to-br from-gray-900/90 to-black/90 rounded-lg border border-white/10 p-4 overflow-hidden relative shadow-inner">
                   <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-primary/20">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white text-xs font-bold">SA</div>
                         <div className="flex-1 min-w-0">
                            <div className="text-white text-xs font-semibold">Dr. Syed</div>
                            <div className="text-gray-500 text-[9px]">Lead AI Scientist</div>
                         </div>
                         <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-emerald-500/20">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">FA</div>
                         <div className="flex-1 min-w-0">
                            <div className="text-white text-xs font-semibold">Felipe</div>
                            <div className="text-gray-500 text-[9px]">Lead Data Engineer</div>
                         </div>
                         <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5">
                         <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-2">Your Project</div>
                         <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-primary/20 rounded-full overflow-hidden">
                               <div className="h-full bg-primary rounded-full w-2/3 animate-pulse"></div>
                            </div>
                            <span className="text-primary text-xs font-bold">Live</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 2: Speed (Span 5) */}
          <div className="col-span-1 md:col-span-5 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-accent-green/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(163,230,53,0.1)]">
             <div className="absolute inset-0 bg-gradient-to-bl from-accent-green/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                   <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-accent-green text-2xl">speed</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-3">Weeks, Not Quarters</h3>
                   <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Ship production MVPs in weeks. Our reusable accelerators and battle-tested patterns eliminate months of reinvention.
                   </p>
                   <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                         <span className="text-gray-400">Traditional Firms</span>
                         <span className="text-gray-600">12-16 weeks</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                         <span className="text-accent-green font-semibold">Imkan.ai</span>
                         <span className="text-accent-green font-bold">2-4 weeks</span>
                      </div>
                   </div>
                </div>

                {/* Visual: Velocity Bars */}
                <div className="mt-8 flex gap-1 items-end h-16 w-full opacity-50 group-hover:opacity-100 transition-opacity">
                   {[40, 70, 50, 90, 60, 85, 45, 95, 65, 80].map((height, i) => (
                      <div key={i} className="flex-1 bg-accent-green/20 rounded-t-sm relative overflow-hidden">
                         <div 
                           className="absolute bottom-0 left-0 right-0 bg-accent-green transition-all duration-500 group-hover:animate-pulse" 
                           style={{ height: `${height}%`, transitionDelay: `${i * 50}ms` }}
                         ></div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Card 3: Production-Grade Engineering (Span 5) */}
          <div className="col-span-1 md:col-span-5 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                   <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-blue-400 text-2xl">engineering</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-3">Production-Grade DNA</h3>
                   <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      We don't ship POCs. Every system is built for scale, reliability, and real-world operation from day one.
                   </p>
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                         <span className="material-symbols-outlined text-blue-400 text-sm">check_circle</span>
                         Automated testing & CI/CD
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                         <span className="material-symbols-outlined text-blue-400 text-sm">check_circle</span>
                         Observability & monitoring built-in
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                         <span className="material-symbols-outlined text-blue-400 text-sm">check_circle</span>
                         Security & compliance by design
                      </div>
                   </div>
                </div>

                {/* Visual: System Health Monitor */}
                <div className="mt-6 p-4 bg-black/40 rounded-lg border border-white/5">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">System Health</span>
                      <span className="text-[10px] text-green-400 font-bold">99.97% Uptime</span>
                   </div>
                   <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                         <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full w-full"></div>
                         </div>
                         <span className="text-[9px] text-gray-500">API</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full w-full"></div>
                         </div>
                         <span className="text-[9px] text-gray-500">DB</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full w-[98%]"></div>
                         </div>
                         <span className="text-[9px] text-gray-500">ML</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 4: Agentic AI Specialization (Span 7) */}
          <div className="col-span-1 md:col-span-7 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
             <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             
             <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="flex-1">
                   <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-purple-400 text-2xl">smart_toy</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-3">Agentic AI Pioneers</h3>
                   <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Beyond dashboards and basic automation. We build autonomous AI agents that execute complex, multi-step workflows without human intervention.
                   </p>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-lg border border-purple-500/10">
                         <div className="text-purple-400 text-xs font-bold mb-1">Multi-Agent Systems</div>
                         <div className="text-gray-500 text-[10px]">Orchestrated workflows</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-purple-500/10">
                         <div className="text-purple-400 text-xs font-bold mb-1">RAG Systems</div>
                         <div className="text-gray-500 text-[10px]">Enterprise knowledge</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-purple-500/10">
                         <div className="text-purple-400 text-xs font-bold mb-1">Voice AI Agents</div>
                         <div className="text-gray-500 text-[10px]">24/7 multilingual</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-purple-500/10">
                         <div className="text-purple-400 text-xs font-bold mb-1">MLOps</div>
                         <div className="text-gray-500 text-[10px]">Production AI Ops</div>
                      </div>
                   </div>
                </div>

                {/* Visual: Agent Flow */}
                <div className="w-full md:w-64 h-48 bg-gradient-to-br from-gray-900/90 to-black/90 rounded-lg border border-white/10 p-4 overflow-hidden relative">
                   <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-3 font-semibold">Agent Workflow</div>
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded border border-purple-500/20">
                         <span className="material-symbols-outlined text-purple-400 text-sm">psychology</span>
                         <span className="text-white text-xs">Reasoning</span>
                         <span className="ml-auto size-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                      </div>
                      <div className="ml-4 h-4 w-px bg-gradient-to-b from-purple-500/50 to-transparent"></div>
                      <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded border border-blue-500/20">
                         <span className="material-symbols-outlined text-blue-400 text-sm">search</span>
                         <span className="text-white text-xs">Knowledge Retrieval</span>
                         <span className="ml-auto size-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                      </div>
                      <div className="ml-4 h-4 w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                      <div className="flex items-center gap-2 p-2 bg-emerald-500/10 rounded border border-emerald-500/20">
                         <span className="material-symbols-outlined text-emerald-400 text-sm">integration_instructions</span>
                         <span className="text-white text-xs">Action Execution</span>
                         <span className="ml-auto size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 5: Saudi-First & Compliance (Span 12 - Wide) - Initially Hidden */}
          {showAll && (
            <div className="col-span-1 md:col-span-12 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-orange-500/30 transition-all duration-500 flex flex-col md:flex-row items-center gap-12 animate-fadeIn">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(249,115,22,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               
               {/* Text Content */}
               <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-orange-400 text-2xl">flag</span>
                     </div>
                     <span className="px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider">Sovereign AI</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Saudi-First by Design</h3>
                  <p className="text-slate-400 text-base leading-relaxed max-w-2xl mb-6">
                     Homegrown expertise deeply aligned with Vision 2030. We understand data sovereignty, local compliance frameworks, and the nuance of the Saudi market better than any offshore consultancy.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-orange-400 text-lg mt-0.5">security</span>
                        <div>
                           <div className="text-white text-sm font-semibold">Data Sovereignty</div>
                           <div className="text-gray-500 text-xs">In-kingdom data residency</div>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-orange-400 text-lg mt-0.5">verified</span>
                        <div>
                           <div className="text-white text-sm font-semibold">Local Integrations</div>
                           <div className="text-gray-500 text-xs">Nafath, Etimad, Absher</div>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-orange-400 text-lg mt-0.5">language</span>
                        <div>
                           <div className="text-white text-sm font-semibold">Arabic-First AI</div>
                           <div className="text-gray-500 text-xs">Gulf dialect support</div>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-orange-400 text-lg mt-0.5">gavel</span>
                        <div>
                           <div className="text-white text-sm font-semibold">Compliance Ready</div>
                           <div className="text-gray-500 text-xs">PDPL, NCA frameworks</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Visual: Saudi Map with Radar */}
               <div className="relative size-64 md:size-80 shrink-0">
                  <div className="absolute inset-0 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                     {/* Map Image */}
                     <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0syEMF0AI2Td4_32Ins264eiSZjPh9BWtQyKHDk6xcuK3ohFRWG4HcfDKrQ1alBCyruEZ6R4UGIYaGarjZwqkJuPeOOHKZNm_YsGt1JJDnYt5bWZCEkFwZPI7TgMM91_MdN4LhSPMAktFHF48xtbzqg70wVP4SN8dY3UQ-dbwu3pocHPgPMk-weMmLqs7OJ-WxT6Z37hWkMpfQxvCdEquOpNQCI8h5AZA2mMq6IHxDFWQloFs0BCJiF2GzIQ0zbslX5Kg33XWaOyi" alt="KSA Map" className="w-full h-full object-cover opacity-50 mix-blend-overlay grayscale contrast-125" />
                     
                     {/* Radar Sweep */}
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent w-full h-full animate-[spin_4s_linear_infinite] origin-center [mask-image:conic-gradient(from_0deg,transparent_0_340deg,black_360deg)]"></div>
                     
                     {/* Grid Circles */}
                     <div className="absolute inset-4 rounded-full border border-white/10"></div>
                     <div className="absolute inset-16 rounded-full border border-white/10"></div>
                     <div className="absolute inset-28 rounded-full border border-white/10"></div>
                     
                     {/* Pinging Dots - Major Cities */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-4 -translate-y-8 size-2 bg-orange-400 rounded-full animate-ping"></div>
                     <div className="absolute top-1/2 left-1/2 translate-x-8 translate-y-4 size-1.5 bg-orange-400 rounded-full animate-ping delay-75"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-8 translate-y-8 size-1.5 bg-orange-400 rounded-full animate-ping delay-150"></div>
                  </div>
               </div>
            </div>
          )}

          {/* Card 6: Measurable Outcomes (Span 6) - Initially Hidden */}
          {showAll && (
            <div className="col-span-1 md:col-span-6 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(37,226,244,0.1)] animate-fadeIn">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               
               <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                     <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-primary text-2xl">trending_up</span>
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-3">Outcomes, Not Outputs</h3>
                     <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Every engagement is measured by business impact, not lines of code. Clear KPIs from day one.
                     </p>
                  </div>

                  {/* Visual: Impact Metrics */}
                  <div className="space-y-3">
                     <div className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-gray-400 text-xs">Detection Time Reduction</span>
                           <span className="text-primary text-sm font-bold">8,640x</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                           <div className="h-full bg-primary rounded-full w-full"></div>
                        </div>
                     </div>
                     <div className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-accent-green/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-gray-400 text-xs">Conversion Rate Improvement</span>
                           <span className="text-accent-green text-sm font-bold">5x</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                           <div className="h-full bg-accent-green rounded-full w-[83%]"></div>
                        </div>
                     </div>
                     <div className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-purple-400/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-gray-400 text-xs">Forecast Accuracy</span>
                           <span className="text-purple-400 text-sm font-bold">87%</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                           <div className="h-full bg-purple-400 rounded-full w-[87%]"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Card 7: Reusable Accelerators (Span 6) - Initially Hidden */}
          {showAll && (
            <div className="col-span-1 md:col-span-6 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] animate-fadeIn">
               <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               
               <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                     <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-emerald-400 text-2xl">inventory_2</span>
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-3">Battle-Tested Accelerators</h3>
                     <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Start 60% ahead with proven components, frameworks, and patterns refined across 15+ production deployments.
                     </p>
                  </div>

                  {/* Visual: Accelerator Library */}
                  <div className="grid grid-cols-2 gap-2">
                     {[
                        { icon: 'database', label: 'Data Pipelines', count: '12+' },
                        { icon: 'smart_toy', label: 'AI Agents', count: '8+' },
                        { icon: 'dashboard', label: 'Dashboards', count: '15+' },
                        { icon: 'integration_instructions', label: 'Integrations', count: '20+' },
                     ].map((item, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-colors">
                           <span className="material-symbols-outlined text-emerald-400 text-lg mb-1">{item.icon}</span>
                           <div className="text-white text-xs font-semibold">{item.label}</div>
                           <div className="text-gray-500 text-[10px] mt-0.5">{item.count} templates</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* "See All Differentiators" / "Show Less" Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,226,244,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              {showAll ? (
                <>
                  <span className="material-symbols-outlined text-lg">expand_less</span>
                  Show Less
                </>
              ) : (
                <>
                  See All Differentiators
                  <span className="material-symbols-outlined text-lg group-hover:translate-y-1 transition-transform duration-300">expand_more</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;