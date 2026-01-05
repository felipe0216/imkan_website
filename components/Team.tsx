import React from 'react';

const Team: React.FC = () => {
  return (
    <section id="about" className="w-full py-24 bg-background-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Leadership</h2>
          <h1 className="text-3xl md:text-5xl font-light text-white mb-6">Built by Engineers</h1>
          <p className="text-text-muted max-w-2xl text-lg">
             Led by founders with 15+ years of experience in deploying large-scale neural networks and cloud-native solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          
          {/* Profile 1: Dr. Syed */}
          <div className="group relative h-[500px] rounded-sm overflow-hidden cursor-pointer border border-white/5 hover:border-primary/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gray-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwUTc-60iyPqbS7h5OTVQWphY7LFpu6Yy2CEwbPgICptkLqSuhr5RIi6UwtORIe9BqlTtB5aTVYYzJGFbxuDApyxMRmJtdJEHxfuxLiNjO6MW2bczLxVGUANeQzwbPA7h0jWgHAcps0yVM778TEiEIvNn02whEfEWzhY1h7lym59twZJ2Yr9Spp_oIl7Z6vXlkfa7h0S_R_MCQDza0ZbCBefSNPUmHDtyC_6qXN3iAMqnkUwXylOnOSTjYUZgvBNZ8Ssf_h7MjXZZd')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-1">Dr. Syed Fawad Ali</h3>
                <p className="text-primary font-mono text-sm mb-6">Lead AI Scientist & Founder</p>
                
                <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                   <div className="w-12 h-0.5 bg-primary"></div>
                   <p className="text-gray-300 text-sm leading-relaxed">
                      Specializing in NLP, Generative AI, and Computer Vision. Architecting the intelligent core of Imkan's solutions.
                   </p>
                   <div className="flex gap-2">
                       <span className="text-[10px] border border-white/20 px-2 py-1 rounded text-white/70">PhD in AI</span>
                       <span className="text-[10px] border border-white/20 px-2 py-1 rounded text-white/70">15+ Years Exp</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile 2: Felipe */}
          <div className="group relative h-[500px] rounded-sm overflow-hidden cursor-pointer border border-white/5 hover:border-accent-green/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gray-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLmbLKx5KODpM8MVzOTdbUQRpWuk2JotA07vprchgwiv0nlTpnwH4VCmbCbrA4oFdzcPyyBo-tgf6_WT9E34FWF2CdmwAT_g-4_Bd2WbKvsq1YH3lBHceL9UWWQ1DEuOtXORlLFzWj3xjB9CQjvuCyv0L7KiOLTsO7RUWnptpmWhtGUqvYRM4xC-wUcCeg1mnKm7klH7Jp5xh9GtyFc7OBbiYCuszoQf8Ow_dTgWsGVpKiYRqLzdzg4cj7CvG_fZP0RBSKTYK11u5k')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-1">Felipe Araya</h3>
                <p className="text-accent-green font-mono text-sm mb-6">Lead Data Engineer & Founder</p>
                
                 <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                   <div className="w-12 h-0.5 bg-accent-green"></div>
                   <p className="text-gray-300 text-sm leading-relaxed">
                      Expert in scalable infrastructure, Agentic AI, and Cloud Architecture. Turning strategy into production-grade reality.
                   </p>
                   <div className="flex gap-2">
                       <span className="text-[10px] border border-white/20 px-2 py-1 rounded text-white/70">Cloud Architect</span>
                       <span className="text-[10px] border border-white/20 px-2 py-1 rounded text-white/70">Data Pipelines</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;