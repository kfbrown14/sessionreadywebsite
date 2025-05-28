import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import GoogleAnalytics from '../components/common/GoogleAnalytics';

const Contact = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.innerHTML = `
      var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
    `;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <GoogleAnalytics />
      <Navigation />
      <div className="pt-32 pb-20 bg-gradient-to-br from-sage-light/20 to-lavender-light/30">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8" {...fadeInUp}>
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
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe 
                data-tally-src="https://tally.so/embed/mYyN5d?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                loading="lazy" 
                width="100%" 
                height="846" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0} 
                title="Email Collect-Sign Up Beta Testers"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact; 