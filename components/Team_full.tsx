import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string[];
  tags: string[];
  description: string;
  image: string;
  colorTheme: 'emerald' | 'purple' | 'cyan' | 'blue';
}

const teamMembers: TeamMember[] = [
  {
    id: '5',
    name: 'Aisha Malik',
    role: 'Cloud Solutions Architect',
    specialty: ['Cloud Infrastructure'],
    tags: ['AWS', 'Kubernetes', 'Infrastructure as Code'],
    description: 'Designs and implements scalable cloud architectures for enterprise AI workloads. Expert in multi-cloud strategies, container orchestration, and building resilient distributed systems.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces',
    colorTheme: 'emerald'
  },
  {
    id: '7',
    name: 'Alex Rivera',
    role: 'Research Engineer',
    specialty: ['Research & Development'],
    tags: ['Reinforcement Learning', 'LLMs', 'Research'],
    description: 'Bridges cutting-edge AI research with practical applications. Focuses on reinforcement learning, large language models, and prototyping novel AI architectures for next-generation intelligent systems.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces',
    colorTheme: 'cyan'
  },
  {
    id: '2',
    name: 'Felipe Araya',
    role: 'Co-founder & Lead AI Scientist',
    specialty: ['Founders', 'AI & Machine Learning', 'Research & Development'],
    tags: ['Agentic AI', 'MLOps', 'Production Deployments'],
    description: 'Leads AI innovation from research to production. Deep expertise in advanced machine learning, generative AI, autonomous agent systems, MLOps pipelines, model deployment, and intelligent monitoring systems that drive business value.',
    image: '/images/profile_pictures/real_felipe.png',
    colorTheme: 'purple'
  },
  {
    id: '1',
    name: 'Dr. Syed Fawad Ali',
    role: 'Co-founder & Lead Data Engineer',
    specialty: ['Founders', 'Data Engineering', 'Cloud Infrastructure', 'Research & Development'],
    tags: ['Data Architecture', 'ETL Pipelines', 'Governance'],
    description: 'Expert in building enterprise data foundations from the ground up. Specializes in data strategy, modern data warehousing, ETL/ELT pipelines, data quality frameworks, and scalable cloud infrastructure that enables AI at scale.',
    image: '/images/profile_pictures/real_syed.png',
    colorTheme: 'emerald'
  },
  {
    id: '3',
    name: 'Maria Santos',
    role: 'Senior Data Scientist',
    specialty: ['AI & Machine Learning'],
    tags: ['Deep Learning', 'NLP', 'Model Optimization'],
    description: 'Specializes in building and fine-tuning neural networks for production environments. Expert in natural language processing, computer vision, and developing custom ML solutions that solve complex business problems.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces',
    colorTheme: 'cyan'
  },
  {
    id: '4',
    name: 'James Chen',
    role: 'Senior Data Engineer',
    specialty: ['Data Engineering'],
    tags: ['Real-time Processing', 'Data Lakes', 'Spark'],
    description: 'Builds high-performance data pipelines and streaming architectures. Specializes in real-time data processing, distributed systems, and optimizing data workflows for petabyte-scale operations.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=faces',
    colorTheme: 'blue'
  },
  {
    id: '6',
    name: 'David Kumar',
    role: 'DevOps Engineer',
    specialty: ['Cloud Infrastructure'],
    tags: ['CI/CD', 'Terraform', 'Monitoring'],
    description: 'Automates deployment pipelines and ensures system reliability at scale. Specializes in infrastructure automation, observability platforms, and implementing robust DevOps practices for ML systems.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    colorTheme: 'purple'
  }
];

const specialties = [
  { id: 'founders', name: 'Architects of Intelligence Team', icon: 'workspace_premium' },
  { id: 'ai-ml', name: 'AI & Machine Learning Team', icon: 'psychology' },
  { id: 'data-eng', name: 'Data Engineering Team', icon: 'storage' },
  { id: 'cloud', name: 'Cloud Infrastructure Team', icon: 'cloud' },
  { id: 'research', name: 'Research & Development Team', icon: 'science' }
];

