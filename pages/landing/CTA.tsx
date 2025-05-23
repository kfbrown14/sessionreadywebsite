import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const CTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gradient-to-br from-sage/80 to-sage-dark/90 text-white">
      <div className="container mx-auto px-4">
        <div className="lg:flex items-center justify-between">
          <motion.div 
            className="lg:w-2/3 mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Practice?</h2>
            <p className="text-white/80 text-lg max-w-2xl">
              Join thousands of therapists who are developing skills naturally in our supportive digital ecosystem. Start your 14-day free trial today.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              variant="secondary" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-sage w-full lg:w-auto"
              onClick={() => navigate('/practice')}
            >
              Start Free Trial
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;