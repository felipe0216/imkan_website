# Scene B: AI Analytics Dashboard - Complete Build Guide

## Overview

Build a full-screen animated demo scene showcasing an AI-powered analytics assistant. The scene demonstrates:
1. User typing a natural language query
2. Loading indicator while AI "thinks"
3. Instant SQL query generation (copy/paste effect)
4. Animated bar chart visualization

**Target Framework:** React with TypeScript  
**Styling:** Tailwind CSS (inline utility classes)  
**Animation:** Pure CSS + React state-driven timing  
**Scene Duration:** ~5 seconds per loop

---

## Architecture

### Component Structure
```
SceneB (Main Component)
├── Top Bar (Dashboard Header)
├── Main Content Grid (2 columns)
│   ├── Left Panel
│   │   ├── Query Input Card
│   │   └── SQL Output Panel
│   └── Right Panel
│       ├── Chart Header
│       └── Chart Canvas
│           ├── Y-axis Labels
│           ├── Grid Lines
│           ├── Bar Chart
│           └── Legend
```

### Configuration Object
All scene configuration is centralized in `SCENE_B_CONFIG`:

```typescript
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
```

---

## State Management

### Component State
```typescript
const [typingStage, setTypingStage] = useState(0);
const [userText, setUserText] = useState('');
const [sqlText, setSqlText] = useState('');
const [showChart, setShowChart] = useState(false);
```

**Typing Stages:**
- `0`: Initial state (nothing shown)
- `1`: User typing query
- `2`: Loading indicator visible
- `3`: SQL query displayed
- `4`: Chart rendered

### Props
```typescript
interface SceneBProps {
  isActive: boolean; // Controls animation lifecycle
}
```

---

## Animation System

### Helper Function: Typing Animation
```typescript
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
```

### Animation Timeline (useEffect)
```typescript
useEffect(() => {
  if (!isActive) {
    // Reset all state when scene becomes inactive
    setTypingStage(0);
    setUserText('');
    setSqlText('');
    setShowChart(false);
    return;
  }

  const timeouts: NodeJS.Timeout[] = [];

  // Stage 1: Type user prompt (300ms delay)
  timeouts.push(setTimeout(() => {
    setTypingStage(1);
    createTypingAnimation(user.message, setUserText, user.typingSpeed, timeouts);
  }, user.startDelay) as unknown as NodeJS.Timeout);

  // Stage 2: Show loading indicator (1000ms)
  timeouts.push(setTimeout(() => {
    setTypingStage(2);
  }, loading.startDelay) as unknown as NodeJS.Timeout);

  // Stage 3: Display SQL query instantly (1400ms)
  timeouts.push(setTimeout(() => {
    setTypingStage(3);
    createTypingAnimation(sql.query, setSqlText, sql.typingSpeed, timeouts);
  }, sql.startDelay) as unknown as NodeJS.Timeout);

  // Stage 4: Show chart (1500ms)
  timeouts.push(setTimeout(() => {
    setTypingStage(4);
    setShowChart(true);
  }, chart.startDelay) as unknown as NodeJS.Timeout);

  // Cleanup
  return () => {
    timeouts.forEach(timeout => clearTimeout(timeout));
  };
}, [isActive]);
```

---

## UI Components

### 1. Top Bar (Dashboard Header)

**Purpose:** Branding and status indicators

**Layout:**
```jsx
<div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
  {/* Left: Logo + Title */}
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
      {/* Chart Icon SVG */}
    </div>
    <div>
      <h1 className="text-[16px] font-bold text-white tracking-tight">
        Aster Retail Analytics Platform
      </h1>
      <p className="text-[12px] text-purple-300">
        Real-time Business Intelligence Dashboard
      </p>
    </div>
  </div>
  
  {/* Right: Status Indicators */}
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
```

**Key Features:**
- Purple/indigo gradient theme
- Pulsing "DATABASE LIVE" indicator
- Chart icon with gradient background
- Responsive flex layout

---

### 2. Query Input Card

**Purpose:** Display user's natural language query with typing animation

**Conditional Rendering:**
```jsx
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
```

**Typing Cursor:** Blinking purple cursor (`animate-pulse`) shown while typing

---

### 3. Loading Indicator

**Purpose:** Brief loading state between user query and SQL generation

**Display Logic:**
```jsx
{typingStage === 2 && (
  <div className="flex items-center gap-3 mt-3 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="text-[11px] text-purple-300 font-medium">Generating SQL query...</span>
  </div>
)}
```

**Animation:** Spinning circle with transparent top border

---

### 4. SQL Output Panel

**Purpose:** Display generated SQL with syntax highlighting

**SQL Syntax Highlighter Function:**
```typescript
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
```

