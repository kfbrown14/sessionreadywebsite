import { isProduction } from './environment';

export const PERFORMANCE_CONFIG = {
  // Image optimization
  images: {
    preload: true,
    lazyLoadThreshold: '200px',
    defaultQuality: 85,
    formats: ['webp', 'jpg'],
    sizeLimits: {
      hero: 300 * 1024, // 300KB
      thumbnail: 50 * 1024, // 50KB
      avatar: 20 * 1024, // 20KB
    }
  },

  // Caching
  cache: {
    staticAssets: isProduction ? 86400 : 0, // 24 hours in production
    apiResponses: isProduction ? 3600 : 0, // 1 hour in production
    preloadedPages: ['early-access', 'features', 'about'],
  },

  // Animation
  animation: {
    reducedMotion: true, // Respect user's reduced motion preference
    defaultDuration: 0.3,
    defaultEasing: 'ease-out',
  },

  // Resource hints
  resourceHints: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    prefetch: [
      '/early-access',
      '/features',
    ],
  },

  // Bundle optimization
  bundle: {
    splitChunks: true,
    minChunkSize: 10000, // 10KB
    maxChunkSize: 244000, // 244KB
  },

  // Memory management
  memory: {
    maxCacheItems: 100,
    clearInterval: 300000, // 5 minutes
  },

  // Monitoring thresholds
  monitoring: {
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100, // First Input Delay (ms)
    cls: 0.1, // Cumulative Layout Shift
    ttfb: 600, // Time to First Byte (ms)
  },
};

// Performance monitoring helper
export const measurePerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${metric}-end`);
    performance.measure(metric, `${metric}-start`, `${metric}-end`);
  }
};

// Resource loading helper
export const preloadResource = (resource: string, type: 'image' | 'style' | 'script' = 'image') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = type;
  link.href = resource;
  document.head.appendChild(link);
};

// Memory management helper
export const clearMemoryCache = () => {
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
    });
  }
};

// Export performance utilities
export const performanceUtils = {
  measurePerformance,
  preloadResource,
  clearMemoryCache,
}; 