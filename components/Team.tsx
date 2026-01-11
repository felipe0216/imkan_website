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
    id: '1',
    name: 'Dr. Syed Fawad Ali',
    role: 'Co-founder & Lead Data Engineer',
    specialty: ['Founders', 'Data Engineering', 'Cloud Infrastructure'],
    tags: ['Data Architecture', 'ETL Pipelines', 'Data Governance'],
    description: 'Expert in building enterprise data foundations from the ground up. Specializes in data strategy, modern data warehousing, ETL/ELT pipelines, data quality frameworks, and scalable cloud infrastructure that enables AI at scale.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwUTc-60iyPqbS7h5OTVQWphY7LFpu6Yy2CEwbPgICptkLqSuhr5RIi6UwtORIe9BqlTtB5aTVYYzJGFbxuDApyxMRmJtdJEHxfuxLiNjO6MW2bczLxVGUANeQzwbPA7h0jWgHAcps0yVM778TEiEIvNn02whEfEWzhY1h7lym59twZJ2Yr9Spp_oIl7Z6vXlkfa7h0S_R_MCQDza0ZbCBefSNPUmHDtyC_6qXN3iAMqnkUwXylOnOSTjYUZgvBNZ8Ssf_h7MjXZZd',
    colorTheme: 'emerald'
  },
  {
    id: '2',
    name: 'Felipe Araya',
    role: 'Co-founder & Lead AI Scientist',
    specialty: ['Founders', 'AI & Machine Learning', 'Research & Development'],
    tags: ['Agentic AI', 'MLOps', 'Production Deployments'],
    description: 'Leads AI innovation from research to production. Deep expertise in advanced machine learning, generative AI, autonomous agent systems, MLOps pipelines, model deployment, and intelligent monitoring systems that drive business value.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLmbLKx5KODpM8MVzOTdbUQRpWuk2JotA07vprchgwiv0nlTpnwH4VCmbCbrA4oFdzcPyyBo-tgf6_WT9E34FWF2CdmwAT_g-4_Bd2WbKvsq1YH3lBHceL9UWWQ1DEuOtXORlLFzWj3xjB9CQjvuCyv0L7KiOLTsO7RUWnptpmWhtGUqvYRM4xC-wUcCeg1mnKm7klH7Jp5xh9GtyFc7OBbiYCuszoQf8Ow_dTgWsGVpKiYRqLzdzg4cj7CvG_fZP0RBSKTYK11u5k',
    colorTheme: 'purple'
  }
];

const specialties = [
  { id: 'founders', name: 'Founders Team', icon: 'workspace_premium' },
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
    <section id="about" className="w-full py-20 md:py-24 bg-[#0d1a1b] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[80px] pointer-events-none"></div>

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
              className="w-full glass-card rounded-xl px-4 py-3 border border-white/10 flex items-center justify-between hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">filter_list</span>
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
                {specialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    onClick={() => {
                      setSelectedSpecialty(specialty.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                      selectedSpecialty === specialty.id
                        ? 'bg-primary/10 border border-primary/30 text-white'
                        : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-lg ${
                      selectedSpecialty === specialty.id ? 'text-primary' : 'text-gray-500'
                    }`}>
                      {specialty.icon}
                    </span>
                    <span className="text-sm font-medium">{specialty.name}</span>
                    {selectedSpecialty === specialty.id && (
                      <span className="ml-auto size-2 rounded-full bg-primary animate-pulse-slow"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar - Specialty Filter */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="glass-card rounded-2xl p-5 border border-white/10 sticky top-24">
              <nav className="space-y-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    onClick={() => setSelectedSpecialty(specialty.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      selectedSpecialty === specialty.id
                        ? 'bg-primary/10 border border-primary/30 text-white shadow-[0_0_15px_rgba(37,226,244,0.15)]'
                        : 'bg-white/5 border border-transparent text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-xl transition-colors ${
                      selectedSpecialty === specialty.id ? 'text-primary' : 'text-gray-500 group-hover:text-primary'
                    }`}>
                      {specialty.icon}
                    </span>
                    <span className="text-sm font-medium text-left">{specialty.name}</span>
                    {selectedSpecialty === specialty.id && (
                      <span className="ml-auto size-2 rounded-full bg-primary animate-pulse-slow"></span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredMembers.map((member) => {
                const colors = getColorClasses(member.colorTheme);
                return (
                  <div 
                    key={member.id}
                    className={`group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-lg ${colors.shadow} transition-all duration-500 ${colors.hoverBorder} border border-transparent`}
                  >
                    {/* Image with grayscale effect */}
                    <div 
                      className="absolute inset-0 bg-gray-800 bg-cover bg-center transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                      style={{ backgroundImage: `url('${member.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                      <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                        <p className={`${colors.text} font-medium mb-4`}>{member.role}</p>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-wrap gap-2">
                          {member.tags.map(tag => (
                            <span 
                              key={tag} 
                              className={`px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border ${colors.border}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <p className="mt-4 text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3 leading-relaxed">
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