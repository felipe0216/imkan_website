import React, { useState, useEffect } from 'react';

// Scene A: Enterprise Knowledge Chatbot
const SceneA: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [typingStage, setTypingStage] = useState(0);
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');
  const [showSources, setShowSources] = useState(false);

  const userMessage = "What services does Orion Logistics provide, and which industries do you specialise in?";
  const aiResponse = `**Orion Logistics — Service Overview**

We provide end-to-end supply chain services, including:
• Freight forwarding (air, sea, road)
• Warehousing & inventory management
• Last-mile delivery optimisation
• Customs clearance & compliance support

**Industries served:**
Retail & e-commerce, manufacturing, healthcare & pharmaceuticals.`;

  useEffect(() => {
    if (!isActive) {
      setTypingStage(0);
      setUserText('');
      setAiText('');
      setShowSources(false);
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];

    // Stage 1: Show user message instantly (300ms)
    const userTimeout = setTimeout(() => {
      setTypingStage(1);
      setUserText(userMessage); // Instant display
    }, 300);
    timeouts.push(userTimeout);

    // Stage 2: Show AI thinking (1500ms)
    const thinkingTimeout = setTimeout(() => {
      setTypingStage(2);
    }, 1500);
    timeouts.push(thinkingTimeout);

    // Stage 3: Start AI response typing (1900ms)
    const responseTimeout = setTimeout(() => {
      setTypingStage(3);
      
      // Type AI response character by character
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= aiResponse.length) {
          setAiText(aiResponse.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 15);
      timeouts.push(typingInterval as unknown as NodeJS.Timeout);
    }, 1900);
    timeouts.push(responseTimeout);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0a0b] text-gray-100 flex font-sans overflow-hidden pt-20">
      {/* Left Sidebar - Chat History */}
      <div className="w-64 bg-[#0d0d0e] border-r border-gray-800/50 flex flex-col">
        {/* Sidebar Header */}
        <div className="px-4 py-4 border-b border-gray-800/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-gray-100">Orion AI</span>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-[12px] font-medium text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {[
            { title: 'Services & Industries Query', time: 'Active', active: true },
            { title: 'Pricing Information', time: '2h ago', active: false },
            { title: 'SLA & Support Details', time: 'Yesterday', active: false },
            { title: 'Customs Clearance Policy', time: '3d ago', active: false },
            { title: 'Warehouse Capacity', time: '5d ago', active: false },
            { title: 'Last-mile Delivery Rates', time: '1w ago', active: false },
          ].map((chat, i) => (
            <div 
              key={i}
              className={`px-3 py-2.5 rounded-lg cursor-pointer transition-colors group ${
                chat.active 
                  ? 'bg-[#18181b] border border-gray-800/50' 
                  : 'hover:bg-[#18181b]/50'
              }`}
            >
              <div className="flex items-start gap-2">
                <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${chat.active ? 'text-blue-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className={`text-[12px] truncate ${chat.active ? 'text-gray-100 font-medium' : 'text-gray-400'}`}>
                    {chat.title}
                  </div>
                  <div className="text-[10px] text-gray-600 mt-0.5">{chat.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-800/50">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#18181b] cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-gray-300 truncate">Admin User</div>
              <div className="text-[10px] text-gray-600">admin@orion.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#111113] border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-[14px] font-semibold text-gray-100">Orion Logistics — AI Assistant</h1>
              <p className="text-[11px] text-gray-500">Powered by enterprise knowledge base</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] text-green-400 font-medium">
              ONLINE
            </span>
          </div>
        </div>

        {/* Chat and Sources Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
              
              {/* Welcome Message - Far Left */}
              <div className="flex gap-4 opacity-40">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 max-w-[75%]">
                  <div className="text-[11px] text-gray-500 mb-1.5">Orion AI Assistant</div>
                  <div className="bg-[#18181b] rounded-2xl rounded-tl-sm px-5 py-3.5 text-[13px] text-gray-300 leading-relaxed border border-gray-800/50">
                    Hello! I'm your Orion Logistics AI assistant. I can help you with information about our services, policies, pricing, and operational procedures.
                  </div>
                </div>
              </div>

              {/* User Message - Far Right (Instant appearance) */}
              {typingStage >= 1 && (
                <div className="flex gap-4 justify-end animate-fadeIn">
                  <div className="flex-1 max-w-[65%] flex flex-col items-end">
                    <div className="text-[11px] text-gray-500 mb-1.5 mr-1">You</div>
                    <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-5 py-3.5 text-[13px] text-white leading-relaxed shadow-lg">
                      {userText}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* AI Thinking - Far Left */}
              {typingStage === 2 && (
                <div className="flex gap-4 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div className="flex-1 max-w-[75%]">
                    <div className="text-[11px] text-gray-500 mb-1.5">Orion AI Assistant</div>
                    <div className="bg-[#18181b] rounded-2xl rounded-tl-sm px-5 py-3.5 text-[13px] text-gray-400 leading-relaxed border border-gray-800/50 flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                      <span>Searching knowledge base...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Response - Far Left */}
              {typingStage >= 3 && (
                <div className="flex gap-4 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 max-w-[75%]">
                    <div className="text-[11px] text-gray-500 mb-1.5">Orion AI Assistant</div>
                    <div className="bg-[#18181b] rounded-2xl rounded-tl-sm px-5 py-3.5 text-[13px] text-gray-200 leading-relaxed border border-gray-800/50">
                      <div className="prose prose-invert prose-sm max-w-none">
                        {aiText.split('\n').map((line, i) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <div key={i} className="font-semibold text-gray-100 mt-3 first:mt-0">{line.replace(/\*\*/g, '')}</div>;
                          }
                          if (line.startsWith('•')) {
                            return <div key={i} className="text-gray-300 ml-3">{line}</div>;
                          }
                          return line ? <div key={i} className="text-gray-300">{line}</div> : <div key={i} className="h-2"></div>;
                        })}
                        {aiText.length < aiResponse.length && (
                          <span className="inline-block w-[2px] h-4 bg-blue-500 ml-1 animate-pulse"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Input Bar */}
            <div className="px-8 py-4 bg-[#0a0a0b] border-t border-gray-800/50">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 bg-[#18181b] rounded-xl px-5 py-3.5 border border-gray-800 shadow-lg">
                  <input 
                    type="text" 
                    placeholder="Ask about services, policies, operations..."
                    className="flex-1 bg-transparent text-[13px] text-gray-300 placeholder-gray-600 outline-none"
                    disabled
                  />
                  <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Background Component
const HeroBackground: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Scene timing: 5 seconds per scene
    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % 1); // Only Scene A for now
    }, 5000);

    return () => clearInterval(sceneInterval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    // Show static version for reduced motion
    return (
      <div className="absolute inset-0">
        <SceneA isActive={true} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {/* Scene A */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          currentScene === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <SceneA isActive={currentScene === 0} />
      </div>
    </div>
  );
};

export default HeroBackground;

