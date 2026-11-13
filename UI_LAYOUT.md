# 🎨 Groq Chat Interface - Modern UI Layout

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HEADER (Gradient)                           │
│  💬 Groq AI Chat              [Token Analytics]     🟢 Live         │
│  Token Analytics              [Session Info]                        │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  📢 Notification (if session recovered or error)         │
└──────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┬─────────────┐
│                                                       │   SIDEBAR   │
│                                                       │  (w-96)     │
│                    MESSAGE AREA                       │             │
│                                                       │  ┌────────┐ │
│  👤: Hello, how are you?                            │  │ ⚡Stats │ │
│     [⏰ 2:30 PM]                                     │  │         │ │
│                                                       │  │Total:   │ │
│  🤖: I'm doing great! Here's my response...          │  │15.2K    │ │
│     ┌─────────────────────────────────────────┐      │  │         │ │
│     │ 📊 Metrics:                             │      │  │In: 2.3K │ │
│     │ • Prompt: 245 tokens (Blue badge)       │      │  │Out: 12.9K│
│     │ • Completion: 450 tokens (Violet)       │      │  │         │ │
│     │ • Total: 695 tokens (Purple)            │      │  │Messages:│ │
│     │ • Response Time: 1.23s (Orange)         │      │  │8        │ │
│     │ • Speed: 565 tokens/sec (Pink)          │      │  │         │ │
│     │ • Model: mixtral-8x7b (Indigo)          │      │  │Speed:   │ │
│     │ • ⏰ 2:31 PM                            │      │  │512 t/s  │ │
│     └─────────────────────────────────────────┘      │  └────────┘ │
│                                                       │             │
│  👤: Tell me more...                                 │  ┌────────┐ │
│     [⏰ 2:32 PM]                                     │  │📊Info  │ │
│                                                       │  │         │ │
│  🤖: [Typing dots animation...]                      │  │Duration:│ │
│                                                       │  │2m 15s  │ │
│                                                       │  │         │ │
│                                                       │  │Started: │ │
│                                                       │  │2:30 PM │ │
│                                                       │  │         │ │
│                                                       │  │[🗑️ Clear] │
│                                                       │  └────────┘ │
│                                                       │             │
│                                                       │  💡 Tips    │
│                                                       │  • Shift+⏎ │
│                                                       │  • Tracked │
│                                                       │  • Auto-save│
└───────────────────────────────────────────────────────┴─────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                         INPUT AREA (Modern)                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ Type your message...                                 [150 chars] │ │
│  │                                                                 │ │
│  │                                                                 │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                        [→ Send] │
└───────────────────────────────────────────────────────────────────────┘
```

## Color Legend

```
🔵 Blue Gradient:      Primary actions, inputs, tokens
🟣 Purple Gradient:    Total values, important metrics
🟢 Green:              Input/prompt tokens
🟠 Orange:             Response time, speed indicators
🟡 Pink:               Tokens per second, performance
🟣 Violet:             Completion tokens, output
🔵 Indigo:             Model names, additional info
⚫ Gray:               Neutral elements, text
```

## Desktop Layout (lg breakpoint)

```
┌────────────────────────────────┐
│  Full Width Header             │
│  (Gradient Primary)            │
└────────────────────────────────┘

