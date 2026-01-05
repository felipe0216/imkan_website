import React from 'react';

const cases = [
  {
    id: 1,
    title: "Legacy Banking Modernization",
    category: "Banking",
    color: "blue",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-78fnI0oHE_voePsvgEjlZ7NjOg6Oy-yqfw0NajqadDA0o0tL-tHvcIjW5CxzrY8oODajNM_UEeeEQwuPNXxFNd87gzOb-olQhxmaNrI3e4JrOIl3bhQ_cw6EBCQ6K8NheHPzsfuOnBftaazFaE_jmcn9T7-xtDzufCrhO0Ehsl2xoY3enrePnu5fVgoHPURlxI1EnOnnbjieJ9WYO-qJEva5OSf-UiCCqLsZyQ2yVySpt-QYzFf3VqqhidM40EF7tUCNRZ6arRy9",
    stat: "RT-Analytics",
    statLabel: "Latency < 200ms",
    description: "Re-platforming a national bank's data warehouse to a cloud-native Lakehouse."
  },
  {
    id: 2,
    title: "Logistics Route AI",
    category: "Logistics",
    color: "emerald",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiAUtwmNOCf9uLL9fqXqYI7FbLmJqGx_CMleCMDQkeHcn4hhrM4njqZTENVpkSvkv1-g9QqJhnNBKeCLeh3dazOcobHPwbEy1eBBxvLKQ82p1fDeEU3uYH7Q5Y6XGV-IvmeKF_bxibeQqPehAvsY_KeRVl5pWmzjN_-OB-0OdqJ43eYgeVgPdQYcbMnkiqwCNde-A02Y-TrjELJ3tC0idyQjFhlBkCcLKh05WCeKV2zGV4eqzCUwy1oywq5RQdI5ShDDrPTPSTQeDR",
    stat: "-15%",
    statLabel: "OpEx Reduction",
    description: "Custom graph neural networks optimizing last-mile delivery across Riyadh."
  },
  {
    id: 3,
    title: "FinTech Fraud Sentinel",
    category: "FinTech",
    color: "red",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWrwowXE15IR0b_WQEq4wU0dKsmFXL_v4t6phFOrv85KrsH20y18FQNOJ6INQRhHMKgEZKYNf9MU9p7sjvxntrEJkm69lQWaSRGrPodEDe010RTGg4NGAyNtn6_T-HVbHCO3Dv2I6feZzGJ5uE-sC-oqbL36jLB5D9h3Gc8yndcvF78FRxDATnL_OjU_T1fT19TEnvMKTchzXVTBTjg6GsYoLVz9TPZoLs2i169sDZ-y1CN9nEOqas2PhtQDMY6_Zbeb2CAud4ecC1",
    stat: "99.9%",
    statLabel: "Threat Block Rate",
    description: "Real-time anomaly detection pipeline processing 50k transactions/sec."
  },
  {
    id: 4,
    title: "Travel Recommender Engine",
    category: "Travel",
    color: "purple",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCR4aTbp1qcH_JDidwSq3phITiYRzWtPuqAQeIxNpOn0JA2CZksrAEy-zPb1zbblOhGD8xqR8VLU_dBJEbBnoJGP030cuekjK3zwb0vWUvc6T6dEUibjFLspIWsyoWKetRoqquzh2lIwzy2a-3xLU5MnfNHtEb_FyhQ9wsnwyRweD58OEnl0kElgE_GhjeKd8C95zAvllbmI_JnKGMXgdtxZqR3zmM3i7_MtrcUD7ddYdtcIb0DWydLbz3ewwGMTyhQOvyya2Fy-y5K",
    stat: "+40%",
    statLabel: "Conversion Uplift",
    description: "Contextual bandit algorithms serving hyper-personalized travel packages."
  }
];

const CaseStudies: React.FC = () => {
  return (
    <section id="cases" className="w-full py-24 bg-background-dark relative overflow-hidden border-t border-white/5">
       {/* Background Stream Lines */}
       <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
       <div className="absolute top-1/2 left-0 w-full h-[200px] -translate-y-1/2 bg-primary/5 blur-[100px] opacity-20"></div>

       <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col items-start">
          <h2 className="text-primary font-mono text-xs font-bold uppercase tracking-wider mb-2">Deployed Solutions</h2>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
             Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Data Stream</span>
          </h1>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full overflow-x-auto pb-16 px-6 no-scrollbar relative z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-8 w-max mx-auto md:mx-0 md:pl-[max(1.5rem,calc((100vw-80rem)/2))]">
          {cases.map((item) => (
             <div key={item.id} className="group relative w-[340px] md:w-[420px] h-[500px] perspective-1000">
                {/* Connecting Line (Decorative) */}
                <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-white/20 hidden md:block group-first:hidden"></div>

                <div className="w-full h-full bg-surface-dark border border-white/10 rounded-xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] group-hover:border-white/20">
                   
                   {/* Holographic Top Bar */}
                   <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${item.color}-500 to-transparent z-20`}></div>

                   {/* Image Container */}
                   <div className="h-3/5 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${item.image})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-dark/50 to-surface-dark"></div>
                      
                      {/* Floating Category Tag */}
                      <div className="absolute top-6 left-6 backdrop-blur-md bg-black/30 border border-white/10 px-3 py-1 rounded text-xs font-mono text-white/80 uppercase tracking-widest">
                         {item.category}
                      </div>

                      {/* Stat Overlay (Hidden until hover) */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                         <div className={`text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-tighter`}>
                            {item.stat}
                         </div>
                         <div className={`text-xs font-bold uppercase tracking-widest mt-1 text-${item.color}-400`}>
                            {item.statLabel}
                         </div>
                      </div>
                   </div>

                   {/* Content Body */}
                   <div className="absolute bottom-0 left-0 right-0 p-8 h-2/5 flex flex-col justify-between bg-surface-dark/95 backdrop-blur-xl border-t border-white/5">
                      <div>
                         <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                         <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                            {item.description}
                         </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                         <div className="flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Status: Active</span>
                         </div>
                         <button className="text-white hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold group/btn">
                            Case File <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                         </button>
                      </div>
                   </div>
                   
                   {/* Scanline Effect */}
                   <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;