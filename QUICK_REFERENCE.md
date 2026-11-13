# Quick Reference Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create `.env.local`
```bash
GROQ_API_KEY=gsk_your_actual_api_key_here
```
Get your key from: https://console.groq.com/

### Step 3: Run Development Server
```bash
npm run dev
```
Open: http://localhost:3000

---

## 📂 What Each File Does

### Frontend Components (`src/components/`)
| File | Purpose |
|------|---------|
| **ChatContainer.tsx** | Main coordinator - connects all pieces together |
| **MessageList.tsx** | Displays conversation history with auto-scroll |
| **MessageItem.tsx** | Individual message with token metadata |
| **ChatInput.tsx** | Text input field and send button |
| **TokenStats.tsx** | Shows cumulative token usage |
| **SessionInfo.tsx** | Session info and clear button |

### Logic & Hooks (`src/hooks/`)
| File | Purpose |
|------|---------|
| **useChatSession.ts** | Handles localStorage save/load and recovery |
| **useGroqChat.ts** | Communicates with Groq API |

### Utilities (`src/utils/`)
| File | Purpose |
|------|---------|
| **storage.ts** | localStorage helpers and session management |
| **formatters.ts** | Formatting functions (time, tokens, numbers) |

### Backend (`src/app/`)
| File | Purpose |
|------|---------|
| **api/chat/route.ts** | Backend proxy to Groq API (uses .env.local key) |
| **page.tsx** | Main page (renders ChatContainer) |
| **layout.tsx** | App layout and global styles |

### Configuration
| File | Purpose |
|------|---------|
| **package.json** | Dependencies and scripts |
| **tsconfig.json** | TypeScript configuration |
| **next.config.js** | Next.js configuration |
| **tailwind.config.js** | Tailwind CSS configuration |
| **postcss.config.js** | PostCSS configuration |

---

## 🔄 How Data Flows Through the App

```
┌─────────────────────────────────────────────────────────┐
│ USER TYPES MESSAGE                                       │
│ ↓                                                         │
│ ChatInput captures text, sends to ChatContainer         │
│ ↓                                                         │
│ ChatContainer.handleSendMessage()                       │
│ ↓                                                         │
│ 1. Create user message object                           │
│ 2. Add to session state                                 │
│ 3. useGroqChat.sendMessage() → /api/chat               │
│ ↓                                                         │
│ BACKEND: /api/chat/route.ts                             │
│ ├─ Get message from request                             │
│ ├─ Add GROQ_API_KEY from .env.local                     │
│ ├─ Call Groq API with secure key                        │
│ ├─ Receive response + usage tokens                      │
│ └─ Return response to frontend                          │
│ ↓                                                         │
│ FRONTEND RECEIVES RESPONSE                              │
│ ├─ Extract tokens (prompt, completion)                 │
│ ├─ Calculate response time                              │
│ ├─ Calculate tokens/second                              │
│ └─ Create assistant message object                      │
│ ↓                                                         │
│ UPDATE SESSION STATE                                    │
│ ├─ Add assistant message                                │
│ ├─ Update cumulative token counts                       │
│ ├─ Update message count                                 │
│ └─ Update average tokens/sec                            │
│ ↓                                                         │
│ SAVE TO LOCALSTORAGE (auto)                             │
│ ├─ useChatSession hook detects state change            │
│ └─ Entire session serialized and saved                  │
│ ↓                                                         │
│ DISPLAY IN UI                                           │
│ ├─ MessageList shows all messages                       │
│ ├─ MessageItem shows metadata for each AI response      │
│ ├─ TokenStats shows cumulative totals                   │
│ └─ SessionInfo shows duration                           │
└─────────────────────────────────────────────────────────┘

NEXT PAGE LOAD:
  ↓
  useChatSession hook checks localStorage
  ↓
  Session found? → Load it + show recovery notification
  OR
  No session? → Create new one
  ↓
  Display conversation history
```

---

## 📊 Token Tracking Explained

### What Tokens Are
- **Prompt Tokens**: Tokens in your message (input)
- **Completion Tokens**: Tokens in AI response (output)
- **Total Tokens**: Sum of prompt + completion

### Where They Appear
```
┌─ MessageItem (individual message)
│  ├─ Prompt: 5 tokens (your question size)
│  ├─ Completion: 15 tokens (AI answer size)
│  ├─ Total: 20 tokens
│  ├─ Time: 1.2 seconds
│  ├─ Speed: 16.67 tokens/sec
│  └─ Model: mixtral-8x7b-32768

┌─ TokenStats (cumulative across session)
│  ├─ Prompt Tokens: 50 (all your messages combined)
│  ├─ Completion Tokens: 150 (all AI responses combined)
│  ├─ Total: 200 tokens (entire session)
│  ├─ Messages: 3 (number of AI responses)
│  └─ Avg Tokens/Sec: 12.5 (average across all responses)
```

---

## 💾 Session Persistence Details

### What Gets Saved
```javascript
{
  id: "session_1731450000000",           // Unique session ID
  messages: [                            // All messages
    {
      id: "msg_...",
      role: "user" | "assistant",
      content: "message text",
      timestamp: 1731450000000,
      modelUsed: "mixtral-8x7b-32768",   // AI model used
      responseTime: 1234,                // Response time in ms
      usage: {                           // Only for AI messages
        promptTokens: 5,
        completionTokens: 15,
        totalTokens: 20
      }
    },
    // ... more messages
  ],
  stats: {
    totalPromptTokens: 50,
    totalCompletionTokens: 150,
    totalTokens: 200,
    messageCount: 3,
    averageTokensPerSecond: 12.5,
    startTime: 1731450000000
  },
  createdAt: 1731450000000,
  updatedAt: 1731450005000
}
```

