import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  tags: string[];
  description: string;
  fullBio: string;
  achievements: string[];
  image: string;
}

// Only Felipe and Syed - Founders
const founders: TeamMember[] = [
  {
    id: '2',
    name: 'Felipe Araya',
    role: 'Lead AI Scientist',
    tags: ['Agentic AI', 'MLOps', 'Production Deployments'],
    description: 'Leads AI innovation from research to production. Deep expertise in advanced machine learning, generative AI, autonomous agent systems, MLOps pipelines, model deployment, and intelligent monitoring systems that drive business value.',
    fullBio: 'Felipe leads AI innovation at Imkan, bridging cutting-edge research with practical business applications. With extensive experience in advanced machine learning, generative AI, and autonomous agent systems, he architects intelligent solutions that deliver measurable business impact. His expertise spans the full AI lifecycle and Machine Learning lifecycle; from initial research and experimentation to production-grade deployment and continuous optimization. Felipe specializes in building Data Science solutions, agentic AI systems, implementing robust MLOps frameworks, and creating intelligent monitoring solutions that ensure AI systems operate reliably at scale.',
    achievements: [
      'Architected multi-agent AI systems for enterprise automation',
      'Deployed production LLM solutions serving millions of users',
      'Built end-to-end MLOps pipelines for multi-national companies',
      'Expert in RAG systems and vector database optimization',
      'Pioneered real-time model monitoring and observability frameworks',
      'Led AI strategy workshops for Vision 2030 aligned organizations'
    ],
    image: '/images/profile_pictures/real_felipe.png'
  },
  {
    id: '1',
    name: 'Dr. Syed Fawad Ali',
    role: 'Lead Data Engineer',
    tags: ['Data Architecture', 'ETL Pipelines', 'Governance'],
    description: 'Expert in building enterprise data foundations from the ground up. Specializes in data strategy, modern data warehousing, ETL/ELT pipelines, data quality frameworks, and scalable cloud infrastructure that enables AI at scale.',
    fullBio: 'Dr. Syed is a leading expert in enterprise data engineering and architecture. He specializes in transforming complex, scattered data landscapes into unified, intelligent data platforms that power AI and analytics at scale. With deep expertise in data strategy, governance, and modern cloud architectures, Syed designs and implements robust data foundations that enable organizations to extract maximum value from their data assets. His work focuses on building automated ETL/ELT pipelines, implementing comprehensive data quality frameworks, and establishing scalable infrastructure that supports real-time analytics and machine learning workloads.',
    achievements: [
      'Architected cloud data platforms processing billions of records daily',
      'Designed data governance frameworks for regulated industries',
      'Built real-time streaming pipelines with sub-second latency',
      'Implemented enterprise-wide data quality and observability systems',
      'Led digital transformation initiatives for Saudi Vision 2030 projects',
      'Expert in modern data stack (Snowflake, Databricks, Azure Synapse)'
    ],
    image: '/images/profile_pictures/real_syed.png'
  }
];

const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
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
                onClick={() => setSelectedMember(member)}
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

      {/* Team Member Detail Modal - Same pattern as Services */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedMember(null)}
          ></div>
          <div className="relative w-full max-w-4xl bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
            {/* Modal Sidebar / Photo */}
            <div className="w-full md:w-1/3 bg-surface-dark relative hidden md:block">
              <img 
                src={selectedMember.image} 
                alt={selectedMember.name} 
                className="w-full h-full object-cover"
                style={{ 
                  objectPosition: selectedMember.id === '2' ? 'center 25%' : 'center 30%'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-card"></div>
              <div className="absolute bottom-8 left-8">
                <div className={`size-16 rounded-xl bg-white/5 border border-emerald-400/30 flex items-center justify-center ${colors.text} mb-4 backdrop-blur-md`}>
                  <span className="material-symbols-outlined text-4xl">person</span>
                </div>
                <h3 className="text-white text-xl font-bold leading-tight">{selectedMember.name}</h3>
                <p className={`${colors.text} text-sm font-medium mt-1`}>{selectedMember.role}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-8 md:p-10 overflow-y-auto">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              {/* Mobile Header */}
              <div className="md:hidden mb-6 flex items-center gap-4">
                <div className={`size-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${colors.text}`}>
                  <span className="material-symbols-outlined text-2xl">person</span>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">{selectedMember.name}</h3>
                  <p className={`${colors.text} text-sm font-medium`}>{selectedMember.role}</p>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedMember.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border ${colors.border}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Full Biography */}
              <h4 className={`text-sm font-bold uppercase tracking-widest mb-4 ${colors.text}`}>
                About
              </h4>
              <p className="text-gray-300 text-base leading-relaxed mb-8 border-b border-white/10 pb-8">
                {selectedMember.fullBio}
              </p>

              {/* Key Achievements */}
              <h5 className="text-white font-bold mb-4">Key Expertise & Achievements</h5>
              <ul className="grid grid-cols-1 gap-3 mb-8">
                {selectedMember.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-lg mt-0.5 ${colors.text}`}>check_circle</span>
                    <span className="text-gray-400 text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="w-full bg-emerald-400 text-background-dark font-bold py-3 px-6 rounded-lg hover:bg-emerald-300 transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Team;
