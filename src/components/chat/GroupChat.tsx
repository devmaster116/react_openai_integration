import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, MoreVertical, UserCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ChatMessage {
  id: string;
  text: string;
  sender: {
    name: string;
    isAI: boolean;
    role: 'curious' | 'expert' | 'humorous';
  };
  timestamp: Date;
}

const AI_PARTICIPANTS = [
  { name: 'Alex', role: 'curious', avatar: '👨‍🎓' },
  { name: 'Dr. Smith', role: 'expert', avatar: '👩‍🏫' },
  { name: 'Jamie', role: 'humorous', avatar: '😊' },
];

export default function GroupChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome messages
    const initialMessages = [
      {
        id: uuidv4(),
        text: "Welcome to the study group! I'm Alex, and I'm excited to learn together! 📚",
        sender: { name: 'Alex', isAI: true, role: 'curious' },
        timestamp: new Date(),
      },
      {
        id: uuidv4(),
        text: "Hello everyone! Dr. Smith here. Let's make this a productive discussion. What topic shall we explore today?",
        sender: { name: 'Dr. Smith', isAI: true, role: 'expert' },
        timestamp: new Date(),
      },
    ];
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (userMessage: string) => {
    const responses = {
      curious: [
        "That's interesting! Could you explain more about...?",
        "I wonder how this connects to what we learned before?",
        "What would happen if we looked at this from a different angle?",
      ],
      expert: [
        "Excellent point. Let me add some context...",
        "Research shows that this concept is particularly important because...",
        "To build on that, we should consider...",
      ],
      humorous: [
        "Love how you're thinking! Here's a fun way to remember this...",
        "That reminds me of a funny example...",
        "Who knew learning could be this entertaining? 😄",
      ],
    };

    const participant = AI_PARTICIPANTS[Math.floor(Math.random() * AI_PARTICIPANTS.length)];
    const responseList = responses[participant.role];
    const response = responseList[Math.floor(Math.random() * responseList.length)];

    return {
      id: uuidv4(),
      text: response,
      sender: {
        name: participant.name,
        isAI: true,
        role: participant.role,
      },
      timestamp: new Date(),
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: input.trim(),
      sender: { name: 'You', isAI: false, role: 'curious' },
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Study Group Chat</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {AI_PARTICIPANTS.map(p => p.avatar).join(' ')} + You
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender.isAI ? 'justify-start' : 'justify-end'}`}
          >
            {msg.sender.isAI && (
              <div className="flex items-center gap-2 max-w-[80%]">
                <UserCircle className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">{msg.sender.name}</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200">{msg.text}</p>
                  </div>
                </div>
              </div>
            )}
            {!msg.sender.isAI && (
              <div className="max-w-[80%]">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <p className="text-white">{msg.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
              <span className="text-gray-500 dark:text-gray-400">typing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
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