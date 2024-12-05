import React from 'react';
import { MessageSquare, Users, Sparkles } from 'lucide-react';

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-800 dark:text-blue-200">
            Interactive Learning
          </h3>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Engage in meaningful discussions with AI study partners
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-800 dark:text-blue-200">
            Study Group
          </h3>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Learn together with diverse AI personalities
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-800 dark:text-blue-200">
            Smart Insights
          </h3>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Get personalized feedback and explanations
        </p>
      </div>
    </div>
  );
}