import type { RequestLog } from "./types.js";

export function createLogStore() {
  const logs: RequestLog[] = [];

  return {
    add(log: RequestLog): void {
      logs.push(log);
    },

    getAll(): RequestLog[] {
      return [...logs];
    },

    clear(): void {
      logs.length = 0;
    },
  };
}
