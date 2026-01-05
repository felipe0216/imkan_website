import React from 'react';

const Team: React.FC = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-[900px] mx-auto">
          
          {/* Profile 1 */}
          <div className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(37,226,244,0.15)] transition-all duration-500">
            <div className="absolute inset-0 bg-gray-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwUTc-60iyPqbS7h5OTVQWphY7LFpu6Yy2CEwbPgICptkLqSuhr5RIi6UwtORIe9BqlTtB5aTVYYzJGFbxuDApyxMRmJtdJEHxfuxLiNjO6MW2bczLxVGUANeQzwbPA7h0jWgHAcps0yVM778TEiEIvNn02whEfEWzhY1h7lym59twZJ2Yr9Spp_oIl7Z6vXlkfa7h0S_R_MCQDza0ZbCBefSNPUmHDtyC_6qXN3iAMqnkUwXylOnOSTjYUZgvBNZ8Ssf_h7MjXZZd')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-1">Dr. Syed Fawad Ali</h3>
                <p className="text-primary font-medium mb-4">Lead AI Scientist</p>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-wrap gap-2">
                   {['NLP', 'Computer Vision', 'Generative AI'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border border-white/10">{tag}</span>
                   ))}
                </div>
                
                <p className="mt-4 text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3 leading-relaxed">
                   Leading our research initiatives with over 15 years of experience in deploying large-scale neural networks for enterprise solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Profile 2 */}
          <div className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(37,226,244,0.15)] transition-all duration-500">
            <div className="absolute inset-0 bg-gray-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLmbLKx5KODpM8MVzOTdbUQRpWuk2JotA07vprchgwiv0nlTpnwH4VCmbCbrA4oFdzcPyyBo-tgf6_WT9E34FWF2CdmwAT_g-4_Bd2WbKvsq1YH3lBHceL9UWWQ1DEuOtXORlLFzWj3xjB9CQjvuCyv0L7KiOLTsO7RUWnptpmWhtGUqvYRM4xC-wUcCeg1mnKm7klH7Jp5xh9GtyFc7OBbiYCuszoQf8Ow_dTgWsGVpKiYRqLzdzg4cj7CvG_fZP0RBSKTYK11u5k')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
              <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-1">Felipe Araya</h3>
                <p className="text-primary font-medium mb-4">Lead Data Engineer</p>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-wrap gap-2">
                   {['Scalable Infrastructure', 'Cloud Architecture'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border border-white/10">{tag}</span>
                   ))}
                </div>
                
                <p className="mt-4 text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3 leading-relaxed">
                   Architecting resilient data pipelines and cloud-native solutions that power our clients' most critical decision-making systems.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;