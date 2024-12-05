import React, { useState } from 'react';
import { Book, Upload, CheckCircle } from 'lucide-react';
import TeachingChat from '../components/teach/TeachingChat';
import MaterialUpload from '../components/teach/MaterialUpload';
import TeachingReport from '../components/teach/TeachingReport';

export default function TeachToLearn() {
  const [activeSession, setActiveSession] = useState(false);
  const [materials, setMaterials] = useState<File[]>([]);
  const [report, setReport] = useState(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Teach to Learn
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to the teaching experience! Here you can practice explaining concepts
            to ZadiJunior, your virtual student. Teaching others is one of the best ways
            to master a subject.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                  Teach Concepts
                </h3>
              </div>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Explain topics to ZadiJunior and get feedback on your teaching style.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Share Materials
                </h3>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Upload your notes or slides to enhance the teaching session.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-purple-800 dark:text-purple-200">
                  Get Feedback
                </h3>
              </div>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Receive detailed feedback on your teaching effectiveness.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TeachingChat
              activeSession={activeSession}
              setActiveSession={setActiveSession}
              materials={materials}
              onReportGenerated={setReport}
            />
          </div>
          <div>
            <MaterialUpload
              materials={materials}
              setMaterials={setMaterials}
            />
            {report && <TeachingReport report={report} />}
          </div>
        </div>
      </div>
    </div>
  );
}