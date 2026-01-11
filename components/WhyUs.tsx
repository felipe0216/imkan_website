import React, { useState } from 'react';

interface Differentiator {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  colorClass: string;
  accentColor: string;
  features: string[];
  stats?: { label: string; value: string; color: string }[];
  visual?: 'team' | 'velocity' | 'health' | 'workflow' | 'metrics' | 'library';
}

const differentiators: Differentiator[] = [
  {
    id: 1,
    title: 'Founder-Led, Hands-On',
    subtitle: 'Direct Access to Technical Leadership',
    description: 'You work directly with Dr. Syed and Felipe from day one. No account managers playing telephone. No junior-only teams. No delegation to inexperienced consultants. Just senior engineers who have built and scaled production systems.',
    icon: 'group',
    colorClass: 'text-primary',
    accentColor: '#25e2f4',
    features: [
      'Direct access to Technical C-Suite throughout engagement',
      'Accountability from concept to production delivery',
      '15+ years combined expertise on every project',
      'Hands-on code reviews and architecture decisions'
    ],
    visual: 'team',
  },
  {
    id: 2,
    title: 'Weeks, Not Quarters',
    subtitle: 'Rapid Deployment Without Compromise',
    description: 'Ship production MVPs in weeks, not months. Our battle-tested accelerators, reusable patterns, and proven frameworks eliminate the need to reinvent the wheel on every project.',
    icon: 'speed',
    colorClass: 'text-accent-green',
    accentColor: '#a3e635',
    features: [
      'MVPs deployed in 2-4 weeks vs industry standard 12-16 weeks',
      'Reusable component library across data, AI, and analytics',
      'Pre-built integrations for Saudi platforms (Nafath, Etimad)',
      'Agile sprints with weekly deployments'
    ],
    visual: 'velocity',
    stats: [
      { label: 'Traditional Firms', value: '12-16 weeks', color: 'text-gray-600' },
      { label: 'Imkan.ai', value: '2-4 weeks', color: 'text-accent-green' },
    ],
  },
  {
    id: 3,
    title: 'Production-Grade DNA',
    subtitle: 'Built for Scale from Day One',
    description: 'We don\'t ship proof-of-concepts. Every system is architected for reliability, scalability, and security from the first line of code. Production-ready infrastructure, not prototypes.',
    icon: 'engineering',
    colorClass: 'text-blue-400',
    accentColor: '#60a5fa',
    features: [
      'Automated testing & CI/CD pipelines built-in',
      'Observability and monitoring from day one',
      'Security & compliance by design (PDPL, NCA)',
      'DataOps, MLOps, and DevOps best practices'
    ],
    visual: 'health',
  },
  {
    id: 4,
    title: 'Agentic AI Pioneers',
    subtitle: 'Autonomous Intelligence at Scale',
    description: 'Beyond dashboards and basic automation. We build autonomous AI agents that execute complex, multi-step workflows without human intervention. From reasoning to action execution.',
    icon: 'smart_toy',
    colorClass: 'text-purple-400',
    accentColor: '#c084fc',
    features: [
      'Multi-agent orchestration for complex workflows',
      'RAG systems with enterprise knowledge bases',
      'Voice AI agents supporting 24/7 multilingual operations',
      'End-to-end MLOps for continuous model improvement'
    ],
    visual: 'workflow',
  },
  {
    id: 5,
    title: 'Saudi-First by Design',
    subtitle: 'Sovereign AI Aligned with Vision 2030',
    description: 'Homegrown expertise deeply aligned with the Kingdom\'s transformation. We understand data sovereignty, local compliance frameworks, and the nuance of the Saudi market better than any offshore consultancy.',
    icon: 'flag',
    colorClass: 'text-orange-400',
    accentColor: '#fb923c',
    features: [
      'In-kingdom data residency and sovereignty',
      'Native integrations: Nafath, Etimad, Absher, Qiwa',
      'Arabic-first AI with Gulf dialect support',
      'PDPL, NCA, and CITC compliance ready'
    ],
  },
  {
    id: 6,
    title: 'Outcomes, Not Outputs',
    subtitle: 'Measured by Business Impact',
    description: 'Every engagement is measured by business results, not lines of code or hours billed. Clear KPIs aligned to your strategic objectives from day one.',
    icon: 'trending_up',
    colorClass: 'text-primary',
    accentColor: '#25e2f4',
    features: [
      'KPI frameworks aligned to business outcomes',
      'ROI tracking and reporting throughout engagement',
      'Success metrics defined before code is written',
      'Continuous optimization based on real-world performance'
    ],
    visual: 'metrics',
    stats: [
      { label: 'Detection Time Reduction', value: '8,640x', color: 'text-primary' },
      { label: 'Conversion Rate Improvement', value: '5x', color: 'text-accent-green' },
      { label: 'Forecast Accuracy', value: '87%', color: 'text-purple-400' },
    ],
  },
  {
    id: 7,
    title: 'Battle-Tested Accelerators',
    subtitle: 'Start 60% Ahead',
    description: 'Proven components, frameworks, and patterns refined across 15+ production deployments. No greenfield development—leverage what already works.',
    icon: 'inventory_2',
    colorClass: 'text-emerald-400',
    accentColor: '#34d399',
    features: [
      '12+ production-ready data pipeline templates',
      '8+ AI agent frameworks and orchestration patterns',
      '15+ dashboard and visualization accelerators',
      '20+ pre-built integrations for enterprise systems'
    ],
    visual: 'library',
  },
];

