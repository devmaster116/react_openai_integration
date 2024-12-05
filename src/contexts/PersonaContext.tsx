import React, { createContext, useContext, useState, useEffect } from 'react';

interface Persona {
  id: string;
  name: string;
  description: string;
  style: string;
  examples: string[];
}

interface PersonaContextType {
  persona: Persona | null;
  setPersona: (persona: Persona) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<Persona | null>(() => {
    const saved = localStorage.getItem('zadi_persona');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (persona) {
      localStorage.setItem('zadi_persona', JSON.stringify(persona));
    }
  }, [persona]);

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}