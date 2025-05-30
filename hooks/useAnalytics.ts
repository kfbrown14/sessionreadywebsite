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
import { onCLS, onFID, onLCP } from 'web-vitals';

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
        onCLS((metric: Metric) => {
          trackPerformance(PERFORMANCE_METRICS.API_RESPONSE_TIME, metric.value);
        });
        onFID((metric: Metric) => {
          trackPerformance(PERFORMANCE_METRICS.MODEL_RESPONSE_TIME, metric.value);
        });
        onLCP((metric: Metric) => {
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

  const trackSimulationComplete = useCallback((duration: number, success: boolean) => {
    trackEvent(ANALYTICS_EVENTS.SIMULATION_COMPLETE, {
      duration,
      success,
      timestamp: new Date().toISOString()
    });
  }, []);

  const trackFeedbackViewed = useCallback((feedbackType: string) => {
    trackEvent(ANALYTICS_EVENTS.FEEDBACK_VIEWED, { feedbackType });
  }, []);

  const trackProgress = useCallback((metrics: Record<string, number>) => {
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

  const trackPageView = () => {
    trackEvent('PAGE_VIEW', {
      path: window.location.pathname,
      title: document.title
    });
  };

  const trackWebVitals = async () => {
    try {
      onCLS((metric) => {
        trackPerformance('API_RESPONSE_TIME', metric.value);
      });

      onFID((metric) => {
        trackPerformance('MODEL_RESPONSE_TIME', metric.value);
      });

      onLCP((metric) => {
        trackPerformance('SIMULATION_LOAD_TIME', metric.value);
      });
    } catch (error) {
      console.error('Failed to track web vitals:', error);
    }
  };

  const trackMemoryUsage = () => {
    if (typeof window !== 'undefined' && (performance as any).memory) {
      const memory = (performance as any).memory;
      trackPerformance('MEMORY_USAGE', memory.usedJSHeapSize / 1048576); // Convert to MB
    }
  };

  return {
    trackPageView,
    trackWebVitals,
    trackSimulationStart,
    trackSimulationComplete,
    trackFeedbackViewed,
    trackProgress,
    trackMemoryUsage,
    trackAPIError,
    trackEvent,
    trackPerformance,
    trackError,
  };
} 