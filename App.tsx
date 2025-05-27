/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import ScrollToTop from './components/common/ScrollToTop';
import { 
  API_KEY, 
  FEATURES, 
  isDevelopment,
  ANALYTICS_CONFIG,
  ERROR_REPORTING_CONFIG 
} from './config/environment';

// Declare global types for analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Sentry in production
if (ERROR_REPORTING_CONFIG.enabled && ERROR_REPORTING_CONFIG.sentryDsn) {
  Sentry.init({
    dsn: ERROR_REPORTING_CONFIG.sentryDsn,
    environment: import.meta.env.MODE,
    enabled: true,
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

// Analytics setup (only in production)
if (ANALYTICS_CONFIG.enabled) {
  // Initialize analytics
  if (ANALYTICS_CONFIG.googleAnalyticsId) {
    // Initialize Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_CONFIG.googleAnalyticsId);
  }
}

// Lazy load all pages for better code splitting
const Landing = lazy(() => import('./pages/Landing'));
const Practice = lazy(() => import('./pages/Practice'));
const About = lazy(() => import('./pages/About'));
const Features = lazy(() => import('./pages/Features'));
const Contact = lazy(() => import('./pages/Contact'));
const EarlyAccess = lazy(() => import('./pages/EarlyAccess'));

// Lazy load placeholder pages to reduce initial bundle
const ComingSoonPage = lazy(() => import('./components/common/ComingSoonPage'));
const CareersPage = lazy(() => import('./components/common/CareersPage'));
const UniversitiesPage = lazy(() => import('./components/common/UniversitiesPage'));

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-mist">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sage font-primary">Loading...</p>
    </div>
  </div>
);

// Development warning component
const DevWarningBanner = () => (
  isDevelopment ? (
    <div className="bg-yellow-500 text-black px-4 py-2 text-center text-sm">
      Development Mode - Practice Page Available
    </div>
  ) : null
);

/**
 * Main application component for Session Ready - Therapist Training Tool
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <DevWarningBanner />
      <LiveAPIProvider apiKey={API_KEY}>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Only show practice route in development */}
            {FEATURES.PRACTICE_PAGE && <Route path="/practice" element={<Practice />} />}
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Footer links - lazy loaded */}
            <Route path="/how-it-works" element={<ComingSoonPage title="How It Works" />} />
            <Route path="/pricing" element={<ComingSoonPage title="Pricing" />} />
            {FEATURES.UNIVERSITIES && <Route path="/universities" element={<UniversitiesPage />} />}
            <Route path="/blog" element={<ComingSoonPage title="Blog" />} />
            <Route path="/guides" element={<ComingSoonPage title="Guides" />} />
            <Route path="/support" element={<ComingSoonPage title="Support" />} />
            <Route path="/careers" element={<CareersPage />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </LiveAPIProvider>
    </Router>
  );
}

export default App;
