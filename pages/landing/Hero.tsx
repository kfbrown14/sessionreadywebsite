import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import GoogleAnalytics from '../../components/common/GoogleAnalytics';

export default function Hero() {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    // Navigate to early access page
    navigate('/early-access', { replace: true });
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-6 overflow-hidden gradient-hero" role="banner" aria-label="Hero section">
      <GoogleAnalytics />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <motion.div 
          className="text-center max-w-3xl mb-12 mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-nunito text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-8 bg-gradient-to-r from-primary via-sage to-primary bg-clip-text text-transparent drop-shadow-sm">
            <span>Practice That Matters.</span>
          </h1>
          
          <p className="font-primary text-base sm:text-lg md:text-xl text-primary/90 max-w-[90%] sm:max-w-4xl mx-auto mb-8 sm:mb-12 leading-snug sm:leading-normal px-4 sm:px-0">
            Sharpen your therapy skills at any stage—{' '}
            <span className="sm:hidden"><br /></span>
            immerse in our powerful AI simulations{' '}
            <span className="hidden sm:inline"><br /></span>
            with lifelike client personas and get instant coaching feedback to elevate every session.
          </p>
          
          <motion.div 
            className="flex justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              className="bg-primary text-white hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={handleStartTrial}
              aria-label="Get Early Access + Exclusive Discount"
            >
              Get Early Access + Exclusive Discount
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Organic wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[65px] md:h-[130px]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FFFFFF" fillOpacity="0.25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#FFFFFF" fillOpacity="0.5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFFFFF"></path>
        </svg>
      </div>
    </section>
  );
}