export const logger = {
  log: (...args: unknown[]) => {
    console.log(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
  warn: (...args: unknown[]) => {
    console.warn(...args);
  },
  info: (...args: unknown[]) => {
    console.info(...args);
  },
  debug: (...args: unknown[]) => {
    console.debug(...args);
  },
};
