import React, { createContext, useContext, useState, useEffect } from 'react';

interface Preferences {
  name: string;
  tone: string;
  role: string;
  university: string;
  yearOfStudy: string;
  nativeLanguage: string;
  otherLanguages: string[];
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (newPreferences: Partial<Preferences>) => void;
  savePreferences: () => void;
}

const defaultPreferences: Preferences = {
  name: '',
  tone: 'joyful',
  role: 'student',
  university: '',
  yearOfStudy: '',
  nativeLanguage: '',
  otherLanguages: [],
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const saved = localStorage.getItem('zadi_preferences');
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const savePreferences = () => {
    localStorage.setItem('zadi_preferences', JSON.stringify(preferences));
    localStorage.setItem('preferredName', preferences.name); // For backward compatibility
  };

  useEffect(() => {
    // Load initial preferences
    const savedPreferences = localStorage.getItem('zadi_preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, savePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}