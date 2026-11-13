"use client";

import React from "react";
import { SessionStats } from "@/types/chat";
import { formatNumber } from "@/utils/formatters";

interface TokenStatsProps {
  stats: SessionStats;
}

export const TokenStats: React.FC<TokenStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4">
      <h3 className="font-bold text-sm text-gray-800 mb-3">Token Usage Statistics</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white p-2 rounded">
          <div className="text-gray-600 text-xs">Prompt Tokens</div>
          <div className="font-bold text-lg text-blue-600">
            {formatNumber(stats.totalPromptTokens)}
          </div>
        </div>

        <div className="bg-white p-2 rounded">
          <div className="text-gray-600 text-xs">Completion Tokens</div>
          <div className="font-bold text-lg text-green-600">
            {formatNumber(stats.totalCompletionTokens)}
          </div>
        </div>

        <div className="bg-white p-2 rounded col-span-2">
          <div className="text-gray-600 text-xs">Total Tokens (Cumulative)</div>
          <div className="font-bold text-lg text-purple-600">
            {formatNumber(stats.totalTokens)}
          </div>
        </div>

        <div className="bg-white p-2 rounded">
          <div className="text-gray-600 text-xs">Messages</div>
          <div className="font-bold text-lg">{stats.messageCount}</div>
        </div>

        {stats.averageTokensPerSecond && (
          <div className="bg-white p-2 rounded">
            <div className="text-gray-600 text-xs">Avg Tokens/Sec</div>
            <div className="font-bold text-lg text-orange-600">
              {stats.averageTokensPerSecond.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
