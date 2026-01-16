import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <>
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
            
            {/* Address */}
            <div className="flex items-start gap-3 text-gray-500 text-sm max-w-sm">
              <span className="material-symbols-outlined text-primary mt-0.5 flex-shrink-0">location_on</span>
              <p className="leading-relaxed">
                8392 Prince Turki Bin Abdulaziz Al Awwal, 5246 King Saud University district, Riyadh, 12371, Saudi Arabia
              </p>
            </div>
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
                   <button 
                     onClick={() => setShowPrivacyModal(true)}
                     className="hover:text-primary hover:pl-2 transition-all duration-300 block text-sm text-left"
                   >
                     Privacy
                   </button>
                </li>
                <li>
                   <button 
                     onClick={() => setShowTermsModal(true)}
                     className="hover:text-primary hover:pl-2 transition-all duration-300 block text-sm text-left"
                   >
                     Terms
                   </button>
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

    {/* Privacy Policy Modal */}
    {showPrivacyModal && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background-dark/95 backdrop-blur-sm"
          onClick={() => setShowPrivacyModal(false)}
        ></div>

        {/* Modal Container */}
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button 
            onClick={() => setShowPrivacyModal(false)}
            className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white transition-colors bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg p-2"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh] p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
              <p className="text-gray-400 text-sm">Last updated: January 2026</p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-300 leading-relaxed mb-4">
                This Privacy Policy explains how <span className="text-primary font-medium">imkan.ai</span> ("imkan.ai", "we", "our", "us") collects, uses, discloses, and protects personal data when you visit our website or interact with us.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We are committed to protecting personal data in accordance with applicable laws and regulations, including the Saudi Personal Data Protection Law (PDPL).
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">1.</span> Who We Are
              </h2>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-medium text-white">Legal Entity:</span> imkan.ai</p>
                <p><span className="font-medium text-white">Location:</span> Riyadh, Saudi Arabia</p>
                <p><span className="font-medium text-white">Contact Email:</span> <a href="mailto:info@imkan.ai" className="text-primary hover:underline">info@imkan.ai</a></p>
              </div>
              <p className="text-gray-300 leading-relaxed mt-4">
                If you have any questions about this Privacy Policy or how we handle personal data, you may contact us using the details above.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">2.</span> Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.1 Personal Data You Provide</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                We may collect personal data when you voluntarily provide it to us, including through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Contact forms on our website</li>
                <li>Booking or calendar scheduling links</li>
                <li>Direct communications (email or messaging)</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mb-3">This may include:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Company or organization name</li>
                <li>Job title</li>
                <li>Message content or inquiry details</li>
              </ul>
              <p className="text-gray-300 leading-relaxed italic">
                Providing this information is voluntary, but necessary for us to respond to your request.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-gray-300 leading-relaxed">
                At this time, we do not intentionally collect personal data through analytics tools, advertising pixels, or tracking technologies. If this changes in the future, this Privacy Policy will be updated accordingly.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">3.</span> How We Use Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                We use personal data only for legitimate business purposes, including to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Respond to inquiries and contact requests</li>
                <li>Schedule and manage meetings or consultations</li>
                <li>Communicate about our services</li>
                <li>Improve our service quality and client interactions</li>
                <li>Comply with legal or regulatory obligations</li>
              </ul>
              <p className="text-gray-300 leading-relaxed font-medium">
                We do not sell, rent, or trade personal data.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">4.</span> Client Data & Consulting Engagements
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Outside of this website, we may receive access to client-provided data as part of consulting or advisory engagements.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Client data is processed only with explicit approval</li>
                <li>Client data is handled strictly in accordance with contractual terms</li>
                <li>Client data remains the property of the client</li>
                <li>We act as a service provider / processor unless otherwise agreed</li>
                <li>We do not use client data for training AI models or third-party systems without explicit consent</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">5.</span> Use of AI and Third-Party Tools
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Where AI or advanced analytics tools are used:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>They are used only with explicit client approval</li>
                <li>Appropriate safeguards are applied</li>
                <li>No client data is shared beyond agreed-upon purposes</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">6.</span> Data Retention
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                We retain personal data only for as long as necessary:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Contact form and inquiry data: up to 24 months</li>
                <li>Scheduling and communication records: up to 24 months</li>
                <li>Client data: as defined in contractual agreements</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Data may be retained longer if required by law or for legitimate legal purposes.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">7.</span> Data Deletion & Your Rights
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal data</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                To exercise any of these rights, please contact us at <a href="mailto:info@imkan.ai" className="text-primary hover:underline">info@imkan.ai</a>. We will respond in accordance with applicable legal requirements.
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">8.</span> Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                We take reasonable and appropriate measures to protect personal data, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Secure systems and access controls</li>
                <li>Limiting access to authorized personnel only</li>
                <li>Organizational and technical safeguards</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                While no system can be guaranteed 100% secure, we continuously work to protect the confidentiality and integrity of data.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">9.</span> Cookies and Tracking
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">Currently:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>We do not use cookies for analytics or advertising</li>
                <li>We do not deploy tracking pixels</li>
                <li>We do not run behavioral profiling</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                If cookies or tracking technologies are introduced in the future, this Privacy Policy will be updated accordingly.
              </p>
            </div>

            {/* Section 10 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">10.</span> International Data Transfers
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Personal data may be processed or accessed outside Saudi Arabia if required for service delivery. In such cases, appropriate safeguards will be applied in line with applicable laws.
              </p>
            </div>

            {/* Section 11 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">11.</span> Children's Privacy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our website and services are not intended for children under the age of 16. We do not knowingly collect personal data from children.
              </p>
            </div>

            {/* Section 12 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">12.</span> Changes to This Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </div>

            {/* Section 13 - Responsible AI Statement */}
            <div className="mb-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">13.</span> Responsible AI Statement
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                At imkan.ai, we believe that Artificial Intelligence should enhance human decision-making, not replace accountability or judgment. Our approach to AI is grounded in responsibility, transparency, and trust — particularly when working with sensitive, high-impact data environments.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2 mt-4">Human-Centric by Design</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We design AI systems with human oversight at their core. AI-driven insights, recommendations, or automations are always subject to human review and governance, especially in strategic, operational, or policy-relevant contexts.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">Purpose-Bound Use</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                AI technologies are used only for clearly defined, legitimate purposes aligned with client objectives. We do not deploy AI in ways that introduce hidden surveillance, automated decision-making without oversight, or unintended secondary uses of data.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">Data Responsibility & Privacy</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                AI solutions developed by imkan.ai respect data ownership and confidentiality. Client data is:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Used only with explicit authorization</li>
                <li>Processed strictly within agreed scopes</li>
                <li>Never reused or repurposed without consent</li>
                <li>Never used to train third-party or general AI models unless explicitly approved</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-2">Fairness, Bias & Transparency</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We actively assess AI solutions for bias, unintended outcomes, and data limitations. Where risks are identified, we work with clients to mitigate them through improved data practices, model design, or governance controls. We aim to make AI outputs understandable and explainable to stakeholders.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">Security & Integrity</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                AI systems are implemented within secure architectures that follow established data protection and access control practices. Safeguards are applied to protect data integrity, prevent misuse, and reduce exposure to unauthorized access.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">Compliance & Ethical Alignment</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our AI practices are aligned with applicable laws and regulations, including the Saudi Personal Data Protection Law (PDPL), and informed by emerging global best practices in responsible and ethical AI.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">Continuous Review</h3>
              <p className="text-gray-300 leading-relaxed">
                Responsible AI is not a one-time decision. We continuously review AI implementations as technologies, regulations, and societal expectations evolve, ensuring that solutions remain aligned with ethical standards and business responsibility.
              </p>
            </div>

            {/* Section 14 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">14.</span> Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                For questions, concerns, or data requests, please contact:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-medium text-white">Email:</span> <a href="mailto:info@imkan.ai" className="text-primary hover:underline">info@imkan.ai</a></p>
                <p><span className="font-medium text-white">Location:</span> Riyadh, Saudi Arabia</p>
              </div>
            </div>

            {/* Close Button at Bottom */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full md:w-auto bg-primary text-background-dark font-bold px-8 py-3 rounded-xl hover:bg-white transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Terms & Conditions Modal */}
    {showTermsModal && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background-dark/95 backdrop-blur-sm"
          onClick={() => setShowTermsModal(false)}
        ></div>

        {/* Modal Container */}
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button 
            onClick={() => setShowTermsModal(false)}
            className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white transition-colors bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg p-2"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh] p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
              <p className="text-gray-400 text-sm">Last updated: January 2026</p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-300 leading-relaxed mb-4">
                These Terms & Conditions ("Terms") govern your access to and use of the imkan.ai website and any related content or services provided by <span className="text-primary font-medium">imkan.ai</span> ("imkan.ai", "we", "our", "us").
              </p>
              <p className="text-gray-300 leading-relaxed font-medium">
                By accessing or using this website, you agree to be bound by these Terms. If you do not agree, you should not use this website.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">1.</span> About Us
              </h2>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-medium text-white">Legal Entity:</span> imkan.ai</p>
                <p><span className="font-medium text-white">Location:</span> Riyadh, Saudi Arabia</p>
                <p><span className="font-medium text-white">Contact Email:</span> <a href="mailto:info@imkan.ai" className="text-primary hover:underline">info@imkan.ai</a></p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">2.</span> Scope of These Terms
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                These Terms apply to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Use of the imkan.ai website</li>
                <li>Website content, materials, and communications</li>
                <li>Contact forms and booking or scheduling links</li>
                <li>General information about our services</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Specific consulting engagements are governed by separate written agreements (e.g., proposals, statements of work, contracts), which shall prevail in case of conflict.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">3.</span> Description of Services
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                imkan.ai provides professional services including, but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Data & AI strategy and advisory</li>
                <li>Data engineering and platform design</li>
                <li>AI, analytics, and decision-intelligence solutions</li>
                <li>Related consulting, workshops, and accelerators</li>
              </ul>
              <p className="text-gray-300 leading-relaxed italic">
                All information on this website is provided for general informational purposes only and does not constitute legal, financial, or regulatory advice.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">4.</span> Use of the Website
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                You agree to use this website lawfully and responsibly. You must not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Misuse or attempt to disrupt the website</li>
                <li>Access systems or data without authorization</li>
                <li>Copy, scrape, or reuse content without permission</li>
                <li>Introduce malicious code or security threats</li>
                <li>Use the website for unlawful or harmful purposes</li>
              </ul>
              <p className="text-gray-300 leading-relaxed font-medium">
                We reserve the right to restrict or terminate access for misuse.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">5.</span> Intellectual Property
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                All content on this website, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Text, graphics, visuals, and branding</li>
                <li>Logos, trademarks, and design elements</li>
                <li>Methodologies, frameworks, and materials</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mb-4">
                is the intellectual property of imkan.ai, unless otherwise stated.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4 font-medium">
                You may not reproduce, distribute, or use any content without prior written consent.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">Client Work & Deliverables</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Clients retain ownership of their data</li>
                <li>Ownership of deliverables is governed by contractual agreements</li>
                <li>Nothing on this website transfers intellectual property rights</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">6.</span> Confidentiality
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Information shared with us through this website or during discussions is treated as confidential. Formal confidentiality obligations are governed by Non-Disclosure Agreements (NDAs) where applicable.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">7.</span> Responsible Use of AI
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Where Artificial Intelligence or advanced analytics are used:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>AI is applied with human oversight</li>
                <li>Client data is used only with explicit approval</li>
                <li>AI outputs are advisory and not autonomous decisions</li>
                <li>Data ownership and confidentiality are respected</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Our approach to AI aligns with our Responsible AI Statement and applicable regulations, including the Saudi PDPL.
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">8.</span> Third-Party Links
              </h2>
              <p className="text-gray-300 leading-relaxed">
                This website may contain links to third-party websites for convenience or reference. We do not control or endorse third-party content and are not responsible for their practices or policies.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">9.</span> Disclaimer
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                This website and its content are provided "as is" and "as available."
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                We make no warranties, express or implied, regarding:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Accuracy or completeness of content</li>
                <li>Availability or uninterrupted access</li>
                <li>Suitability for specific purposes</li>
              </ul>
              <p className="text-gray-300 leading-relaxed font-medium">
                Use of the website is at your own risk.
              </p>
            </div>

            {/* Section 10 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">10.</span> Limitation of Liability
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>imkan.ai shall not be liable for indirect, incidental, or consequential damages</li>
                <li>Liability related to services is limited as defined in applicable contracts</li>
                <li>Nothing in these Terms limits liability where such limitation is prohibited by law</li>
              </ul>
            </div>

            {/* Section 11 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">11.</span> Privacy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Your use of this website is also governed by our <button onClick={() => { setShowTermsModal(false); setShowPrivacyModal(true); }} className="text-primary hover:underline font-medium">Privacy Policy</button>, which explains how we collect and process personal data. By using this website, you consent to such processing.
              </p>
            </div>

            {/* Section 12 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">12.</span> Termination
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may suspend or terminate access to the website at any time, without notice, if these Terms are violated or if required for security or legal reasons.
              </p>
            </div>

            {/* Section 13 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">13.</span> Governing Law & Jurisdiction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the <span className="font-medium text-white">Kingdom of Saudi Arabia</span>, without regard to conflict-of-law principles.
              </p>
            </div>

            {/* Section 14 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">14.</span> Changes to These Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update these Terms from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the website constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Section 15 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">15.</span> Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                For questions regarding these Terms, please contact:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-medium text-white">Email:</span> <a href="mailto:info@imkan.ai" className="text-primary hover:underline">info@imkan.ai</a></p>
                <p><span className="font-medium text-white">Location:</span> Riyadh, Saudi Arabia</p>
              </div>
            </div>

            {/* Close Button at Bottom */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full md:w-auto bg-primary text-background-dark font-bold px-8 py-3 rounded-xl hover:bg-white transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Footer;