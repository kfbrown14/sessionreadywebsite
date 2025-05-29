import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="py-16 md:py-20 bg-gradient-to-br from-sage/80 to-sage-dark/90 text-white"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto px-4">
        <div className="lg:flex items-center justify-between">
          <motion.div 
            className="lg:w-2/3 mb-8 lg:mb-0 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              id="cta-title"
              className="font-nunito text-3xl md:text-4xl font-bold leading-tight"
            >
              Ready to level up your therapy skills?
              <br />
              Get started now.
            </h2>
          </motion.div>
          
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => navigate('/early-access')}
              aria-label="Get Early Access + Exclusive Discount"
            >
              Get Early Access + Exclusive Discount
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;