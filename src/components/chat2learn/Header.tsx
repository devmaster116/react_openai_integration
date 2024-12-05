import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-3">Chat2Learn ✨</h1>
      <p className="text-xl text-blue-50">Your collaborative learning space – where discussions spark understanding!</p>
    </div>
  );
}