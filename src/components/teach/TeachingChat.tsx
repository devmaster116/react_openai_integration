import React, { useState, useEffect } from 'react';
import { Send, BookOpen } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface TeachingChatProps {
  activeSession: boolean;
  setActiveSession: (active: boolean) => void;
  materials: File[];
  onReportGenerated: (report: any) => void;
}

export default function TeachingChat({
  activeSession,
  setActiveSession,
  materials,
  onReportGenerated,
}: TeachingChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (activeSession && messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          text: "Hi! I'm ZadiJunior, and I'm excited to learn from you today! What topic will you be teaching me about?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [activeSession]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: uuidv4(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Simulate ZadiJunior's response
    setTimeout(() => {
      const response: Message = {
        id: uuidv4(),
        text: generateResponse(input),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const generateResponse = (userMessage: string): string => {
    const responses = [
      "That's interesting! Could you explain that in a different way?",
      "I'm not sure I fully understand. Can you give me an example?",
      "Oh, I see! How does this connect to what we learned before?",
      "What would happen if we applied this concept to a different situation?",
      "Could you break that down into smaller steps for me?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Teaching Session
          </h2>
        </div>
        {!activeSession && (
          <button
            onClick={() => setActiveSession(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Start Session
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {activeSession && (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Explain your concept..."
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}