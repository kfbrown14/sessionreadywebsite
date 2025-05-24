import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen pt-11 overflow-hidden gradient-hero">
      
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-center min-h-screen">
        <motion.div 
          className="lg:w-1/2 text-center mb-12 lg:mb-0 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
                     <h1 className="font-nunito text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Immerse. Improve. Inspire<br />
            <span className="text-primary">Practice That Matters.</span>
          </h1>
          
          <p className="font-primary text-lg md:text-xl text-primary max-w-lg mx-auto mb-8 text-center">
            Shift from classroom theory to confident provider by training with realistic role-plays so you're ready from day one.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button 
              variant="primary" 
              size="lg" 
              className="bg-primary text-white hover:bg-primary-dark"
              onClick={() => navigate('/early-access')}
            >
              Get Early Access
            </Button>
          </div>
          
          {/* Commenting out statistics section for later use
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-bold text-primary">10K+</span>
              <span className="text-sm text-primary-dark">Practice Sessions</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-bold text-secondary">200+</span>
              <span className="text-sm text-primary-dark">Scenarios</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-bold text-accent-dark">85%</span>
              <span className="text-sm text-primary-dark">Confidence Boost</span>
            </div>
          </div>
          */}
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img 
            src="/session ready therapy training app.jpg" 
            alt="Session Ready therapy training app"
            className="rounded-2xl shadow-brand w-full max-w-lg mx-auto"
          />
        </motion.div>
      </div>
      
      {/* Organic wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[100px]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FFFFFF" fillOpacity="0.25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#FFFFFF" fillOpacity="0.5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFFFFF"></path>
        </svg>
      </div>
    </section>
  );
}