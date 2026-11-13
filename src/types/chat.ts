/**
 * Type definitions for the Chat Interface application
 */

export interface MessageUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  modelUsed?: string;
  responseTime?: number; // milliseconds
  usage?: MessageUsage;
}

export interface SessionStats {
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  messageCount: number;
  averageTokensPerSecond?: number;
  startTime: number;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  stats: SessionStats;
  createdAt: number;
  updatedAt: number;
}

/**
 * Groq API Response structure
 */
export interface GroqChatResponse {
  id: string;
  content: string;
  model: string;
  usage: MessageUsage;
  responseTime?: number;
}

/**
 * Frontend API request/response for chat
 */
export interface ChatRequest {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  model?: string;
}

export interface ChatResponse {
  id: string;
  content: string;
  model: string;
  usage: MessageUsage;
  responseTime?: number;
}

export interface ChatError {
  error: string;
  code?: string;
  statusCode?: number;
}
