# Scene A: Enterprise Knowledge Chatbot - Implementation Guide

## Objective
Build a cinematic, full-screen AI demo background for the Hero section showing a realistic enterprise knowledge chatbot interface (Orion Logistics AI Assistant). The demo must look like a legitimate, client-ready AI product walkthrough with professional UI, legible text, and believable interactions.

---

## Architecture Overview

### Three-Layer System (Non-negotiable)

**Layer 3 (Bottom):** Full-screen AI demo background  
**Layer 2 (Middle):** Readability overlay (semi-transparent)  
**Layer 1 (Top):** Hero content (headline, CTA, always dominant)

The demo background must:
- Start **below the navbar** (add `pt-20` padding-top)
- Extend **edge-to-edge** (full viewport width)
- Use **entire height** of viewport
- Be visible but de-emphasized by overlay

---

## File Structure

### Create: `components/HeroBackground.tsx`

This file contains:
1. **SceneA component** - The chatbot interface
2. **HeroBackground component** - Main wrapper with scene rotation logic

### Modify: `components/Hero.tsx`

Update to use the new 3-layer system.

---

## Scene A: Enterprise Knowledge Chatbot

### Visual Design Requirements

**Style:** Enterprise SaaS, dark theme, professional  
**Layout:** ChatGPT-style with left sidebar + main chat area  
**Color Palette:**
- Background: `#0a0a0b` (dark)
- Sidebar: `#0d0d0e` (slightly lighter)
- Cards: `#18181b` (surface)
- Primary: `blue-600` (user messages)
- Borders: `gray-800/50` (subtle)
- Text: `gray-100` (primary), `gray-400` (secondary), `gray-500` (tertiary)

---

## Implementation Steps

### Step 1: Create SceneA Component Structure

```typescript
import React, { useState, useEffect } from 'react';

const SceneA: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  // State management
  const [typingStage, setTypingStage] = useState(0);
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');
  const [showSources, setShowSources] = useState(false);

  // Messages
  const userMessage = "What services does Orion Logistics provide, and which industries do you specialise in?";
  const aiResponse = `**Orion Logistics — Service Overview**

We provide end-to-end supply chain services, including:
• Freight forwarding (air, sea, road)
• Warehousing & inventory management
• Last-mile delivery optimisation
• Customs clearance & compliance support

**Industries served:**
Retail & e-commerce, manufacturing, healthcare & pharmaceuticals.`;

  // Animation logic (see Step 2)
  // Layout (see Step 3)
};
```

---

### Step 2: Animation Timing & Logic

**Animation Sequence:**
1. **0.3s** - User message appears instantly (copy/paste effect)
2. **1.5s** - AI shows "Searching knowledge base..." with animated dots
3. **1.9s** - AI response starts typing character-by-character
4. **~4.5s** - AI response completes
5. **5.0s** - Loop restarts

**Implementation:**

```typescript
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
    setUserText(userMessage); // Instant display - NO TYPING
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
    }, 15); // 15ms per character
    timeouts.push(typingInterval as unknown as NodeJS.Timeout);
  }, 1900);
  timeouts.push(responseTimeout);

  return () => {
    timeouts.forEach(timeout => clearTimeout(timeout));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isActive]);
```

**Key Animation Rules:**
- User message: **Instant appearance** (no typing animation)
- AI response: **Character-by-character typing** at 15ms/char
- Typing cursor: Blue blinking cursor during AI response
- Smooth transitions with fade-in animations

---

### Step 3: Layout Structure

**Two-Column Layout:**
```
[Left Sidebar: 256px] + [Main Chat Area: flex-1]
```

**Container Structure:**

```typescript
return (
  <div className="absolute inset-0 w-full h-full bg-[#0a0a0b] text-gray-100 flex font-sans overflow-hidden pt-20">
    {/* Left Sidebar - Chat History */}
    <div className="w-64 bg-[#0d0d0e] border-r border-gray-800/50 flex flex-col">
      {/* Sidebar content */}
    </div>

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      {/* Chat Messages */}
      {/* Input Bar */}
    </div>
  </div>
);
```

---

### Step 4: Left Sidebar Components

**Sidebar Header:**
```typescript
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
```

**Chat History List:**
```typescript
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
      {/* Chat item content */}
    </div>
  ))}
</div>
```

**Sidebar Footer:**
```typescript
<div className="p-3 border-t border-gray-800/50">
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#18181b] cursor-pointer transition-colors">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
      {/* User avatar icon */}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[12px] text-gray-300 truncate">Admin User</div>
      <div className="text-[10px] text-gray-600">admin@orion.com</div>
    </div>
  </div>
</div>
```

---

### Step 5: Main Chat Area Components

**Top Bar:**
```typescript
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
```

