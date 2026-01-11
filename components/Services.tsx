import React, { useState } from 'react';

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  colorClass: string;
  features: string[];
  image: string;
}

const servicesData: Record<string, ServiceDetail> = {
  strategy: {
    id: 'strategy',
    title: 'AI, Data Strategy & Architecture',
    subtitle: 'Business Aligned Data and AI Foundations',
    description: 'We provide AI and data strategy consulting to help organisations design, govern, and scale enterprise data and AI platforms aligned to strategic objectives and Vision 2030 priorities. Our work defines clear target state architectures, operating models, and governance frameworks that enable secure, compliant, and sovereign data foundations. Through value driven roadmaps and prioritised AI initiatives, we help enterprises move from strategy to execution and deliver measurable business outcomes at scale.',
    icon: 'psychology',
    colorClass: 'text-primary',
    features: [
      'Enterprise Data & AI Maturity Assessment',
      'Cloud Migration Strategy (Azure, AWS, GCP)',
      'Data Governance, Compliance & Sovereignty Frameworks',
      'Value-Driven AI Use Case Discovery & Roadmapping Workshops'
    ],
    image: '/images/services/strategy.jpg'
  },
  engineering: {
    id: 'engineering',
    title: 'Data Engineering & Data Platforms',
    subtitle: 'Scalable, Reliable Enterprise Data Infrastructure',
    description: 'We deliver data engineering and modern data platform solutions that transform raw data into trusted, analytics ready assets for enterprise use. Our engineering approach focuses on scalable architectures, automated data pipelines, and real time and batch processing to support analytics, AI, and operational reporting. The result is a resilient, cost efficient data platform that accelerates insight generation and supports enterprise decision making at scale.',
    icon: 'dns',
    colorClass: 'text-emerald-400',
    features: [
      'Modern Data Platform Design & Implementation',
      'Automated Batch & Real-Time Data Pipelines',
      'Cloud-Native Data Orchestration & Integration',
      'Built-in Data Quality, Observability & Reliability Controls'
    ],
    image: '/images/services/data-platform.png'
  },
  agentic: {
    id: 'agentic',
    title: 'Agentic AI, Machine Learning and Intelligent Automation',
    subtitle: 'Enterprise AI Solutions for Automation and Productivity',
    description: 'We design and deploy enterprise AI solutions that combine machine learning, agentic AI, and intelligent automation to solve real business problems. Our production grade AI systems enable process automation, productivity gains, and data driven decision support while integrating seamlessly with existing enterprise platforms. Supported by robust MLOps and AI operations, our solutions operate reliably, securely, and at scale in live production environments.',
    icon: 'smart_toy',
    colorClass: 'text-purple-400',
    features: [
      'Production-Ready AI & LLM Solutions',
      'Multi-Agent Systems Deployment',
      'RAG (Retrieval Augmented Generation) Systems',
      'End-to-End MLOps & AI Operations'
    ],
    image: '/images/services/agentic-ai.png'
  },
  decision: {
    id: 'decision',
    title: 'Decision Intelligence & Data Visualization',
    subtitle: 'Actionable Insights for Confident Decision Making',
    description: 'We deliver decision intelligence and business intelligence solutions that convert data into actionable insights for leaders and operational teams. Our approach combines advanced analytics, KPI design, and data visualization to support faster, more informed decision making. Through automated insights, governed self service dashboards, and analytics embedded into business workflows, we enable organisations to act with clarity, speed, and confidence.',
    icon: 'insights',
    colorClass: 'text-blue-400',
    features: [
      'Predictive Analytics Dashboards',
      'Causal Inference Models',
      'Scenario Planning & Simulation',
      'KPI Engineering & Visualization'
    ],
    image: '/images/services/data-visu.png'
  }
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

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
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">

          {/* Card 1: AI Strategy (Large) */}
          <div
            onClick={() => setSelectedService(servicesData.strategy)}
            className="md:col-span-2 glass-card rounded-2xl p-8 relative group overflow-hidden hover:border-primary/50 transition-colors duration-500 flex flex-col justify-between spotlight-card cursor-pointer"
          >
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
              <span className="text-sm font-bold text-white/50 group-hover:text-white flex items-center gap-2 transition-colors">
                Learn more <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 2: Data Engineering */}
          <div
            onClick={() => setSelectedService(servicesData.engineering)}
            className="glass-card rounded-2xl p-8 relative group overflow-hidden hover:border-emerald-500/50 transition-colors duration-500 flex flex-col justify-between spotlight-card cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="size-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined">dns</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Data Engineering & Data Platforms</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Building the backbone of modern enterprise. High-performance pipelines and data lakes.</p>
            </div>
            <div className="mt-8 relative z-10">
              <span className="text-sm font-bold text-white/50 group-hover:text-emerald-400 flex items-center gap-2 transition-colors">
                Learn more <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 3: Agentic AI */}
          <div
            onClick={() => setSelectedService(servicesData.agentic)}
            className="glass-card rounded-2xl p-8 relative group overflow-hidden hover:border-purple-500/50 transition-colors duration-500 flex flex-col justify-between spotlight-card cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="size-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Agentic AI, Machine Learning & Intelligent Automation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Autonomous systems that work for you. Deploying intelligent agents that learn and adapt.</p>
            </div>
            <div className="mt-8 relative z-10">
              <span className="text-sm font-bold text-white/50 group-hover:text-purple-400 flex items-center gap-2 transition-colors">
                Learn more <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 4: Decision Intelligence (Wide with Background) */}
          <div
            onClick={() => setSelectedService(servicesData.decision)}
            className="md:col-span-2 glass-card rounded-2xl p-8 relative group overflow-hidden hover:border-primary/50 transition-colors duration-500 flex flex-col justify-between spotlight-card cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Tl1uIqS5CwuXYlnWjw0WPFPDSNfKTA-J4r73VGXWyo8xDueYdhyKSwNNt6bQBX6COd9208ukH6ClvNiTpR3P_wEebNzyumOMQJFS0DLb1Kyod6e8iHF0k8MKhwezHqJYnZiLBlJE4YUrnbxcGm3L05QKuO_NfEWW8Mv4G0GjX3-CeOsI4eQNfAES8esZ3QfySoSXQuoy9iTkviAS17yd3DUeEazL6TwSQSYqWZuLfOtIGIetCTRDMUKet33RYhQLX26catQseo4t" alt="Background" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="max-w-md">
                <div className="size-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">insights</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Decision Intelligence & Data Visualization
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  Turning raw data into strategic foresight. We bridge the gap between data science and business decisions through advanced analytics.
                </p>
              </div>

              <div className="flex justify-start">
                <span className="text-sm font-bold text-white/50 group-hover:text-white flex items-center gap-2 transition-colors">
                  Learn more <span className="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedService(null)}
          ></div>
          <div className="relative w-full max-w-4xl bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
            {/* Modal Sidebar / Image */}
            <div className="w-full md:w-1/3 bg-surface-dark relative hidden md:block">
              <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-card"></div>
              <div className="absolute bottom-8 left-8">
                <div className={`size-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${selectedService.colorClass} mb-4 backdrop-blur-md`}>
                  <span className="material-symbols-outlined text-4xl">{selectedService.icon}</span>
                </div>
                <h3 className="text-white text-xl font-bold leading-tight">{selectedService.title}</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-8 md:p-10 overflow-y-auto">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              <div className="md:hidden mb-6 flex items-center gap-4">
                <div className={`size-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${selectedService.colorClass}`}>
                  <span className="material-symbols-outlined text-2xl">{selectedService.icon}</span>
                </div>
                <h3 className="text-white text-xl font-bold">{selectedService.title}</h3>
              </div>

              <h4 className={`text-sm font-bold uppercase tracking-widest mb-4 ${selectedService.colorClass}`}>
                {selectedService.subtitle}
              </h4>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 border-b border-white/10 pb-8">
                {selectedService.description}
              </p>

              <h5 className="text-white font-bold mb-4">Key Capabilities</h5>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedService.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-lg mt-0.5 ${selectedService.colorClass}`}>check_circle</span>
                    <span className="text-gray-400 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-white/10 flex gap-4">
                <button className={`flex-1 bg-white text-background-dark font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors`}>
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;