import { useEffect } from 'react';
import { ANALYTICS_CONFIG } from '../../config/environment';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.googleAnalyticsId) {
      return;
    }

    // Create script elements
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ANALYTICS_CONFIG.googleAnalyticsId}');
    `;

    // Insert scripts into head
    document.head.appendChild(gtagScript);
    document.head.appendChild(inlineScript);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(gtagScript);
      document.head.removeChild(inlineScript);
    };
  }, []);

  return null;
} 