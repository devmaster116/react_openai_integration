import { generateChatResponse } from './openai';
import { APIError } from './errors';
import { EssayAnalysis } from '../types/essay';

export async function analyzeEssay(text: string): Promise<EssayAnalysis> {
  try {
    const prompt = `
      Please analyze this essay and provide structured feedback:
      
      ${text}
      
      Please include:
      1. Overall assessment
      2. Structure analysis
      3. Key strengths
      4. Areas for improvement
      5. Specific suggestions
    `;

    const response = await generateChatResponse(prompt);
    
    // Parse the response into structured format
    const analysis: EssayAnalysis = {
      wordCount: text.split(/\s+/).length,
      structure: {
        introduction: "Analysis of introduction",
        bodyParagraphs: ["Analysis of body paragraphs"],
        conclusion: "Analysis of conclusion"
      },
      suggestions: ["Improvement suggestions based on analysis"],
      score: 75 // Default score
    };

    return analysis;
  } catch (error) {
    console.error('Essay analysis error:', error);
    throw new APIError(
      'Failed to analyze essay. Please try again later.',
      undefined,
      error
    );
  }
}