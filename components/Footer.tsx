import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#05080a] border-t border-white/10 pt-16 md:pt-20 pb-6 md:pb-10 overflow-hidden">
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      
      {/* Massive Watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="flex items-center justify-center">
          <h1 className="text-[20vw] font-black text-white leading-none whitespace-nowrap select-none flex items-center">
            imkan
            <span className="inline-block w-[3vw] h-[3vw] rounded-full bg-primary mx-[1vw] translate-y-[-0.5vw]"></span>
            ai
          </h1>
        </div>
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-8 md:mb-12">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col">
              <span
                className="
                  text-[24px] md:text-[26px] font-bold tracking-tight leading-none
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-primary/70 via-white/80 to-accent-green/70
                  bg-[length:200%_auto] animate-text-gradient
                  drop-shadow-[0_0_10px_rgba(255,255,255,0.10)]
                "
              >
                imkan

                {/* POP DOT – slightly smaller */}
                <span
                  className="
                    inline-block align-middle mx-[5px]
                    w-[8px] h-[8px] md:w-[9px] md:h-[9px]
                    rounded-full
                    bg-primary
                    shadow-[0_0_12px_rgba(37,226,244,0.45)]
                    ring-1 ring-white/20
                    translate-y-[-1px]
                  "
                  aria-hidden="true"
                />

                ai
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm">
               We bridge the gap between academic research and industrial application, delivering sovereign AI solutions for the Kingdom.
            </p>
          </div>

          {/* Links Column 1 (Span 2) */}
          <div className="md:col-span-2 md:col-start-6">
             <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                Company
             </h4>
             <ul className="space-y-3 text-gray-400">
                <li>
                   <a href="#services" className="hover:text-primary hover:pl-2 transition-all duration-300 block text-sm">Services</a>
                </li>
                <li>
                   <a href="#why-us" className="hover:text-primary hover:pl-2 transition-all duration-300 block text-sm">Why Us</a>
                </li>
                <li>
                   <a href="#about" className="hover:text-primary hover:pl-2 transition-all duration-300 block text-sm">About</a>
                </li>
                <li>
                   <a href="#" className="hover:text-primary hover:pl-2 transition-all duration-300 block text-sm">Privacy</a>
                </li>
                <li>
                   <a href="#" className="hover:text-primary hover:pl-2 transition-all duration-300 block text-sm">Terms</a>
                </li>
             </ul>
          </div>

          {/* Links Column 2 (Span 2) */}
          <div className="md:col-span-2">
             <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                Solutions
             </h4>
             <ul className="space-y-3 text-gray-400">
                <li>
                   <a href="#methodology" className="hover:text-purple-400 hover:pl-2 transition-all duration-300 block text-sm">Methodology</a>
                </li>
                <li>
                   <a href="#cases" className="hover:text-purple-400 hover:pl-2 transition-all duration-300 block text-sm">Cases</a>
                </li>
                <li>
                   <a href="#contact" className="hover:text-purple-400 hover:pl-2 transition-all duration-300 block text-sm">Contact Us</a>
                </li>
             </ul>
          </div>

          {/* Socials (Span 3) */}
          <div className="md:col-span-3">
             <h4 className="text-white font-bold mb-6">Stay Connected</h4>
             <div className="flex gap-3">
                <a href="#" className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-primary hover:text-black hover:scale-110">
                   <span className="material-symbols-outlined">mail</span>
                </a>
                <a href="#" className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                   </svg>
                </a>
             </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-6 md:pt-8 flex justify-center md:justify-start items-center">
           <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Imkan.ai. Building the future of KSA.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;