type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug';

export const log = (level: LogLevel = 'log', ...args: unknown[]) => {
  if ((import.meta as any).env.DEV) {
    const consoleMethod = console[level] as (...args: unknown[]) => void;
    if (typeof consoleMethod === 'function') {
      consoleMethod(...args);
    } else {
      console.log(...args); 
    }
  }
};

export const logger = {
  log: (...args: unknown[]) => log('log', ...args),
  error: (...args: unknown[]) => log('error', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  debug: (...args: unknown[]) => log('debug', ...args),
};
