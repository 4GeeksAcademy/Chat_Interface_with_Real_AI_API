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
        <p className="text-sm text-slate-400">No active session</p>
      </div>
    );
  }

  const duration = Date.now() - session.createdAt;
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">📊</span>
        <div>
          <h3 className="font-bold text-slate-100 text-lg">Session Info</h3>
          <p className="text-xs text-slate-400">Conversation management</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Session Duration */}
        <div className="bg-gradient-to-br from-indigo-600/40 to-indigo-700/40 rounded-lg p-4 border border-indigo-500/50 backdrop-blur-sm">
          <div className="text-xs text-indigo-300 font-bold uppercase tracking-wide mb-2">
            Duration
          </div>
          <div className="text-2xl font-bold text-indigo-100">
            {hours > 0 && <span>{hours}h </span>}
            {minutes}m {seconds}s
          </div>
        </div>

        {/* Session Started */}
        <div className="bg-gradient-to-br from-teal-600/40 to-teal-700/40 rounded-lg p-4 border border-teal-500/50 backdrop-blur-sm">
          <div className="text-xs text-teal-300 font-bold uppercase tracking-wide mb-2">
            Started At
          </div>
          <div className="text-sm font-bold text-teal-100">
            {formatTime(session.createdAt)}
          </div>
        </div>

        {/* Session ID */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50 backdrop-blur-sm">
          <div className="text-xs text-slate-300 font-bold uppercase tracking-wide mb-2">
            Session ID
          </div>
          <div className="font-mono text-xs text-slate-300 break-all bg-slate-800/50 p-2.5 rounded border border-slate-600/50 select-all">
            {session.id}
          </div>
          <p className="text-xs text-slate-400 mt-2">Auto-saved to browser storage</p>
        </div>

        {/* Status */}
        <div className="bg-gradient-to-br from-emerald-600/40 to-emerald-700/40 rounded-lg p-4 border border-emerald-500/50 backdrop-blur-sm">
          <div className="text-xs text-emerald-300 font-bold uppercase tracking-wide mb-2">
            Status
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <span className="text-sm font-bold text-emerald-100">Active Session</span>
          </div>
        </div>

        {/* Clear Session Button */}
        <button
          onClick={onClearSession}
          className="w-full mt-5 bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-500 hover:to-red-600 text-white px-4 py-3.5 rounded-lg transition-all duration-200 font-bold text-sm uppercase tracking-widest shadow-lg hover:shadow-xl active:scale-95 border border-red-500/50 hover:border-red-500/70"
        >
          🗑️ Clear All Messages
        </button>
        <p className="text-xs text-slate-400 text-center mt-2">Clears chat history permanently</p>
      </div>
    </div>
  );
};
