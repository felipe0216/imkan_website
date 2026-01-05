import React from 'react';

const Services: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName('spotlight-card');
    for (const card of cards) {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section id="services" className="relative py-24 bg-background-dark" onMouseMove={handleMouseMove}>
      <div className="container max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">What We Do</h2>
            <p className="text-gray-400 max-w-lg text-lg">We architect the intelligence layer for modern enterprises, turning raw potential into engineered reality.</p>
          </div>
          <div className="h-px bg-white/10 flex-1 ml-10 mb-4 hidden md:block"></div>
          <button className="text-primary font-bold hover:text-white transition-colors inline-flex items-center gap-1 group">
            View All Services 
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* Card 1: AI Strategy (Large) */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 relative group overflow-hidden hover:border-primary/50 transition-colors duration-500 flex flex-col justify-between spotlight-card">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
              <span className="material-symbols-outlined !text-[140px] text-primary rotate-12 transform origin-top-right">architecture</span>
            </div>
            <div className="relative z-10">
              <div className="size-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(37,226,244,0.1)]">
                <span className="material-symbols-outlined text-2xl">psychology</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">AI, Data Strategy & Architecture</h3>
              <p className="text-gray-400 leading-relaxed max-w-md">Designing the blueprint for intelligence. We align technical capabilities with Vision 2030 goals, ensuring your data foundation is robust, scalable, and future-proof.</p>
            </div>
            <div className="mt-8 relative z-10">
              <span className="text-sm font-bold text-white/50 group-hover:text-white flex items-center gap-2 transition-colors cursor-pointer">
                Learn more <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 2: Data Engineering */}
          <div className="glass-card rounded-2xl p-8 relative group overflow-hidden hover:border-emerald-500/50 transition-colors duration-500 flex flex-col justify-between spotlight-card">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="size-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined">dns</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Data Engineering & Platforms</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Building the backbone of modern enterprise. High-performance pipelines and data lakes.</p>
            </div>
            <div className="mt-8 relative z-10">
              <span className="text-sm font-bold text-white/50 group-hover:text-emerald-400 flex items-center gap-2 transition-colors cursor-pointer">
                Details <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 3: Agentic AI */}
          <div className="glass-card rounded-2xl p-8 relative group overflow-hidden hover:border-purple-500/50 transition-colors duration-500 flex flex-col justify-between spotlight-card">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="size-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Agentic AI & Automation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Autonomous systems that work for you. Deploying intelligent agents that learn and adapt.</p>
            </div>
            <div className="mt-8 relative z-10">
              <span className="text-sm font-bold text-white/50 group-hover:text-purple-400 flex items-center gap-2 transition-colors cursor-pointer">
                Explore Agents <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 4: Decision Intelligence (Wide with Background) */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 relative group overflow-hidden hover:border-primary/50 transition-colors duration-500 flex flex-col justify-between spotlight-card">
            <div className="absolute inset-0 z-0">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Tl1uIqS5CwuXYlnWjw0WPFPDSNfKTA-J4r73VGXWyo8xDueYdhyKSwNNt6bQBX6COd9208ukH6ClvNiTpR3P_wEebNzyumOMQJFS0DLb1Kyod6e8iHF0k8MKhwezHqJYnZiLBlJE4YUrnbxcGm3L05QKuO_NfEWW8Mv4G0GjX3-CeOsI4eQNfAES8esZ3QfySoSXQuoy9iTkviAS17yd3DUeEazL6TwSQSYqWZuLfOtIGIetCTRDMUKet33RYhQLX26catQseo4t" alt="Background" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 h-full">
              <div className="max-w-md">
                <div className="size-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">insights</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Decision Intelligence</h3>
                <p className="text-gray-300 leading-relaxed">Turning raw data into strategic foresight. We bridge the gap between data science and business decisions through advanced analytics.</p>
              </div>
              <div className="flex-shrink-0">
                 <button className="bg-primary hover:bg-white text-background-dark font-bold py-3 px-6 rounded-lg transition-all shadow-[0_0_10px_rgba(37,226,244,0.2)] hover:shadow-[0_0_20px_rgba(37,226,244,0.5)]">
                    See Solutions
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;