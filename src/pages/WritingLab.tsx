import React from 'react';
import { useEssayAnalysis } from '../hooks/useEssayAnalysis';
import EssayForm from '../components/essay/EssayForm';
import AnalysisResults from '../components/essay/AnalysisResults';

export default function WritingLab() {
  const { essay, setEssay, analysis, loading, handleAnalyze } = useEssayAnalysis();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Writing Lab</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to ZADI's Writing Lab! Paste your text below for instant feedback and suggestions.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What I'll analyze:</h3>
              <ul className="list-disc ml-4 text-blue-700 dark:text-blue-300 space-y-1 text-sm">
                <li>Structure and flow</li>
                <li>Clarity and coherence</li>
                <li>Grammar and style</li>
                <li>Vocabulary usage</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">You'll receive:</h3>
              <ul className="list-disc ml-4 text-green-700 dark:text-green-300 space-y-1 text-sm">
                <li>Detailed feedback</li>
                <li>Improvement suggestions</li>
                <li>Style recommendations</li>
                <li>Enhancement tips</li>
              </ul>
            </div>
          </div>
        </div>

        <EssayForm
          essay={essay}
          onChange={setEssay}
          onSubmit={handleAnalyze}
          loading={loading}
        />

        <AnalysisResults analysis={analysis} />
      </div>
    </div>
  );
}