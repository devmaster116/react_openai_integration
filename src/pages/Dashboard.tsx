import React from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import ChatBox from '../components/chat/ChatBox';

export default function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto">
      <WelcomeBanner />
      <ChatBox />
    </div>
  );
}