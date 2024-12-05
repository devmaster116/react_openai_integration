import { OpenAIError } from '../errors';

interface ErrorDetails {
  type: string;
  message: string;
  stack?: string;
}

function logError(error: unknown): ErrorDetails {
  const details = {
    type: error instanceof Error ? error.constructor.name : typeof error,
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
  };

  console.error('OpenAI Error:', details);
  return details;
}

export function handleOpenAIError(error: unknown): never {
  const details = logError(error);

  if (error instanceof OpenAIError) {
    throw error;
  }

  if (error instanceof Error) {
    if (error.message.includes('401')) {
      throw new OpenAIError('Invalid API key. Please check your OpenAI API key configuration.');
    }
    if (error.message.includes('429')) {
      throw new OpenAIError('Rate limit exceeded. Please try again later.');
    }
    if (error.message.includes('timeout')) {
      throw new OpenAIError('Request timed out. Please try again.');
    }
    if (error.message.includes('network')) {
      throw new OpenAIError('Network error. Please check your internet connection.');
    }

    throw new OpenAIError(`OpenAI API Error: ${error.message}`, {
      message: error.message,
      stack: error.stack,
    });
  }

  throw new OpenAIError('An unexpected error occurred while processing your request', details);
}