# Setup & Quick Start Guide

## 🚀 Quick Start (5 minutes)

### 1. Get Your Groq API Key

Visit https://console.groq.com/ and sign up/login to get your free API key.

### 2. Create `.env.local` File

In the project root directory, create a file named `.env.local`:

```bash
GROQ_API_KEY=gsk_your_actual_api_key_here
```

Replace `gsk_your_actual_api_key_here` with your actual Groq API key.

### 3. Install & Run

```bash
# Install dependencies (only needed first time)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

That's it! You're ready to chat with Groq AI.

## ⚠️ Important Security Notes

- **Never commit `.env.local`** - It's in `.gitignore` for a reason
- **API key stays server-side** - Only the backend API route can see it
- **Frontend never knows your API key** - All calls go through Next.js proxy
- **Don't share `.env.local`** - Keep your API key private

## 🔍 Verifying It Works

1. Open http://localhost:3000
2. Type a message like "Hello, what is 2+2?"
3. Press Enter or click Send
4. Wait for the AI response
5. Check the right sidebar for token usage metrics

You should see:
- Your message in blue on the right
- AI response in gray on the left
- Token counts below the AI response
- Cumulative totals in the "Token Usage Statistics" panel

## 📝 Example Environment File

Your `.env.local` should look like this:

```
GROQ_API_KEY=gsk_Y1234567890abcdefghijklmnop
```

Just the API key, nothing else. No quotes needed.

## ❓ Common Issues

### Issue: "Groq API key not configured"

**Fix**: Make sure `.env.local` file exists in the project root with:
```
GROQ_API_KEY=your_key_here
```

Then restart the dev server with `npm run dev`.

### Issue: API returns 401 Unauthorized

**Fix**: Your API key is invalid or expired. Get a new one from https://console.groq.com/

### Issue: Conversations disappear after page refresh

**Fix**: localStorage might be disabled or full. Check your browser settings.

### Issue: "Failed to save session"

**Fix**: localStorage quota exceeded. Try clearing old sessions or browser cache.

## 📚 What You Can Do

### ✅ Works Great For:
- General conversation with AI
- Asking questions
- Getting explanations
- Problem-solving help
- Code reviews and suggestions

### ⚠️ Note:
- Responses wait for complete generation (no streaming yet)
- Each session is local to your browser
- Clearing browser data will delete conversations

## 🎯 Next Steps

1. **Test the chat** - Try different types of questions
2. **Watch token usage** - Notice how tokens vary by prompt/response
3. **Refresh the page** - Verify your conversation is recovered
4. **Clear session** - Try starting fresh with "Clear Session" button
5. **Review the code** - Check out `src/components/` and `src/hooks/`

## 🛠️ Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Create production build
npm start        # Run production build
npm run lint     # Check code quality
```

## 📖 Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    ← Backend API (Groq proxy)
│   ├── page.tsx             ← Main chat page
│   └── layout.tsx           ← App layout
├── components/              ← React components
│   ├── ChatContainer.tsx    ← Main coordinator
│   ├── MessageList.tsx      ← Message history
│   ├── ChatInput.tsx        ← Input field
│   └── TokenStats.tsx       ← Usage display
├── hooks/                   ← Custom React hooks
│   ├── useChatSession.ts    ← Session persistence
│   └── useGroqChat.ts       ← API communication
├── types/                   ← TypeScript types
└── utils/                   ← Helper functions
    ├── storage.ts          ← localStorage helpers
    └── formatters.ts       ← Display formatting
```

## 🔗 Useful Links

- **Groq Console**: https://console.groq.com/
- **Groq API Docs**: https://console.groq.com/docs/
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev

## 💬 Need Help?

1. Check the main [README.md](./README.md) for detailed documentation
2. Review the [context.md](./context.md) for project overview
3. Check the code comments in `src/app/api/chat/route.ts`
4. Visit https://console.groq.com/docs for API documentation

---

**Happy chatting! 🎉**