const Team: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('founders');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredMembers = teamMembers.filter(member => {
    if (selectedSpecialty === 'founders') {
      return member.specialty.includes('Founders');
    }
    const specialtyMap: Record<string, string> = {
      'ai-ml': 'AI & Machine Learning',
      'data-eng': 'Data Engineering',
      'cloud': 'Cloud Infrastructure',
      'research': 'Research & Development'
    };
    return member.specialty.includes(specialtyMap[selectedSpecialty]);
  });

  const getSpecialtyColors = (specialtyId: string) => {
    switch(specialtyId) {
      case 'founders':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-400/30',
          text: 'text-emerald-400',
          shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.15)]',
          dot: 'bg-emerald-400',
          hoverBorder: 'hover:border-emerald-400/30',
          hoverShadow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]'
        };
      case 'ai-ml':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]',
          dot: 'bg-purple-500',
          hoverBorder: 'hover:border-purple-500/30',
          hoverShadow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]'
        };
      case 'data-eng':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',
          dot: 'bg-blue-500',
          hoverBorder: 'hover:border-blue-500/30',
          hoverShadow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
        };
      case 'cloud':
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/30',
          text: 'text-primary',
          shadow: 'shadow-[0_0_15px_rgba(37,226,244,0.15)]',
          dot: 'bg-primary',
          hoverBorder: 'hover:border-primary/30',
          hoverShadow: 'hover:shadow-[0_0_20px_rgba(37,226,244,0.2)]'
        };
      case 'research':
        return {
          bg: 'bg-accent-green/10',
          border: 'border-accent-green/30',
          text: 'text-accent-green',
          shadow: 'shadow-[0_0_15px_rgba(163,230,53,0.15)]',
          dot: 'bg-accent-green',
          hoverBorder: 'hover:border-accent-green/30',
          hoverShadow: 'hover:shadow-[0_0_20px_rgba(163,230,53,0.2)]'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/30',
          text: 'text-primary',
          shadow: 'shadow-[0_0_15px_rgba(37,226,244,0.15)]',
          dot: 'bg-primary',
          hoverBorder: 'hover:border-primary/30',
          hoverShadow: 'hover:shadow-[0_0_20px_rgba(37,226,244,0.2)]'
        };
    }
  };

  const getColorClasses = (theme: string) => {
    switch(theme) {
      case 'emerald':
        return {
          text: 'text-emerald-400',
          border: 'border-emerald-500/20',
          shadow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]',
          hoverBorder: 'hover:border-emerald-500/30'
        };
      case 'purple':
        return {
          text: 'text-purple-400',
          border: 'border-purple-500/20',
          shadow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]',
          hoverBorder: 'hover:border-purple-500/30'
        };
      case 'cyan':
        return {
          text: 'text-primary',
          border: 'border-primary/20',
          shadow: 'hover:shadow-[0_0_20px_rgba(37,226,244,0.2)]',
          hoverBorder: 'hover:border-primary/30'
        };
      case 'blue':
        return {
          text: 'text-blue-400',
          border: 'border-blue-500/20',
          shadow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]',
          hoverBorder: 'hover:border-blue-500/30'
        };
      default:
        return {
          text: 'text-primary',
          border: 'border-primary/20',
          shadow: 'hover:shadow-[0_0_20px_rgba(37,226,244,0.2)]',
          hoverBorder: 'hover:border-primary/30'
        };
    }
  };

  return (
    <section id="about" className="w-full py-20 md:py-24 bg-background-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Our People</h2>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight text-center">Architects of Intelligence</h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg text-center">World-class talent bridging the gap between academic research and industrial application.</p>
        </div>

        {/* Side Menu + Team Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-full glass-card rounded-xl px-4 py-3 border border-white/10 flex items-center justify-between hover:${getSpecialtyColors(selectedSpecialty).border} transition-all duration-300`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${getSpecialtyColors(selectedSpecialty).text}`}>filter_list</span>
                <span className="text-white font-medium text-sm">
                  {specialties.find(s => s.id === selectedSpecialty)?.name || 'Filter Specialty'}
                </span>
              </div>
              <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="mt-2 glass-card rounded-xl p-3 border border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-300">
                {specialties.map((specialty) => {
                  const colors = getSpecialtyColors(specialty.id);
                  const isActive = selectedSpecialty === specialty.id;
                  return (
                    <button
                      key={specialty.id}
                      onClick={() => {
                        setSelectedSpecialty(specialty.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                        isActive
                          ? `${colors.bg} border ${colors.border} text-white`
                          : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-lg ${
                        isActive ? colors.text : 'text-gray-500'
                      }`}>
                        {specialty.icon}
                      </span>
                      <span className="text-sm font-medium">{specialty.name}</span>
                      {isActive && (
                        <span className={`ml-auto size-2 rounded-full ${colors.dot} animate-pulse-slow`}></span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Sidebar - Specialty Filter */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="glass-card rounded-2xl border border-white/10 sticky top-24 overflow-hidden" style={{ height: '450px' }}>
              <nav className="flex flex-col justify-between h-full p-5">
                {specialties.map((specialty, index) => {
                  const colors = getSpecialtyColors(specialty.id);
                  const isActive = selectedSpecialty === specialty.id;
                  return (
                    <button
                      key={specialty.id}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                      className={`w-full flex items-center gap-3 px-4 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? `${colors.bg} border ${colors.border} text-white ${colors.shadow}`
                          : 'bg-white/5 border border-transparent text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10'
                      }`}
                      style={{ 
                        height: 'calc((100% - 0px) / 5)',
                        minHeight: '70px'
                      }}
                    >
                      <span className={`material-symbols-outlined text-2xl transition-colors ${
                        isActive ? colors.text : `text-gray-500 group-hover:${colors.text}`
                      }`}>
                        {specialty.icon}
                      </span>
                      <span className="text-base font-medium text-left flex-1">{specialty.name}</span>
                      {isActive && (
                        <span className={`size-2 rounded-full ${colors.dot} animate-pulse-slow flex-shrink-0`}></span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredMembers.map((member) => {
                const colors = getSpecialtyColors(selectedSpecialty);
                // Custom background positioning for specific members
                const getBackgroundPosition = () => {
                  if (member.id === '2') { // Felipe Araya
                    return 'center 25%'; // Move down slightly more for better framing
                  }
                  if (member.id === '1') { // Dr. Syed
                    return 'center 30%'; // Better positioning for mobile and desktop
                  }
                  return 'center center'; // Default for others
                };
                
                return (
                  <div 
                    key={member.id}
                    className={`group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-lg ${colors.hoverShadow} transition-all duration-500 ${colors.hoverBorder} border border-transparent`}
                  >
                    {/* Image with grayscale effect */}
                    <div 
                      className="absolute inset-0 bg-gray-800 bg-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                      style={{ 
                        backgroundImage: `url('${member.image}')`,
                        backgroundPosition: getBackgroundPosition()
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-90"></div>
                    
                    {/* Fixed positioning for consistent alignment */}
                    <div className="absolute bottom-0 left-0 w-full p-8">
                      <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl font-bold text-white leading-tight" style={{ marginBottom: '8px' }}>{member.name}</h3>
                        <p className={`${colors.text} font-medium leading-tight`} style={{ marginBottom: '16px' }}>{member.role}</p>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-wrap gap-2" style={{ marginBottom: '16px' }}>
                          {member.tags.map(tag => (
                            <span 
                              key={tag} 
                              className={`px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border ${colors.border}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3 leading-relaxed">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredMembers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-6">
                <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">person_search</span>
                <h3 className="text-xl font-semibold text-white mb-2">No team members found</h3>
                <p className="text-gray-400 text-center">Try selecting a different specialty from the menu.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;
