'use client';

import React from 'react';
import { Message } from '@/types/chat';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`msg${isUser ? ' user' : ''}`}>
      <div className="bubble">
        {message.content}
      </div>
      {!isUser && (
        <div className="meta">
          <span className="who">Atlas</span>
          {(message.tokens || 0) > 0 && <span className="tok-pill">{message.tokens} tokens</span>}
        </div>
      )}
      {isUser && (
        <div className="meta">
          <span className="who">You</span>
        </div>
      )}
    </div>
  );
}
