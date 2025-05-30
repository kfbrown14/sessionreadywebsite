import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import GoogleAnalytics from '../components/common/GoogleAnalytics';

const TALLY_SCRIPT_URL = 'https://tally.so/widgets/embed.js';
const FORM_HEIGHT = '1200';
const FORM_ID = 'mYyN5d';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const initializationAttempts = useRef(0);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  useEffect(() => {
    let mounted = true;
    const maxAttempts = 3;
    const attemptInterval = 1000;

    const initializeTally = () => {
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds();
        setIsLoading(false);
      } else if (initializationAttempts.current < maxAttempts) {
        initializationAttempts.current += 1;
        setTimeout(initializeTally, attemptInterval);
      }
    };

    const loadTallyScript = async () => {
      try {
        const existingScript = document.querySelector(`script[src="${TALLY_SCRIPT_URL}"]`);
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = TALLY_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        scriptRef.current = script;

        script.onload = () => {
          if (mounted) {
            initializeTally();
          }
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error('Failed to load Tally form:', error);
        if (mounted) setIsLoading(false);
      }
    };

    loadTallyScript();

    return () => {
      mounted = false;
    };
  }, []);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      iframeRef.current.style.height = FORM_HEIGHT + 'px';
      
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GoogleAnalytics />
      <Navigation />
      <div className="flex-grow pt-20 pb-10 bg-gradient-to-br from-sage-light/20 to-lavender-light/30">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-6" {...fadeInUp}>
            <h1 className="font-nunito text-4xl md:text-5xl font-bold mb-4 text-primary-dark">
              Get Early Access
            </h1>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-3 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sage font-primary">Loading form...</p>
                  </div>
                </div>
              )}
              <iframe 
                ref={iframeRef}
                data-tally-src={`https://tally.so/embed/${FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                src={`https://tally.so/embed/${FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                loading="eager"
                width="100%" 
                height={FORM_HEIGHT}
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0} 
                title="Email Collect-Sign Up Beta Testers"
                className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleIframeLoad}
                allow="payment *; camera *; microphone *; fullscreen *"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-modals allow-top-navigation allow-downloads"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default Contact; 