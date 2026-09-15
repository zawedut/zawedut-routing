# zawedut-routing

A unified TypeScript SDK for calling, comparing, and monitoring multiple LLM providers.

Switch between Gemini, OpenAI, Anthropic, and Typhoon using the same API while tracking token usage, latency, estimated cost, and request logs.

## Features

- One API for multiple LLM providers
- Select providers using `provider/model-id`
- System prompt support
- Compare multiple models concurrently
- Input, output, and total token usage
- Request latency tracking
- Estimated cost calculation
- Custom model pricing
- Success and error logs
- Export logs as JSON
- Full TypeScript support

## Installation

```bash
npm install zawedut-routing
```

## Quick start

Create a client and configure the providers you want to use:

```ts
import {
  createClient,
} from "zawedut-routing";

const ai = createClient({
  providers: {
    google: {
      apiKey:
        process.env.GOOGLE_API_KEY ?? "",
    },

    typhoon: {
      apiKey:
        process.env.TYPHOON_API_KEY ?? "",
    },
  },

  defaults: {
    model: "google/gemini-3.5-flash",
    system:
      "Answer clearly and concisely.",
  },
});
```

You only need to configure API keys once when creating the client.

## Generate text

When a default model is configured:

```ts
const result = await ai.generate({
  prompt: "Explain RAG in simple terms.",
});

console.log(result.text);
```

Response:

```ts
{
  text: "RAG is...",
  model: "google/gemini-3.5-flash",

  usage: {
    inputTokens: 15,
    outputTokens: 80,
    totalTokens: 95,
  },

  timing: {
    totalMs: 950,
  },
}
```

You can override the default model for an individual request:

```ts
const result = await ai.generate({
  model:
    "typhoon/typhoon-v2.5-30b-a3b-instruct",

  system:
    "Always respond in Thai.",

  prompt:
    "อธิบายว่า LLM คืออะไร",
});
```

## Compare models

Send the same prompt to multiple models concurrently:

```ts
const results = await ai.compare({
  models: [
    "google/gemini-3.5-flash",
    "typhoon/typhoon-v2.5-30b-a3b-instruct",
  ],

  system:
    "Respond in Thai using no more than three sentences.",

  prompt:
    "อธิบายว่า RAG คืออะไร",
});
```

Handle successful and failed results independently:

```ts
for (const item of results) {
  if (item.status === "success") {
    console.log(
      item.model,
      item.result.text,
    );
  } else {
    console.error(
      item.model,
      item.error.message,
    );
  }
}
```

A failed model does not cause the other comparisons to fail.

## Request logs

Requests made through `createClient()` are logged automatically.

```ts
await ai.generate({
  prompt: "What is machine learning?",
});

const logs = ai.getLogs();

console.log(logs);
```

Each log contains:

```ts
{
  id: "req_...",
  model: "google/gemini-3.5-flash",
  status: "success",

  usage: {
    inputTokens: 10,
    outputTokens: 50,
    totalTokens: 60,
  },

  timing: {
    totalMs: 720,
  },

  cost: {
    inputCost: 0.000015,
    outputCost: 0.00045,
    totalCost: 0.000465,
    currency: "USD",
    pricingFound: true,
    estimated: true,
  },

  error: null,
  createdAt: "2026-09-15T00:00:00.000Z",
}
```

Clear logs held by the client:

```ts
ai.clearLogs();
```

## Export logs

Export logs as formatted JSON:

```ts
const json = ai.exportLogs();

console.log(json);
```

Export compact JSON:

```ts
const json = ai.exportLogs({
  pretty: false,
});
```

`exportLogs()` returns a JSON string. It does not write files automatically, so it works in both Node.js and browser environments.

## Custom pricing

Provider prices may change over time. You can override prices for any model:

```ts
const ai = createClient({
  providers: {
    typhoon: {
      apiKey:
        process.env.TYPHOON_API_KEY ?? "",
    },
  },

  pricing: {
    "typhoon/typhoon-v2.5-30b-a3b-instruct": {
      inputPerMillionTokens: 0.3,
      outputPerMillionTokens: 1.2,
      currency: "USD",
    },
  },
});
```

Custom prices are defined per one million tokens.

Custom pricing overrides the built-in pricing table only for that client instance.

> Cost values are estimates based on the configured pricing. They may differ from the provider's final bill, free tier, discounts, caching, batch processing, or additional tool charges.

## Standalone API

You can use `generate()` without creating a client:

```ts
import {
  generate,
} from "zawedut-routing";

const result = await generate(
  {
    model: "google/gemini-3.5-flash",
    system: "Respond in Thai.",
    prompt: "อธิบาย machine learning",
  },
  {
    google: {
      apiKey:
        process.env.GOOGLE_API_KEY ?? "",
    },
  },
);

console.log(result.text);
```

Standalone calls do not retain logs because no client instance owns the log store.

## Calculate cost directly

```ts
import {
  calculateCost,
} from "zawedut-routing";

const cost = calculateCost({
  model: "my-provider/my-model",
  inputTokens: 1_000,
  outputTokens: 500,

  pricing: {
    "my-provider/my-model": {
      inputPerMillionTokens: 1,
      outputPerMillionTokens: 2,
      currency: "USD",
    },
  },
});

console.log(cost.totalCost);
```

## Supported providers

| Provider | Model format | Configuration |
|---|---|---|
| Google Gemini | `google/model-id` | `providers.google` |
| OpenAI | `openai/model-id` | `providers.openai` |
| Anthropic Claude | `anthropic/model-id` | `providers.anthropic` |
| Typhoon | `typhoon/model-id` | `providers.typhoon` |

Example model identifiers:

```ts
"google/gemini-3.5-flash"
"openai/model-id"
"anthropic/model-id"
"typhoon/typhoon-v2.5-30b-a3b-instruct"
```

Available model identifiers and access permissions depend on each provider.

## Environment variables

Create a `.env` file in your application:

```env
GOOGLE_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
TYPHOON_API_KEY=
```

The library does not load `.env` automatically. Your application is responsible for loading environment variables.

For Node.js:

```bash
node --env-file=.env app.js
```

Or install `dotenv` in your application:

```bash
npm install dotenv
```

Then import it before reading environment variables:

```ts
import "dotenv/config";
```

Never commit real API keys to Git.

## Error handling

`generate()` throws when a request fails:

```ts
try {
  const result = await ai.generate({
    prompt: "Hello",
  });

  console.log(result.text);
} catch (error) {
  console.error(error);
}
```

The failed request is also available through:

```ts
ai.getLogs();
```

`compare()` returns errors separately instead of throwing for every failed model.

## Development

Install dependencies:

```bash
npm install
```

Build the package:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Create a local npm package:

```bash
npm pack
```

## Roadmap

- [x] Multiple LLM providers
- [x] Text generation
- [x] System prompts
- [x] Model comparison
- [x] Token and latency tracking
- [x] Cost estimation
- [x] Request logging
- [x] JSON export
- [ ] Streaming responses
- [ ] Retry and fallback
- [ ] Smart model routing
- [ ] Dashboard

## Security

- API keys are used only to configure provider clients.
- API keys are not included in request logs.
- Prompts and system prompts are not logged automatically.
- Never expose provider API keys in client-side browser code.

## License

ISC

## Repository

https://github.com/zawedut/zawedut-routing