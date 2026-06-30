import React, { useState } from 'react';

interface Differentiator {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  icon: string;
  colorClass: string;
  accentColor: string;
  features: string[];
}

const differentiators: Differentiator[] = [
  {
    id: 1,
    title: 'Prove Before You Pay',
    subtitle: 'Zero-risk proof of value',
    description: 'We spend 6-8 weeks on one of your real use cases, completely free, and hand you a working solution. You only commit once you have seen measurable results.',
    highlight: '6-8 weeks free',
    icon: 'workspace_premium',
    colorClass: 'text-accent-green',
    accentColor: '#a3e635',
    features: [
      '6-8 weeks of dedicated senior engineering on a real business use case',
      'A functional, working solution that operates well, not a slide deck',
      'Zero financial commitment until you see measurable results',
      'Work with the same founder-led team you would engage ongoing',
      'Complete IP ownership. Everything we build is yours to keep',
      'Smooth transition to a full engagement after proof of value',
    ],
  },
  {
    id: 2,
    title: 'We Meet You Where You Are',
    subtitle: 'Your stack, your pace',
    description: 'No dedicated tech team or complex infrastructure? No problem. We build smart solutions on top of the tools you already know, then train your team to own them.',
    highlight: 'Zero disruption',
    icon: 'rocket_launch',
    colorClass: 'text-blue-400',
    accentColor: '#60a5fa',
    features: [
      'We build on your familiar tools and technologies, not ours',
      'No new platforms unless truly needed, so your team stays comfortable',
      'A progressive Tier 0 to 3 journey at a pace that fits your organization',
      'We train your team to own, maintain, and extend what we build',
      'Upskilling so your people can create new solutions themselves',
      'Seamless adoption with zero disruption to your daily operations',
    ],
  },
  {
    id: 3,
    title: 'Founders at the Front',
    subtitle: 'Direct senior leadership',
    description: 'Every project is led directly by our founders and senior engineers, from strategy through production. No account managers, no junior-only teams, no hand-offs.',
    highlight: '100% founder oversight',
    icon: 'group',
    colorClass: 'text-primary',
    accentColor: '#25e2f4',
    features: [
      'Founders actively leading architecture and delivery decisions throughout',
      'Curated team of mid and senior engineers under direct founder oversight',
      'No delegation to junior consultants or account managers',
      'Active code reviews, sprint planning, and technical governance',
      'Full accountability from strategy through production deployment',
      'Tight alignment between business objectives and technical execution',
    ],
  },
  {
    id: 4,
    title: 'Agentic AI Pioneers',
    subtitle: 'AI that takes action',
    description: 'We go beyond dashboards. We build AI that reads documents, answers questions in plain language, and handles real work in Arabic and English, around the clock.',
    highlight: '24/7 · Arabic & English',
    icon: 'smart_toy',
    colorClass: 'text-purple-400',
    accentColor: '#c084fc',
    features: [
      'Document processing that extracts key information from invoices, contracts, and forms',
      'Talk to your database in plain language and get instant answers without writing queries',
      'Chat with your files and folders to find information across thousands of documents',
      'Entity recognition that pulls names, dates, amounts, and clauses from any text',
      'Voice assistants in Arabic and English handling customer inquiries 24/7',
      'Smart classification and routing of emails, tickets, and incoming requests',
    ],
  },
  {
    id: 5,
    title: 'Built for the Kingdom',
    subtitle: 'Engineered around Vision 2030',
    description: 'Saudi-ready from day one. Your data stays in the Kingdom, PDPL, NCA, and CITC compliance is built in, and every solution advances your Vision 2030 goals.',
    highlight: '100% data in KSA',
    icon: 'flag',
    colorClass: 'text-orange-400',
    accentColor: '#fb923c',
    features: [
      'Built to qualify for Vision 2030 funding programs and government RFPs from day one',
      'Your data never crosses borders, eliminating cross-jurisdiction legal exposure',
      'One engagement covers cloud, compliance, audits, and integrations instead of juggling vendors',
      'PDPL, NCA, and CITC requirements baked into every system from the start, not bolted on later',
      'Skip months of audit preparation and the cost of full-time compliance specialists',
      'Native Arabic and Gulf dialect handling where international AI models consistently fall short',
    ],
  },
  {
    id: 6,
    title: 'Proven Accelerators',
    subtitle: 'Start 50% ahead',
    description: 'Reusable components refined across 15+ production deployments mean no greenfield. Your first working version ships in weeks, and budget goes to what sets you apart.',
    highlight: '15+ deployments',
    icon: 'inventory_2',
    colorClass: 'text-emerald-400',
    accentColor: '#34d399',
    features: [
      'Skip 3 to 6 months of greenfield work reinventing pipelines, dashboards, and integrations',
      'Inherit production lessons from 15+ live deployments instead of discovering them yourself',
      'First working version live in weeks instead of waiting a full quarter for a prototype',
      'Your budget goes to what makes you different, not the plumbing every project needs',
      '10+ proven accelerators across data pipelines, AI agents, dashboards, and integrations',
      'Avoid the cost overruns and surprises that sink most greenfield enterprise projects',
    ],
  },
];

const WhyUs: React.FC = () => {
  const [selected, setSelected] = useState<Differentiator | null>(null);

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
        {/* Header */}
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

        {/* Differentiator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {differentiators.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelected(card)}
              className="spotlight-card glass-card group relative overflow-hidden rounded-2xl p-6 md:p-7 border border-white/10 bg-surface-dark transition-all duration-500 hover:-translate-y-1 flex flex-col cursor-pointer"
            >
              {/* Spotlight Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none z-0">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${card.accentColor}22, transparent 40%)`
                  }}
                ></div>
              </div>

              {/* Accent Gradient Corner */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${card.accentColor}, transparent 70%)` }}
              ></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className={`material-symbols-outlined text-2xl ${card.colorClass}`}>{card.icon}</span>
                </div>

                {/* Title + Subtitle */}
                <h3 className="text-xl font-bold text-white mb-1 leading-tight">{card.title}</h3>
                <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${card.colorClass}`}>{card.subtitle}</p>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{card.description}</p>

                {/* Footer: highlight chip + expand affordance */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/5"
                    style={{ borderColor: `${card.accentColor}40` }}
                  >
                    <span className={`material-symbols-outlined text-sm ${card.colorClass}`}>bolt</span>
                    <span className={`text-xs font-bold ${card.colorClass}`}>{card.highlight}</span>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-bold ${card.colorClass} opacity-80 group-hover:opacity-100 transition-opacity`}>
                    Learn more
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expand Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelected(null)}
          ></div>
          <div className="relative w-full max-w-2xl bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            {/* Accent top bar */}
            <div className="h-1 w-full" style={{ background: selected.accentColor }}></div>

            <div className="p-8 md:p-10 overflow-y-auto">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="size-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg flex-shrink-0"
                  style={{ boxShadow: `0 0 30px ${selected.accentColor}25` }}
                >
                  <span className={`material-symbols-outlined text-2xl ${selected.colorClass}`}>{selected.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight">{selected.title}</h3>
                  <p className={`text-xs font-bold uppercase tracking-wider ${selected.colorClass}`}>{selected.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed mb-8 pb-8 border-b border-white/10">
                {selected.description}
              </p>

              {/* Detail */}
              <h5 className="text-white font-bold mb-4">What this means for you</h5>
              <ul className="space-y-3">
                {selected.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-lg mt-0.5 ${selected.colorClass} flex-shrink-0`}>check_circle</span>
                    <span className="text-gray-400 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyUs;
