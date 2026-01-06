import React from 'react';

const WhyUs: React.FC = () => {
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
            We strip away the bloat of traditional consultancy. Direct access to architects, rapid prototyping, and deep alignment with national sovereignty goals.
          </p>
        </div>

        {/* Advanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Technical C-Suite (Span 7) */}
          <div className="col-span-1 md:col-span-7 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(37,226,244,0.1)]">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             
             <div className="flex flex-col md:flex-row h-full gap-8 relative z-10">
                <div className="flex-1 flex flex-col justify-between">
                   <div>
                      <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                         <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Engineer-to-Engineer</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                         No account managers playing telephone. You speak directly with the Technical C-Suite and Lead Architects who build your system.
                      </p>
                   </div>
                   <div className="mt-8 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                      <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                      Live Connection
                   </div>
                </div>

                {/* Visual: Simulated Terminal */}
                <div className="w-full md:w-64 h-48 bg-black/50 rounded-lg border border-white/10 p-4 font-mono text-[10px] text-green-400 overflow-hidden relative shadow-inner">
                   <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,rgba(0,0,0,0.5)_2px)] bg-[size:100%_3px] pointer-events-none opacity-20"></div>
                   <div className="animate-pulse">
                      <span className="text-blue-400">root@imkan:~#</span> ./connect_architect.sh<br/>
                      <span className="text-gray-500">Establishing secure link...</span><br/>
                      <span className="text-gray-500">Handshake verified.</span><br/>
                      <span className="text-green-400">Connected to CTO (Latency: 4ms)</span><br/><br/>
                      <span className="text-blue-400">root@imkan:~#</span> deploy_solution --fast<br/>
                      <span className="text-gray-500">Optimizing pipelines...</span><br/>
                      <span className="text-green-400">Deployment Successful.</span>
                   </div>
                   <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent"></div>
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
                   <h3 className="text-2xl font-bold text-white mb-3">Velocity &gt; Bloat</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">
                      We ship MVPs in weeks, not months. Our agile pods cut through bureaucracy to deliver value instantly.
                   </p>
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

          {/* Card 3: Vision 2030 (Span 12 - Wide) */}
          <div className="col-span-1 md:col-span-12 group relative bg-surface-dark border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-purple-500/30 transition-all duration-500 flex flex-col md:flex-row items-center gap-12">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(168,85,247,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             
             {/* Text Content */}
             <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-purple-400 text-2xl">flag</span>
                   </div>
                   <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider">Sovereign AI</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Aligned with Vision 2030</h3>
                <p className="text-slate-400 text-base leading-relaxed max-w-xl">
                   We are a homegrown entity deeply rooted in the Kingdom's digital transformation goals. We understand data sovereignty, local compliance, and the nuance of the Saudi market better than any offshore firm.
                </p>
             </div>

             {/* Visual: Radar Map */}
             <div className="relative size-64 md:size-80 shrink-0">
                <div className="absolute inset-0 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                   {/* Map Image */}
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0syEMF0AI2Td4_32Ins264eiSZjPh9BWtQyKHDk6xcuK3ohFRWG4HcfDKrQ1alBCyruEZ6R4UGIYaGarjZwqkJuPeOOHKZNm_YsGt1JJDnYt5bWZCEkFwZPI7TgMM91_MdN4LhSPMAktFHF48xtbzqg70wVP4SN8dY3UQ-dbwu3pocHPgPMk-weMmLqs7OJ-WxT6Z37hWkMpfQxvCdEquOpNQCI8h5AZA2mMq6IHxDFWQloFs0BCJiF2GzIQ0zbslX5Kg33XWaOyi" alt="KSA Map" className="w-full h-full object-cover opacity-50 mix-blend-overlay grayscale contrast-125" />
                   
                   {/* Radar Sweep */}
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent w-full h-full animate-[spin_4s_linear_infinite] origin-center [mask-image:conic-gradient(from_0deg,transparent_0_340deg,black_360deg)]"></div>
                   
                   {/* Grid Circles */}
                   <div className="absolute inset-4 rounded-full border border-white/10"></div>
                   <div className="absolute inset-16 rounded-full border border-white/10"></div>
                   <div className="absolute inset-28 rounded-full border border-white/10"></div>
                   
                   {/* Pinging Dots */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-4 -translate-y-8 size-2 bg-purple-400 rounded-full animate-ping"></div>
                   <div className="absolute top-1/2 left-1/2 translate-x-8 translate-y-4 size-1.5 bg-purple-400 rounded-full animate-ping delay-75"></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-8 translate-y-8 size-1.5 bg-purple-400 rounded-full animate-ping delay-150"></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;