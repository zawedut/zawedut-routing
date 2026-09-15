import { compare as compareModels } from "../compare/index.js";

import { generate, type GenerateResult } from "../generate/index.js";

import type { ClientConfig, ZawedutClient } from "./types.js";

import {
  createErrorLog,
  createLog,
  createLogStore,
  exportLogs as serializeLogs,
} from "../logging/index.js";

import { createTimer } from "../telemetry/index.js";

export function createClient(config: ClientConfig): ZawedutClient {
  const logStore = createLogStore();

  function addResultLog(result: GenerateResult): void {
    const log = createLog({
      model: result.model,
      usage: result.usage,
      timing: result.timing,
      pricing: config.pricing,
    });

    logStore.add(log);
  }

  return {
    async generate(options) {
      const model = options.model ?? config.defaults?.model;

      if (!model) {
        throw new Error(
          "A model is required. Pass model or configure defaults.model",
        );
      }

      const timer = createTimer();

      try {
        const result = await generate(
          {
            ...options,
            model,

            system: options.system ?? config.defaults?.system,
          },
          config.providers,
        );

        addResultLog(result);

        return result;
      } catch (error) {
        const log = createErrorLog({
          model,
          error,

          timing: {
            totalMs: timer.elapsedMs(),
          },

          pricing: config.pricing,
        });

        logStore.add(log);

        throw error;
      }
    },

    async compare(options) {
      const results = await compareModels(
        {
          ...options,

          system: options.system ?? config.defaults?.system,
        },
        config.providers,
      );

      for (const item of results) {
        if (item.status === "success") {
          addResultLog(item.result);
        } else {
          const log = createErrorLog({
            model: item.model,
            error: item.error,
            timing: item.timing,
            pricing: config.pricing,
          });

          logStore.add(log);
        }
      }

      return results;
    },

    getLogs() {
      return logStore.getAll();
    },

    clearLogs() {
      logStore.clear();
    },

    exportLogs(options) {
      return serializeLogs(logStore.getAll(), options);
    },
  };
}
