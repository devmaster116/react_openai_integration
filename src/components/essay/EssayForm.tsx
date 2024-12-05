import React from 'react';
import { BookOpen } from 'lucide-react';

interface EssayFormProps {
  essay: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function EssayForm({ essay, onChange, onSubmit, loading }: EssayFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <label htmlFor="essay-input" className="text-lg font-semibold text-gray-900 dark:text-white">
          Your Text
        </label>
      </div>

      <textarea
        id="essay-input"
        value={essay}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your text here for analysis..."
        className="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading || !essay.trim()}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            Analyzing...
          </>
        ) : (
          'Analyze Text'
        )}
      </button>
    </form>
  );
}