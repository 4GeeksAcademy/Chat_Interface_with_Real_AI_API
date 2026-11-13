'use client';

import { useState, useRef, useEffect } from 'react';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import TokenStats from '@/components/TokenStats';
import { useChatSession } from '@/hooks/useChatSession';
import { useGroqChat } from '@/hooks/useGroqChat';
import { Message } from '@/types/chat';

export default function Home() {
  const [showStats, setShowStats] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { session, clearSession } = useChatSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage, isLoading } = useGroqChat();
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.messages) {
      setMessages(session.messages);
    }
  }, [session]);

  useEffect(() => {
    threadRef.current?.scrollTo(0, threadRef.current.scrollHeight);
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = { role: 'user', content: text, tokens: 0 };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    const response = await sendMessage(newMessages);
    if (response) {
      const assistantMsg: Message = {
        role: 'assistant',
        content: response.content,
        tokens: response.tokens || 0,
      };
      setMessages([...newMessages, assistantMsg]);
    }
  };

  return (
    <div className="app" id="app">
      <aside className="panel history" aria-label="Conversation history">
        <div className="brand">
          <div className="mark">A1</div>
          <b>Atlas</b>
          <button className="icon-btn x-close" onClick={() => setShowHistory(false)}>
            <svg className="i" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <button className="newchat" onClick={clearSession}>
          <svg className="i" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New chat
          <kbd>⌘K</kbd>
        </button>
        <label className="search">
          <svg className="i" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7"/>
            <path d="m20 20-3.5-3.5"/>
          </svg>
          <input type="search" placeholder="Search chats" />
        </label>
        <nav className="hist-list">
          <div className="group">Today</div>
          <button className="conv" aria-current="true">
            <div className="t">Groq Chat</div>
            <div className="m">
              <span>Now</span>
              <span>{messages.length} msgs</span>
            </div>
          </button>
        </nav>
        <div className="user-card">
          <div className="avatar">GR</div>
          <div>Groq<small>Free · Unlimited</small></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="icon-btn only-narrow" onClick={() => setShowHistory(!showHistory)}>
            <svg className="i" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="16" rx="2"/>
              <path d="M9 4v16"/>
            </svg>
          </button>
          <h1>Atlas Chat</h1>
          <label className="model">
            <span className="dot"></span>
            <select>
              <option>Mixtral 8x7B</option>
              <option>Llama 2</option>
            </select>
          </label>
          <button className="icon-btn only-stats-narrow" onClick={() => setShowStats(!showStats)}>
            <svg className="i" viewBox="0 0 24 24">
              <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>
            </svg>
          </button>
        </header>

        <div className="thread" ref={threadRef}>
          <div className="thread-inner">
            {messages.length === 0 ? (
              <div className="welcome">
                <div className="mark" style={{width: 48, height: 48, fontSize: 24}}>A</div>
                <h2>Welcome to Atlas</h2>
                <p>Start a conversation with Groq AI</p>
              </div>
            ) : (
              <MessageList messages={messages} isLoading={isLoading} />
            )}
          </div>
        </div>

        <div className="composer-wrap">
          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          <p className="hint">Enter to send · Shift+Enter for new line</p>
        </div>
      </main>

      <aside className="panel stats">
        <div className="stats-head">
          Token usage
          <span className="live">
            <i></i>
            <span>{isLoading ? 'Active' : 'Idle'}</span>
          </span>
          <button className="icon-btn x-close" onClick={() => setShowStats(false)}>
            <svg className="i" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <TokenStats messages={messages} />
      </aside>

      <div className="scrim" onClick={() => { setShowHistory(false); setShowStats(false); }}></div>
    </div>
  );
}
