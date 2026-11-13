"use client";

import React from "react";
import { SessionStats } from "@/types/chat";
import { formatNumber } from "@/utils/formatters";

interface TokenStatsProps {
  stats: SessionStats;
}

export const TokenStats: React.FC<TokenStatsProps> = ({ stats }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">⚡</span>
        <h3 className="font-bold text-slate-900">Token Analytics</h3>
      </div>

      <div className="space-y-4">
        {/* Total Tokens - Main Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">
            Total Tokens
          </div>
          <div className="text-4xl font-bold text-blue-700">
            {formatNumber(stats.totalTokens)}
          </div>
          <div className="text-xs text-blue-500 mt-2">
            Session Total
          </div>
        </div>

        {/* Token Breakdown Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Prompt Tokens */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-3 border border-emerald-200 hover:shadow-md transition-shadow">
            <div className="text-xs text-emerald-600 font-semibold uppercase mb-1">
              Input
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {formatNumber(stats.totalPromptTokens)}
            </div>
            <div className="text-xs text-emerald-500 mt-1">Prompt</div>
          </div>

          {/* Completion Tokens */}
          <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg p-3 border border-violet-200 hover:shadow-md transition-shadow">
            <div className="text-xs text-violet-600 font-semibold uppercase mb-1">
              Output
            </div>
            <div className="text-2xl font-bold text-violet-700">
              {formatNumber(stats.totalCompletionTokens)}
            </div>
            <div className="text-xs text-violet-500 mt-1">Completion</div>
          </div>
        </div>

        {/* Messages Count */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
          <div className="text-xs text-orange-600 font-semibold uppercase mb-1">
            Messages
          </div>
          <div className="text-2xl font-bold text-orange-700">
            {stats.messageCount}
          </div>
          <div className="text-xs text-orange-500 mt-1">
            {Math.ceil(stats.messageCount / 2)} conversations
          </div>
        </div>

        {/* Performance Metrics */}
        {stats.averageTokensPerSecond && (
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 border border-pink-200">
            <div className="text-xs text-pink-600 font-semibold uppercase mb-1">
              Speed
            </div>
            <div className="text-2xl font-bold text-pink-700">
              {stats.averageTokensPerSecond.toFixed(1)}
            </div>
            <div className="text-xs text-pink-500 mt-1">Tokens/second</div>
          </div>
        )}

        {/* Average Tokens Per Message */}
        {stats.messageCount > 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-3 border border-cyan-200">
            <div className="text-xs text-cyan-600 font-semibold uppercase mb-1">
              Avg/Message
            </div>
            <div className="text-2xl font-bold text-cyan-700">
              {(stats.totalTokens / Math.ceil(stats.messageCount / 2)).toFixed(0)}
            </div>
            <div className="text-xs text-cyan-500 mt-1">Tokens per response</div>
          </div>
        )}
      </div>

      {/* Progress Bar for Token Usage */}
      <div className="mt-5 pt-5 border-t border-gray-200">
        <div className="text-xs text-gray-600 font-semibold mb-2">Input/Output Ratio</div>
        <div className="flex gap-2">
          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300"
              style={{
                width: `${
                  stats.totalPromptTokens + stats.totalCompletionTokens > 0
                    ? (stats.totalPromptTokens /
                        (stats.totalPromptTokens + stats.totalCompletionTokens)) *
                      100
                    : 0
                }%`,
              }}
            ></div>
          </div>
          <div className="text-xs text-gray-600 font-medium min-w-max">
            {stats.totalPromptTokens + stats.totalCompletionTokens > 0
              ? (
                  (stats.totalPromptTokens /
                    (stats.totalPromptTokens + stats.totalCompletionTokens)) *
                  100
                ).toFixed(0)
              : 0}
            %
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {formatNumber(stats.totalPromptTokens)} input •{" "}
          {formatNumber(stats.totalCompletionTokens)} output
        </div>
      </div>
    </div>
  );
};
