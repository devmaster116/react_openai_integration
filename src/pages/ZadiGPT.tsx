import React from 'react';
import { useChat } from '../hooks/useChat';
import WelcomeBanner from '../components/WelcomeBanner';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';

export default function ZadiGPT() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <WelcomeBanner />
      
      <div className="h-[calc(100vh-16rem)] flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
        <MessageList messages={messages} />
        <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <MessageInput
            onSend={sendMessage}
            disabled={isLoading}
            placeholder="What would you like help with? 🤔"
          />
        </div>
      </div>
    </div>
  );
}