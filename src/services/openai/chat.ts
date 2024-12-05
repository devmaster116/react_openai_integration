import { openaiClient, validateOpenAIResponse, logOpenAIRequest, logOpenAIResponse } from './client';
import { API_CONFIG } from '../../config/api.config';
import { handleOpenAIError } from './error-handler';

export async function generateChatResponse(message: string): Promise<string> {
  try {
    if (!API_CONFIG.openai.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    logOpenAIRequest('Chat', {
      messageLength: message.length,
      model: API_CONFIG.openai.model,
    });

    const completion = await openaiClient.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: API_CONFIG.openai.model,
      temperature: API_CONFIG.openai.temperature,
      max_tokens: API_CONFIG.openai.maxTokens,
    });

    logOpenAIResponse('Chat', {
      status: 'success',
      choicesCount: completion.choices?.length,
      hasContent: Boolean(completion.choices?.[0]?.message?.content),
    });

    return validateOpenAIResponse(
      completion.choices?.[0]?.message?.content,
      'Invalid response format from OpenAI'
    );
  } catch (error) {
    return handleOpenAIError(error);
  }
}