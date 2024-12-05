import { validateEnv } from "./env";

const env = validateEnv();

console.log("API Configuration Loading:", {
  // apiKeyPresent: Boolean(env.VITE_OPENAI_API_KEY),
  // apiKeyLength: env.VITE_OPENAI_API_KEY?.length || 0,
  baseUrlPresent: Boolean(env.VITE_API_URL),
  baseUrl: env.VITE_API_URL || "https://api.openai.com/v1",
});

export const API_CONFIG = {
  openai: {
    // apiKey: env.VITE_OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
    baseUrl: env.VITE_API_URL || "https://api.openai.com/v1",
  },
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${env.VITE_OPENAI_API_KEY}`,
  },
} as const;

// Validate configuration
if (!API_CONFIG.openai.apiKey) {
  console.error("OpenAI API key is missing in configuration");
}

if (!API_CONFIG.openai.baseUrl) {
  console.error("OpenAI base URL is missing in configuration");
}
