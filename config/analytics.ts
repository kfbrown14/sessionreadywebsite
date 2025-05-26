import { isProduction } from './environment';

// Type declarations for third-party analytics libraries
declare global {
  interface Window {
    mixpanel: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
    posthog: {
      capture: (eventName: string, properties?: Record<string, any>) => void;
    };
    DD_RUM: {
      addTiming: (metric: string, value: number) => void;
    };
    Sentry: {
      captureException: (error: Error, options?: { extra?: Record<string, any> }) => void;
    };
    LogRocket: {
      captureException: (error: Error, options?: { extra?: Record<string, any> }) => void;
    };
  }
}

// Analytics Events
export const ANALYTICS_EVENTS = {
  // User Journey Events
  PAGE_VIEW: 'page_view',
  SIGN_UP_START: 'sign_up_start',
  SIGN_UP_COMPLETE: 'sign_up_complete',
  EARLY_ACCESS_REQUEST: 'early_access_request',
  
  // Feature Usage Events
  SIMULATION_START: 'simulation_start',
  SIMULATION_COMPLETE: 'simulation_complete',
  FEEDBACK_VIEWED: 'feedback_viewed',
  PROGRESS_TRACKED: 'progress_tracked',
  
  // Performance Events
  TIME_TO_INTERACTIVE: 'time_to_interactive',
  FIRST_CONTENTFUL_PAINT: 'first_contentful_paint',
  LARGEST_CONTENTFUL_PAINT: 'largest_contentful_paint',
  
  // Error Events
  API_ERROR: 'api_error',
  CLIENT_ERROR: 'client_error',
  SIMULATION_ERROR: 'simulation_error',
} as const;

// User Properties
export const USER_PROPERTIES = {
  USER_TYPE: 'user_type',
  SUBSCRIPTION_TIER: 'subscription_tier',
  UNIVERSITY_AFFILIATION: 'university_affiliation',
  PRACTICE_SESSIONS_COMPLETED: 'practice_sessions_completed',
  SKILL_LEVEL: 'skill_level',
} as const;

// Performance Metrics
export const PERFORMANCE_METRICS = {
  API_RESPONSE_TIME: 'api_response_time',
  SIMULATION_LOAD_TIME: 'simulation_load_time',
  MODEL_RESPONSE_TIME: 'model_response_time',
  MEMORY_USAGE: 'memory_usage',
  CPU_USAGE: 'cpu_usage',
} as const;

// Analytics Providers Configuration
export const ANALYTICS_PROVIDERS = {
  // Google Analytics 4
  googleAnalytics: {
    enabled: isProduction && Boolean(import.meta.env.VITE_GA_ID),
    trackingId: import.meta.env.VITE_GA_ID,
    config: {
      send_page_view: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: false,
    },
  },

  // Mixpanel for detailed user behavior tracking
  mixpanel: {
    enabled: isProduction && Boolean(import.meta.env.VITE_MIXPANEL_TOKEN),
    token: import.meta.env.VITE_MIXPANEL_TOKEN,
    config: {
      debug: false,
      persistence: 'localStorage',
      api_host: 'https://api-eu.mixpanel.com',
    },
  },

  // Posthog for product analytics
  posthog: {
    enabled: isProduction && Boolean(import.meta.env.VITE_POSTHOG_TOKEN),
    token: import.meta.env.VITE_POSTHOG_TOKEN,
    config: {
      api_host: 'https://app.posthog.com',
      autocapture: true,
      capture_pageview: true,
      persistence: 'localStorage',
    },
  },

  // LogRocket for session replay and error tracking
  logRocket: {
    enabled: isProduction && Boolean(import.meta.env.VITE_LOGROCKET_ID),
    appId: import.meta.env.VITE_LOGROCKET_ID,
    config: {
      release: import.meta.env.VITE_APP_VERSION,
      console: {
        shouldAggregateConsoleErrors: true,
      },
      network: {
        requestSanitizer: (request: any) => {
          // Scrub sensitive data from requests
          if (request.url.includes('/api/')) {
            request.headers['Authorization'] = '[FILTERED]';
          }
          return request;
        },
      },
    },
  },
};

// Monitoring Configuration
export const MONITORING_CONFIG = {
  // Error Monitoring
  sentry: {
    enabled: isProduction && Boolean(import.meta.env.VITE_SENTRY_DSN),
    dsn: import.meta.env.VITE_SENTRY_DSN,
    config: {
      tracesSampleRate: 0.2,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.MODE,
    },
  },

  // Performance Monitoring
  datadog: {
    enabled: isProduction && Boolean(import.meta.env.VITE_DATADOG_TOKEN),
    token: import.meta.env.VITE_DATADOG_TOKEN,
    config: {
      site: 'datadoghq.com',
      service: 'session-ready-frontend',
      env: import.meta.env.MODE,
      trackInteractions: true,
      defaultPrivacyLevel: 'mask-user-input',
    },
  },
};

// Custom event tracking helper
export const trackEvent = (
  eventName: keyof typeof ANALYTICS_EVENTS,
  properties?: Record<string, any>
) => {
  // Google Analytics
  if (ANALYTICS_PROVIDERS.googleAnalytics.enabled) {
    window.gtag('event', eventName, properties);
  }

  // Mixpanel
  if (ANALYTICS_PROVIDERS.mixpanel.enabled && window.mixpanel) {
    window.mixpanel.track(eventName, properties);
  }

  // Posthog
  if (ANALYTICS_PROVIDERS.posthog.enabled && window.posthog) {
    window.posthog.capture(eventName, properties);
  }
};

// Performance monitoring helper
export const trackPerformance = (
  metric: keyof typeof PERFORMANCE_METRICS,
  value: number
) => {
  // Send to DataDog
  if (MONITORING_CONFIG.datadog.enabled && window.DD_RUM) {
    window.DD_RUM.addTiming(metric, value);
  }
};

// Error tracking helper
export const trackError = (
  error: Error,
  context?: Record<string, any>
) => {
  // Send to Sentry
  if (MONITORING_CONFIG.sentry.enabled && window.Sentry) {
    window.Sentry.captureException(error, { extra: context });
  }

  // Send to LogRocket
  if (ANALYTICS_PROVIDERS.logRocket.enabled && window.LogRocket) {
    window.LogRocket.captureException(error, { extra: context });
  }
}; 