**Rendering:**
```jsx
<pre className="p-4 font-mono text-[12px] leading-relaxed">
  <code className="text-gray-300">
    {sqlText.split('\n').map((line, i) => highlightSQLLine(line, i))}
  </code>
</pre>
```

**Footer (when SQL complete):**
```jsx
{sqlText.length >= sql.query.length && (
  <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-700/50 flex items-center justify-between">
    <span className="text-[10px] text-gray-500">Query execution time: 0.043s</span>
    <span className="text-[10px] text-emerald-400 font-semibold">✓ {chart.data.length} rows returned</span>
  </div>
)}
```

---

### 5. Bar Chart (Most Complex Component)

#### Chart Structure
```
Chart Canvas
├── Title: "Revenue (USD thousands)"
├── Main Area (flex with pb-8)
│   ├── Y-Axis Labels (absolute positioning)
│   └── Chart Canvas (relative container)
│       ├── Grid Lines (absolute, flex-col)
│       └── Bars (absolute positioning with %)
└── Legend (centered below)
```

#### A. Y-Axis Labels
```jsx
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
```

**Key Points:**
- Fixed width container (45px)
- Absolute positioning at 0%, 25%, 50%, 75%, 100%
- Top label at `top: 0`, bottom at `bottom: 0`

#### B. Grid Lines
```jsx
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
```

**Pattern:**
- 5 horizontal lines (1px height)
- 4 spacers (`flex-1`) for equal spacing
- Alternating: line → spacer → line → spacer → ... → line

#### C. Bars with Labels
```jsx
<div className="absolute inset-0">
  {chart.data.map((data, i) => {
    const barWidth = 100 / chart.data.length; // 8.333% for 12 bars
    const heightPercent = (data.revenue / chart.maxValue) * 100;
    
    return (
      <div key={i}>
        {/* Bar */}
        <div
          className="absolute bottom-0 bg-gradient-to-t from-indigo-600 via-purple-500 to-purple-400 rounded-t-sm"
          style={{
            left: `${i * barWidth + 1}%`,
            width: `${barWidth - 2}%`,
            height: `${heightPercent}%`,
            minHeight: '2px'
          }}
        />
        
        {/* Month Label */}
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
```

**Bar Positioning Logic:**
- **Left:** `i * barWidth + 1%` (adds 1% offset for visual gap)
- **Width:** `barWidth - 2%` (2% smaller for gaps on both sides)
- **Height:** `(revenue / maxValue) * 100%` (percentage of max value)
- **Label:** Centered below bar using `translateX(-50%)`

**Important:**
- Bars use absolute positioning from bottom
- Month labels positioned 24px below chart (`bottom: -24px`)
- `minHeight: 2px` ensures tiny bars are visible

#### D. Legend
```jsx
const totalRevenue = chart.data.reduce((sum, data) => sum + data.revenue, 0);

<div className="flex items-center justify-center gap-6 pt-4 mt-4 border-t border-gray-800/50">
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded bg-gradient-to-br from-indigo-600 to-purple-400"></div>
    <span className="text-[10px] text-gray-400">Monthly Revenue</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="text-[10px] text-gray-500">2024 Total:</span>
    <span className="text-[10px] text-purple-400 font-bold">
      ${(totalRevenue / 1000).toFixed(2)}M
    </span>
  </div>
</div>
```

**Dynamic Total:** Calculated from `chart.data` using `reduce()`

---

## Color Scheme

### Primary Colors
- **Purple:** `purple-500`, `purple-900/40`, `purple-400/20`
- **Indigo:** `indigo-600`, `indigo-900/40`
- **Blue:** For SQL values (`blue-300`)
- **Pink:** For SQL keywords (`pink-400`)
- **Emerald:** For success states (`emerald-400`, `emerald-500/20`)

### Backgrounds
- **Main BG:** `bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]`
- **Cards:** `bg-gradient-to-br from-gray-900/80 to-gray-800/80`
- **SQL Panel:** `bg-[#0d1117]` (GitHub dark theme inspired)

### Borders
- Standard: `border-gray-700/50`
- Highlighted: `border-purple-500/20`

---

## Key CSS Classes

### Custom Animations (Add to global CSS)
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in;
}
```

### Common Patterns
- **Cards:** `rounded-2xl border backdrop-blur-sm`
- **Icons:** `w-4 h-4` or `w-6 h-6` with `text-{color}`
- **Spacing:** `gap-3`, `gap-4`, `px-4 py-2`
- **Text Sizes:** 
  - Headers: `text-[16px]`, `text-[15px]`
  - Body: `text-[13px]`, `text-[12px]`
  - Small: `text-[11px]`, `text-[10px]`, `text-[9px]`

---

## Integration with Scene System

### Parent Container (HeroBackground Component)
```typescript
const [currentScene, setCurrentScene] = useState(0);

