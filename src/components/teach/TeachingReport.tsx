import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface TeachingReportProps {
  report: any;
}

export default function TeachingReport({ report }: TeachingReportProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Teaching Report
      </h3>

      <div className="space-y-4">
        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <h4 className="font-medium text-green-800 dark:text-green-200">
              Strengths
            </h4>
          </div>
          <ul className="list-disc ml-5 text-sm text-green-700 dark:text-green-300">
            <li>Clear explanations with good examples</li>
            <li>Patient responses to questions</li>
            <li>Effective use of analogies</li>
          </ul>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h4 className="font-medium text-amber-800 dark:text-amber-200">
              Areas for Improvement
            </h4>
          </div>
          <ul className="list-disc ml-5 text-sm text-amber-700 dark:text-amber-300">
            <li>Consider breaking down complex concepts further</li>
            <li>Add more real-world applications</li>
            <li>Check for understanding more frequently</li>
          </ul>
        </div>
      </div>
    </div>
  );
}