import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Compass, Map, Star } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';

const Guides = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const guides = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Getting Started',
      description: 'Essential guides for new therapists beginning their journey.'
    },
    {
      icon: <Compass className="w-12 h-12" />,
      title: 'Best Practices',
      description: 'Professional guidelines and ethical considerations.'
    },
    {
      icon: <Map className="w-12 h-12" />,
      title: 'Skill Development',
      description: 'Step-by-step guides for developing therapeutic competencies.'
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: 'Advanced Topics',
      description: 'In-depth exploration of specialized therapeutic approaches.'
    }
  ];

  return (
    <div className="min-h-screen bg-mist">
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
              Therapeutic Practice Guides
            </h1>
            <p className="text-lg text-earth mb-8">
              Comprehensive guides to help you navigate your therapeutic journey 
              and develop professional excellence.
            </p>
            <Button variant="primary" size="lg">Explore Guides</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mb-6">
                  {guide.icon}
                </div>
                <h3 className="font-secondary text-xl font-bold mb-3">{guide.title}</h3>
                <p className="text-earth">{guide.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Guides;