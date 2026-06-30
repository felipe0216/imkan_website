import React, { useState } from 'react';

interface ServiceDetail {
  id: string;
  title: string;
  pain: string;
  subtitle: string;
  teaser: string;
  description: string;
  goal: string;
  cta: string;
  icon: string;
  colorClass: string;
  features: string[];
  image: string;
}

const servicesData: ServiceDetail[] = [
  {
    id: 'strategy',
    title: 'Build a strategy worth executing',
    pain: 'We don\'t know where to start our data journey',
    subtitle: 'Data Strategy & Architecture',
    teaser: 'Everyone says to "become data-driven", but no one shows you the first move. Here is how a real data strategy actually begins, and where it should take you.',
    description: 'A clear, plain-English plan for turning the data you already collect into faster, better business decisions. It starts with the decisions you want to improve, not with technology.',
    goal: 'A prioritized roadmap where every data investment is tied to a real business outcome.',
    cta: 'Find out how',
    icon: 'architecture',
    colorClass: 'text-primary',
    features: [
      'Start with the decisions that matter, not the data you happen to have',
      'Map each decision to the questions and data that answer it',
      'Assess your current data, tools, and gaps honestly',
      'Prioritize a roadmap where every step has a clear business payoff'
    ],
    image: '/images/services/strategy.jpg'
  },
  {
    id: 'engineering',
    title: 'Make your data work for you',
    pain: 'Our data is a mess: scattered, unreliable, siloed',
    subtitle: 'Engineering & Data Preparation',
    teaser: 'Spreadsheets here, systems there, numbers that never match. Here is how scattered data becomes one source of truth your whole team can rely on.',
    description: 'The work of pulling all your scattered data into one clean, reliable place, so everyone works from the same trustworthy numbers instead of arguing over whose spreadsheet is right.',
    goal: 'A single source of truth that is accurate, always up to date, and ready for reporting or AI.',
    cta: 'How to fix it',
    icon: 'tune',
    colorClass: 'text-emerald-400',
    features: [
      'Connect your scattered sources into one place',
      'Clean and standardize until the numbers finally agree',
      'Automate the flow so data stays fresh on its own',
      'Add quality checks that catch errors before you do'
    ],
    image: '/images/services/data-platform.png'
  },
  {
    id: 'agentic',
    title: 'Deploy AI that saves you time',
    pain: 'We\'re still doing manually what machines should handle',
    subtitle: 'AI & Automation',
    teaser: 'If your team spends hours copying, checking, and chasing information, that is work software can do. Here is how to spot it and hand it off.',
    description: 'Letting software handle the repetitive, rules-based work your team does by hand today, like reading documents, sorting requests, or moving data between systems, so people focus on judgment instead of busywork.',
    goal: 'Measurable time and cost saved, with your people in control of the decisions that matter.',
    cta: 'See the possibilities',
    icon: 'smart_toy',
    colorClass: 'text-purple-400',
    features: [
      'Spot the repetitive, high-volume tasks that drain your team',
      'Automate the predictable steps first for fast wins',
      'Add AI where reading, sorting, or answering is needed',
      'Keep people in control of the decisions that matter'
    ],
    image: '/images/services/agentic-ai.png'
  },
  {
    id: 'decision',
    title: 'Turn insights into decisions',
    pain: 'We have dashboards, but still cannot make fast decisions',
    subtitle: 'Insights & Action',
    teaser: 'More charts do not mean more clarity. Here is how to turn the data you already have into decisions your team can act on today.',
    description: 'Turning the dashboards you already have into clear answers and next steps. Most companies do not have a data problem, they have a decision problem, and this closes that gap.',
    goal: 'Faster, more confident decisions, made every single day.',
    cta: 'Learn how',
    icon: 'monitoring',
    colorClass: 'text-blue-400',
    features: [
      'Start from the decisions your teams make every week',
      'Design each view to answer one clear question',
      'Add targets, trends, and alerts so the "so what" is obvious',
      'Put answers in front of people the moment they decide'
    ],
    image: '/images/services/data-visu.png'
  }
];

