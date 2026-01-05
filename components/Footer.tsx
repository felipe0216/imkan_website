import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080f10] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Location */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white">
              <div className="size-6 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">neurology</span>
              </div>
              <h3 className="text-xl font-bold">Imkan.ai</h3>
            </div>
            <div className="flex items-start gap-3 text-gray-400">
              <span className="material-symbols-outlined text-primary mt-1 text-lg">location_on</span>
              <div className="flex flex-col">
                <span className="text-white font-medium">Riyadh</span>
                <span className="text-sm">Kingdom of Saudi Arabia</span>
              </div>
            </div>
            {/* Map Preview */}
            <div className="h-24 w-full rounded-lg bg-gray-800/50 overflow-hidden border border-white/10 opacity-80 hover:opacity-100 transition-opacity">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0syEMF0AI2Td4_32Ins264eiSZjPh9BWtQyKHDk6xcuK3ohFRWG4HcfDKrQ1alBCyruEZ6R4UGIYaGarjZwqkJuPeOOHKZNm_YsGt1JJDnYt5bWZCEkFwZPI7TgMM91_MdN4LhSPMAktFHF48xtbzqg70wVP4SN8dY3UQ-dbwu3pocHPgPMk-weMmLqs7OJ-WxT6Z37hWkMpfQxvCdEquOpNQCI8h5AZA2mMq6IHxDFWQloFs0BCJiF2GzIQ0zbslX5Kg33XWaOyi" alt="Map" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {['About Us', 'Methodology', 'Careers', 'Contact'].map(link => (
                 <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {['Data Engineering', 'AI & Machine Learning', 'Cloud Architecture', 'Digital Transformation'].map(link => (
                 <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
               {['work', 'code', 'share'].map((icon, i) => (
                  <a key={i} href="#" className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-all">
                     <span className="material-symbols-outlined text-lg">{icon}</span>
                  </a>
               ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 Imkan.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;