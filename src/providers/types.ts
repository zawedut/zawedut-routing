export interface ProviderConfig {
  apiKey: string;
}

export interface OpenAICompatibleConfig extends ProviderConfig {
  baseURL?: string;
}

export interface ProvidersConfig {
  google?: ProviderConfig;
  openai?: ProviderConfig;
  anthropic?: ProviderConfig;
  typhoon?: OpenAICompatibleConfig;
}
