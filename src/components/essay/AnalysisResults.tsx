import React from 'react';
import { EssayAnalysis } from '../../types/essay';

interface AnalysisResultsProps {
  analysis: EssayAnalysis | null;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  if (!analysis) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Analysis Results</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Word Count</h4>
          <p className="text-gray-600 dark:text-gray-400">{analysis.wordCount} words</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Structure</h4>
          <div className="ml-4">
            <p className="text-gray-600 dark:text-gray-400">Introduction: {analysis.structure.introduction}</p>
            {analysis.structure.bodyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-400">
                Body Paragraph {index + 1}: {paragraph}
              </p>
            ))}
            <p className="text-gray-600 dark:text-gray-400">Conclusion: {analysis.structure.conclusion}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Suggestions</h4>
          <ul className="list-disc ml-6">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-400">{suggestion}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Overall Score</h4>
          <p className="text-gray-600 dark:text-gray-400">{analysis.score}/100</p>
        </div>
      </div>
    </div>
  );
}