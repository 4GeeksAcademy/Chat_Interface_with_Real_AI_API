# Chat Interface with Groq API

A modern chat interface built with React/Next.js that integrates with the Groq API. Features real-time message streaming, comprehensive token usage tracking, and session persistence across page refreshes.

## Features

✨ **Core Features**
- 💬 Real-time chat interface with Groq AI
- 📊 Comprehensive token usage tracking (prompt, completion, total)
- 📈 Additional metrics: response time, tokens per second, model name
- 💾 Session persistence - conversations survive page refreshes
- 🎯 Clean, functional UI (proof-of-concept quality)
- ⚡ Fast performance with Next.js

## Technology Stack

- **Frontend**: React 19 with Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API routes (secure proxy to Groq API)
- **Storage**: Browser localStorage for session persistence
- **API**: Groq API (no third-party services)

## Setup & Configuration

### Prerequisites

- Node.js 18+ and npm
- Groq API key (get one at https://console.groq.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/4GeeksAcademy/Chat_Interface_with_Real_AI_API
   cd Chat_Interface_with_Real_AI_API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Groq API Key**
   
   ⚠️ **IMPORTANT**: Create a `.env.local` file in the project root with your Groq API key:
   
   ```bash
   # .env.local (Never commit this file!)
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```
   
   - Get your API key from [Groq Console](https://console.groq.com/)
   - The `.env.local` file is in `.gitignore` and will never be committed
   - The API key is **only used server-side** in Next.js API routes
   - It is **never exposed** to the frontend or browser

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:3000 in your browser

## Usage

### Chat Interface

1. **Type a message** in the input field at the bottom
2. **Press Enter** or click Send button
3. **Wait for AI response** - you'll see a loading indicator
4. **View token usage** - each response shows detailed token metrics

### Viewing Token Metrics

Each AI response displays:
- **Prompt Tokens**: Tokens used for the input message
- **Completion Tokens**: Tokens generated in the response
- **Total Tokens**: Sum of prompt + completion tokens
- **Response Time**: How long the API took to respond
- **Tokens/Second**: Generation speed (tokens per second)
- **Model**: Which Groq model was used (default: mixtral-8x7b-32768)

### Session Management

- **Automatic Persistence**: Your conversation is automatically saved after each response
- **Page Refresh**: Close and reopen the tab - your conversation will be recovered
- **Clear Session**: Use the "Clear Session" button to start fresh
- **Session Info**: See session start time, duration, and ID in the sidebar

## Architecture

### Frontend Components

```
src/
├── components/
│   ├── ChatContainer.tsx      # Main component orchestrating the UI
│   ├── MessageList.tsx        # Displays message history
│   ├── MessageItem.tsx        # Individual message with metadata
│   ├── ChatInput.tsx          # Text input and send button
│   ├── TokenStats.tsx         # Cumulative token display
│   └── SessionInfo.tsx        # Session metadata and controls
├── hooks/
│   ├── useChatSession.ts      # localStorage persistence & recovery
│   └── useGroqChat.ts         # API communication
├── types/
│   └── chat.ts                # TypeScript interfaces
├── utils/
│   ├── storage.ts             # localStorage helpers
│   └── formatters.ts          # Display formatting utilities
└── app/
    ├── api/chat/route.ts      # Backend API route (Groq proxy)
    ├── page.tsx               # Main page
    └── layout.tsx             # App layout with styles
```

### Data Flow

1. **User Input** → ChatInput component
2. **Send Message** → Add to local session state
3. **API Call** → Frontend calls `/api/chat` endpoint
4. **Backend Proxy** → Next.js route proxies to Groq API with secure API key
5. **Groq Response** → Backend receives response with token usage
6. **Display** → Frontend updates UI and saves to localStorage
7. **Persistence** → Next page load recovers full conversation

### Security

- ✅ Groq API key stored only in `.env.local` (backend only)
- ✅ API key never exposed to frontend or browser
- ✅ `.env.local` is in `.gitignore` - never committed
- ✅ All Groq API calls go through secure backend proxy
- ✅ Frontend only receives sanitized responses

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

## Token Usage Tracking

The app tracks tokens across your entire session:

- **Per-Message**: Each AI response shows its prompt/completion tokens
- **Cumulative**: TokenStats component shows total tokens from all messages
- **Average**: Calculates average tokens/second across session
- **Metrics**: Displays model used, response time for each message

Example calculation:
```
Message 1: Prompt=5, Completion=10 (Total=15)
Message 2: Prompt=8, Completion=15 (Total=23)
---
Cumulative: Prompt=13, Completion=25, Total=38
Average Tokens/Sec: Calculated across all responses
```

## Session Persistence

Conversations are saved in browser's localStorage:

- ✅ Survives tab closure and page refresh
- ✅ Automatic save after each message
- ✅ Session recovery notification on load
- ✅ Can manually clear session and start fresh

**Important**: localStorage is browser-specific and local-machine-specific. Clearing browser data will delete conversations.

## Troubleshooting

### "Groq API key not configured"

**Solution**: Create `.env.local` file with your API key:
```bash
GROQ_API_KEY=gsk_your_key_here
```

### Conversations disappearing after refresh

**Solution**: Check if localStorage is enabled in your browser:
- Open DevTools (F12)
- Application → Storage → Local Storage
- Should see `chat_session_v1` entry

### API calls failing with 401 error

**Solution**: Your API key may be invalid or expired. Generate a new one at https://console.groq.com/

### "localStorage quota exceeded"

**Solution**: Clear old sessions or browser cache. Try clearing session with the "Clear Session" button.

## Performance & Limitations

- **No streaming**: Responses wait for complete generation (can be improved with streaming)
- **Single session**: One conversation per browser (can be extended with multi-session UI)
- **localStorage limit**: ~5-10MB per domain (sufficient for most conversations)
- **No backend storage**: Sessions lost if browser data is cleared

## Future Enhancements

- 🔄 Add streaming responses for real-time token display
- 💾 Add backend database for persistent storage
- 🔐 Add user authentication
- 📱 Improve mobile responsiveness
- 🌙 Add dark mode
- 📋 Add message editing and deletion
- 📤 Add export conversation to JSON/PDF
- 🔍 Add search across chat history
- 🎨 Add custom themes

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ Yes | Your Groq API key from https://console.groq.com/ |

Store in `.env.local` (never commit this file).

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC

## Resources

- [Groq API Documentation](https://console.groq.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Note**: This is a proof-of-concept implementation. Focus is on data accuracy and functionality rather than production-level styling and polish.