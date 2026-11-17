"use client";

import { useState } from "react";
import { Message } from "@/types/chat";

interface UseGroqChatOptions {
  model?: string;
  apiKey?: string;
}

/**
 * Hook to handle Groq API communication directly from browser
 * Calls Groq API with Bearer token authentication
 */
export function useGroqChat(options: UseGroqChatOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (
    messages: Array<{ role: "user" | "assistant"; content: string }>,
    opts?: UseGroqChatOptions
  ): Promise<Message | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const model = opts?.model || options.model || "openai/gpt-oss-20b";
      const apiKey = opts?.apiKey || options.apiKey;

      if (!apiKey) {
        throw new Error("Groq API key is required. Please add GROQ_API_KEY to .env.local");
      }

      // Call Groq API directly with Bearer token
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          // Only send fields accepted by Groq's chat-completions API.
          // App messages also carry local metadata such as id, timestamp, and tokens.
          messages: messages.map(({ role, content }) => ({ role, content })),
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error?.message || `Groq API error: ${response.status}`;
        throw new Error(errorMsg);
      }

      const startTime = Date.now();
      const data = await response.json();
      const responseTime = Date.now() - startTime;

      const choice = data.choices?.[0];
      if (!choice) {
        throw new Error("No response from Groq");
      }

      const content = choice.message?.content || "";
      const usage = data.usage || {};

      // Create assistant message with token usage
      const assistantMsg: Message = {
        id: data.id || `msg_${Date.now()}`,
        role: "assistant",
        content,
        timestamp: Date.now(),
        modelUsed: model,
        responseTime,
        tokens: usage.total_tokens || 0,
        usage: {
          promptTokens: usage.prompt_tokens || 0,
          completionTokens: usage.completion_tokens || 0,
          totalTokens: usage.total_tokens || 0,
        },
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
