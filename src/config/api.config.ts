import { z } from "zod";

const apiConfigSchema = z.object({
  openai: z.object({
    apiKey: z.string().min(1, "OpenAI API key is required"),
    baseUrl: z
      .string()
      .url("Invalid API URL")
      .default("https://api.openai.com/v1"),
    model: z.string().default("gpt-3.5-turbo"),
    maxTokens: z.number().default(1000),
    temperature: z.number().min(0).max(2).default(0.7),
    maxRetries: z.number().default(3),
    timeout: z.number().default(30000),
  }),
});

export type APIConfig = z.infer<typeof apiConfigSchema>;

function validateConfig(): APIConfig {
  const config = {
    openai: {
      // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      baseUrl: import.meta.env.VITE_API_URL,
      model: "gpt-3.5-turbo",
      maxTokens: 1000,
      temperature: 0.7,
      maxRetries: 3,
      timeout: 30000,
    },
  };

  try {
    const validated = apiConfigSchema.parse(config);
    console.log("API Configuration:", {
      apiKeyPresent: Boolean(validated.openai.apiKey),
      apiKeyLength: validated.openai.apiKey?.length || 0,
      baseUrl: validated.openai.baseUrl,
      model: validated.openai.model,
    });
    return validated;
  } catch (error) {
    console.error("API Configuration Error:", error);
    throw error;
  }
}

export const API_CONFIG = validateConfig();
