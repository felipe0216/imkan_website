import React from 'react';

const WhyUs: React.FC = () => {
  return (
    <section className="w-full bg-surface-dark/30 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark opacity-80 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-primary font-medium tracking-widest text-sm uppercase mb-3">Why Imkan?</h2>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-xl leading-tight">
              Engineering Excellence aligned with <span className="text-primary">Vision 2030</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm md:text-base leading-relaxed">
            We differentiate ourselves through direct leadership access, agile delivery, and deep local alignment.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Technical C-Suite */}
          <div className="group col-span-1 glass-card rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden transition-all hover:-translate-y-1">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative z-10">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20">
                   <span className="material-symbols-outlined">chess</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Technical C-Suite</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                   Direct access to engineering leadership. No account managers, no middlemen, just experts solving problems.
                </p>
             </div>
             {/* Visual Decoration */}
             <div className="mt-8 h-24 w-full bg-slate-900/50 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
                <div className="flex items-center gap-4 opacity-50">
                   <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                   <div className="w-16 h-2 bg-slate-700 rounded-full"></div>
                </div>
             </div>
          </div>

          {/* Card 2: Speed Over Scale */}
          <div className="group col-span-1 glass-card rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden transition-all hover:-translate-y-1 bg-gradient-to-b from-background-dark to-transparent">
             <div className="relative z-10">
                <div className="size-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/20">
                   <span className="material-symbols-outlined">speed</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Speed Over Scale</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                   Agile teams that ship faster than bloatware consultancies. We prioritize MVP delivery and iterative cycles.
                </p>
             </div>
             <div className="mt-8 relative h-32 w-full">
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-emerald-900/10 rounded-t-xl border-t border-emerald-500/20 flex items-end justify-around px-4 pb-2">
                   <div className="w-4 bg-emerald-500/20 h-[40%] rounded-t-sm animate-pulse"></div>
                   <div className="w-4 bg-emerald-500/40 h-[70%] rounded-t-sm animate-pulse delay-75"></div>
                   <div className="w-4 bg-emerald-500/60 h-[50%] rounded-t-sm animate-pulse delay-100"></div>
                   <div className="w-4 bg-emerald-500/80 h-[90%] rounded-t-sm animate-pulse delay-150"></div>
                   <div className="w-4 bg-emerald-500 h-[80%] rounded-t-sm animate-pulse delay-200 shadow-[0_0_10px_#10b981]"></div>
                </div>
             </div>
          </div>

          {/* Card 3: KSA Vision 2030 */}
          <div className="group col-span-1 glass-card rounded-2xl p-0 flex flex-col relative overflow-hidden transition-all hover:-translate-y-1 border-primary/20">
             <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background-dark to-background-dark"></div>
             <div className="p-8 relative z-10 h-full flex flex-col">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-white border border-primary/20">
                   <span className="material-symbols-outlined">flag</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">KSA Vision 2030</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                   Homegrown innovation deeply rooted in the Kingdom's digital transformation goals. We understand the local context.
                </p>
                <div className="mt-auto relative w-full h-40 rounded-lg overflow-hidden border border-slate-700/50 group-hover:border-primary/30 transition-colors">
                   <div className="absolute inset-0 bg-slate-900"></div>
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0syEMF0AI2Td4_32Ins264eiSZjPh9BWtQyKHDk6xcuK3ohFRWG4HcfDKrQ1alBCyruEZ6R4UGIYaGarjZwqkJuPeOOHKZNm_YsGt1JJDnYt5bWZCEkFwZPI7TgMM91_MdN4LhSPMAktFHF48xtbzqg70wVP4SN8dY3UQ-dbwu3pocHPgPMk-weMmLqs7OJ-WxT6Z37hWkMpfQxvCdEquOpNQCI8h5AZA2mMq6IHxDFWQloFs0BCJiF2GzIQ0zbslX5Kg33XWaOyi" alt="Riyadh Map" className="w-full h-full object-cover opacity-40 mix-blend-screen grayscale contrast-150" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10"></div>
                   {/* Pin */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/50 rounded-full animate-ping"></div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;