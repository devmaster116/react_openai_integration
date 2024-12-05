import { useState } from 'react';
import { EssayAnalysis } from '../types/essay';
import { analyzeEssay } from '../services/api';
import { isAPIError } from '../services/errors';

export function useEssayAnalysis() {
  const [essay, setEssay] = useState('');
  const [analysis, setAnalysis] = useState<EssayAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!essay.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeEssay(essay);
      setAnalysis(result);
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = isAPIError(err) 
        ? err.message 
        : 'Failed to analyze essay. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    essay,
    setEssay,
    analysis,
    loading,
    error,
    handleAnalyze,
  };
}