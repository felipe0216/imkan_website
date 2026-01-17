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
  visual?: 'team' | 'velocity' | 'workflow';
}

const differentiators: Differentiator[] = [
  {
    id: 1,
    title: 'Founder-Led, Hands-On',
    subtitle: 'Direct Technical Leadership on Every Project',
    description: 'Every project is directly led and overseen by Dr. Syed and Felipe from day one, ensuring full strategic control, technical excellence, and accountability at every stage. We don\'t delegate critical decisions to junior consultants or account managers who lack deep technical expertise. Instead, you work with a carefully curated team of mid and senior-level engineers under direct founder supervision, with active involvement in architecture design, code reviews, sprint planning, and technical governance. This hands-on approach ensures alignment between business objectives and technical execution, with clear ownership from strategy through production deployment.',
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
    description: 'Ship production-ready MVPs in weeks, not months or quarters. Our proven accelerators, battle-tested frameworks, and extensive library of reusable patterns eliminate the need to reinvent the wheel on every project. We leverage pre-built components for data pipelines, AI workflows, and analytics dashboards, alongside native integrations with Saudi platforms like Nafath, Etimad, and Absher. This approach combines speed with quality—delivering production-grade systems in 3-6 weeks compared to the industry standard of 12-16 weeks, without cutting corners on security, scalability, or best practices.',
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
  },
  {
    id: 3,
    title: 'Production-Grade DNA',
    subtitle: 'Built for Scale from Day One',
    description: 'Every system is architected for reliability, scalability, and security from the first line of code. We implement automated testing, continuous integration/deployment pipelines, comprehensive observability, and security controls as foundational elements, not afterthoughts. No MVPs that break in production. No prototypes that need rebuilding. Production-ready infrastructure from day one, designed to handle enterprise scale and evolving business requirements.',
    icon: 'engineering',
    colorClass: 'text-blue-400',
    accentColor: '#60a5fa',
    features: [
      'Automated testing & CI/CD pipelines built-in from project inception',
      'Observability, monitoring, and alerting systems deployed on day one',
      'Security & compliance by design (PDPL, NCA frameworks integrated)',
      'DataOps, MLOps, and DevOps best practices across all deliverables'
    ],
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
    description: 'Homegrown expertise deeply aligned with the Kingdom\'s digital transformation and Vision 2030 objectives. We understand data sovereignty requirements, local compliance frameworks (PDPL, NCA, CITC), and the unique nuances of the Saudi market far better than any offshore consultancy. Our solutions prioritize in-kingdom data residency, native integrations with government platforms (Nafath, Etimad, Absher, Qiwa), and Arabic-first AI capabilities with Gulf dialect support. This local-first approach ensures not just compliance, but true cultural and regulatory alignment that enables faster approvals, reduced risk, and seamless integration with national digital infrastructure.',
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
    description: 'Every engagement is measured by business results and tangible impact, not lines of code, story points, or hours billed. We establish clear KPI frameworks aligned to your strategic objectives from day one, whether that\'s revenue growth, cost reduction, operational efficiency, or risk mitigation. Throughout the engagement, we track ROI and performance metrics continuously, providing transparent reporting and data-driven insights. Success metrics are defined and agreed upon before any code is written, ensuring complete alignment between technical delivery and business outcomes. This results-oriented approach means we\'re invested in your success, not just task completion.',
    icon: 'trending_up',
    colorClass: 'text-primary',
    accentColor: '#25e2f4',
    features: [
      'KPI frameworks aligned to business outcomes from project inception',
      'ROI tracking and transparent reporting throughout engagement',
      'Success metrics defined and agreed before code is written',
      'Continuous optimization based on real-world performance data'
    ],
  },
  {
    id: 7,
    title: 'Production-Ready Accelerators',
    subtitle: 'Start 60% Ahead',
    description: 'Proven components, frameworks, and architectural patterns refined across 15+ production deployments spanning multiple industries and use cases. No greenfield development, we use tested solutions that already work at enterprise scale. Our accelerator library includes data pipeline templates for common ingestion patterns, AI agent frameworks for autonomous workflows, pre-built dashboard and visualization components, and extensive integrations with enterprise systems and Saudi government platforms. Each accelerator is production-hardened, documented, and maintained, allowing us to focus on your unique business logic rather than rebuilding foundational infrastructure.',
    icon: 'inventory_2',
    colorClass: 'text-emerald-400',
    accentColor: '#34d399',
    features: [
      '12+ production-ready data pipeline templates for common patterns',
      '8+ AI agent frameworks and orchestration patterns',
      '15+ dashboard and visualization accelerators',
      '20+ pre-built integrations for enterprise and government systems'
    ],
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
        <div className="relative w-full px-2 sm:px-4 md:px-16" style={{ minHeight: '520px' }}>
          
          {/* Previous Button - Left Side */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-[25] group size-10 sm:size-12 md:size-14 rounded-full transition-all duration-300 flex items-center justify-center ${
              currentIndex === 0
                ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-surface-dark/80 backdrop-blur-xl border border-white/20 text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(37,226,244,0.5)] hover:scale-110'
            }`}
          >
            <span className="material-symbols-outlined text-lg sm:text-xl group-hover:-translate-x-0.5 transition-transform">
              chevron_left
            </span>
          </button>

          {/* Next Button - Right Side */}
          <button
            onClick={handleNext}
            disabled={currentIndex === differentiators.length - 1}
            className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-[25] group size-10 sm:size-12 md:size-14 rounded-full transition-all duration-300 flex items-center justify-center ${
              currentIndex === differentiators.length - 1
                ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-surface-dark/80 backdrop-blur-xl border border-white/20 text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(37,226,244,0.5)] hover:scale-110'
            }`}
          >
            <span className="material-symbols-outlined text-lg sm:text-xl group-hover:translate-x-0.5 transition-transform">
              chevron_right
            </span>
          </button>

          {/* All Cards - Subtle Stacked Effect */}
          <div className="relative flex items-start justify-center px-10 sm:px-12 md:px-0" style={{ minHeight: '520px' }}>
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
                  <div className={`spotlight-card glass-card rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 border ${isActive ? 'border-white/20 shadow-2xl' : 'border-white/10'} bg-surface-dark relative overflow-hidden group`}
                    style={{ minHeight: '440px' }}
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

                            {/* Visual Elements */}
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

                            {card.visual === 'workflow' && (
                              <div className="grid grid-cols-3 gap-2 mt-3">
                                {[
                                  { icon: 'psychology', label: 'Reasoning', desc: 'Context understanding' },
                                  { icon: 'search', label: 'Retrieval', desc: 'Knowledge access' },
                                  { icon: 'integration_instructions', label: 'Execution', desc: 'Action deployment' },
                                ].map((step, idx) => (
                                  <div 
                                    key={idx}
                                    className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                                  >
                                    <span className={`material-symbols-outlined ${card.colorClass} text-base md:text-lg mb-0.5 block group-hover:scale-110 transition-transform`}>
                                      {step.icon}
                                    </span>
                                    <div className={`${card.colorClass} text-[9px] md:text-[10px] font-bold mb-0.5`}>{step.label}</div>
                                    <div className="text-gray-500 text-[8px] md:text-[9px]">{step.desc}</div>
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
