import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Music, TreeDeciduous, Heart } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';

const CreativeMeadow = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const approaches = [
    {
      icon: <Palette className="w-12 h-12" />,
      title: 'Art Therapy',
      description: 'Integrate visual arts into your therapeutic practice.'
    },
    {
      icon: <Music className="w-12 h-12" />,
      title: 'Sound Healing',
      description: 'Explore the therapeutic potential of music and sound.'
    },
    {
      icon: <TreeDeciduous className="w-12 h-12" />,
      title: 'Nature Therapy',
      description: 'Incorporate natural elements into healing practices.'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Mindful Expression',
      description: 'Combine mindfulness with creative therapeutic approaches.'
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
              Explore Creative Healing
            </h1>
            <p className="text-lg text-earth mb-8">
              Discover innovative approaches to therapy through arts, nature, and 
              holistic practices that enhance your therapeutic toolkit.
            </p>
            <Button variant="primary" size="lg">Start Creating</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach, index) => (
              <motion.div
                key={approach.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mb-6">
                  {approach.icon}
                </div>
                <h3 className="font-secondary text-xl font-bold mb-3">{approach.title}</h3>
                <p className="text-earth">{approach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreativeMeadow;