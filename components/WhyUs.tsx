import React, { useState } from 'react';

interface Differentiator {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  icon: string;
  colorClass: string;
  accentColor: string;
  features: string[];
  stats: { label: string; value: string }[];
  visual?: 'tiers';
}

const differentiators: Differentiator[] = [
  {
    id: 1,
    title: 'Founders at the Front',
    subtitle: 'Direct Technical Leadership on Every Project',
    tagline: 'Every project is directly led by Dr. Syed and Felipe from day one. No account managers, no teams of juniors. Just senior engineers with full strategic control.',
    description: '',
    icon: 'group',
    colorClass: 'text-primary',
    accentColor: '#25e2f4',
    features: [
      'Founders actively leading architecture and delivery decisions throughout',
      'Curated team of mid and senior engineers under direct founder oversight',
      'No delegation to junior consultants or account managers',
      'Active code reviews, sprint planning, and technical governance',
      'Full accountability from strategy through production deployment',
      'Tight alignment between business objectives and technical execution'
    ],
    stats: [
      { label: 'Founder Oversight', value: '100%' },
      { label: 'Founder Access', value: 'Direct' },
      { label: 'Avg. Team Seniority', value: 'Mid-Sr' },
    ],
  },
  {
    id: 2,
    title: 'Prove Before You Pay',
    subtitle: 'Zero Risk Proof of Value',
    tagline: 'We put skin in the game. Before any commitment, we work on one of your real use cases for 6-8 weeks, completely free, to deliver tangible proof of value.',
    description: '',
    icon: 'workspace_premium',
    colorClass: 'text-accent-green',
    accentColor: '#a3e635',
    features: [
      '6-8 weeks of dedicated senior engineering on a real business use case',
      'A functional, working solution that operates well, not a slide deck',
      'Zero financial commitment until you see measurable results',
      'Work with the same team led by founders that you\'d engage ongoing',
      'Complete IP ownership. Everything we build is yours to keep',
      'Smooth transition to full engagement after proof of value'
    ],
    stats: [
      { label: 'Free Period', value: '6-8 wk' },
      { label: 'Your Risk', value: 'Zero' },
      { label: 'Deliverable', value: 'Working' },
    ],
  },
  {
    id: 3,
    title: 'Grow at Your Pace',
    subtitle: 'Your Pace, Your Tools, Your Team',
    tagline: 'Not every organization has a dedicated tech team or complex infrastructure. We work with the technologies and infrastructure that you are familiar with and build the smartest possible solutions on top of it.',
    description: '',
    icon: 'rocket_launch',
    colorClass: 'text-blue-400',
    accentColor: '#60a5fa',
    features: [
      'We build on your familiar tools and technologies, not ours',
      'No new platforms or technologies unless truly needed. Your team stays comfortable',
      'A progressive Tier 0 to 3 journey at a pace that fits your organization',
      '50% building, 50% training your team to own and extend the solutions',
      'Upskilling so your people can maintain and create new solutions themselves',
      'Seamless adoption with zero disruption to your daily operations'
    ],
    stats: [],
    visual: 'tiers',
  },
  {
    id: 4,
    title: 'Agentic AI Pioneers',
    subtitle: 'AI That Works for You, Not the Other Way Around',
    tagline: 'We go beyond dashboards and simple automations. We build intelligent AI systems that can think, search, and act on their own to get real work done.',
    description: '',
    icon: 'smart_toy',
    colorClass: 'text-purple-400',
    accentColor: '#c084fc',
    features: [
      'Document processing that extracts key information from invoices, contracts, and forms',
      'Talk to your database in plain language and get instant answers without writing queries',
      'Chat with your files and folders to find information across thousands of documents',
      'Entity recognition that pulls names, dates, amounts, and clauses from any text',
      'Voice assistants in Arabic and English handling customer inquiries 24/7',
      'Smart classification and routing of emails, tickets, and incoming requests'
    ],
    stats: [
      { label: 'Availability', value: '24/7' },
      { label: 'Languages', value: 'Multi' },
      { label: 'Manual Steps', value: 'Zero' },
    ],
  },
  {
    id: 5,
    title: 'Built for the Kingdom',
    subtitle: 'Engineered Around Vision 2030',
    tagline: 'Fully Saudi ready from day one. Your data remains in the Kingdom, compliance is fully managed, and every solution advances your Vision 2030 objectives so you can focus on growth.',
    description: '',
    icon: 'flag',
    colorClass: 'text-orange-400',
    accentColor: '#fb923c',
    features: [
      'Built to qualify for Vision 2030 funding programs and government RFPs from day one',
      'Your data never crosses borders, eliminating cross jurisdiction legal exposure',
      'One engagement covers cloud, compliance, audits, and integrations instead of juggling vendors',
      'PDPL, NCA, and CITC requirements baked into every system from the start, not bolted on later',
      'Skip months of audit preparation and the cost of full time compliance specialists',
      'Native Arabic and Gulf dialect handling where international AI models consistently fall short'
    ],
    stats: [
      { label: 'Data Residency', value: '100% KSA' },
      { label: 'Vision 2030', value: 'Native' },
      { label: 'Compliance', value: 'Solved' },
    ],
  },
  {
    id: 6,
    title: 'Outcomes, Not Outputs',
    subtitle: 'Measured by Business Impact',
    tagline: 'Every engagement is measured by business results like revenue growth, cost reduction, and operational efficiency. Not lines of code or hours billed.',
    description: '',
    icon: 'trending_up',
    colorClass: 'text-primary',
    accentColor: '#25e2f4',
    features: [
      'Walk into board reviews with concrete revenue, cost, and efficiency numbers, not status decks',
      'See the dollar value of every sprint in real time, not buried in a final report',
      'Success criteria locked in writing before kickoff, with no shifting goalposts mid project',
      'Underperforming features cut fast based on real usage data, not opinions or sunk cost',
      'Every dollar spent tied directly to revenue gained, costs reduced, or risk eliminated',
      'We stay accountable after launch, not just until the final invoice clears'
    ],
    stats: [
      { label: 'KPI Alignment', value: 'Day 1' },
      { label: 'ROI Tracking', value: 'Live' },
      { label: 'Focus', value: 'Impact' },
    ],
  },
  {
    id: 7,
    title: 'Proven Accelerators',
    subtitle: 'Start 50% Ahead',
    tagline: 'Proven components and architectural patterns refined across 15+ production deployments. No greenfield. Start with what already works at enterprise scale.',
    description: '',
    icon: 'inventory_2',
    colorClass: 'text-emerald-400',
    accentColor: '#34d399',
    features: [
      'Skip 3 to 6 months of greenfield work reinventing pipelines, dashboards, and integrations',
      'Inherit production lessons from 15+ live deployments instead of discovering them yourself',
      'First working version live in weeks instead of waiting a full quarter for a prototype',
      'Your budget goes to what makes you different, not the plumbing every project needs',
      '10+ proven accelerators across data pipelines, AI agents, dashboards, and integrations',
      'Avoid the cost overruns and surprises that sink most greenfield enterprise projects'
    ],
    stats: [
      { label: 'Deployments', value: '15+' },
      { label: 'Accelerators', value: '10+' },
      { label: 'Head Start', value: '50%' },
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
               <h2 className="text-primary font-mono text-xs uppercase tracking-[0.2em]">The <span className="normal-case">imkan.ai</span> Advantage</h2>
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
        <div className="relative w-full px-2 sm:px-4 md:px-16 min-h-[680px] sm:min-h-[600px] md:min-h-[520px]">
          
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
          <div className="relative flex items-start justify-center px-10 sm:px-12 md:px-0 min-h-[680px] sm:min-h-[600px] md:min-h-[520px]">
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
                            {/* Tagline */}
                            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 max-w-3xl">
                              {card.tagline}
                            </p>

                            {/* Features Grid - 6 bullet points, 3 per column */}
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

                            {/* Tiers Visual */}
                            {card.visual === 'tiers' && (
                              <div className="flex items-center gap-0">
                                {[
                                  { tier: 'Tier 0', label: 'Current state' },
                                  { tier: 'Tier 1', label: 'Automate & standardize' },
                                  { tier: 'Tier 2', label: 'Integrate & scale' },
                                  { tier: 'Tier 3', label: 'Full maturity' },
                                ].map((step, idx) => (
                                  <div key={idx} className="flex items-center flex-1 min-w-0">
                                    <div className="flex flex-col items-center flex-1 min-w-0">
                                      <div
                                        className={`px-2 py-1 md:px-2.5 md:py-1.5 rounded-full border flex items-center justify-center text-[8px] md:text-[10px] font-bold mb-0.5 whitespace-nowrap ${
                                          idx === 0
                                            ? 'bg-white/10 border-white/20 text-white'
                                            : 'border-blue-400/30 bg-blue-400/10 text-blue-400'
                                        }`}
                                      >
                                        {step.tier}
                                      </div>
                                      <div className="text-gray-400 text-[8px] md:text-[9px] font-medium text-center">{step.label}</div>
                                    </div>
                                    {idx < 3 && (
                                      <div className="w-3 sm:w-6 md:w-14 h-[2px] bg-gradient-to-r from-white/20 to-blue-400/40 flex-shrink-0 mb-3 rounded-full"></div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Stats Row */}
                            {card.stats.length > 0 && <div className="grid grid-cols-3 gap-2 md:gap-3">
                              {card.stats.map((stat, idx) => (
                                <div
                                  key={idx}
                                  className="relative p-2.5 md:p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center group hover:border-white/10 transition-all duration-300 overflow-hidden"
                                >
                                  <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                      background: `radial-gradient(circle at center, ${card.accentColor}10, transparent 70%)`
                                    }}
                                  ></div>
                                  <div className={`text-lg md:text-2xl font-black relative z-10 ${card.colorClass}`}>
                                    {stat.value}
                                  </div>
                                  <div className="text-gray-500 text-[9px] md:text-[10px] font-medium uppercase tracking-wider mt-0.5 relative z-10">
                                    {stat.label}
                                  </div>
                                </div>
                              ))}
                            </div>}
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
