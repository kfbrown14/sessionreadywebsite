import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shrub, Handshake, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';

const features = [
  {
    id: 1,
    icon: <Shrub className="w-12 h-12" />,
    title: 'Grounded Confidence',
    description: 'Refine core skills with adaptive therapy drills and simulations. Enter every session confident, competent, and ready to provide exceptional care.',
    color: 'bg-secondary-light/20 text-secondary-light',
    href: '/features#skill-garden',
    ariaLabel: 'Learn more about building grounded confidence'
  },
  {
    id: 2,
    icon: <Handshake className="w-12 h-12" />,
    title: 'Strong Client Relationships',
    description: 'Build culturally competent skills through diverse therapy simulations, so you can foster trust and rapport from the very first moment.',
    color: 'bg-secondary-light/20 text-secondary-light',
    href: '/features#practice-greenhouse',
    ariaLabel: 'Learn more about building strong client relationships'
  },
  {
    id: 3,
    icon: <TrendingUp className="w-12 h-12" />,
    title: 'Measured Skill Mastery',
    description: 'Track your development and performance with therapy analytics dashboards, then share clear growth reports with faculty, supervisors, and potential employers.',
    color: 'bg-secondary-light/20 text-secondary-light',
    href: '/features#community-grove',
    ariaLabel: 'Learn more about measured skill mastery'
  }
];

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section 
      className="py-20 bg-white" 
      ref={ref}
      aria-labelledby="features-title"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 
            id="features-title" 
            className="font-nunito text-3xl md:text-4xl font-bold mb-6"
          >
            Key Outcomes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                role="article"
                aria-labelledby={`feature-${feature.id}-title`}
                className="h-full"
              >
                <Card className="h-full flex flex-col items-center p-8 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                  <div 
                    className={`${feature.color} p-4 rounded-full mb-8 transition-transform duration-200 hover:scale-110`}
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </div>
                  <h3 
                    id={`feature-${feature.id}-title`}
                    className="font-nunito text-xl font-bold mb-4 text-center w-full"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-earth text-left text-base md:text-lg mb-8 flex-grow w-full">{feature.description}</p>
                  <a 
                    href={feature.href}
                    className="mt-auto text-sage hover:text-sage-dark transition-colors duration-200 font-semibold"
                    aria-label={feature.ariaLabel}
                  >
                    Learn More →
                  </a>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 