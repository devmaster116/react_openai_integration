import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { analyzeEssay } from '../services/api';

export default function EssayAnalyzer() {
  const [essay, setEssay] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!essay.trim()) return;

    setLoading(true);
    try {
      const result = await analyzeEssay(essay);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Essay Analysis</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="essay" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your essay for analysis
          </label>
          <textarea
            id="essay"
            rows={8}
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Paste your essay here..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Essay'}
        </button>
      </form>

      {analysis && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
          <p className="text-gray-700">{analysis}</p>
        </div>
      )}
    </div>
  );
}