**Messages Container:**
```typescript
<div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
  {/* Welcome Message - Far Left */}
  <div className="flex gap-4 opacity-40">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
      {/* AI avatar icon */}
    </div>
    <div className="flex-1 max-w-[75%]">
      <div className="text-[11px] text-gray-500 mb-1.5">Orion AI Assistant</div>
      <div className="bg-[#18181b] rounded-2xl rounded-tl-sm px-5 py-3.5 text-[13px] text-gray-300 leading-relaxed border border-gray-800/50">
        Hello! I'm your Orion Logistics AI assistant. I can help you with information about our services, policies, pricing, and operational procedures.
      </div>
    </div>
  </div>

  {/* User Message - Far Right (Instant) */}
  {typingStage >= 1 && (
    <div className="flex gap-4 justify-end animate-fadeIn">
      <div className="flex-1 max-w-[65%] flex flex-col items-end">
        <div className="text-[11px] text-gray-500 mb-1.5 mr-1">You</div>
        <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-5 py-3.5 text-[13px] text-white leading-relaxed shadow-lg">
          {userText}
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
        {/* User avatar icon */}
      </div>
    </div>
  )}

  {/* AI Thinking - Far Left */}
  {typingStage === 2 && (
    <div className="flex gap-4 animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
        {/* Spinning icon */}
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

  {/* AI Response - Far Left (Typing) */}
  {typingStage >= 3 && (
    <div className="flex gap-4 animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
        {/* AI avatar icon */}
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
```

**Input Bar:**
```typescript
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
```

---

### Step 6: HeroBackground Wrapper Component

```typescript
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
```

---

### Step 7: Update Hero.tsx Component

Replace the old background elements with the new 3-layer system:

```typescript
import React from 'react';
import HeroBackground from './HeroBackground';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Layer 3: Full-Screen Demo Background (Bottom) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <HeroBackground />
      </div>

      {/* Layer 2: Readability Overlay (Middle) */}
      <div className="absolute inset-0 w-full h-full z-10">
        {/* Primary overlay - ensures text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/70 via-background-dark/50 to-background-dark/75"></div>
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* Center vignette to emphasize hero text */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,15,20,0.4)_100%)]"></div>
        
        {/* Bottom gradient fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
      </div>

      {/* Layer 1: Foreground Content (Top) - Always Dominant */}
      <div className="relative z-20 container max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Hero content remains unchanged */}
        {/* Tag, Headlines, Subheading, CTAs */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 z-20">
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </section>
  );
};

export default Hero;
```

---

### Step 8: Add fadeIn Animation

In `index.html`, add the fadeIn animation to Tailwind config:

```javascript
animation: {
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'fadeIn': 'fadeIn 0.6s ease-out',
},
keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  }
}
```

---

## Typography & Sizing Standards

**Text Sizes:**
- Large headings: `text-[14px]` to `text-[15px]`
- Regular text: `text-[13px]`
- Labels: `text-[12px]`
- Small text: `text-[11px]`
- Tiny text: `text-[10px]`

**Spacing:**
- Container padding: `px-4` to `px-8`
- Message spacing: `space-y-8`
- Element gaps: `gap-2` to `gap-4`

**Border Radius:**
- Small elements: `rounded-lg` (8px)
- Chat bubbles: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)

---

## Message Bubble Styling

**AI Messages (Left):**
- Background: `bg-[#18181b]`
- Border: `border border-gray-800/50`
- Rounded: `rounded-2xl rounded-tl-sm` (pointed top-left corner)
- Max width: `max-w-[75%]`
- Padding: `px-5 py-3.5`

**User Messages (Right):**
- Background: `bg-blue-600`
- No border
- Rounded: `rounded-2xl rounded-tr-sm` (pointed top-right corner)
- Max width: `max-w-[65%]`
- Padding: `px-5 py-3.5`
- Text: `text-white`

---

## Icons (SVG Implementation)

Use inline SVG with Tailwind classes. Examples:

**Chat Icon:**
```typescript
<svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
</svg>
```

**Send Icon:**
```typescript
<svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
</svg>
```

---

## Performance Considerations

1. **Reduced Motion:** Always check and respect `prefers-reduced-motion`
2. **Cleanup:** Always clear timeouts and intervals in useEffect cleanup
3. **Dependencies:** Use `eslint-disable-next-line` for intentionally omitted dependencies
4. **Typing Speed:** 15ms per character is optimal for readability
5. **Loop Duration:** 5 seconds allows full viewing of content

---

## Testing Checklist

✅ User message appears instantly (no typing)  
✅ AI response types character-by-character  
✅ Typing cursor visible during AI response  
✅ "Thinking" state shows animated dots  
✅ Background extends full-screen (edge-to-edge)  
✅ Background starts below navbar  
✅ Hero text remains readable and dominant  
✅ Animation loops seamlessly at 5 seconds  
✅ Reduced motion fallback works  
✅ No console errors  

---

## Key Differences from Standard Chat UI

1. **User messages appear instantly** - No typing animation (copy/paste effect)
2. **Only AI types** - Character-by-character at 15ms/char
3. **No sources sidebar** - Full-width chat area
4. **Full-screen background** - Starts below navbar with `pt-20`
5. **De-emphasized by overlay** - 50-70% opacity dark gradient

---

## Common Pitfalls to Avoid

❌ **Don't** add typing animation to user messages  
❌ **Don't** use `typingStage` in the dependency array (causes infinite loops)  
❌ **Don't** forget `pt-20` padding (will overlap navbar)  
❌ **Don't** add a sources sidebar (removed for full-width layout)  
❌ **Don't** make overlay too dark (background should be visible)  
❌ **Don't** forget to clear timeouts in cleanup function  

---

## Final Notes

This implementation creates a professional, enterprise-grade AI chatbot demo that:
- Looks like a real, client-ready product
- Uses full viewport width and height
- Has smooth, realistic animations
- Maintains hero text readability
- Loops seamlessly every 5 seconds
- Respects accessibility preferences

The key to success is the **three-layer architecture** where the demo is fully built at high quality, then de-emphasized through the overlay layer rather than building a lower-quality demo.

