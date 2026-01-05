import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#05080a] border-t border-white/10 pt-20 pb-10 overflow-hidden">
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      
      {/* Massive Watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
         <h1 className="text-[20vw] font-black text-white leading-none whitespace-nowrap text-center select-none">IMKAN.AI</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top CTA Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 border-b border-white/5 pb-12">
           <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Ready to Engineer the <span className="text-primary">Future?</span></h2>
              <p className="text-gray-400 text-lg">Join the architects of intelligence. Let's build systems that scale beyond tomorrow.</p>
           </div>
           <button className="relative overflow-hidden bg-white text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-primary transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] group shrink-0">
              <span className="relative z-10 flex items-center gap-2">
                 Start a Project 
                 <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
               <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">hub</span>
               </div>
               <span className="text-2xl font-bold text-white tracking-tight">Imkan.ai</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm">
               We bridge the gap between academic research and industrial application, delivering sovereign AI solutions for the Kingdom.
            </p>
            
            {/* Location Badge */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 w-fit">
               <div className="relative size-10 rounded-md overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0syEMF0AI2Td4_32Ins264eiSZjPh9BWtQyKHDk6xcuK3ohFRWG4HcfDKrQ1alBCyruEZ6R4UGIYaGarjZwqkJuPeOOHKZNm_YsGt1JJDnYt5bWZCEkFwZPI7TgMM91_MdN4LhSPMAktFHF48xtbzqg70wVP4SN8dY3UQ-dbwu3pocHPgPMk-weMmLqs7OJ-WxT6Z37hWkMpfQxvCdEquOpNQCI8h5AZA2mMq6IHxDFWQloFs0BCJiF2GzIQ0zbslX5Kg33XWaOyi" alt="Riyadh" className="w-full h-full object-cover grayscale opacity-70" />
                  <div className="absolute inset-0 bg-primary/20"></div>
               </div>
               <div>
                  <div className="text-white text-sm font-bold flex items-center gap-2">
                     Riyadh HQ
                     <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  </div>
                  <div className="text-xs text-gray-500">King Abdullah Financial District</div>
               </div>
            </div>
          </div>

          {/* Links Column 1 (Span 2) */}
          <div className="md:col-span-2 md:col-start-6">
             <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                Company
             </h4>
             <ul className="space-y-3 text-gray-400">
                {['About', 'Careers', 'Methodology', 'Contact'].map(item => (
                   <li key={item}>
                      <a href="#" className="hover:text-primary hover:pl-2 transition-all duration-300 block text-sm">{item}</a>
                   </li>
                ))}
             </ul>
          </div>

          {/* Links Column 2 (Span 2) */}
          <div className="md:col-span-2">
             <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                Solutions
             </h4>
             <ul className="space-y-3 text-gray-400">
                {['Data Strategy', 'Agentic AI', 'Engineering', 'Decision Intel'].map(item => (
                   <li key={item}>
                      <a href="#" className="hover:text-purple-400 hover:pl-2 transition-all duration-300 block text-sm">{item}</a>
                   </li>
                ))}
             </ul>
          </div>

          {/* Socials / Newsletter (Span 3) */}
          <div className="md:col-span-3">
             <h4 className="text-white font-bold mb-6">Stay Connected</h4>
             <div className="flex gap-3 mb-6">
                {[
                   { icon: 'mail', color: 'hover:bg-primary hover:text-black' },
                   { icon: 'code', color: 'hover:bg-white hover:text-black' },
                   { icon: 'alternate_email', color: 'hover:bg-blue-500 hover:text-white' }
                ].map((social, i) => (
                   <a key={i} href="#" className={`size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:scale-110`}>
                      <span className="material-symbols-outlined">{social.icon}</span>
                   </a>
                ))}
             </div>
             
             {/* System Status */}
             <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">System Status</span>
                   <span className="text-xs font-bold text-green-400">OPERATIONAL</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 w-full animate-pulse"></div>
                </div>
             </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-gray-600 text-sm">© 2024 Imkan.ai. Building the future of KSA.</p>
           <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;