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
      <div className="p-6 text-center">
        <p className="text-sm text-gray-600">No active session</p>
      </div>
    );
  }

  const duration = Date.now() - session.createdAt;
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">📊</span>
        <h3 className="font-bold text-slate-900">Session Info</h3>
      </div>

      <div className="space-y-3">
        {/* Session Duration */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-3 border border-indigo-200">
          <div className="text-xs text-indigo-600 font-semibold uppercase mb-1">
            Duration
          </div>
          <div className="text-xl font-bold text-indigo-700">
            {hours > 0 && `${hours}h `}
            {minutes}m {seconds}s
          </div>
        </div>

        {/* Session Started */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-3 border border-teal-200">
          <div className="text-xs text-teal-600 font-semibold uppercase mb-1">
            Started
          </div>
          <div className="text-sm font-bold text-teal-700">
            {formatTime(session.createdAt)}
          </div>
        </div>

        {/* Session ID */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-600 font-semibold uppercase mb-2">
            Session ID
          </div>
          <div className="font-mono text-xs text-gray-700 break-all bg-white/50 p-2 rounded border border-gray-200">
            {session.id}
          </div>
        </div>

        {/* Status */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
          <div className="text-xs text-green-600 font-semibold uppercase mb-1">
            Status
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-green-700">Active</span>
          </div>
        </div>

        {/* Clear Session Button */}
        <button
          onClick={onClearSession}
          className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold text-sm uppercase tracking-wide hover:from-red-600 hover:to-red-700 active:scale-95"
        >
          🗑️ Clear Session
        </button>
      </div>
    </div>
  );
};
