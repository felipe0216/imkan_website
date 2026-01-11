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

const servicesData: ServiceDetail[] = [
  {
    id: 'strategy',
    title: 'Define Your Data Vision & Foundations',
    subtitle: 'Strategy & Architecture',
    description: 'We establish the strategic blueprint for your data and AI transformation. From maturity assessments and target-state architectures to governance frameworks and cloud infrastructure planning, we define clear technical foundations aligned to Vision 2030 priorities. Our work sets the stage for secure, compliant, and sovereign data platforms that scale with your ambitions.',
    icon: 'architecture',
    colorClass: 'text-primary',
    features: [
      'Enterprise Data & AI Maturity Assessment',
      'Cloud Migration Strategy (Azure, AWS, GCP)',
      'Data Governance, Compliance & Sovereignty Frameworks',
      'Value-Driven AI Use Case Discovery & Roadmapping Workshops'
    ],
    image: '/images/services/strategy.jpg'
  },
  {
    id: 'engineering',
    title: 'Transform & Organize Your Data',
    subtitle: 'Engineering & Data Preparation',
    description: 'We build robust data engineering pipelines that transform raw, scattered data into clean, structured, and analytics-ready assets. Through automated ETL/ELT processes, data quality frameworks, and intelligent orchestration, we ensure your data is reliable, accessible, and trustworthy—ready to power AI models and business insights at enterprise scale.',
    icon: 'tune',
    colorClass: 'text-emerald-400',
    features: [
      'Modern Data Platform Design & Implementation',
      'Automated Batch & Real-Time Data Pipelines',
      'Cloud-Native Data Orchestration & Integration',
      'Built-in Data Quality, Observability & Reliability Controls'
    ],
    image: '/images/services/data-platform.png'
  },
  {
    id: 'agentic',
    title: 'Deploy Intelligent Solutions',
    subtitle: 'AI & Automation',
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
  {
    id: 'decision',
    title: 'Monitor & Optimize',
    subtitle: 'Insights & Action',
    description: 'We deliver decision intelligence and business intelligence solutions that convert data into actionable insights for leaders and operational teams. Our approach combines advanced analytics, KPI design, and data visualization to support faster, more informed decision making. Through automated insights, governed self service dashboards, and analytics embedded into business workflows, we enable organisations to act with clarity, speed, and confidence.',
    icon: 'monitoring',
    colorClass: 'text-blue-400',
    features: [
      'Predictive Analytics Dashboards',
      'Causal Inference Models',
      'Scenario Planning & Simulation',
      'KPI Engineering & Visualization'
    ],
    image: '/images/services/data-visu.png'
  }
];

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
    <section id="services" className="relative py-24 bg-background-dark overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-4">
            <span className="material-symbols-outlined text-sm">route</span>
            Our Approach
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Your Data & AI Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From strategy to production. A proven pathway to transform your organization with AI and intelligent data systems.
          </p>
        </div>

        {/* Journey Timeline - Desktop Horizontal */}
        <div className="hidden lg:block relative">
          {/* Progress Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-emerald-400 via-purple-400 to-blue-400 opacity-20"></div>
          <div className="absolute top-24 left-0 h-0.5 bg-gradient-to-r from-primary via-emerald-400 via-purple-400 to-blue-400 animate-beam" style={{ width: '100%' }}></div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-4 gap-8">
            {servicesData.map((service, index) => (
              <div key={service.id} className="relative pt-6 pb-2">
                {/* Connecting Dot */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className={`size-4 rounded-full ${service.colorClass} bg-background-dark border-4 border-current shadow-[0_0_20px_currentColor] animate-pulse-slow`} style={{ animationDelay: `${index * 200}ms` }}></div>
                </div>

                {/* Card */}
                <div
                  onClick={() => setSelectedService(service)}
                  className="spotlight-card group relative glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500 cursor-pointer border border-white/10 hover:border-current min-h-[460px] flex flex-col"
                  style={{ '--tw-border-opacity': 0.3 } as React.CSSProperties}
                >
                  {/* Spotlight Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none z-0">
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
                          index === 0 ? 'rgba(37, 226, 244, 0.15)' :
                          index === 1 ? 'rgba(52, 211, 153, 0.15)' :
                          index === 2 ? 'rgba(192, 132, 252, 0.15)' :
                          'rgba(96, 165, 250, 0.15)'
                        }, transparent 40%)`
                      }}
                    ></div>
                  </div>

                  {/* Stage Number - Inside card at top-right */}
                  <div className={`absolute top-4 right-4 size-10 rounded-lg ${service.colorClass} bg-background-dark/95 backdrop-blur-sm border-2 border-current flex items-center justify-center font-bold text-base shadow-lg z-20`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden z-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      index === 0 ? 'from-primary/10 to-transparent' :
                      index === 1 ? 'from-emerald-500/10 to-transparent' :
                      index === 2 ? 'from-purple-500/10 to-transparent' :
                      'from-blue-500/10 to-transparent'
                    }`}></div>
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Icon */}
                    <div className={`size-14 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center ${service.colorClass} mb-4 group-hover:scale-110 group-hover:border-current transition-all duration-300 flex-shrink-0`}>
                      <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                    </div>

                    {/* Subtitle Tag */}
                    <div className={`text-[10px] font-bold uppercase tracking-wider ${service.colorClass} mb-2 opacity-70`}>
                      {service.subtitle}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-current transition-colors leading-tight min-h-[3.5rem] flex items-start">
                      {service.title}
                    </h3>

                    {/* Description Preview */}
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-5">
                      {service.description.substring(0, 180)}...
                    </p>

                    {/* Learn More */}
                    <div className="flex items-center gap-2 text-xs font-bold text-white/50 group-hover:text-current transition-colors mt-auto pt-2">
                      <span>Learn more</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline - Mobile/Tablet Vertical */}
        <div className="lg:hidden relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-emerald-400 via-purple-400 to-blue-400 opacity-20"></div>

          <div className="space-y-8">
            {servicesData.map((service, index) => (
              <div key={service.id} className="relative pl-6 mb-8">
                {/* Connecting Dot */}
                <div className="absolute -left-2 top-8 z-10">
                  <div className={`size-4 rounded-full ${service.colorClass} bg-background-dark border-4 border-current shadow-[0_0_20px_currentColor]`}></div>
                </div>

                {/* Card */}
                <div
                  onClick={() => setSelectedService(service)}
                  className="glass-card rounded-2xl p-6 cursor-pointer border border-white/10 hover:border-current transition-all duration-300 relative"
                >
                  {/* Stage Number - Inside card at top-right */}
                  <div className={`absolute top-4 right-4 size-10 rounded-lg ${service.colorClass} bg-background-dark/95 backdrop-blur-sm border-2 border-current flex items-center justify-center font-bold text-base shadow-lg z-10`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className={`size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${service.colorClass} flex-shrink-0`}>
                      <span className="material-symbols-outlined text-xl">{service.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${service.colorClass} mb-2 opacity-70`}>
                        {service.subtitle}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.description.substring(0, 120)}...
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold text-white/50">
                    <span>Learn more</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal - Same as before */}
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
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
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