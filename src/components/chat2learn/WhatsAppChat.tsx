import React, { useState, useRef, useEffect } from 'react';
import { Send, Users } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ChatHeader from './ChatHeader';

interface Message {
  id: string;
  text: string;
  sender: string;
  isUser: boolean;
  timestamp: Date;
}

const AI_PARTICIPANTS = [
  { name: 'Alex', role: 'Student', emoji: '👨‍🎓', style: 'text-blue-500' },
  { name: 'Dr. Smith', role: 'Mentor', emoji: '👩‍🏫', style: 'text-purple-500' },
  { name: 'Jamie', role: 'Study Buddy', emoji: '📚', style: 'text-green-500' }
];

export default function WhatsAppChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome messages
    setMessages([
      {
        id: uuidv4(),
        text: "Welcome to your study group! I'm Dr. Smith, and I'll be guiding our discussions. What topic would you like to explore today?",
        sender: "Dr. Smith 👩‍🏫",
        isUser: false,
        timestamp: new Date()
      },
      {
        id: uuidv4(),
        text: "Hi! I'm Alex, excited to learn together! 👋",
        sender: "Alex 👨‍🎓",
        isUser: false,
        timestamp: new Date()
      },
      {
        id: uuidv4(),
        text: "Hey there! Jamie here, ready to share some study tips! 📚",
        sender: "Jamie 📚",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      text: input.trim(),
      sender: 'You',
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI responses
    setTimeout(() => {
      const participant = AI_PARTICIPANTS[Math.floor(Math.random() * AI_PARTICIPANTS.length)];
      const aiMessage: Message = {
        id: uuidv4(),
        text: generateResponse(input, participant.role),
        sender: `${participant.name} ${participant.emoji}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateResponse = (userInput: string, role: string): string => {
    const responses = {
      Student: [
        "That's an interesting perspective! Could you explain more about...",
        "I've been wondering about that too! Have you considered...",
        "Let's try to understand this concept together. What if we...",
      ],
      Mentor: [
        "Excellent question! Here's a helpful framework to think about it...",
        "Let me share a practical example that illustrates this concept...",
        "That's a common challenge. Here's how we can break it down...",
      ],
      "Study Buddy": [
        "I found a great resource about this! Want to explore it together?",
        "Here's a study technique that might help with this topic...",
        "Let's create a quick summary of what we've learned so far!",
      ]
    };

    const roleResponses = responses[role as keyof typeof responses];
    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
  };

  return (
    <div className="h-[600px] flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser
                  ? 'bg-blue-600 text-white'
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
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
              <span className="text-gray-500 dark:text-gray-400">typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}