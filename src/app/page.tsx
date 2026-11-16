'use client';

import { useState, useRef, useEffect } from 'react';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import TokenStats from '@/components/TokenStats';
import ErrorDisplay from '@/components/ErrorDisplay';
import { useChatSession } from '@/hooks/useChatSession';
import { useGroqChat } from '@/hooks/useGroqChat';
import { Message } from '@/types/chat';
import { addMessageToSession } from '@/utils/storage';

export default function Home() {
  const [showStats, setShowStats] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { session, setSession, isLoading: sessionLoading, error: sessionError } = useChatSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayError, setDisplayError] = useState<string | null>(null);
  const { sendMessage, isLoading, error: chatError, clearError: clearChatError } = useGroqChat();
  const threadRef = useRef<HTMLDivElement>(null);

  // Initialize messages from session when it loads
  useEffect(() => {
    if (session?.messages) {
      setMessages(session.messages);
    }
  }, [session?.id]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    threadRef.current?.scrollTo(0, threadRef.current.scrollHeight);
  }, [messages]);

  // Sync display error from chat hook
  useEffect(() => {
    if (chatError) {
      setDisplayError(chatError);
    }
  }, [chatError]);

  const syncMessageToSession = (newMessages: Message[]) => {
    if (!session) return;
    
    // Update local session object with new messages
    let updatedSession = { ...session, messages: newMessages, updatedAt: Date.now() };
    
    // Update stats for assistant messages
    if (newMessages.length > messages.length) {
      const lastMessage = newMessages[newMessages.length - 1];
      updatedSession = addMessageToSession(updatedSession, lastMessage);
    }
    
    // This triggers the hook effect in useChatSession to save to localStorage
    setSession(updatedSession);
  };

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMsg: Message = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      tokens: 0,
    };
    
    const newMessagesWithUser = [...messages, userMsg];
    setMessages(newMessagesWithUser);
    
    // Sync user message to session
    syncMessageToSession(newMessagesWithUser);

    // Get assistant response
    const response = await sendMessage(newMessagesWithUser);
    
    if (response) {
      // Add assistant response
      const finalMessages = [...newMessagesWithUser, response];
      setMessages(finalMessages);
      
      // Sync assistant response to session (which also updates stats)
      syncMessageToSession(finalMessages);
    } else if (chatError) {
      // Error occurred - it's already in displayError via useEffect
      // Optionally remove the failed user message if desired
      // For now, we keep it to show the user what they tried to send
    }
  };

  const handleClearSession = () => {
    setMessages([]);
    setDisplayError(null);
    clearChatError();
  };

  if (sessionLoading) {
    return (
      <div className="app" id="app">
        <main className="main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="thinking">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>Loading session...</p>
          </div>
        </main>
      </div>
    );
  }

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
        <button className="newchat" onClick={handleClearSession}>
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

        <ErrorDisplay 
          error={displayError || sessionError} 
          onDismiss={() => {
            setDisplayError(null);
            clearChatError();
          }}
        />

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
