"use client";

import React, { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter, but allow Shift+Enter for new lines
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-100 bg-gradient-to-t from-gray-50 to-white p-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Shift+Enter for new line)"
            disabled={isLoading}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 transition-all duration-200 placeholder-gray-400 text-gray-900 font-medium text-sm shadow-sm hover:border-gray-300"
            rows={3}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="gradient-primary text-white px-6 py-3 rounded-xl hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-sm uppercase tracking-wide flex items-center gap-2 shadow-md disabled:shadow-none flex-shrink-0"
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-pulse">⏳</span>
              <span className="hidden sm:inline">Sending...</span>
            </>
          ) : (
            <>
              <span>→</span>
              <span className="hidden sm:inline">Send</span>
            </>
          )}
        </button>
      </div>
      <div className="text-xs text-gray-400 mt-2 text-center">
        {input.length > 0 && `${input.length} characters`}
      </div>
    </form>
  );
};