### When It Saves
- After each AI response completes
- Automatically in the background
- No action needed from user

### When It Loads
- On page load (if previous session exists)
- Entire conversation recovered
- Session info restored
- User gets notification

### What Happens If Cleared
- User clicks "Clear Session" button
- Browser shows confirmation
- If confirmed, everything deleted
- New session starts fresh

---

## 🔒 Security Checklist

✅ **API Key Protection**
- Stored in .env.local (backend only)
- .env.local in .gitignore (never committed)
- Only used in /api/chat/route.ts
- Never logged or exposed

✅ **Frontend-Backend Separation**
- Frontend never knows API key
- Frontend sends: messages + model name
- Backend adds: Bearer token + key
- Frontend receives: response only (no key)

✅ **No Sensitive Data in Storage**
- localStorage contains no API keys
- No authentication tokens stored
- Only conversation data saved
- Safe if browser data examined

---

## 🧪 Testing the Implementation

### Test 1: Basic Chat
1. Type "Hello, what is 2+2?"
2. Send message
3. Wait for response
4. See tokens displayed
✅ PASS if response shows tokens

### Test 2: Token Accumulation
1. Send 3+ messages
2. Check TokenStats panel
3. Verify totals increase
✅ PASS if cumulative totals correct

### Test 3: Page Refresh Recovery
1. Send message and get response
2. Refresh page (F5)
3. See "Session Recovered" notification
4. Conversation still there
✅ PASS if all messages and stats recovered

### Test 4: Error Handling
1. Stop dev server or no internet
2. Try sending message
3. Error message displayed
4. App still responsive
✅ PASS if error handled gracefully

### Test 5: Session Clear
1. Send several messages
2. Click "Clear Session"
3. Confirm deletion
4. Chat clears
✅ PASS if session cleared successfully

---

## 📱 UI Layout

```
┌────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ Chat with Groq AI - Powered by Groq API                  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────┬──────────────────────────┐
│                                 │                          │
│  MESSAGE LIST                   │  TOKEN STATS            │
│  ┌──────────────────────────┐   │  ┌────────────────────┐ │
│  │ User: Hello              │   │  │ Prompt: 50 tokens  │ │
│  └──────────────────────────┘   │  │ Completion: 150    │ │
│                                 │  │ Total: 200 tokens  │ │
│  ┌──────────────────────────┐   │  │ Messages: 3        │ │
│  │ AI: Hi! Let me help...   │   │  │ Avg: 12.5 tok/sec  │ │
│  │ Tokens: 5 | 15 | 20      │   │  └────────────────────┘ │
│  │ Time: 1.2s | 16.67 t/s   │   │                          │
│  │ Model: mixtral           │   │  SESSION INFO           │
│  └──────────────────────────┘   │  ┌────────────────────┐ │
│                                 │  │ Started: 5:30 PM   │ │
│  ┌──────────────────────────┐   │  │ Duration: 2m 15s   │ │
│  │ User: Thanks!            │   │  │ [Clear Session]    │ │
│  └──────────────────────────┘   │  └────────────────────┘ │
│                                 │                          │
│  (loading indicator...)         │                          │
│                                 │                          │
├────────────────────────────────┴──────────────────────────┤
│ TEXT INPUT AREA                                           │
│ ┌──────────────────────────────────────────┐             │
│ │ Type your message here...                │  [Send]    │
│ └──────────────────────────────────────────┘             │
└────────────────────────────────────────────────────────────┘
```

---

## 🚨 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Groq API key not configured" | .env.local missing | Create .env.local with GROQ_API_KEY |
| "401 Unauthorized" | Invalid API key | Get new key from console.groq.com |
| "Failed to save session" | localStorage full | Clear browser cache or old data |
| "No responses" | API not responding | Check internet connection, API status |
| "Build error: tailwindcss" | Old tailwind config | Use @tailwindcss/postcss plugin |

---

## 📚 Key Concepts

### Custom Hooks
- **useChatSession**: Manages localStorage for persistence
- **useGroqChat**: Handles API communication
- React's way to reuse logic without classes

### TypeScript Interfaces
- Define what data looks like
- Catch errors before runtime
- Self-documenting code

### API Routes
- `/api/chat` handles requests from frontend
- Proxies to Groq API with secure key
- Returns response to frontend

### Component Composition
- Small, focused components
- Each has one job
- Easy to test and maintain

### localStorage
- Browser's built-in storage
- Persists across page refreshes
- Limited to ~5-10MB per domain

---

## 🎓 Learning Resources

**Inside this project:**
- TypeScript types: `src/types/chat.ts`
- React hooks: `src/hooks/*.ts`
- Component examples: `src/components/*.tsx`
- API route: `src/app/api/chat/route.ts`
- Utilities: `src/utils/*.ts`

**External resources:**
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs/
- Groq API: https://console.groq.com/docs

---

## ✅ Verification: Is It Working?

Check these indicators:

| What | How to Check | What to Look For |
|-----|-------------|-----------------|
| **Chat Works** | Send message | Response appears |
| **Tokens Track** | Send message | Token numbers show |
| **Stats Update** | Send 2 messages | Cumulative totals increase |
| **Page Refresh** | Send message, refresh | Conversation recovered |
| **Persistence** | Open DevTools, Application tab | localStorage shows chat_session_v1 |
| **No Errors** | Open DevTools, Console tab | No red error messages |

---

**You're all set! Happy chatting! 🚀**
