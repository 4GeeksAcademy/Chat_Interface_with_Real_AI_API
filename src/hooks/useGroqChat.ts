"use client";

import { useState } from "react";
import { ChatResponse, ChatError, Message } from "@/types/chat";

interface UseGroqChatOptions {
  model?: string;
  apiKey?: string;
}

interface GroqMessage {
  role: "user" | "assistant";
  content: string;
}

interface GroqRequestBody {
  model: string;
  messages: GroqMessage[];
  temperature: number;
  max_tokens: number;
}

interface GroqResponseChoice {
  message: {
    content: string;
    role: string;
  };
  finish_reason: string;
}

interface GroqResponseData {
  id: string;
  choices: GroqResponseChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Hook to handle Groq API communication directly from browser
 * Calls Groq API with Bearer token instead of proxying through backend
 */
export function useGroqChat(options: UseGroqChatOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getApiKey = (): string => {
    // Try to get from options, then environment, then localStorage
    if (options.apiKey) return options.apiKey;
    
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("groq_api_key");
      if (stored) return stored;
    }

    // Fallback: empty string will be caught and reported
    return "";
  };

  const sendMessage = async (
    messages: Array<{ role: "user" | "assistant"; content: string }>
  ): Promise<Message | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = getApiKey();
      
      if (!apiKey) {
        throw new Error(
          "Groq API key not configured. Please set GROQ_API_KEY in localStorage or pass it to useGroqChat."
        );
      }

      const model = options.model || "mixtral-8x7b-32768";

      // Call Groq API directly from browser
      const requestBody: GroqRequestBody = {
        model,
        messages: messages as GroqMessage[],
        temperature: 0.7,
        max_tokens: 1024,
      };

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        let errorMsg = `Groq API error: ${response.status}`;
        try {
          const errorData: any = await response.json();
          errorMsg = errorData.error?.message || errorData.error || errorMsg;
        } catch {
          // Could not parse error response
        }
        throw new Error(errorMsg);
      }

      const startTime = Date.now();
      const data: GroqResponseData = await response.json();
      const responseTime = Date.now() - startTime;

      // Extract response
      const choice = data.choices?.[0];
      if (!choice) {
        throw new Error("No response choices from Groq API");
      }

      const content = choice.message?.content || "";

      // Create assistant message with token usage
      const assistantMsg: Message = {
        id: data.id,
        role: "assistant",
        content,
        timestamp: Date.now(),
        modelUsed: model,
        responseTime,
        tokens: data.usage.total_tokens,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
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

  const setApiKey = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("groq_api_key", key);
    }
  };

  return {
    sendMessage,
    isLoading,
    error,
    clearError,
    setApiKey,
  };
}
