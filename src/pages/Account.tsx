import React, { useState } from 'react';
import { Shield, Mail, Share2, AlertCircle } from 'lucide-react';

export default function Account() {
  const [shareData, setShareData] = useState(true);
  const [email, setEmail] = useState('');
  const [validating, setValidating] = useState(false);

  const handleValidateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidating(true);
    // Simulate validation
    setTimeout(() => {
      setValidating(false);
      alert('Validation email sent! Please check your inbox.');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-3">Account Settings</h1>
        <p className="text-xl text-blue-50">Manage your ZADI membership and preferences</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          {/* Membership Status */}
          <div className="border-b dark:border-gray-700 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold">Membership Status</h2>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                Free Trial (30 days) - Academic Access
              </p>
            </div>
          </div>

          {/* Email Validation */}
          <div className="border-b dark:border-gray-700 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold">Academic Email Validation</h2>
            </div>
            <form onSubmit={handleValidateEmail} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter your academic email (.ac.uk)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@university.ac.uk"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={validating}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {validating ? 'Validating...' : 'Validate Email'}
              </button>
            </form>
          </div>

          {/* Data Sharing */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold">Data Sharing</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={shareData}
                  onChange={(e) => setShareData(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Help improve ZADI by sharing your learning data
                </span>
              </label>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Your data helps us improve ZADI's knowledge base. We never share personal information,
                  and your data is only used to enhance the learning experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}