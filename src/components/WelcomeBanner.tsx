import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Edit2, Check } from 'lucide-react';

const welcomeMessages = [
  "Welcome to ZADI – your academic companion! 📚✨",
  "Ready to excel? ZADI's here to help you succeed! 🚀",
  "Hey there! Let's make learning exciting together! 🎓",
  "Your academic journey starts here – ZADI's got you covered! 💫",
  "Time to level up your learning with ZADI! 🌟",
  "Welcome back! Ready for another productive session? 💪",
  "Let's achieve your academic goals together! 🎯",
  "Your success is our mission! Let's get started! ⭐"
];

export default function WelcomeBanner() {
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [preferredName, setPreferredName] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    setMessage(welcomeMessages[randomIndex]);
    
    const savedName = localStorage.getItem('preferredName');
    if (savedName) {
      setPreferredName(savedName);
    } else {
      setPreferredName('(Preferred name)');
    }
  }, [user]);

  const handleNameSubmit = () => {
    if (preferredName.trim() && preferredName !== '(Preferred name)') {
      localStorage.setItem('preferredName', preferredName.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  const handleEditClick = () => {
    if (preferredName === '(Preferred name)') {
      setPreferredName('');
    }
    setIsEditing(true);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-3xl font-bold">
          {isEditing ? (
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-blue-500/30 border border-blue-400 rounded px-2 py-1 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2">
              Hi {preferredName}! ✨
              <button
                onClick={handleEditClick}
                className="p-1 hover:bg-blue-500/30 rounded-full transition-colors"
                title="Edit name"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </h1>
        {isEditing && (
          <button
            onClick={handleNameSubmit}
            className="p-2 hover:bg-blue-500/30 rounded-full transition-colors"
            title="Save name"
          >
            <Check className="w-5 h-5" />
          </button>
        )}
      </div>
      <p className="text-xl text-blue-50">{message}</p>
    </div>
  );
}