import { generateChatResponse } from './openai/chat';
import { ChatResponse } from '../types/chat';
import { APIError } from './errors';

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await generateChatResponse(message);
    return {
      response,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Chat error:', error);
    throw new APIError(
      'Failed to generate response. Please try again later.',
      undefined,
      error
    );
  }
}