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
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import Landing from './pages/Landing';
import Practice from './pages/Practice';
import About from './pages/About';
import Features from './pages/Features';
import Community from './pages/Community';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (typeof API_KEY !== 'string' || !API_KEY) {
  throw new Error(
    'Missing required environment variable: VITE_GEMINI_API_KEY. Please add it to your .env file.'
  );
}

// Log API key info for debugging (safely)
console.log('App: API key loaded, length:', API_KEY?.length || 0);
console.log('App: API key starts with:', API_KEY?.substring(0, 4) + '...');

// Placeholder page component
const ComingSoonPage = ({ title }: { title: string }) => (
  <div className="min-h-screen">
    <Navigation />
    <div className="pt-32 pb-20 bg-gradient-to-br from-sage-light/20 to-lavender-light/30">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-secondary text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-earth">This page is growing and will bloom soon!</p>
      </div>
    </div>
    <Footer />
  </div>
);

/**
 * Main application component for Session Ready - Therapist Training Tool
 */
function App() {
  return (
    <Router>
      <LiveAPIProvider apiKey={API_KEY}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/community" element={<Community />} />
          
          {/* Footer links */}
          <Route path="/how-it-works" element={<ComingSoonPage title="How It Works" />} />
          <Route path="/pricing" element={<ComingSoonPage title="Pricing" />} />
          <Route path="/universities" element={<ComingSoonPage title="For Universities" />} />
          <Route path="/blog" element={<ComingSoonPage title="Blog" />} />
          <Route path="/guides" element={<ComingSoonPage title="Guides" />} />
          <Route path="/support" element={<ComingSoonPage title="Support" />} />
          <Route path="/careers" element={<ComingSoonPage title="Careers" />} />
          <Route path="/contact" element={<ComingSoonPage title="Contact" />} />
          <Route path="/privacy" element={<ComingSoonPage title="Privacy Policy" />} />
          <Route path="/terms" element={<ComingSoonPage title="Terms of Service" />} />
          <Route path="/cookies" element={<ComingSoonPage title="Cookie Policy" />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LiveAPIProvider>
    </Router>
  );
}

export default App;
