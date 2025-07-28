// Production-safe logging utility
export class Logger {
  constructor(isDevelopment = false) {
    this.isDevelopment = isDevelopment;
  }

  log(...args) {
    if (this.isDevelopment) {
      console.log(...args);
    }
  }

  error(...args) {
    if (this.isDevelopment) {
      console.error(...args);
    }
    // In production, you might want to send errors to a logging service
    // Example: this.sendToLoggingService('error', args);
  }

  warn(...args) {
    if (this.isDevelopment) {
      console.warn(...args);
    }
  }

  // Performance metrics could be sent to analytics in production
  metric(data) {
    if (this.isDevelopment) {
      console.log('Metric:', data);
    }
    // In production: this.sendToAnalytics(data);
  }
}

// Create singleton instance
const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
export const logger = new Logger(isDev);