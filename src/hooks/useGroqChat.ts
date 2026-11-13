"use client";

import { useState } from "react";
import { ChatRequest, ChatResponse, ChatError, Message } from "@/types/chat";

interface UseGroqChatOptions {
  model?: string;
}

/**
 * Hook to handle Groq API communication
 * Manages sending messages and receiving responses
 */
export function useGroqChat(options: UseGroqChatOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (
    messages: Array<{ role: "user" | "assistant"; content: string }>
  ): Promise<Message | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Call backend API
      const request: ChatRequest = {
        messages,
        model: options.model || "openai/gpt-oss-120b",
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData: ChatError = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      // Create assistant message
      const assistantMsg: Message = {
        id: data.id,
        role: "assistant",
        content: data.content,
        timestamp: Date.now(),
        modelUsed: data.model,
        responseTime: data.responseTime,
        tokens: data.usage.totalTokens,
        usage: data.usage,
      };

      return assistantMsg;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      console.error("Chat error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    sendMessage,
    isLoading,
    error,
    clearError,
  };
}
