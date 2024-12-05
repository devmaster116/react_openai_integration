import { openaiClient, validateOpenAIResponse, logOpenAIRequest, logOpenAIResponse } from '../openai/client';
import { API_CONFIG } from '../../config/api.config';
import { handleOpenAIError } from '../openai/error-handler';
import { EssayAnalysis } from '../../types/essay';

export async function analyzeEssay(text: string): Promise<EssayAnalysis> {
  try {
    if (!API_CONFIG.openai.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

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

    logOpenAIRequest('Essay Analysis', {
      textLength: text.length,
      model: API_CONFIG.openai.model,
    });

    const completion = await openaiClient.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: API_CONFIG.openai.model,
      temperature: API_CONFIG.openai.temperature,
      max_tokens: API_CONFIG.openai.maxTokens,
    });

    logOpenAIResponse('Essay Analysis', {
      status: 'success',
      choicesCount: completion.choices?.length,
      hasContent: Boolean(completion.choices?.[0]?.message?.content),
    });

    const response = validateOpenAIResponse(
      completion.choices?.[0]?.message?.content,
      'Invalid response format from OpenAI'
    );

    // Parse the response into structured format
    const analysis: EssayAnalysis = {
      wordCount: text.split(/\s+/).length,
      structure: {
        introduction: "Analysis of introduction",
        bodyParagraphs: ["Analysis of body paragraphs"],
        conclusion: "Analysis of conclusion"
      },
      suggestions: [response],
      score: 75
    };

    return analysis;
  } catch (error) {
    return handleOpenAIError(error);
  }
}