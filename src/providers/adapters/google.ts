import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { ProviderConfig } from "../types.js";

export function createGoogleModel(modelId: string, config: ProviderConfig) {
  const apiKey = config.apiKey?.trim();

  if (!apiKey) {
    throw new Error(
      "Google API key is required. Set GOOGLE_API_KEY in .env and run Node with --env-file=.env",
    );
  }

  const google = createGoogleGenerativeAI({
    apiKey,
  });

  return google(modelId);
}
