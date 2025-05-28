import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, MessageCircle, LineChart, Shield } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';
import GoogleAnalytics from '../../components/common/GoogleAnalytics';

const PracticeGreenhouse = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: 'AI Client Simulations',
      description: 'Practice with diverse virtual clients in realistic scenarios.'
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Real-time Feedback',
      description: 'Receive immediate guidance on your therapeutic interventions.'
    },
    {
      icon: <LineChart className="w-12 h-12" />,
      title: 'Progress Tracking',
      description: 'Monitor your development with detailed analytics.'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Safe Environment',
      description: 'Build confidence in a risk-free practice space.'
    }
  ];

  return (
    <div className="min-h-screen bg-mist">
      <GoogleAnalytics />
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage-light/50 via-lavender-light to-earth-light/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-secondary text-4xl md:text-5xl font-bold mb-6">
              Practice in a Safe Environment
            </h1>
            <p className="text-lg text-earth mb-8">
              Develop your skills through AI-powered client simulations and 
              receive immediate feedback on your therapeutic approach.
            </p>
            <Button variant="primary" size="lg">Try a Practice Session</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-secondary text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-earth">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PracticeGreenhouse;