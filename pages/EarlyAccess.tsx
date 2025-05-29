import { useState, useEffect, useRef } from 'react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';

const TALLY_SCRIPT_URL = 'https://tally.so/widgets/embed.js';
const FORM_HEIGHT = '846';

const EarlyAccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadTallyScript = async () => {
      try {
        // Check if script is already loaded
        if (document.querySelector(`script[src="${TALLY_SCRIPT_URL}"]`)) {
          if (mounted) setIsLoading(false);
          return;
        }

        // Create and load script
        const script = document.createElement('script');
        script.src = TALLY_SCRIPT_URL;
        script.async = true;
        scriptRef.current = script;

        const loadPromise = new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });

        document.body.appendChild(script);
        await loadPromise;

        if (mounted) {
          if (typeof window.Tally !== 'undefined') {
            window.Tally.loadEmbeds();
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load Tally form:', error);
        if (mounted) setIsLoading(false);
      }
    };

    loadTallyScript();

    return () => {
      mounted = false;
      // Clean up script if component unmounts during loading
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (iframeRef.current) {
      iframeRef.current.style.height = FORM_HEIGHT + 'px';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 bg-gradient-to-br from-sage-light/20 to-lavender-light/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-nunito text-3xl md:text-4xl font-bold mb-4 text-primary-dark">
              Help Shape the Future of Counseling Tools – Become a Founding Beta User
            </h1>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative min-h-[846px]">
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
                data-tally-src="https://tally.so/embed/mYyN5d?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                loading="eager"
                width="100%" 
                height={FORM_HEIGHT}
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0} 
                title="Early Access Sign Up Form"
                className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleIframeLoad}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Add type declaration for Tally
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default EarlyAccess; 