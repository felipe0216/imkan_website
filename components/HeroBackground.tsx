import React, { useState, useEffect } from 'react';

// Scene A: Enterprise Knowledge Chatbot
const SceneA: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [typingStage, setTypingStage] = useState(0);
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');
  const [showSources, setShowSources] = useState(false);

  const userMessage = "What services does Orion Logistics provide?";
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

    // Stage 1: Type user message (300ms start, 20ms per character - fast)
    const userTimeout = setTimeout(() => {
      setTypingStage(1);
      
      // Type user message character by character (fast)
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= userMessage.length) {
          setUserText(userMessage.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 20); // 20ms per character - faster than AI response
      timeouts.push(typingInterval as unknown as NodeJS.Timeout);
    }, 300);
    timeouts.push(userTimeout);

    // Stage 2: Show AI thinking (2200ms - after user finishes typing)
    const thinkingTimeout = setTimeout(() => {
      setTypingStage(2);
    }, 2200);
    timeouts.push(thinkingTimeout);

    // Stage 3: Start AI response typing (2600ms)
    const responseTimeout = setTimeout(() => {
      setTypingStage(3);
      
      // Type AI response character by character (slower than user)
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= aiResponse.length) {
          setAiText(aiResponse.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 25); // 25ms per character - slower than user typing
      timeouts.push(typingInterval as unknown as NodeJS.Timeout);
    }, 2600);
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

              {/* User Message - Far Right (Typing effect) */}
              {typingStage >= 1 && (
                <div className="flex gap-4 justify-end animate-fadeIn">
                  <div className="flex-1 max-w-[65%] flex flex-col items-end">
                    <div className="text-[11px] text-gray-500 mb-1.5 mr-1">You</div>
                    <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-5 py-3.5 text-[13px] text-white leading-relaxed shadow-lg">
                      {userText}
                      {userText.length < userMessage.length && (
                        <span className="inline-block w-[2px] h-4 bg-white/80 ml-1 animate-pulse"></span>
                      )}
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

// Scene B: Data Analytics Dashboard
// Constants
const SCENE_B_CONFIG = {
  user: {
    message: "Show total monthly revenue for 2024.",
    typingSpeed: 15, // ms per character (quick)
    startDelay: 300,
  },
  sql: {
    query: `SELECT
  DATE_TRUNC('month', order_date) AS month,
  SUM(revenue_usd) AS total_revenue
FROM sales_orders
WHERE EXTRACT(YEAR FROM order_date) = 2024
GROUP BY month
ORDER BY month ASC;`,
    typingSpeed: 0, // No typing effect - instant appearance
    startDelay: 1400, // After user finishes + loading delay
  },
  loading: {
    startDelay: 1000, // Shows while user is still typing
    duration: 400, // How long loading shows before SQL
  },
  chart: {
    // Calculated: sql.startDelay + (sql.query.length * sql.typingSpeed) + small buffer
    startDelay: 1500, // After SQL fully typed
    data: [
      { month: 'Jan', revenue: 1150 },
      { month: 'Feb', revenue: 1620 },
      { month: 'Mar', revenue: 1380 },
      { month: 'Apr', revenue: 1890 },
      { month: 'May', revenue: 1540 },
      { month: 'Jun', revenue: 2100 },
      { month: 'Jul', revenue: 1720 },
      { month: 'Aug', revenue: 2250 },
      { month: 'Sep', revenue: 1950 },
      { month: 'Oct', revenue: 2480 },
      { month: 'Nov', revenue: 2180 },
      { month: 'Dec', revenue: 2720 },
    ],
    maxValue: 3000,
    yAxisLabels: ['3.0M', '2.25M', '1.5M', '0.75M', '0'],
  },
};

// SQL syntax highlighter
const highlightSQLLine = (line: string, index: number) => {
  const keywords = [
    { word: 'SELECT', color: 'text-pink-400' },
    { word: 'FROM', color: 'text-pink-400', valueColor: 'text-blue-300' },
    { word: 'WHERE', color: 'text-pink-400' },
    { word: 'GROUP BY', color: 'text-pink-400' },
    { word: 'ORDER BY', color: 'text-pink-400' },
  ];

  const trimmed = line.trim();
  for (const { word, color, valueColor } of keywords) {
    if (trimmed.startsWith(word)) {
      const value = line.substring(line.indexOf(word) + word.length);
      return (
        <div key={index} className="hover:bg-gray-800/30 px-2 -mx-2 rounded">
          <span className={`${color} font-semibold`}>{word}</span>
          <span className={valueColor || 'text-gray-300'}>{value}</span>
        </div>
      );
    }
  }
  return (
    <div key={index} className="hover:bg-gray-800/30 px-2 -mx-2 rounded">
      <span className="text-gray-400">{line}</span>
    </div>
  );
};

const SceneB: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [typingStage, setTypingStage] = useState(0);
  const [userText, setUserText] = useState('');
  const [sqlText, setSqlText] = useState('');
  const [showChart, setShowChart] = useState(false);

  const { user, sql, loading, chart } = SCENE_B_CONFIG;
  const totalRevenue = chart.data.reduce((sum, data) => sum + data.revenue, 0);

  // Helper function for typing animation
  const createTypingAnimation = (
    text: string,
    setText: (text: string) => void,
    speed: number,
    timeouts: NodeJS.Timeout[]
  ) => {
    if (speed === 0) {
      // Instant appearance (copy/paste style)
      setText(text);
      return;
    }
    
    // Typing animation
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    timeouts.push(interval as unknown as NodeJS.Timeout);
  };

  useEffect(() => {
    if (!isActive) {
      setTypingStage(0);
      setUserText('');
      setSqlText('');
      setShowChart(false);
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];

    // Stage 1: Type user prompt
    timeouts.push(setTimeout(() => {
      setTypingStage(1);
      createTypingAnimation(user.message, setUserText, user.typingSpeed, timeouts);
    }, user.startDelay) as unknown as NodeJS.Timeout);

    // Stage 2: Show loading indicator
    timeouts.push(setTimeout(() => {
      setTypingStage(2);
    }, loading.startDelay) as unknown as NodeJS.Timeout);

    // Stage 3: Type SQL query
    timeouts.push(setTimeout(() => {
      setTypingStage(3);
      createTypingAnimation(sql.query, setSqlText, sql.typingSpeed, timeouts);
    }, sql.startDelay) as unknown as NodeJS.Timeout);

    // Stage 4: Show chart
    timeouts.push(setTimeout(() => {
      setTypingStage(4);
      setShowChart(true);
    }, chart.startDelay) as unknown as NodeJS.Timeout);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-gray-100 flex font-sans overflow-hidden pt-20">
      {/* Main Dashboard Container - No Sidebar, Modern Layout */}
      <div className="flex-1 flex flex-col p-6 gap-4">
        {/* Top Bar - Analytics Dashboard Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-white tracking-tight">Aster Retail Analytics Platform</h1>
              <p className="text-[12px] text-purple-300">Real-time Business Intelligence Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-lg text-[11px] text-emerald-300 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></span>
              DATABASE LIVE
            </div>
            <div className="text-[11px] text-gray-400">
              <span className="text-purple-400 font-medium">production_db</span> • 847K rows
            </div>
          </div>
        </div>

        {/* Main Content - Split Panel Layout */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Left Panel - Query Input & SQL Output */}
          <div className="flex flex-col gap-4">
            {/* Query Input Card */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-gray-400 font-medium mb-1">NATURAL LANGUAGE QUERY</div>
                  {typingStage >= 1 ? (
                    <div className="text-[13px] text-white font-semibold">
                      {userText}
                      {userText.length < user.message.length && (
                        <span className="inline-block w-[2px] h-4 bg-purple-500 ml-1 animate-pulse"></span>
                      )}
                    </div>
                  ) : (
                    <div className="text-[13px] text-gray-600 font-semibold">Enter your query...</div>
                  )}
                </div>
              </div>
              
              {typingStage === 2 && (
                <div className="flex items-center gap-3 mt-3 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[11px] text-purple-300 font-medium">Generating SQL query...</span>
                </div>
              )}
            </div>

            {/* SQL Output Panel */}
            {typingStage >= 3 && (
              <div className="flex-1 bg-[#0d1117] rounded-2xl border border-gray-700/50 overflow-hidden flex flex-col shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span className="text-[12px] text-gray-300 font-semibold">Generated SQL Query</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-mono">PostgreSQL 15.2</span>
                    {sqlText.length >= sql.query.length && (
                      <div className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-[9px] text-emerald-400 font-bold">
                        VALID
                      </div>
                    )}
                  </div>
                </div>
                
                <div 
                  className="flex-1 overflow-hidden relative"
                >
                  <pre className="p-4 font-mono text-[12px] leading-relaxed">
                    <code className="text-gray-300">
                      {sqlText.split('\n').map((line, i) => highlightSQLLine(line, i))}
                    </code>
                  </pre>
                </div>

                {sqlText.length >= sql.query.length && (
                  <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-700/50 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Query execution time: 0.043s</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">✓ {chart.data.length} rows returned</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Data Visualization */}
          <div className="flex flex-col gap-4">
            {showChart ? (
              <>
                {/* Chart Header */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 p-5 backdrop-blur-sm animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h2 className="text-[15px] font-bold text-white">Total Monthly Revenue</h2>
                      <p className="text-[11px] text-gray-400 mt-0.5">January - December 2024</p>
                    </div>
                    <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                      <span className="text-[11px] text-blue-300 font-semibold">BAR CHART</span>
                    </div>
                  </div>
                </div>

                {/* Chart Canvas */}
                <div className="flex-1 bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl border border-gray-700/50 p-6 backdrop-blur-sm overflow-hidden animate-fadeIn">
                  <div className="h-full flex flex-col">
                    {/* Chart title */}
                    <div className="text-[11px] text-gray-400 font-semibold mb-4">Revenue (USD thousands)</div>
                    
                    {/* Main chart area */}
                    <div className="flex-1 flex gap-3 min-h-0 pb-8">
                      {/* Y-axis labels */}
                      <div className="relative text-right pr-2" style={{ width: '45px' }}>
                        {chart.yAxisLabels.map((label, i) => (
                          <div
                            key={i}
                            className="absolute text-[10px] text-gray-500"
                            style={{
                              top: i === 0 ? '0' : i === chart.yAxisLabels.length - 1 ? 'auto' : `${i * 25}%`,
                              bottom: i === chart.yAxisLabels.length - 1 ? '0' : 'auto'
                            }}
                          >
                            {label}
                          </div>
                        ))}
                      </div>

                      {/* Chart canvas */}
                      <div className="flex-1 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col pointer-events-none">
                          <div className="h-px bg-gray-800/60"></div>
                          <div className="flex-1"></div>
                          <div className="h-px bg-gray-800/60"></div>
                          <div className="flex-1"></div>
                          <div className="h-px bg-gray-800/60"></div>
                          <div className="flex-1"></div>
                          <div className="h-px bg-gray-800/60"></div>
                          <div className="flex-1"></div>
                          <div className="h-px bg-gray-800/60"></div>
                        </div>

                        {/* Bars */}
                        <div className="absolute inset-0">
                          {chart.data.map((data, i) => {
                            const barWidth = 100 / chart.data.length;
                            const heightPercent = (data.revenue / chart.maxValue) * 100;
                            
                            return (
                              <div key={i}>
                                <div
                                  className="absolute bottom-0 bg-gradient-to-t from-indigo-600 via-purple-500 to-purple-400 rounded-t-sm"
                                  style={{
                                    left: `${i * barWidth + 1}%`,
                                    width: `${barWidth - 2}%`,
                                    height: `${heightPercent}%`,
                                    minHeight: '2px'
                                  }}
                                />
                                <div
                                  className="absolute text-[9px] text-gray-500"
                                  style={{
                                    left: `${i * barWidth + barWidth / 2}%`,
                                    transform: 'translateX(-50%)',
                                    bottom: '-24px'
                                  }}
                                >
                                  {data.month}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 pt-4 mt-4 border-t border-gray-800/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-gradient-to-br from-indigo-600 to-purple-400"></div>
                        <span className="text-[10px] text-gray-400">Monthly Revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500">2024 Total:</span>
                        <span className="text-[10px] text-purple-400 font-bold">${(totalRevenue / 1000).toFixed(2)}M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-dashed border-gray-700/50 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gray-800/50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-[12px] text-gray-500 font-medium">Awaiting query execution...</div>
                </div>
              </div>
            )}
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
      setCurrentScene((prev) => (prev + 1) % 2); // Rotate between Scene A and Scene B
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
      {/* Scene A - Orion Logistics Knowledge Chatbot */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          currentScene === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <SceneA isActive={currentScene === 0} />
      </div>

      {/* Scene B - Aster Retail Analytics Co-Pilot */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          currentScene === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <SceneB isActive={currentScene === 1} />
      </div>
    </div>
  );
};

export default HeroBackground;

