export class APIError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class OpenAIError extends APIError {
  constructor(message: string, details?: unknown) {
    super(message, undefined, details);
    this.name = 'OpenAIError';
  }
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}