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
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>

        {/* Display metadata for assistant messages */}
        {!isUser && message.usage && (
          <div className="mt-3 pt-3 border-t border-gray-300 text-xs opacity-75">
            <div className="flex justify-between gap-2">
              <span>
                <strong>Prompt:</strong> {message.usage.promptTokens}
              </span>
              <span>
                <strong>Completion:</strong> {message.usage.completionTokens}
              </span>
            </div>
            <div className="mt-1">
              <strong>Total:</strong> {message.usage.totalTokens}
            </div>

            {/* Additional metrics */}
            {message.responseTime && (
              <div className="mt-1">
                <strong>Time:</strong> {formatDuration(message.responseTime)}
              </div>
            )}

            {message.responseTime && message.usage.totalTokens > 0 && (
              <div className="mt-1">
                <strong>Speed:</strong>{" "}
                {formatTokensPerSecond(message.usage.totalTokens, message.responseTime)}
              </div>
            )}

            {message.modelUsed && (
              <div className="mt-1">
                <strong>Model:</strong> {message.modelUsed}
              </div>
            )}

            <div className="mt-1 text-gray-500">
              {formatTime(message.timestamp)}
            </div>
          </div>
        )}

        {/* Display timestamp for user messages */}
        {isUser && (
          <div className="mt-2 text-xs opacity-70 text-right">
            {formatTime(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};
