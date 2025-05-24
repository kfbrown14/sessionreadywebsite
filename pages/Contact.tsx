import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';

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
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-mist">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32">
        <motion.div {...fadeInUp}>
          <h1 className="font-nunito text-4xl md:text-5xl font-bold text-earth-dark text-center">
            Get in Touch
          </h1>
        </motion.div>
      </section>

      {/* Tally Survey Section */}
      <section>
        <motion.div 
          className="ml-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <iframe 
            data-tally-src="https://tally.so/embed/w25QXp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
            loading="lazy" 
            width="100%" 
            height="767" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0} 
            title="Get in Touch"
          />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact; 