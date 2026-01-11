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
    subtitle: 'Direct Technical Leadership on Every Project',
    description: 'Every project is directly led and overseen by Dr. Syed and Felipe from day one, ensuring full strategic control, technical excellence, and accountability. No junior-only teams. No delegation to inexperienced consultants. You work with a curated team of mid and senior-level engineers under direct founder supervision.',
    icon: 'group',
    colorClass: 'text-primary',
    accentColor: '#25e2f4',
    features: [
      'Founders actively leading architecture and delivery decisions',
      'Curated mid-senior engineering team under direct oversight',
      'Accountability from strategy through production deployment',
      'Hands-on code reviews, sprint planning, and technical governance'
    ],
    visual: 'team',
  },
  {
    id: 2,
    title: 'Weeks, Not Quarters',
    subtitle: 'Rapid Deployment Without Compromise',
    description: 'Ship production MVPs in weeks, not months. Our proven accelerators, reusable patterns, and production-ready frameworks eliminate the need to reinvent the wheel on every project.',
    icon: 'speed',
    colorClass: 'text-accent-green',
    accentColor: '#a3e635',
    features: [
      'MVPs deployed in 3-6 weeks vs industry standard 12-16 weeks',
      'Reusable component library across data, AI, and analytics',
      'Pre-built integrations for Saudi platforms (Nafath, Etimad)',
      'Agile sprints with weekly deployments'
    ],
    visual: 'velocity',
    stats: [
      { label: 'Traditional Firms', value: '12-16 weeks', color: 'text-gray-600' },
      { label: 'Imkan.ai', value: '3-6 weeks', color: 'text-accent-green' },
    ],
  },
  {
    id: 3,
    title: 'Production-Grade DNA',
    subtitle: 'Built for Scale from Day One',
    description: 'Every system is architected for reliability, scalability, and security from the first line of code. No MVPs that break in production. No prototypes that need rebuilding. Production-ready infrastructure from day one.',
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
    title: 'Production-Ready Accelerators',
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
    <section id="why-us" className="w-full bg-[#0B1215] border-t border-white/5 relative overflow-hidden py-24" onMouseMove={handleMouseMove}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,226,244,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,226,244,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Higher z-index to stay above cards but below navbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-30">
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

        {/* Card Deck Carousel with Subtle Stack & Side Navigation */}
        <div className="relative w-full px-4 md:px-16" style={{ minHeight: '480px' }}>
          
          {/* Previous Button - Left Side */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-[25] group size-12 md:size-14 rounded-full transition-all duration-300 flex items-center justify-center ${
              currentIndex === 0
                ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-surface-dark/80 backdrop-blur-xl border border-white/20 text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(37,226,244,0.5)] hover:scale-110'
            }`}
          >
            <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">
              chevron_left
            </span>
          </button>

          {/* Next Button - Right Side */}
          <button
            onClick={handleNext}
            disabled={currentIndex === differentiators.length - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-[25] group size-12 md:size-14 rounded-full transition-all duration-300 flex items-center justify-center ${
              currentIndex === differentiators.length - 1
                ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-surface-dark/80 backdrop-blur-xl border border-white/20 text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(37,226,244,0.5)] hover:scale-110'
            }`}
          >
            <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform">
              chevron_right
            </span>
          </button>

          {/* All Cards - Subtle Stacked Effect */}
          <div className="relative flex items-start justify-center" style={{ minHeight: '480px' }}>
            {differentiators.map((card, index) => {
              const isActive = index === currentIndex;
              const isPast = index < currentIndex;
              const isFuture = index > currentIndex;
              
              // Subtle stack effect - straight edges, no rotation
              const positionFromActive = index - currentIndex;
              
              // No rotation - keep edges perfectly straight
              const rotation = isPast ? -8 : 0;  // Only slight tilt when exiting
              
              // Horizontal offset only - creates clean stack
              const xOffset = isFuture 
                ? positionFromActive * 12  // Reduced to 12px for tighter, cleaner stack
                : isPast 
                  ? -300  // Exit far to the left
                  : 0;
              
              // Slight vertical offset for depth perception
              const yOffset = isFuture 
                ? positionFromActive * 3  // Subtle 3px drop per card for depth
                : isPast 
                  ? -20 
                  : 0;
              
              const scale = isActive ? 1 : isFuture ? 0.99 : 0.95; // Very subtle scale
              const opacity = isPast ? 0 : isFuture ? (positionFromActive === 1 ? 0.8 : 0.5) : 1;
              const zIndex = isPast ? 0 : isFuture ? differentiators.length - index + 5 : 20; // Max z-20, below header's z-30 and navbar's z-50
              
              return (
                <div
                  key={card.id}
                  className="absolute w-full max-w-5xl"
                  style={{
                    transform: `
                      translateX(${xOffset}px) 
                      translateY(${yOffset}px) 
                      rotateZ(${rotation}deg) 
                      scale(${scale})
                    `,
                    transformOrigin: 'center center',  // Center origin for straight edges
                    zIndex: zIndex,
                    opacity: opacity,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)', // Smooth, professional easing
                  }}
                >
                  <div className={`spotlight-card glass-card rounded-2xl md:rounded-3xl p-5 md:p-8 border ${isActive ? 'border-white/20 shadow-2xl' : 'border-white/10'} bg-surface-dark relative overflow-hidden group`}
                    style={{ minHeight: '420px' }}
                  >
                    {/* Spotlight Effect - Only on active card */}
                    {isActive && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none z-0">
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${card.accentColor}25, transparent 40%)`
                          }}
                        ></div>
                      </div>
                    )}

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
                        <div className="flex items-start justify-between mb-4 md:mb-5 flex-wrap gap-3 md:gap-4">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div 
                              className="size-12 md:size-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg flex-shrink-0"
                              style={{ boxShadow: isActive ? `0 0 30px ${card.accentColor}20` : 'none' }}
                            >
                              <span className={`material-symbols-outlined text-xl md:text-2xl ${card.colorClass}`}>
                                {card.icon}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-lg md:text-2xl font-bold text-white mb-0.5">
                                {card.title}
                              </h3>
                              <p className={`text-[10px] md:text-xs font-medium ${card.colorClass}`}>
                                {card.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          {/* Card Number Badge */}
                          <div className="size-9 md:size-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm md:text-base font-bold">{card.id}</span>
                          </div>
                        </div>

                        {/* Only show full content for active card */}
                        {isActive && (
                          <>
                            {/* Description */}
                            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 max-w-3xl">
                              {card.description}
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2 mb-4 md:mb-5">
                              {card.features.map((feature, idx) => (
                                <div 
                                  key={idx} 
                                  className="flex items-start gap-1.5 md:gap-2 p-2 md:p-2.5 rounded-lg md:rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group"
                                >
                                  <span className={`material-symbols-outlined text-xs md:text-sm mt-0.5 ${card.colorClass} group-hover:scale-110 transition-transform flex-shrink-0`}>
                                    check_circle
                                  </span>
                                  <span className="text-gray-400 text-[10px] md:text-xs leading-relaxed flex-1">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Visual Elements / Stats */}
                            {card.stats && (
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                                {card.stats.map((stat, idx) => (
                                  <div 
                                    key={idx}
                                    className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-all"
                                  >
                                    <div className="text-[9px] md:text-[10px] text-gray-500 mb-0.5">{stat.label}</div>
                                    <div className={`text-base md:text-xl font-bold ${stat.color}`}>
                                      {stat.value}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Additional Visuals Based on Card Type */}
                            {card.visual === 'velocity' && (
                              <div className="flex gap-1 items-end h-12 md:h-14 w-full mt-3 opacity-50 hover:opacity-100 transition-opacity">
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
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mt-3">
                                {/* System Health Panel */}
                                <div className="p-3 md:p-4 bg-black/40 rounded-lg md:rounded-xl border border-green-500/20">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-green-400 text-sm md:text-base">
                                      health_and_safety
                                    </span>
                                    <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex-1">System Health</span>
                                    <span className="text-[10px] md:text-xs text-green-400 font-bold">99.97%</span>
                                  </div>
                                  <div className="space-y-1.5">
                                    {[
                                      { name: 'API', status: 100, color: 'bg-green-500' },
                                      { name: 'Database', status: 100, color: 'bg-green-500' },
                                      { name: 'ML Pipeline', status: 98, color: 'bg-green-500' },
                                      { name: 'Data Lake', status: 100, color: 'bg-green-500' },
                                    ].map((service, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <div className="size-1.5 md:size-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[9px] md:text-[10px] text-gray-400 flex-1">{service.name}</span>
                                        <span className="text-[9px] md:text-[10px] text-green-400 font-bold">{service.status}%</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Cost Monitoring Panel */}
                                <div className="p-3 md:p-4 bg-black/40 rounded-lg md:rounded-xl border border-blue-500/20">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-blue-400 text-sm md:text-base">
                                      payments
                                    </span>
                                    <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex-1">Cost Monitor</span>
                                    <span className="text-[10px] md:text-xs text-blue-400 font-bold">-32%</span>
                                  </div>
                                  <div className="space-y-1.5">
                                    {[
                                      { name: 'Compute', cost: '$2.4K', trend: 'down', percent: '-18%' },
                                      { name: 'Storage', cost: '$890', trend: 'down', percent: '-25%' },
                                      { name: 'Network', cost: '$340', trend: 'stable', percent: '+2%' },
                                      { name: 'ML Training', cost: '$1.1K', trend: 'down', percent: '-45%' },
                                    ].map((item, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <span className={`material-symbols-outlined text-[10px] md:text-xs ${
                                          item.trend === 'down' ? 'text-green-400' : item.trend === 'up' ? 'text-red-400' : 'text-gray-500'
                                        }`}>
                                          {item.trend === 'down' ? 'trending_down' : item.trend === 'up' ? 'trending_up' : 'remove'}
                                        </span>
                                        <span className="text-[9px] md:text-[10px] text-gray-400 flex-1">{item.name}</span>
                                        <span className={`text-[9px] md:text-[10px] font-bold ${
                                          item.trend === 'down' ? 'text-green-400' : item.trend === 'up' ? 'text-red-400' : 'text-gray-400'
                                        }`}>{item.percent}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {card.visual === 'workflow' && (
                              <div className="grid grid-cols-3 gap-2 mt-3">
                                {[
                                  { icon: 'psychology', label: 'Reasoning', desc: 'Context understanding', color: 'purple' },
                                  { icon: 'search', label: 'Retrieval', desc: 'Knowledge access', color: 'blue' },
                                  { icon: 'integration_instructions', label: 'Execution', desc: 'Action deployment', color: 'emerald' },
                                ].map((step, idx) => (
                                  <div 
                                    key={idx}
                                    className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                                  >
                                    <span className={`material-symbols-outlined text-${step.color}-400 text-base md:text-lg mb-0.5 block group-hover:scale-110 transition-transform`}>
                                      {step.icon}
                                    </span>
                                    <div className={`text-${step.color}-400 text-[9px] md:text-[10px] font-bold mb-0.5`}>{step.label}</div>
                                    <div className="text-gray-500 text-[8px] md:text-[9px]">{step.desc}</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {card.visual === 'library' && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2 mt-3">
                                {[
                                  { icon: 'database', label: 'Data Pipelines', count: '12+' },
                                  { icon: 'smart_toy', label: 'AI Agents', count: '8+' },
                                  { icon: 'dashboard', label: 'Dashboards', count: '15+' },
                                  { icon: 'integration_instructions', label: 'Integrations', count: '20+' },
                                ].map((item, i) => (
                                  <div key={i} className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group text-center">
                                    <span className="material-symbols-outlined text-emerald-400 text-lg md:text-xl mb-0.5 block group-hover:scale-110 transition-transform">
                                      {item.icon}
                                    </span>
                                    <div className="text-white text-[9px] md:text-[10px] font-semibold mb-0.5">{item.label}</div>
                                    <div className="text-gray-500 text-[8px] md:text-[9px]">{item.count} templates</div>
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

        {/* Dot Indicators - Bottom Center */}
        <div className="flex items-center justify-center gap-2 mt-4 md:mt-5">
          {differentiators.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 'next' : 'prev');
                setCurrentIndex(idx);
              }}
              className="group p-1.5 rounded-full transition-all duration-300"
              aria-label={`Go to differentiator ${idx + 1}`}
            >
              <div 
                className={`size-2 md:size-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-primary scale-125 shadow-[0_0_10px_rgba(37,226,244,0.5)]' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
