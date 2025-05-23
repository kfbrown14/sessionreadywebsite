import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, FileText, Video, Download } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';

const Resources = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const resources = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Clinical Resources',
      description: 'Evidence-based therapeutic techniques and interventions.'
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Documentation Templates',
      description: 'Professional templates for clinical documentation.'
    },
    {
      icon: <Video className="w-12 h-12" />,
      title: 'Video Library',
      description: 'Educational videos demonstrating therapeutic techniques.'
    },
    {
      icon: <Download className="w-12 h-12" />,
      title: 'Downloadable Tools',
      description: 'Worksheets and assessment tools for client work.'
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
              Professional Resources
            </h1>
            <p className="text-lg text-earth mb-8">
              Access a comprehensive library of therapeutic tools, templates, and 
              educational materials to support your practice.
            </p>
            <Button variant="primary" size="lg">Browse Resources</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mb-6">
                  {resource.icon}
                </div>
                <h3 className="font-secondary text-xl font-bold mb-3">{resource.title}</h3>
                <p className="text-earth">{resource.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;