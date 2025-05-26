/**
 * Environment configuration for Session Ready
 */

// Environment type check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// API Configuration
export const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.sessionready.ai';

// Feature Flags
export const FEATURES = {
  PRACTICE_PAGE: isDevelopment,
  ANALYTICS: isProduction,
  TESTIMONIALS: false, // Currently disabled
  UNIVERSITIES: true,
} as const;

// Validation
if (!API_KEY) {
  throw new Error(
    'Missing required environment variable: VITE_GEMINI_API_KEY. Please add it to your .env file.'
  );
}

// Analytics (only in production)
export const ANALYTICS_CONFIG = {
  enabled: isProduction,
  googleAnalyticsId: import.meta.env.VITE_GA_ID,
  mixpanelToken: import.meta.env.VITE_MIXPANEL_TOKEN,
};

// Error Reporting (only in production)
export const ERROR_REPORTING_CONFIG = {
  enabled: isProduction,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
};

// Cache Configuration
export const CACHE_CONFIG = {
  maxAge: isProduction ? 3600 : 0, // 1 hour in production, no cache in development
};

// Security Headers
export const SECURITY_HEADERS = {
  'Content-Security-Policy': isProduction ? 
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;" 
    : "default-src 'self' 'unsafe-inline' 'unsafe-eval' *",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// Development Tools
export const DEV_TOOLS = {
  enabled: isDevelopment,
  debugMode: isDevelopment && import.meta.env.VITE_DEBUG === 'true',
  mockAPI: isDevelopment && import.meta.env.VITE_MOCK_API === 'true',
}; 