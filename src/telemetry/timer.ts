import { performance } from "node:perf_hooks";

export function createTimer() {
  const startedAt = performance.now();

  return {
    elapsedMs(): number {
      return performance.now() - startedAt;
    },
  };
}
