import React from 'react';

const cases = [
  {
    id: 1,
    title: "Real-Time Log Anomaly Detection",
    category: "Banking",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-78fnI0oHE_voePsvgEjlZ7NjOg6Oy-yqfw0NajqadDA0o0tL-tHvcIjW5CxzrY8oODajNM_UEeeEQwuPNXxFNd87gzOb-olQhxmaNrI3e4JrOIl3bhQ_cw6EBCQ6K8NheHPzsfuOnBftaazFaE_jmcn9T7-xtDzufCrhO0Ehsl2xoY3enrePnu5fVgoHPURlxI1EnOnnbjieJ9WYO-qJEva5OSf-UiCCqLsZyQ2yVySpt-QYzFf3VqqhidM40EF7tUCNRZ6arRy9",
    challenge: "Slow incident detection in legacy systems",
    solution: "Custom AI Anomaly Detection Pipeline",
    impact: "Detection < 10 seconds"
  },
  {
    id: 2,
    title: "Dynamic Logistics Optimisation",
    category: "Logistics",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiAUtwmNOCf9uLL9fqXqYI7FbLmJqGx_CMleCMDQkeHcn4hhrM4njqZTENVpkSvkv1-g9QqJhnNBKeCLeh3dazOcobHPwbEy1eBBxvLKQ82p1fDeEU3uYH7Q5Y6XGV-IvmeKF_bxibeQqPehAvsY_KeRVl5pWmzjN_-OB-0OdqJ43eYgeVgPdQYcbMnkiqwCNde-A02Y-TrjELJ3tC0idyQjFhlBkCcLKh05WCeKV2zGV4eqzCUwy1oywq5RQdI5ShDDrPTPSTQeDR",
    challenge: "Rising fuel costs & inefficient routes",
    solution: "ML-based Route Planning",
    impact: "Costs reduced by 32%"
  },
  {
    id: 3,
    title: "Financial Risk & CLV Modelling",
    category: "FinTech",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWrwowXE15IR0b_WQEq4wU0dKsmFXL_v4t6phFOrv85KrsH20y18FQNOJ6INQRhHMKgEZKYNf9MU9p7sjvxntrEJkm69lQWaSRGrPodEDe010RTGg4NGAyNtn6_T-HVbHCO3Dv2I6feZzGJ5uE-sC-oqbL36jLB5D9h3Gc8yndcvF78FRxDATnL_OjU_T1fT19TEnvMKTchzXVTBTjg6GsYoLVz9TPZoLs2i169sDZ-y1CN9nEOqas2PhtQDMY6_Zbeb2CAud4ecC1",
    challenge: "Unpredictable loan defaults",
    solution: "Predictive Risk Modeling Engine",
    impact: "Improved Underwriting"
  },
  {
    id: 4,
    title: "Express Booking Data Warehouse",
    category: "Travel",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCR4aTbp1qcH_JDidwSq3phITiYRzWtPuqAQeIxNpOn0JA2CZksrAEy-zPb1zbblOhGD8xqR8VLU_dBJEbBnoJGP030cuekjK3zwb0vWUvc6T6dEUibjFLspIWsyoWKetRoqquzh2lIwzy2a-3xLU5MnfNHtEb_FyhQ9wsnwyRweD58OEnl0kElgE_GhjeKd8C95zAvllbmI_JnKGMXgdtxZqR3zmM3i7_MtrcUD7ddYdtcIb0DWydLbz3ewwGMTyhQOvyya2Fy-y5K",
    challenge: "Data silos preventing insights",
    solution: "Unified Data Warehouse on Cloud",
    impact: "Analytics Availability +65%"
  }
];

const CaseStudies: React.FC = () => {
  return (
    <section id="cases" className="w-full py-24 bg-background-dark relative border-t border-white/5 overflow-hidden">
       {/* Section Header */}
       <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Success Stories</h2>
          <h1 className="text-white text-3xl md:text-5xl font-light">Impact Delivered</h1>
        </div>
        
        <div className="hidden md:flex gap-2">
            <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined">arrow_forward</span>
            </button>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full overflow-x-auto pb-12 px-6 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-6 w-max mx-auto md:mx-0 md:pl-[max(1.5rem,calc((100vw-80rem)/2))]">
          {cases.map((item) => (
             <div key={item.id} className="group relative flex flex-col w-[350px] bg-background-card rounded-sm overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300">
                {/* Image Header */}
                <div className="h-48 w-full bg-cover bg-center relative grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: `url(${item.image})` }}>
                   <div className="absolute inset-0 bg-background-dark/50"></div>
                   <div className="absolute top-4 left-4">
                      <span className="bg-black/50 backdrop-blur text-white px-3 py-1 text-[10px] font-bold border border-white/10 uppercase tracking-wider">
                         {item.category}
                      </span>
                   </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-full bg-[#021418]">
                   <h3 className="text-xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{item.title}</h3>
                   
                   <div className="space-y-4 mb-8">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Challenge</p>
                        <p className="text-sm text-gray-300">{item.challenge}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Impact</p>
                        <p className="text-sm text-white font-bold">{item.impact}</p>
                      </div>
                   </div>

                   <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">Read Case Study</span>
                      <span className="material-symbols-outlined text-white text-lg group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
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