useEffect(() => {
  const sceneInterval = setInterval(() => {
    setCurrentScene((prev) => (prev + 1) % 2); // Rotate between scenes
  }, 5000);
  
  return () => clearInterval(sceneInterval);
}, []);

return (
  <div className="absolute inset-0">
    {/* Scene A */}
    <div className={`absolute inset-0 transition-opacity duration-1000 ${
      currentScene === 0 ? 'opacity-100' : 'opacity-0'
    }`}>
      <SceneA isActive={currentScene === 0} />
    </div>
    
    {/* Scene B */}
    <div className={`absolute inset-0 transition-opacity duration-1000 ${
      currentScene === 1 ? 'opacity-100' : 'opacity-0'
    }`}>
      <SceneB isActive={currentScene === 1} />
    </div>
  </div>
);
```

**Scene Rotation:**
- Each scene displays for 5 seconds
- 1-second crossfade transition
- `isActive` prop controls animation lifecycle

---

## Complete Component Code

```typescript
// Scene B: Data Analytics Dashboard
// Constants
const SCENE_B_CONFIG = {
  // ... (full config as shown above)
};

// SQL syntax highlighter
const highlightSQLLine = (line: string, index: number) => {
  // ... (full function as shown above)
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
      setText(text);
      return;
    }
    
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
    // ... (full useEffect as shown above)
  }, [isActive]);

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-gray-100 flex font-sans overflow-hidden pt-20">
      <div className="flex-1 flex flex-col p-6 gap-4">
        {/* Top Bar */}
        {/* ... */}
        
        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Left Panel */}
          {/* ... */}
          
          {/* Right Panel */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
};
```

---

## Testing Checklist

✅ **Animation Timing:**
- [ ] User query types at correct speed (15ms/char)
- [ ] Loading appears at 1000ms
- [ ] SQL appears instantly at 1400ms
- [ ] Chart appears at 1500ms

✅ **Visual Alignment:**
- [ ] Y-axis labels align with grid lines
- [ ] Bars align with grid correctly
- [ ] Month labels centered under bars
- [ ] All spacing consistent

✅ **State Management:**
- [ ] Scene resets when `isActive` becomes false
- [ ] No memory leaks from timeouts
- [ ] Smooth transition between scenes

✅ **Responsiveness:**
- [ ] Works on different screen sizes
- [ ] Chart scales properly
- [ ] Text remains readable

✅ **Performance:**
- [ ] No frame drops during animations
- [ ] Smooth 60fps rendering
- [ ] Efficient re-renders

---

## Common Pitfalls & Solutions

### 1. Chart Not Aligned
**Problem:** Y-axis labels don't match grid lines  
**Solution:** Ensure all containers (labels, grid, bars) share same parent with `pb-8`

### 2. Bars Too Small
**Problem:** Bars barely visible for low values  
**Solution:** Add `minHeight: '2px'` to bar style

### 3. Month Labels Overlapping
**Problem:** Labels too close together  
**Solution:** Use `transform: translateX(-50%)` for centering

### 4. SQL Not Appearing
**Problem:** typingSpeed = 0 not handled  
**Solution:** Add conditional in `createTypingAnimation()` for instant display

### 5. Animation Not Resetting
**Problem:** Scene keeps old state when switching  
**Solution:** Reset all state when `!isActive` in useEffect

---

## Performance Optimization

1. **Memoization:** Consider `useMemo` for `totalRevenue` calculation
2. **Timeout Cleanup:** Always clear timeouts in useEffect return
3. **Conditional Rendering:** Use `&&` and ternary for stages
4. **Pointer Events:** Add `pointer-events-none` to overlay elements
5. **Transform over Position:** Use `transform` for animations when possible

---

## Customization Guide

### Change Animation Speed
Modify `SCENE_B_CONFIG.user.typingSpeed` and `sql.typingSpeed`

### Change Chart Data
Update `SCENE_B_CONFIG.chart.data` array with your values

### Change Colors
Search and replace color classes:
- Purple: `purple-500` → `blue-500`
- Indigo: `indigo-600` → `cyan-600`

### Add More Y-Axis Labels
Update `yAxisLabels` array and adjust positioning logic

### Different Chart Type
Replace bar rendering logic in bars section with line/area chart

---

## Final Notes

- **Maintainability:** All configuration in one place
- **Scalability:** Easy to add more data points
- **Readability:** Helper functions for complex logic
- **Accessibility:** Consider `prefers-reduced-motion` in parent
- **Documentation:** Code comments for complex sections

This scene demonstrates enterprise-grade AI capabilities through realistic UI, smooth animations, and professional styling. The modular structure makes it easy to modify and extend.

