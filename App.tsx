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
import { lazy, Suspense } from 'react';
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import ScrollToTop from './components/common/ScrollToTop';

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

// Optimized API key validation
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (typeof API_KEY !== 'string' || !API_KEY) {
  throw new Error(
    'Missing required environment variable: VITE_GEMINI_API_KEY. Please add it to your .env file.'
  );
}

// Only log in development mode
if (import.meta.env.DEV) {
  console.log('App: API key loaded, length:', API_KEY?.length || 0);
  console.log('App: API key starts with:', API_KEY?.substring(0, 4) + '...');
}

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-mist">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sage font-primary">Loading...</p>
    </div>
  </div>
);

/**
 * Main application component for Session Ready - Therapist Training Tool
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <LiveAPIProvider apiKey={API_KEY}>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Only show practice route in development */}
            {import.meta.env.DEV && <Route path="/practice" element={<Practice />} />}
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Footer links - lazy loaded */}
            <Route path="/how-it-works" element={<ComingSoonPage title="How It Works" />} />
            <Route path="/pricing" element={<ComingSoonPage title="Pricing" />} />
            <Route path="/universities" element={<UniversitiesPage />} />
            <Route path="/blog" element={<ComingSoonPage title="Blog" />} />
            <Route path="/guides" element={<ComingSoonPage title="Guides" />} />
            <Route path="/support" element={<ComingSoonPage title="Support" />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/terms" element={<ComingSoonPage title="Terms of Service" />} />
            <Route path="/cookies" element={<ComingSoonPage title="Cookie Policy" />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </LiveAPIProvider>
    </Router>
  );
}

export default App;
