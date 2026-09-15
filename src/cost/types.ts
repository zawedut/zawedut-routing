export type Currency = "USD" | "THB";

export interface ModelPricing {
  inputPerMillionTokens: number;
  outputPerMillionTokens: number;
  currency: Currency;
}

export type PricingTable = Readonly<Record<string, ModelPricing>>;

export interface CalculateCostOptions {
  model: string;
  inputTokens: number | null;
  outputTokens: number | null;
  pricing?: PricingTable;
}

export interface CostResult {
  inputCost: number | null;
  outputCost: number | null;
  totalCost: number | null;
  currency: Currency | null;
  pricingFound: boolean;
  estimated: true;
}
