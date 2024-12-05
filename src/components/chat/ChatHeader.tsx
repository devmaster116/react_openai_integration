import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      <h2 className="text-lg font-semibold dark:text-white">Ask ZADI!</h2>
    </div>
  );
}