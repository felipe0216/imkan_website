import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">hub</span>
                <span className="text-xl font-bold text-white tracking-tight">Imkan.ai</span>
             </div>
             <p className="text-text-muted text-sm max-w-xs">
                Engineering the future of hybrid intelligence in the Kingdom.
             </p>
          </div>

          <div className="flex flex-col gap-2">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Headquarters</h4>
              <div className="flex items-start gap-3 text-gray-400">
                <span className="material-symbols-outlined text-primary mt-1 text-lg">location_on</span>
                <div className="flex flex-col text-sm">
                    <span className="text-white">Riyadh</span>
                    <span>Kingdom of Saudi Arabia</span>
                </div>
              </div>
          </div>

          <div className="flex gap-4">
             <a href="#" className="size-10 rounded-sm bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all">
                <span className="material-symbols-outlined text-lg">work</span>
             </a>
             <a href="#" className="size-10 rounded-sm bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all">
                <span className="material-symbols-outlined text-lg">mail</span>
             </a>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
          <p>© 2026 Imkan.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;