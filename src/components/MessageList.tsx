"use client";

import React, { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white via-blue-50/10 to-white/80 p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-5xl animate-float">💬</span>
            </div>
            <p className="text-gray-700 font-bold text-xl">Start a conversation</p>
            <p className="text-gray-500 text-sm mt-2">Ask Groq AI anything you'd like</p>
            <div className="mt-6 text-xs text-gray-400 space-y-1">
              <p>✨ Powered by Groq API</p>
              <p>💾 Auto-saved to browser</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4 animate-fadeIn">
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 px-5 py-3 rounded-2xl rounded-bl-none shadow-sm-modern border border-gray-200/50">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};
