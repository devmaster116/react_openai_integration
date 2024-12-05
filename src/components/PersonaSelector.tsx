import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  description: string;
  style: string;
  examples: string[];
}

const PERSONAS: Persona[] = [
  {
    id: 'friendly',
    name: 'Friendly ZADI',
    description: 'Warm, encouraging, and supportive. Uses emojis and casual language.',
    style: 'bg-blue-100 dark:bg-blue-900',
    examples: [
      "Let's tackle this together! 🌟",
      "You're doing amazing! Keep going! ✨",
      "That's a great question! Let's explore it! 🚀"
    ]
  },
  {
    id: 'professional',
    name: 'Professional ZADI',
    description: 'Clear, concise, and focused. Uses formal language and structured responses.',
    style: 'bg-purple-100 dark:bg-purple-900',
    examples: [
      "Let's analyze this systematically.",
      "Here's a structured approach to solve this.",
      "Consider these key points..."
    ]
  },
  {
    id: 'quirky',
    name: 'Quirky ZADI',
    description: 'Fun, witty, and creative. Uses wordplay and clever analogies.',
    style: 'bg-green-100 dark:bg-green-900',
    examples: [
      "Time to unleash your inner genius! 🧠✨",
      "Learning is like a pizza - better when shared! 🍕",
      "Let's turn this challenge into confetti! 🎉"
    ]
  }
];

interface PersonaSelectorProps {
  onSelect: (persona: Persona) => void;
  onClose: () => void;
}

export default function PersonaSelector({ onSelect, onClose }: PersonaSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPersona = PERSONAS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PERSONAS.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + PERSONAS.length) % PERSONAS.length);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Choose Your ZADI Style
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Select how you'd like ZADI to communicate with you. You can change this anytime.
        </p>

        <div className="relative">
          <div className={`${currentPersona.style} rounded-lg p-6 transition-all duration-300`}>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {currentPersona.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              {currentPersona.description}
            </p>
            <div className="space-y-2">
              {currentPersona.examples.map((example, index) => (
                <div
                  key={index}
                  className="bg-white/50 dark:bg-gray-800/50 p-2 rounded text-sm"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            Skip for now
          </button>
          <button
            onClick={() => onSelect(currentPersona)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Select this style
          </button>
        </div>
      </div>
    </div>
  );
}