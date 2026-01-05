import React from 'react';

const cases = [
  {
    id: 1,
    title: "Modernizing Legacy Systems",
    category: "Banking",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-78fnI0oHE_voePsvgEjlZ7NjOg6Oy-yqfw0NajqadDA0o0tL-tHvcIjW5CxzrY8oODajNM_UEeeEQwuPNXxFNd87gzOb-olQhxmaNrI3e4JrOIl3bhQ_cw6EBCQ6K8NheHPzsfuOnBftaazFaE_jmcn9T7-xtDzufCrhO0Ehsl2xoY3enrePnu5fVgoHPURlxI1EnOnnbjieJ9WYO-qJEva5OSf-UiCCqLsZyQ2yVySpt-QYzFf3VqqhidM40EF7tUCNRZ6arRy9",
    challenge: "Legacy Data Silos & Slow Reporting",
    solution: "Enterprise Lakehouse Architecture",
    impact: "Real-time Analytics"
  },
  {
    id: 2,
    title: "Route Optimization AI",
    category: "Logistics",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiAUtwmNOCf9uLL9fqXqYI7FbLmJqGx_CMleCMDQkeHcn4hhrM4njqZTENVpkSvkv1-g9QqJhnNBKeCLeh3dazOcobHPwbEy1eBBxvLKQ82p1fDeEU3uYH7Q5Y6XGV-IvmeKF_bxibeQqPehAvsY_KeRVl5pWmzjN_-OB-0OdqJ43eYgeVgPdQYcbMnkiqwCNde-A02Y-TrjELJ3tC0idyQjFhlBkCcLKh05WCeKV2zGV4eqzCUwy1oywq5RQdI5ShDDrPTPSTQeDR",
    challenge: "Inefficient Delivery Routes",
    solution: "Custom ML Optimization Model",
    impact: "15% Cost Reduction"
  },
  {
    id: 3,
    title: "Advanced Fraud Detection",
    category: "FinTech",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWrwowXE15IR0b_WQEq4wU0dKsmFXL_v4t6phFOrv85KrsH20y18FQNOJ6INQRhHMKgEZKYNf9MU9p7sjvxntrEJkm69lQWaSRGrPodEDe010RTGg4NGAyNtn6_T-HVbHCO3Dv2I6feZzGJ5uE-sC-oqbL36jLB5D9h3Gc8yndcvF78FRxDATnL_OjU_T1fT19TEnvMKTchzXVTBTjg6GsYoLVz9TPZoLs2i169sDZ-y1CN9nEOqas2PhtQDMY6_Zbeb2CAud4ecC1",
    challenge: "Sophisticated Cyber Threats",
    solution: "Real-time Anomaly Detection",
    impact: "99.9% Block Rate"
  },
  {
    id: 4,
    title: "Hyper-Personalized AI",
    category: "Travel",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCR4aTbp1qcH_JDidwSq3phITiYRzWtPuqAQeIxNpOn0JA2CZksrAEy-zPb1zbblOhGD8xqR8VLU_dBJEbBnoJGP030cuekjK3zwb0vWUvc6T6dEUibjFLspIWsyoWKetRoqquzh2lIwzy2a-3xLU5MnfNHtEb_FyhQ9wsnwyRweD58OEnl0kElgE_GhjeKd8C95zAvllbmI_JnKGMXgdtxZqR3zmM3i7_MtrcUD7ddYdtcIb0DWydLbz3ewwGMTyhQOvyya2Fy-y5K",
    challenge: "Low Conversion Rates",
    solution: "Contextual Recommendation Engine",
    impact: "40% Conversion Uplift"
  }
];

const CaseStudies: React.FC = () => {
  return (
    <section id="cases" className="w-full py-20 md:py-24 bg-background-dark relative border-t border-white/5">
       <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Proof of Value</h2>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">Engineering Success Stories</h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg">Real-world impact driven by rigorous methodology and data-first architecture.</p>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full overflow-x-auto pb-12 px-6 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-6 w-max mx-auto md:mx-0 md:pl-[max(1.5rem,calc((100vw-80rem)/2))]">
          {cases.map((item) => (
             <div key={item.id} className="group relative flex flex-col w-[320px] md:w-[400px] bg-background-card rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(37,226,244,0.1)]">
                {/* Image Header */}
                <div className="h-48 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${item.image})` }}>
                   <div className="absolute inset-0 bg-gradient-to-t from-background-card to-transparent opacity-90"></div>
                   <div className="absolute bottom-4 left-6">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-primary/20">
                         {item.category}
                      </span>
                   </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-5 h-full">
                   <h3 className="text-xl font-bold text-white">{item.title}</h3>
                   
                   <div className="flex flex-col gap-3 mt-auto">
                      <div className="flex items-start gap-3">
                         <span className="material-symbols-outlined text-red-400 text-sm mt-0.5">error</span>
                         <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Challenge</span>
                            <p className="text-sm text-gray-300">{item.challenge}</p>
                         </div>
                      </div>
                      <div className="w-px h-4 bg-gray-700 ml-1.5 opacity-30"></div>
                      <div className="flex items-start gap-3">
                         <span className="material-symbols-outlined text-emerald-400 text-sm mt-0.5">check_circle</span>
                         <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Solution</span>
                            <p className="text-sm text-gray-300">{item.solution}</p>
                         </div>
                      </div>
                   </div>

                   <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                      <div>
                         <span className="text-xs text-gray-500 font-medium">Impact</span>
                         <p className="text-lg font-bold text-primary">{item.impact}</p>
                      </div>
                      <button className="size-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark hover:border-primary transition-all group-hover:translate-x-1">
                         <span className="material-symbols-outlined text-xl">arrow_forward</span>
                      </button>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;