Main Content Grid (gap-6):
├─ Chat Area (flex-1)           │ Sidebar (w-96)
│  ├─ Messages (flex-1)          │ ├─ Token Stats Card
│  │  ├─ User Message            │ │  ├─ Total Tokens Display
│  │  ├─ AI Message w/ Metrics   │ │  ├─ Input/Output breakdown
│  │  └─ Loading indicator       │ │  ├─ Performance metrics
│  │                             │ │  └─ Ratio progress bar
│  └─ Chat Input (sticky bottom) │ ├─ Session Info Card
│                                │ │  ├─ Duration
│                                │ │  ├─ Start time
│                                │ │  ├─ Session ID
│                                │ │  └─ Clear button
│                                │ └─ Tips Card
│                                │    └─ Quick reference
```

## Mobile Layout (sm breakpoint)

```
Single column stack:
├─ Header (full width)
├─ Notifications
├─ Chat Area (full width)
│  ├─ Messages
│  └─ Input
├─ Sidebar (visible, scrollable)
│  ├─ Stats Card
│  └─ Info Card
└─ Tips Card (hidden on mobile)
```

## Component Hierarchy

```
ChatContainer
├── Header
│   ├── Title & Icon
│   └── Live Status Indicator
├── Notifications
│   ├── Session Recovery
│   └── Error Messages
├── Main Content (flex)
│   ├── ChatArea (flex-1)
│   │   ├── MessageList
│   │   │   ├── Empty State (if no messages)
│   │   │   ├── MessageItem (per message)
│   │   │   │   ├── User Message Bubble
│   │   │   │   └── AI Message Bubble with Metrics
│   │   │   └── Loading Indicator
│   │   └── ChatInput
│   │       ├── Textarea
│   │       ├── Send Button
│   │       └── Character Counter
│   └── Sidebar (lg:w-96)
│       ├── TokenStats Card
│       │   ├── Total Tokens Display
│       │   ├── Metric Grid
│       │   │   ├── Input Tokens
│       │   │   ├── Output Tokens
│       │   │   ├── Messages Count
│       │   │   ├── Speed
│       │   │   └── Avg per Message
│       │   └── Progress Bar
│       ├── SessionInfo Card
│       │   ├── Duration Display
│       │   ├── Start Time
│       │   ├── Session ID
│       │   ├── Status
│       │   └── Clear Session Button
│       └── Tips Card
│           └── Quick Tips List
```

## Animation Details

### Message Entry
- Fade in + slide up
- Duration: 0.3s
- Easing: ease-out

### Typing Indicator
- Bounce animation
- Staggered delays: 0ms, 150ms, 300ms
- Continuous animation

### Button Hover
- Shadow elevation
- Slight scale up (2px translateY)
- Color transition

### Notifications
- Slide in from top
- Fade in animation
- Auto-dismiss after 5s

### Loading States
- Pulsing dots
- Disabled input styling
- Changed button text

## Spacing System

```
Base Unit: 4px

Gaps:
- Tight: gap-2 (8px)
- Normal: gap-4 (16px)
- Loose: gap-6 (24px)

Padding:
- Compact: p-3 (12px)
- Normal: p-4 (16px)
- Generous: p-6 (24px)

Corners:
- Small: rounded-lg (8px)
- Large: rounded-xl (12px)
- Huge: rounded-2xl (16px)
- Full: rounded-full
```

## Responsive Breakpoints

```
Mobile:    0 - 640px   (sm)
Tablet:    640 - 1024px (lg)
Desktop:   1024px+     (lg and above)

Key Changes:
├─ sm: Hide sidebar, full width chat
├─ lg: Show sidebar, 2-column layout
└─ 2xl: Increased max-width container
```

## Shadow System

```
sm: 0 1px 2px rgba(0,0,0,0.05)
md: 0 4px 6px -1px rgba(0,0,0,0.1)
lg: 0 10px 15px -3px rgba(0,0,0,0.1)

Hover: Elevate shadow from md → lg
```

## Visual Feedback States

```
Button States:
├─ Default: Gradient, shadow-md
├─ Hover: shadow-lg, translateY(-2px)
├─ Active: scale-95
└─ Disabled: bg-gray-300, cursor-not-allowed

Input States:
├─ Default: border-gray-200, shadow-sm
├─ Focus: border-blue-500, ring-blue-500/20
├─ Disabled: bg-gray-50, cursor-not-allowed
└─ Error: border-red-500, ring-red-500/20

Message States:
├─ User: Blue gradient bubble
├─ AI: Gray gradient with metrics
└─ Loading: Bounce animation
```

---

**Designed for**: Modern, professional UI with top-tier aesthetics
**Framework**: Next.js 16 + React 19 + Tailwind CSS
**Styling**: Tailwind + Custom CSS (modern.css)
**Animations**: CSS animations + React transitions
