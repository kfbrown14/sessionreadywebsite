import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sprout, Users, Brain, Flower } from 'lucide-react';
import Card from '../../components/common/Card';

const features = [
  {
    id: 1,
    icon: <Sprout className="w-12 h-12" />,
    title: 'Skill Garden',
    description: 'Cultivate core therapeutic competencies through organic progression paths.',
    color: 'bg-sage-light/20 text-sage',
    href: '/features#skill-garden'
  },
  {
    id: 2,
    icon: <Brain className="w-12 h-12" />,
    title: 'Practice Greenhouse',
    description: 'Safe environment for skill development with AI-powered client simulations.',
    color: 'bg-lavender-light/50 text-lavender-dark',
    href: '/features#practice-greenhouse'
  },
  {
    id: 3,
    icon: <Users className="w-12 h-12" />,
    title: 'Community Grove',
    description: 'Connect with peers and mentors in our supportive learning ecosystem.',
    color: 'bg-earth-light/20 text-earth',
    href: '/features#community-grove'
  },
  {
    id: 4,
    icon: <Flower className="w-12 h-12" />,
    title: 'Creative Meadow',
    description: 'Integrate arts, nature, and holistic approaches into your practice.',
    color: 'bg-lavender-dark/20 text-lavender-dark',
    href: '/features#creative-meadow'
  }
];

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-6">Your Therapeutic Journey</h2>
          <p className="text-lg text-earth">
            Discover the organic pathways to becoming a confident, skilled therapist
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col items-center text-center">
                <div className={`${feature.color} p-4 rounded-full mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="font-secondary text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-earth mb-6 flex-grow">{feature.description}</p>
                <a 
                  href={feature.href}
                  className="inline-flex items-center text-sage font-semibold hover:text-sage-dark transition-colors group"
                >
                  Explore 
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 