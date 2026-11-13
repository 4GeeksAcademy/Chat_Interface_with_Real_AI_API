"use client";

import React from "react";
import { ChatSession } from "@/types/chat";
import { formatTime } from "@/utils/formatters";

interface SessionInfoProps {
  session: ChatSession | null;
  onClearSession: () => void;
}

export const SessionInfo: React.FC<SessionInfoProps> = ({ session, onClearSession }) => {
  if (!session) {
    return (
      <div className="bg-gray-50 border-t border-gray-200 p-4 text-sm text-gray-600">
        No active session
      </div>
    );
  }

  const duration = Date.now() - session.createdAt;
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);

  return (
    <div className="bg-gray-50 border-t border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-700">
          <div className="font-semibold mb-1">Session Info</div>
          <div className="text-xs text-gray-500 space-y-1">
            <div>Started: {formatTime(session.createdAt)}</div>
            <div>
              Duration: {hours}h {minutes}m {seconds}s
            </div>
            <div>Session ID: {session.id.substring(0, 15)}...</div>
          </div>
        </div>
        <button
          onClick={onClearSession}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
        >
          Clear Session
        </button>
      </div>
    </div>
  );
};