const WhyUs: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const handleNext = () => {
    if (currentIndex < differentiators.length - 1) {
      setDirection('next');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentCard = differentiators[currentIndex];
  const progress = ((currentIndex + 1) / differentiators.length) * 100;

  return (
    <section className="w-full bg-[#0B1215] border-t border-white/5 relative overflow-hidden py-24">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,226,244,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,226,244,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
              {currentIndex + 1} / {differentiators.length}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {currentCard.title}
            </span>
          </div>
        </div>

        {/* Card Deck Carousel with Fan Effect */}
        <div className="relative w-full" style={{ minHeight: '650px', paddingBottom: '80px' }}>
          {/* All Cards - Stacked Fan Effect */}
          <div className="absolute left-0 right-0 top-0 flex items-start justify-center pt-8">
            {differentiators.map((card, index) => {
              const isActive = index === currentIndex;
              const isPast = index < currentIndex;
              const isFuture = index > currentIndex;
              
              // Fan effect calculations - More dramatic for visibility
              const positionFromActive = index - currentIndex;
              
              // More visible rotation and offsets
              const rotation = isFuture ? positionFromActive * 6 : isPast ? -10 : 0; // 6 degrees per card, -10 for past
              const xOffset = isFuture ? positionFromActive * 50 : isPast ? -100 : 0; // 50px right per card
              const yOffset = isFuture ? -positionFromActive * 20 : isPast ? -50 : 0; // 20px up per card
              const scale = isActive ? 1 : isFuture ? 0.96 - (positionFromActive * 0.02) : 0.85;
              const opacity = isPast ? 0 : isFuture ? Math.max(0.5, 1 - (positionFromActive * 0.12)) : 1;
              const zIndex = isPast ? 0 : isFuture ? differentiators.length - index + 10 : 100;
              
              return (
                <div
                  key={card.id}
                  className="absolute w-full max-w-4xl"
                  style={{
                    transform: `
                      translate(${xOffset}px, ${yOffset}px) 
                      rotate(${rotation}deg) 
                      scale(${scale})
                    `,
                    transformOrigin: 'center center',
                    zIndex: zIndex,
                    opacity: opacity,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', // Smooth bounce-back effect
                  }}
                >
                  <div className={`glass-card rounded-3xl p-6 md:p-10 border ${isActive ? 'border-white/20 shadow-2xl' : 'border-white/10'} bg-surface-dark relative overflow-hidden min-h-[500px]`}>
                    {/* Accent Gradient Overlay */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-5' : 'opacity-0'}`}
                      style={{
                        background: `radial-gradient(circle at top right, ${card.accentColor}, transparent 70%)`
                      }}
                    ></div>

                    {/* Content - Only render full content for active and nearby cards for performance */}
                    {(isActive || Math.abs(positionFromActive) <= 2) && (
                      <div className="relative z-10">
                        {/* Header - Always visible for stacked cards */}
                        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div 
                              className="size-14 md:size-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg flex-shrink-0"
                              style={{ boxShadow: isActive ? `0 0 30px ${card.accentColor}20` : 'none' }}
                            >
                              <span className={`material-symbols-outlined text-2xl md:text-3xl ${card.colorClass}`}>
                                {card.icon}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-xl md:text-3xl font-bold text-white mb-1">
                                {card.title}
                              </h3>
                              <p className={`text-xs md:text-sm font-medium ${card.colorClass}`}>
                                {card.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          {/* Card Number Badge */}
                          <div className="size-10 md:size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-base md:text-lg font-bold">{card.id}</span>
                          </div>
                        </div>

                        {/* Only show full content for active card */}
                        {isActive && (
                          <>
                            {/* Description */}
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                              {card.description}
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-6">
                              {card.features.map((feature, idx) => (
                                <div 
                                  key={idx} 
                                  className="flex items-start gap-2 p-2 md:p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group"
                                >
                                  <span className={`material-symbols-outlined text-sm mt-0.5 ${card.colorClass} group-hover:scale-110 transition-transform flex-shrink-0`}>
                                    check_circle
                                  </span>
                                  <span className="text-gray-400 text-xs md:text-sm leading-relaxed flex-1">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Visual Elements / Stats */}
                            {card.stats && (
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                                {card.stats.map((stat, idx) => (
                                  <div 
                                    key={idx}
                                    className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-all"
                                  >
                                    <div className="text-[10px] md:text-xs text-gray-500 mb-1">{stat.label}</div>
                                    <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>
                                      {stat.value}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Additional Visuals Based on Card Type */}
                            {card.visual === 'velocity' && (
                              <div className="flex gap-1 items-end h-16 w-full mt-4 opacity-50 hover:opacity-100 transition-opacity">
                                {[40, 70, 50, 90, 60, 85, 45, 95, 65, 80, 55, 75].map((height, i) => (
                                  <div key={i} className="flex-1 bg-accent-green/20 rounded-t-sm relative overflow-hidden">
                                    <div 
                                      className="absolute bottom-0 left-0 right-0 bg-accent-green transition-all duration-500" 
                                      style={{ height: `${height}%`, transitionDelay: `${i * 50}ms` }}
                                    ></div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {card.visual === 'health' && (
                              <div className="p-4 bg-black/40 rounded-xl border border-white/5 mt-4">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">System Health Monitor</span>
                                  <span className="text-[10px] text-green-400 font-bold">99.97% Uptime</span>
                                </div>
                                <div className="space-y-2">
                                  {[
                                    { name: 'API Gateway', uptime: 100 },
                                    { name: 'Database Cluster', uptime: 100 },
                                    { name: 'ML Inference', uptime: 98 },
                                    { name: 'Data Pipeline', uptime: 100 },
                                  ].map((service, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                      <span className="text-[10px] text-gray-400 w-28">{service.name}</span>
                                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                        <div 
                                          className="h-full bg-green-500 rounded-full transition-all duration-1000"
                                          style={{ width: `${service.uptime}%`, transitionDelay: `${idx * 100}ms` }}
                                        ></div>
                                      </div>
                                      <span className="text-[10px] text-green-400 font-bold w-10 text-right">{service.uptime}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {card.visual === 'workflow' && (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                {[
                                  { icon: 'psychology', label: 'Reasoning', desc: 'Context understanding', color: 'purple' },
                                  { icon: 'search', label: 'Retrieval', desc: 'Knowledge access', color: 'blue' },
                                  { icon: 'integration_instructions', label: 'Execution', desc: 'Action deployment', color: 'emerald' },
                                ].map((step, idx) => (
                                  <div 
                                    key={idx}
                                    className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                                  >
                                    <span className={`material-symbols-outlined text-${step.color}-400 text-xl mb-1 block group-hover:scale-110 transition-transform`}>
                                      {step.icon}
                                    </span>
                                    <div className={`text-${step.color}-400 text-xs font-bold mb-0.5`}>{step.label}</div>
                                    <div className="text-gray-500 text-[10px]">{step.desc}</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {card.visual === 'library' && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                                {[
                                  { icon: 'database', label: 'Data Pipelines', count: '12+' },
                                  { icon: 'smart_toy', label: 'AI Agents', count: '8+' },
                                  { icon: 'dashboard', label: 'Dashboards', count: '15+' },
                                  { icon: 'integration_instructions', label: 'Integrations', count: '20+' },
                                ].map((item, i) => (
                                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group text-center">
                                    <span className="material-symbols-outlined text-emerald-400 text-2xl mb-1 block group-hover:scale-110 transition-transform">
                                      {item.icon}
                                    </span>
                                    <div className="text-white text-xs font-semibold mb-0.5">{item.label}</div>
                                    <div className="text-gray-500 text-[10px]">{item.count} templates</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-12 gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`group flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
              currentIndex === 0
                ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 border border-white/10 hover:border-primary/40 text-white hover:bg-white/15'
            }`}
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="hidden md:inline">Previous</span>
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {differentiators.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(idx);
                }}
                className="group relative"
              >
                <div 
                  className={`size-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-primary scale-125 shadow-[0_0_10px_rgba(37,226,244,0.5)]' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                ></div>
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex === differentiators.length - 1}
            className={`group flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden ${
              currentIndex === differentiators.length - 1
                ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-primary hover:bg-white text-background-dark hover:shadow-[0_0_20px_rgba(37,226,244,0.5)]'
            }`}
          >
            <span className="relative z-10 hidden md:inline">
              {currentIndex === differentiators.length - 1 ? 'Complete' : 'Next'}
            </span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform relative z-10">
              {currentIndex === differentiators.length - 1 ? 'check' : 'arrow_forward'}
            </span>
            {currentIndex !== differentiators.length - 1 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
