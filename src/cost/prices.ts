import type { ModelPricing } from "./types.js";

import type { PricingTable } from "./types.js";

export const MODEL_PRICING: PricingTable = {
  "google/gemini-3.5-flash": {
    inputPerMillionTokens: 1.5,
    outputPerMillionTokens: 9,
    currency: "USD",
  },

  "typhoon/typhoon-v2.5-30b-a3b-instruct": {
    inputPerMillionTokens: 0.3,
    outputPerMillionTokens: 1.2,
    currency: "USD",
  },
};
