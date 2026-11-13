"use client";

import { useEffect, useState } from "react";
import { ChatSession } from "@/types/chat";
import {
  loadSession,
  saveSession,
  createNewSession,
  addMessageToSession,
  isStorageAvailable,
} from "@/utils/storage";

/**
 * Hook to manage chat session with localStorage persistence
 * Automatically loads session on mount and saves on every change
 */
export function useChatSession() {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recovered, setRecovered] = useState(false);

  // Load session on mount
  useEffect(() => {
    if (!isStorageAvailable()) {
      setError("localStorage is not available");
      setSession(createNewSession());
      setIsLoading(false);
      return;
    }

    const loaded = loadSession();
    if (loaded) {
      setSession(loaded);
      setRecovered(true);
    } else {
      setSession(createNewSession());
      setRecovered(false);
    }
    setIsLoading(false);
  }, []);

  // Save session whenever it changes
  useEffect(() => {
    if (session) {
      const success = saveSession(session);
      if (!success) {
        setError("Failed to save session to localStorage");
      }
    }
  }, [session]);

  const updateSession = (newSession: ChatSession) => {
    setSession(newSession);
  };

  const clearSession = () => {
    const newSession = createNewSession();
    setSession(newSession);
    setRecovered(false);
  };

  return {
    session,
    setSession: updateSession,
    isLoading,
    error,
    recovered,
    clearSession,
  };
}
