# 🚀 Setup Instructions - Chat Interface with Groq API

## Prerequisites

✅ Node.js 18+ and npm installed
✅ Groq API key (free tier available)

## Quick Start

### 1. **Clone & Install**
```bash
git clone https://github.com/4GeeksAcademy/Chat_Interface_with_Real_AI_API
cd Chat_Interface_with_Real_AI_API
npm install
```

### 2. **Get Your Groq API Key**

1. Go to: https://console.groq.com/keys
2. Create a new API key (or use an existing one)
3. Copy the API key (starts with `gsk_`)

### 3. **Create .env.local File**

Create a file named `.env.local` in the project root:

```bash
# .env.local (NEVER commit this file!)
GROQ_API_KEY=gsk_your_actual_api_key_here
```

Replace `gsk_your_actual_api_key_here` with your actual Groq API key.

### 4. **Run Development Server**

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

---

## 🎯 Available Models

The app supports these Groq models:

| Model | Type | Speed | Quality |
|-------|------|-------|---------|
| `llama-3.1-8b-instant` | Fast | ⚡⚡⚡ | ⭐⭐⭐ |
| `llama-3.3-70b-versatile` | Balanced | ⚡⚡ | ⭐⭐⭐⭐ |
| `mixtral-8x7b-32768` | Powerful | ⚡ | ⭐⭐⭐⭐⭐ |
| `gemma-7b-it` | Lightweight | ⚡⚡⚡ | ⭐⭐⭐ |

**Note:** Model availability depends on your Groq API plan. Free tier has limited access.

---

## ✨ Features

✅ **Real-time Chat** - Type messages and get AI responses
✅ **Model Selection** - Choose from multiple Groq models in the UI
✅ **Token Tracking** - See prompt/completion/total tokens for each message
✅ **Session Persistence** - Your chats save automatically in browser
✅ **Error Display** - Clear error messages if something goes wrong

---

## 📱 Usage

1. **Open the app** → http://localhost:3000
2. **Choose a model** → Click the model selector dropdown
3. **Type a message** → Type in the chat input box
4. **Press Enter** → Send the message
5. **View response** → See the AI response with token metrics
6. **Clear chat** → Click "New chat" button

---

## 🔧 Troubleshooting

### "Groq API key not configured"
- Create `.env.local` file with your API key
- File should be in the project root directory
- Never commit `.env.local` (it's in `.gitignore`)

### "Model not found" error
- Verify your Groq API key is valid
- Check that the model is available in your Groq plan
- Try a different model from the dropdown

### "Invalid API Key" error
- Your API key is incorrect or expired
- Generate a new one at: https://console.groq.com/keys

### App loads but doesn't respond to messages
- Check browser console (F12) for error messages
- Verify `.env.local` exists and has the correct API key
- Make sure dev server is running: `npm run dev`

---

## 🏗️ Build for Production

```bash
# Build optimized version
npm run build

# Start production server
npm start
```

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts       # API endpoint (proxies to Groq)
│   ├── page.tsx                # Main chat interface
│   └── layout.tsx              # App layout
├── components/
│   ├── ChatInput.tsx           # Message input box
│   ├── MessageList.tsx         # Chat history
│   ├── TokenStats.tsx          # Token usage display
│   └── ...
├── hooks/
│   ├── useChatSession.ts       # Session persistence
│   └── useGroqChat.ts          # API communication
├── types/
│   └── chat.ts                 # TypeScript types
└── utils/
    ├── storage.ts              # localStorage helpers
    └── formatters.ts           # Display formatting
```

---

## 🔐 Security Notes

✅ Your API key is stored in `.env.local` (backend only)
✅ API key is NEVER sent to the browser
✅ All Groq calls go through Next.js API route (secure proxy)
✅ `.env.local` is in `.gitignore` - never committed

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Push to GitHub first
git push origin main

# Then deploy on Vercel dashboard
# Add GROQ_API_KEY in environment variables
```

### Deploy to Other Platforms

Add `GROQ_API_KEY` environment variable on your hosting platform.

---

## 📚 Resources

- [Groq API Docs](https://console.groq.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

---

**Made with ❤️ for 4GeeksAcademy**
