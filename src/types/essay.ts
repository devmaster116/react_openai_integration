export interface EssayAnalysis {
  wordCount: number;
  structure: {
    introduction: string;
    bodyParagraphs: string[];
    conclusion: string;
  };
  suggestions: string[];
  score: number;
}

export interface AnalysisResponse {
  analysis: EssayAnalysis;
  timestamp: string;
}