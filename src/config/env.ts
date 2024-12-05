import { z } from "zod";

const envSchema = z.object({
  // VITE_OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  VITE_API_URL: z.string().url("Invalid API URL").optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  const env = {
    // VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };

  const result = envSchema.safeParse(env);

  if (!result.success) {
    console.error(
      "Environment validation failed:",
      result.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment configuration");
  }

  return result.data;
}
