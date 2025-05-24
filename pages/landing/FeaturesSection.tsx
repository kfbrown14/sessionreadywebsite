import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shrub, Handshake, TrendingUp, Flower } from 'lucide-react';
import Card from '../../components/common/Card';

const features = [
  {
    id: 1,
    icon: <Shrub className="w-12 h-12" />,
    title: 'Grounded Confidence',
    description: 'Refine core techniques with adaptive drills and simulations, so you enter sessions confident, capable, and ready to provide exceptional care.',
    color: 'bg-secondary-light/20 text-secondary-light',
    href: '/features#skill-garden'
  },
  {
    id: 2,
    icon: <Handshake className="w-12 h-12" />,
    title: 'Strong Client Relationships',
    description: 'Develop cultural competence and adaptability through diverse client scenarios so you can foster trust and rapport from the very first moment.',
    color: 'bg-secondary-light/20 text-secondary-light',
    href: '/features#practice-greenhouse'
  },
  {
    id: 3,
    icon: <TrendingUp className="w-12 h-12" />,
    title: 'Measured Skill Mastery',
    description: 'Track your development with performance analytics dashboards, then share clear growth reports with faculty, supervisors, and potential employers.',
    color: 'bg-secondary-light/20 text-secondary-light',
    href: '/features#community-grove'
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
          <h2 className="font-nunito text-3xl md:text-4xl font-bold mb-6">Key Outcomes</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                <h3 className="font-nunito text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-earth mb-6 flex-grow">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 