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
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-gray-600">Loading chat session...</p>
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Chat with Groq AI</h1>
        <p className="text-sm text-blue-100">Powered by Groq API</p>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mx-4 mt-4 rounded">
          <p className="font-semibold">✓ Session Recovered</p>
          <p className="text-sm">
            Your previous conversation ({session.stats.messageCount} messages) has been
            restored.
          </p>
        </div>
      )}

      {/* Error notification */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-4 mt-2 rounded">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Main chat area */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Chat column */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow overflow-hidden">
          <MessageList messages={session.messages} isLoading={isLoadingChat} />
          <ChatInput onSend={handleSendMessage} isLoading={isLoadingChat} />
        </div>

        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-4 overflow-auto">
          <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <TokenStats stats={session.stats} />
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <SessionInfo session={session} onClearSession={handleClearSession} />
          </div>
        </div>
      </div>
    </div>
  );
};
