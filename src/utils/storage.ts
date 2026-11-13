import { ChatSession, Message, SessionStats } from "@/types/chat";

const SESSION_STORAGE_KEY = "chat_session_v1";

/**
 * Save chat session to localStorage
 */
export function saveSession(session: ChatSession): boolean {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch (error) {
    console.error("Failed to save session:", error);
    return false;
  }
}

/**
 * Load chat session from localStorage
 */
export function loadSession(): ChatSession | null {
  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;
    const session = JSON.parse(stored) as ChatSession;
    return session;
  } catch (error) {
    console.error("Failed to load session:", error);
    return null;
  }
}

/**
 * Clear chat session from localStorage
 */
export function clearSession(): boolean {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear session:", error);
    return false;
  }
}

/**
 * Create a new empty session
 */
export function createNewSession(): ChatSession {
  return {
    id: `session_${Date.now()}`,
    messages: [],
    stats: {
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,
      messageCount: 0,
      startTime: Date.now(),
    },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/**
 * Add message to session and update stats
 */
export function addMessageToSession(
  session: ChatSession,
  message: Message
): ChatSession {
  const updated = { ...session };
  updated.messages.push(message);
  updated.updatedAt = Date.now();

  if (message.role === "assistant" && message.usage) {
    updated.stats.totalPromptTokens += message.usage.promptTokens;
    updated.stats.totalCompletionTokens += message.usage.completionTokens;
    updated.stats.totalTokens += message.usage.totalTokens;
    updated.stats.messageCount += 1;

    // Calculate average tokens per second
    if (message.responseTime && message.responseTime > 0) {
      const tokensPerSec = message.usage.totalTokens / (message.responseTime / 1000);
      updated.stats.averageTokensPerSecond =
        (updated.stats.averageTokensPerSecond || 0) * (updated.stats.messageCount - 1) +
        tokensPerSec;
      updated.stats.averageTokensPerSecond /= updated.stats.messageCount;
    }
  }

  return updated;
}

/**
 * Generate unique message ID
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

/**
 * Check if session storage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = "__test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}
