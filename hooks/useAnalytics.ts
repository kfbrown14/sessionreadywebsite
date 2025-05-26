import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { Metric } from 'web-vitals';
import { 
  ANALYTICS_EVENTS, 
  PERFORMANCE_METRICS,
  trackEvent,
  trackPerformance,
  trackError
} from '../config/analytics';

export function useAnalytics() {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
      path: location.pathname,
      search: location.search,
    });
  }, [location]);

  // Track performance metrics using Web Vitals
  useEffect(() => {
    const loadWebVitals = async () => {
      try {
        const { getCLS, getFID, getLCP } = await import('web-vitals');
        getCLS((metric: Metric) => {
          trackPerformance(PERFORMANCE_METRICS.API_RESPONSE_TIME, metric.value);
        });
        getFID((metric: Metric) => {
          trackPerformance(PERFORMANCE_METRICS.MODEL_RESPONSE_TIME, metric.value);
        });
        getLCP((metric: Metric) => {
          trackPerformance(PERFORMANCE_METRICS.SIMULATION_LOAD_TIME, metric.value);
        });
      } catch (error) {
        console.warn('Web Vitals not available:', error);
      }
    };

    loadWebVitals();
  }, []);

  // Helper functions for common tracking scenarios
  const trackSimulationStart = useCallback((simulationType: string) => {
    trackEvent(ANALYTICS_EVENTS.SIMULATION_START, { simulationType });
  }, []);

  const trackSimulationComplete = useCallback((simulationType: string, duration: number) => {
    trackEvent(ANALYTICS_EVENTS.SIMULATION_COMPLETE, { 
      simulationType,
      duration,
      success: true 
    });
  }, []);

  const trackFeedbackViewed = useCallback((feedbackType: string) => {
    trackEvent(ANALYTICS_EVENTS.FEEDBACK_VIEWED, { feedbackType });
  }, []);

  const trackProgressUpdate = useCallback((metrics: Record<string, any>) => {
    trackEvent(ANALYTICS_EVENTS.PROGRESS_TRACKED, metrics);
  }, []);

  const trackAPIError = useCallback((error: Error, endpoint: string) => {
    trackError(error, { 
      type: ANALYTICS_EVENTS.API_ERROR,
      endpoint 
    });
  }, []);

  // Track memory usage periodically
  useEffect(() => {
    if ('performance' in window && 'memory' in window.performance) {
      const memoryCheck = setInterval(() => {
        const memory = (window.performance as any).memory;
        if (memory) {
          trackPerformance(PERFORMANCE_METRICS.MEMORY_USAGE, memory.usedJSHeapSize / 1048576); // Convert to MB
        }
      }, 60000); // Check every minute

      return () => clearInterval(memoryCheck);
    }
  }, []);

  return {
    trackSimulationStart,
    trackSimulationComplete,
    trackFeedbackViewed,
    trackProgressUpdate,
    trackAPIError,
    // Export the base functions as well
    trackEvent,
    trackPerformance,
    trackError,
  };
} 