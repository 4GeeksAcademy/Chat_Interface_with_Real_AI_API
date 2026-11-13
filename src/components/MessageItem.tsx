"use client";

import React from "react";
import { Message } from "@/types/chat";
import { formatTime, formatDuration, formatTokensPerSecond } from "@/utils/formatters";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`max-w-sm lg:max-w-md px-5 py-3 rounded-2xl shadow-sm-modern transition-all duration-200 hover:shadow-md-modern ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none"
            : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-900 rounded-bl-none border border-gray-200"
        }`}
      >
        <p className={`text-sm break-words ${isUser ? "text-white" : "text-gray-900"}`}>
          {message.content}
        </p>

        {/* Display metadata for assistant messages */}
        {!isUser && message.usage && (
          <div className="mt-4 pt-4 border-t border-gray-200/50 text-xs space-y-2">
            {/* Token Row 1 */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="text-gray-600 text-xs font-semibold">PROMPT</div>
                <div className="font-bold text-blue-600 text-sm">
                  {message.usage.promptTokens}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-gray-600 text-xs font-semibold">COMPLETION</div>
                <div className="font-bold text-green-600 text-sm">
                  {message.usage.completionTokens}
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-2">
                <div className="text-gray-600 text-xs font-semibold">TOTAL</div>
                <div className="font-bold text-purple-600 text-sm">
                  {message.usage.totalTokens}
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-2">
              {message.responseTime && (
                <div className="bg-orange-50 rounded-lg p-2">
                  <div className="text-gray-600 text-xs font-semibold">⏱ TIME</div>
                  <div className="font-bold text-orange-600 text-xs">
                    {formatDuration(message.responseTime)}
                  </div>
                </div>
              )}

              {message.responseTime && message.usage.totalTokens > 0 && (
                <div className="bg-pink-50 rounded-lg p-2">
                  <div className="text-gray-600 text-xs font-semibold">⚡ SPEED</div>
                  <div className="font-bold text-pink-600 text-xs">
                    {formatTokensPerSecond(message.usage.totalTokens, message.responseTime)}
                  </div>
                </div>
              )}
            </div>

            {/* Model */}
            {message.modelUsed && (
              <div className="bg-indigo-50 rounded-lg p-2">
                <div className="text-gray-600 text-xs font-semibold">🤖 MODEL</div>
                <div className="font-bold text-indigo-600 text-xs truncate">
                  {message.modelUsed}
                </div>
              </div>
            )}

            {/* Timestamp */}
            <div className="text-gray-400 text-xs pt-1 flex items-center justify-between">
              <span>⏰ {formatTime(message.timestamp)}</span>
            </div>
          </div>
        )}

        {/* Display timestamp for user messages */}
        {isUser && (
          <div className="mt-2 text-xs opacity-80 text-right text-blue-100">
            {formatTime(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};
