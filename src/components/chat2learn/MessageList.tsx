import React from 'react';
import { Message } from '../../types/chat';
import { formatTimestamp } from '../../utils/helpers';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100 dark:bg-gray-900">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[75%] rounded-lg p-3 ${
              message.isUser
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            }`}
          >
            {!message.isUser && (
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                {message.sender}
              </p>
            )}
            <p className="whitespace-pre-wrap">{message.text}</p>
            <p className="text-xs mt-1 opacity-70">
              {formatTimestamp(message.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}