"use client";

import React, { useEffect, useState } from "react";
import { ChatSession, Message } from "@/types/chat";
import { useChatSession } from "@/hooks/useChatSession";
import { useGroqChat } from "@/hooks/useGroqChat";
import { addMessageToSession, generateMessageId } from "@/utils/storage";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { TokenStats } from "./TokenStats";
import { SessionInfo } from "./SessionInfo";

export const ChatContainer: React.FC = () => {
  const { session, setSession, isLoading: isLoadingSession, recovered, clearSession } =
    useChatSession();
  const { sendMessage, isLoading: isLoadingChat, error } = useGroqChat();
  const [showNotification, setShowNotification] = useState(false);

  // Show notification when session is recovered
  useEffect(() => {
    if (recovered) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [recovered]);

  if (isLoadingSession || !session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="text-center">
          <div className="inline-block animate-float mb-4">
            <div className="w-16 h-16 rounded-full gradient-primary shadow-lg-modern"></div>
          </div>
          <p className="text-slate-700 text-lg font-semibold">Loading chat session...</p>
          <p className="text-slate-500 text-sm mt-2">Connecting to Groq API</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim() || !session) return;

    // Add user message to session
    const userMessage: Message = {
      id: generateMessageId(),
      role: "user",
      content: userInput,
      timestamp: Date.now(),
    };

    let updatedSession = addMessageToSession(session, userMessage);
    setSession(updatedSession);

    // Get AI response
    const assistantMessage = await sendMessage(
      updatedSession.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      userInput
    );

    if (assistantMessage) {
      updatedSession = addMessageToSession(updatedSession, assistantMessage);
      setSession(updatedSession);
    }
  };

  const handleClearSession = () => {
    if (confirm("Are you sure you want to clear the session? This cannot be undone.")) {
      clearSession();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="gradient-accent text-white p-4 sm:p-6 shadow-lg-modern">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-lg">
              💬
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Groq AI Chat</h1>
              <p className="text-pink-100 text-xs sm:text-sm font-medium">Token Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur border border-white/20">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm text-white font-medium">Live</span>
          </div>
        </div>
      </header>

      {/* Notifications */}
      <div className="px-4 sm:px-6 pt-4 space-y-3 max-w-7xl mx-auto w-full">
        {showNotification && (
          <div className="animate-fadeIn bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 p-4 rounded-lg shadow-md-modern">
            <p className="font-semibold flex items-center gap-2 text-sm sm:text-base">
              <span className="text-lg">✓</span> Session Recovered
            </p>
            <p className="text-xs sm:text-sm text-emerald-600 mt-1">
              Your previous conversation ({session.stats.messageCount} messages) has been
              restored.
            </p>
          </div>
        )}

        {error && (
          <div className="animate-fadeIn bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md-modern">
            <p className="font-semibold flex items-center gap-2 text-sm sm:text-base">
              <span className="text-lg">⚠</span> Error
            </p>
            <p className="text-xs sm:text-sm text-red-600 mt-1">{error}</p>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 overflow-hidden max-w-7xl mx-auto w-full">
        {/* Chat column */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg-modern overflow-hidden border border-gray-100/50 backdrop-blur-sm">
          <MessageList messages={session.messages} isLoading={isLoadingChat} />
          <ChatInput onSend={handleSendMessage} isLoading={isLoadingChat} />
        </div>

        {/* Sidebar - Stats and Info */}
        <div className="w-full lg:w-96 flex flex-col gap-4 sm:gap-6 overflow-auto">
          {/* Token Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg-modern border border-gray-100/50 overflow-hidden hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="h-1 gradient-primary"></div>
            <TokenStats stats={session.stats} />
          </div>

          {/* Session Info Card */}
          <div className="bg-white rounded-2xl shadow-lg-modern border border-gray-100/50 overflow-hidden hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="h-1 gradient-accent"></div>
            <SessionInfo session={session} onClearSession={handleClearSession} />
          </div>

          {/* Quick Tips Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg-modern border border-blue-100 p-4 backdrop-blur-sm hidden sm:block">
            <h3 className="font-bold text-blue-900 mb-3 text-sm">💡 Tips</h3>
            <ul className="space-y-2 text-xs text-blue-800">
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Press Shift+Enter for new line</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Tokens tracked per message</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Session auto-saves locally</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
