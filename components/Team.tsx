import React from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  tags: string[];
  description: string;
  image: string;
}

// Only Felipe and Syed - Founders
const founders: TeamMember[] = [
  {
    id: '2',
    name: 'Felipe Araya',
    role: 'Co-founder & Lead AI Scientist',
    tags: ['Agentic AI', 'MLOps', 'Production Deployments'],
    description: 'Leads AI innovation from research to production. Deep expertise in advanced machine learning, generative AI, autonomous agent systems, MLOps pipelines, model deployment, and intelligent monitoring systems that drive business value.',
    image: '/images/profile_pictures/real_felipe.png'
  },
  {
    id: '1',
    name: 'Dr. Syed Fawad Ali',
    role: 'Co-founder & Lead Data Engineer',
    tags: ['Data Architecture', 'ETL Pipelines', 'Governance'],
    description: 'Expert in building enterprise data foundations from the ground up. Specializes in data strategy, modern data warehousing, ETL/ELT pipelines, data quality frameworks, and scalable cloud infrastructure that enables AI at scale.',
    image: '/images/profile_pictures/real_syed.png'
  }
];

const Team: React.FC = () => {
  // Emerald color scheme for founders
  const colors = {
    text: 'text-emerald-400',
    border: 'border-emerald-400/30',
    hoverBorder: 'hover:border-emerald-400/30',
    hoverShadow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]'
  };

  // Custom background positioning for specific members
  const getBackgroundPosition = (id: string) => {
    if (id === '2') { // Felipe Araya
      return 'center 25%';
    }
    if (id === '1') { // Dr. Syed
      return 'center 30%';
    }
    return 'center center';
  };

  return (
    <section id="about" className="w-full py-20 md:py-24 bg-background-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Our People</h2>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight text-center">Architects of Intelligence</h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg text-center">World-class talent bridging the gap between academic research and industrial application.</p>
        </div>

        {/* Founders Grid - Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl w-full">
            {founders.map((member) => (
              <div 
                key={member.id}
                className={`group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-lg ${colors.hoverShadow} transition-all duration-500 ${colors.hoverBorder} border border-transparent`}
              >
                {/* Image with grayscale effect */}
                <div 
                  className="absolute inset-0 bg-gray-800 bg-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                  style={{ 
                    backgroundImage: `url('${member.image}')`,
                    backgroundPosition: getBackgroundPosition(member.id)
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-90"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white leading-tight" style={{ marginBottom: '8px' }}>
                      {member.name}
                    </h3>
                    <p className={`${colors.text} font-medium leading-tight`} style={{ marginBottom: '16px' }}>
                      {member.role}
                    </p>
                    
                    {/* Tags */}
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
                    
                    {/* Description */}
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
