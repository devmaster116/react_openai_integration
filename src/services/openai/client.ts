import OpenAI from 'openai';
import { API_CONFIG } from '../../config/api.config';
import { OpenAIError } from '../errors';

export const openaiClient = new OpenAI({
  apiKey: API_CONFIG.openai.apiKey,
  baseURL: API_CONFIG.openai.baseUrl,
  dangerouslyAllowBrowser: true,
  maxRetries: API_CONFIG.openai.maxRetries,
  timeout: API_CONFIG.openai.timeout,
});

export function validateOpenAIResponse<T>(response: T | null | undefined, errorMessage: string): T {
  if (!response) {
    throw new OpenAIError(errorMessage);
  }
  return response;
}

export function logOpenAIRequest(action: string, params: Record<string, unknown>): void {
  console.log(`OpenAI ${action} Request:`, {
    timestamp: new Date().toISOString(),
    ...params,
  });
}

export function logOpenAIResponse(action: string, data: Record<string, unknown>): void {
  console.log(`OpenAI ${action} Response:`, {
    timestamp: new Date().toISOString(),
    ...data,
  });
}