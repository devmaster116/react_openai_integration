import OpenAI from 'openai';
import { API_CONFIG } from '../config/api';
import { OpenAIError } from './errors';

const openai = new OpenAI({
  apiKey: API_CONFIG.openai.apiKey,
  dangerouslyAllowBrowser: true,
  baseURL: API_CONFIG.openai.baseUrl
});

export async function generateChatResponse(message: string): Promise<string> {
  try {
    console.log('OpenAI Config:', {
      apiKeyLength: API_CONFIG.openai.apiKey?.length || 0,
      baseUrl: API_CONFIG.openai.baseUrl,
      model: API_CONFIG.openai.model,
      messageLength: message.length
    });

    if (!API_CONFIG.openai.apiKey) {
      console.error('API Key Missing');
      throw new OpenAIError('OpenAI API key is not configured. Please check your environment variables.');
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: API_CONFIG.openai.model,
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('OpenAI Response:', {
      status: 'success',
      choicesCount: completion.choices?.length,
      hasContent: Boolean(completion.choices?.[0]?.message?.content)
    });

    if (!completion.choices?.[0]?.message?.content) {
      console.error('Invalid Response Format');
      throw new OpenAIError('Received invalid response format from OpenAI');
    }

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', {
      type: error instanceof Error ? error.constructor.name : typeof error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    if (error instanceof OpenAIError) {
      throw error;
    }
    
    if (error instanceof Error) {
      // Check for specific OpenAI error types
      if (error.message.includes('401')) {
        throw new OpenAIError('Invalid API key. Please check your OpenAI API key configuration.');
      } else if (error.message.includes('429')) {
        throw new OpenAIError('Rate limit exceeded. Please try again later.');
      }
      
      throw new OpenAIError(`OpenAI API Error: ${error.message}`, {
        message: error.message,
        stack: error.stack,
      });
    }
    
    throw new OpenAIError('An unexpected error occurred while processing your request', error);
  }
}