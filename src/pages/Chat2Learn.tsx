import React from 'react';
import Header from '../components/chat2learn/Header';
import InfoCards from '../components/chat2learn/InfoCards';
import WhatsAppChat from '../components/chat2learn/WhatsAppChat';

export default function Chat2Learn() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <Header />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <InfoCards />
            <WhatsAppChat />
          </div>
        </div>
      </div>
    </div>
  );
}