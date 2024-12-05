import React from 'react';
import { Users, MoreVertical } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="bg-blue-500 dark:bg-blue-600 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6" />
          <div>
            <h2 className="font-semibold">Study Group Chat</h2>
            <p className="text-sm text-blue-100">Alex 👨‍🎓, Dr. Smith 👩‍🏫, Jamie 📚 + You</p>
          </div>
        </div>
        <button className="p-2 hover:bg-blue-600 dark:hover:bg-blue-700 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}