'use client';

import React from 'react';
import { Message } from '@/types/chat';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading = false }: MessageListProps) {
  return (
    <>
      {messages.map((message, idx) => (
        <MessageItem key={idx} message={message} />
      ))}
      {isLoading && (
        <div className="thinking">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </>
  );
}
