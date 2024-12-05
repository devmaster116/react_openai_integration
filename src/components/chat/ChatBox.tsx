import React from 'react';
import { useChat } from '../../hooks/useChat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatBox() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Ask ZADI! 💭
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Hi! I'm your AI study buddy. Ask me anything about your assignments, writing, or study strategies.
          I'm here to help you succeed! 🌟
        </p>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mb-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-semibold">Pro Tip:</span> Be specific with your questions for the most helpful responses!
        </p>
      </div>
      
      <MessageList messages={messages} />
      <MessageInput 
        onSend={sendMessage} 
        disabled={isLoading} 
        placeholder="What would you like help with? 🤔"
      />
    </div>
  );
}