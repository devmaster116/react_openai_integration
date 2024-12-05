import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, X, Clock } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const MESSAGES = [
  {
    type: 'general',
    messages: [
      "Hey! How's the study session going? 📚",
      "Need a quick study break? Let's chat! ☕",
      "Remember to take breaks every 25 minutes! 🕒",
      "Did you know taking notes by hand can improve memory? ✍️",
      "Want to discuss what you're learning? I'm all ears! 👋"
    ]
  },
  {
    type: 'writing',
    messages: [
      "That's quite a topic you're writing about! Need help brainstorming? 🤔",
      "Remember to back up your arguments with evidence! 📝",
      "How about we review your main points together? 🎯",
      "Writing can be tough - but you're doing great! 💪",
      "Need help organizing your thoughts? Let's mind map! 🗺️"
    ]
  },
  {
    type: 'teaching',
    messages: [
      "Teaching others is the best way to learn! How's it going? 🎓",
      "Your explanations are getting clearer each time! ⭐",
      "Have you tried using analogies? They can really help! 💡",
      "Remember to check if ZadiJunior understands everything! 🤝",
      "You're becoming quite the teacher! Keep it up! 🌟"
    ]
  }
];

export default function ClassmatePersona() {
  const [message, setMessage] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  const selectMessage = useCallback(() => {
    const pathname = window.location.pathname;
    let messageType = 'general';
    
    if (pathname.includes('writing-lab')) {
      messageType = 'writing';
    } else if (pathname.includes('teach2learn')) {
      messageType = 'teaching';
    }

    const messageGroup = MESSAGES.find(group => group.type === messageType);
    let newMessage;
    do {
      newMessage = messageGroup!.messages[Math.floor(Math.random() * messageGroup!.messages.length)];
    } while (messageHistory.includes(newMessage));

    setMessageHistory(prev => [...prev.slice(-4), newMessage]);
    return newMessage;
  }, [messageHistory]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showBubble && Math.random() < 0.3) { // 30% chance to show message
        setMessage(selectMessage());
        setShowBubble(true);
      }
    }, 45000); // Check every 45 seconds

    return () => clearInterval(timer);
  }, [showBubble, selectMessage]);

  const handleIgnore = () => setShowBubble(false);
  
  const handleLater = () => {
    setShowBubble(false);
    setTimeout(() => {
      setMessage(selectMessage());
      setShowBubble(true);
    }, 300000); // Show again in 5 minutes
  };

  if (!showBubble) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-gray-900 dark:text-white">Study Buddy</span>
          </div>
          <button
            onClick={handleIgnore}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-3">{message}</p>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={handleLater}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Clock className="w-4 h-4" />
            Later
          </button>
          <button
            onClick={handleIgnore}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}