interface ServicesProps {
  onOpenContact: () => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  // Map color classes to RGB values for spotlight effects
  const getSpotlightRGB = (colorClass: string): string => {
    const colorMap: Record<string, string> = {
      'text-primary': '37, 226, 244',
      'text-emerald-400': '52, 211, 153',
      'text-purple-400': '192, 132, 252',
      'text-blue-400': '96, 165, 250'
    };
    return colorMap[colorClass] || '37, 226, 244'; // Default to primary
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
    <section id="services" className="relative py-24 bg-background-dark overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-3">Our Services</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            We work with leaders ready to act on Data & AI
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Not sure where to start? Stuck after strategy? We meet you where you are and move you forward.
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
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${getSpotlightRGB(service.colorClass)}, 0.15), transparent 40%)`
                      }}
                    ></div>
                  </div>

                  {/* Stage Number - Inside card at top-right */}
                  <div className={`absolute top-4 right-4 size-10 rounded-lg ${service.colorClass} bg-background-dark/95 backdrop-blur-sm border-2 border-current flex items-center justify-center font-bold text-base shadow-lg z-20`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden z-0">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br to-transparent"
                      style={{
                        background: `linear-gradient(to bottom right, rgba(${getSpotlightRGB(service.colorClass)}, 0.1), transparent)`
                      }}
                    ></div>
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

                    {/* Title - solution headline */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-current transition-colors leading-tight min-h-[3.5rem] flex items-start">
                      {service.title}
                    </h3>

                    {/* Client pain point, in their own words, beneath the title */}
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Sound familiar?</div>
                    <div className="flex items-start gap-1.5 mb-3">
                      <span className={`material-symbols-outlined text-base ${service.colorClass} flex-shrink-0`}>format_quote</span>
                      <p className="text-gray-400 text-xs italic leading-snug">&ldquo;{service.pain}&rdquo;</p>
                    </div>

                    {/* Description Preview */}
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-5">
                      {service.teaser}
                    </p>

                    {/* Learn More */}
                    <div className={`flex items-center gap-2 text-xs font-bold ${service.colorClass} mt-auto pt-2`}>
                      <span>{service.cta}</span>
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
                      <h3 className="text-lg font-bold text-white leading-tight mb-2">
                        {service.title}
                      </h3>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Sound familiar?</div>
                      <p className="text-gray-400 text-sm italic leading-snug">
                        &ldquo;{service.pain}&rdquo;
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.teaser}
                  </p>

                  <div className={`flex items-center gap-2 text-sm font-bold ${service.colorClass}`}>
                    <span>{service.cta}</span>
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
                <h3 className="text-white text-xl font-bold leading-tight">{selectedService.subtitle}</h3>
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
                <h3 className="text-white text-xl font-bold">{selectedService.subtitle}</h3>
              </div>

              {/* Solution headline */}
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-4">
                {selectedService.title}
              </h3>

              {/* Client pain point, in their own words, beneath the title */}
              <div className="flex items-start gap-3 mb-8 pb-8 border-b border-white/10">
                <span className={`material-symbols-outlined text-xl ${selectedService.colorClass} flex-shrink-0`}>format_quote</span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">What we hear from leaders</div>
                  <p className="text-gray-300 text-base md:text-lg italic leading-snug">
                    &ldquo;{selectedService.pain}&rdquo;
                  </p>
                </div>
              </div>

              {/* What it is */}
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${selectedService.colorClass}`}>What it is</h4>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                {selectedService.description}
              </p>

              {/* The goal */}
              <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className={`material-symbols-outlined text-xl ${selectedService.colorClass} flex-shrink-0`}>flag</span>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${selectedService.colorClass}`}>The goal</div>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedService.goal}</p>
                </div>
              </div>

              {/* How to get there - numbered path */}
              <h4 className="text-white font-bold mb-4">How to get there</h4>
              <ol className="space-y-3">
                {selectedService.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 size-6 rounded-full border border-current flex items-center justify-center text-xs font-bold ${selectedService.colorClass}`}>
                      {idx + 1}
                    </span>
                    <span className="text-gray-300 text-sm leading-relaxed pt-0.5">{feature}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-10 pt-6 border-t border-white/10 flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    onOpenContact();
                  }}
                  className={`flex-1 bg-white text-background-dark font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors`}
                >
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