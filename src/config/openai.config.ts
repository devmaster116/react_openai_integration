import { z } from "zod";

const openaiConfigSchema = z.object({
  apiKey: z.string().min(1, "OpenAI API key is required"),
  baseUrl: z
    .string()
    .url("Invalid API URL")
    .default("https://api.openai.com/v1"),
  model: z.string().default("gpt-3.5-turbo"),
  maxTokens: z.number().default(1000),
  temperature: z.number().min(0).max(2).default(0.7),
});

export type OpenAIConfig = z.infer<typeof openaiConfigSchema>;

export function validateOpenAIConfig(
  config: Partial<OpenAIConfig>
): OpenAIConfig {
  try {
    return openaiConfigSchema.parse({
      // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      baseUrl: import.meta.env.VITE_API_URL,
      ...config,
    });
  } catch (error) {
    console.error("OpenAI Configuration Error:", error);
    throw error;
  }
}

export const openaiConfig = validateOpenAIConfig({});
