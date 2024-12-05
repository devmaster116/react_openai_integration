import React, { useState, useEffect } from 'react';
import { Palette, User, Globe, GraduationCap, Languages, Save } from 'lucide-react';
import { usePreferences } from '../contexts/PreferencesContext';

export default function Personalise() {
  const { preferences, updatePreferences, savePreferences } = usePreferences();
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'otherLanguages') {
      updatePreferences({ [name]: value.split(',').map(lang => lang.trim()) });
    } else {
      updatePreferences({ [name]: value });
    }
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePreferences();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-3">Personalise ZADI</h1>
        <p className="text-xl text-blue-50">Customize your learning experience</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="space-y-8">
          {/* Personal Details */}
          <div className="border-b dark:border-gray-700 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold">Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What would you like us to call you?
                </label>
                <input
                  type="text"
                  name="name"
                  value={preferences.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interaction Tone
                </label>
                <select
                  name="tone"
                  value={preferences.tone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="joyful">Joyful & Encouraging</option>
                  <option value="formal">Formal & Professional</option>
                  <option value="casual">Casual & Friendly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="border-b dark:border-gray-700 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold">Academic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={preferences.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="researcher">Researcher</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  University
                </label>
                <input
                  type="text"
                  name="university"
                  value={preferences.university}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Language Preferences */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Languages className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold">Language Preferences</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Native Language
                </label>
                <input
                  type="text"
                  name="nativeLanguage"
                  value={preferences.nativeLanguage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Other Languages
                </label>
                <input
                  type="text"
                  name="otherLanguages"
                  value={preferences.otherLanguages.join(', ')}
                  onChange={handleChange}
                  placeholder="Separate with commas"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Preferences
            </button>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
              Preferences saved successfully!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}