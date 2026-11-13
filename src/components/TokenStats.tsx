'use client';

import React from 'react';
import { Message } from '@/types/chat';

interface TokenStatsProps {
  messages: Message[];
}

export default function TokenStats({ messages }: TokenStatsProps) {
  const totalTokens = messages.reduce((sum, msg) => sum + (msg.tokens || 0), 0);
  const totalMessages = messages.length;
  const avgTokensPerMessage = totalMessages > 0 ? Math.round(totalTokens / totalMessages) : 0;

  return (
    <div className="stats-body">
      <div className="sec">
        <h3>Session Stats</h3>
      </div>

      <div className="ctx-num">
        <b>{totalTokens.toLocaleString()}</b>
        <span>tokens</span>
      </div>

      <div className="sec">
        <h3>Breakdown</h3>
      </div>

      <div className="rows">
        <div>
          <span>Total Messages</span>
          <span>{totalMessages}</span>
        </div>
        <div>
          <span>Avg Tokens/Message</span>
          <span>{avgTokensPerMessage}</span>
        </div>
        <div>
          <span>Model</span>
          <span>{messages.length > 0 && messages.some(m => m.modelUsed) ? messages.find(m => m.modelUsed)?.modelUsed : 'GPT OSS 120B'}</span>
        </div>
      </div>

      <div className="sec">
        <h3>Usage</h3>
      </div>

      <div style={{
        height: '96px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '4px',
        borderBottom: '1px solid var(--line)',
        paddingBottom: '1px'
      }}>
        {messages.length === 0 ? (
          <div style={{
            height: '96px',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--muted)',
            fontSize: '13px',
            border: '1px dashed var(--line)',
            borderRadius: 'var(--radius)',
            width: '100%'
          }}>
            No messages yet
          </div>
        ) : (
          messages.slice(-12).map((msg, idx) => {
            const msgTokens = msg.tokens || 0;
            const height = totalTokens > 0 ? (msgTokens / totalTokens) * 96 : 2;
            return (
              <div key={idx} style={{
                flex: 1,
                maxWidth: '26px',
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '1px',
                height: '100%',
                justifyContent: 'flex-start',
                position: 'relative'
              }}>
                <div style={{
                  background: 'var(--primary-mid)',
                  borderRadius: '0 0 2px 2px',
                  height: `${Math.max(2, height)}px`
                }}></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
