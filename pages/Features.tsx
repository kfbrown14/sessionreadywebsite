import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Users, Sprout, Flower, BookOpen, Heart, LineChart, Shield } from 'lucide-react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <Sprout className="w-12 h-12" />,
      title: 'Skill Garden',
      description: 'Cultivate therapeutic competencies through personalized learning paths and milestone tracking.',
      benefits: [
        'Customized skill development plans',
        'Progress tracking and analytics',
        'Competency-based assessments',
        'Adaptive learning pathways'
      ]
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'Practice Greenhouse',
      description: 'Safe environment for skill development with AI-powered client simulations and real-time feedback.',
      benefits: [
        'AI client simulations',
        'Real-time feedback system',
        'Scenario-based learning',
        'Risk-free practice environment'
      ]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Community Grove',
      description: 'Connect with peers and mentors in our supportive learning ecosystem.',
      benefits: [
        'Peer support networks',
        'Mentor matching',
        'Group supervision',
        'Knowledge sharing'
      ]
    },
    {
      icon: <Flower className="w-12 h-12" />,
      title: 'Creative Meadow',
      description: 'Explore and integrate creative approaches to therapy through arts and nature-based interventions.',
      benefits: [
        'Arts-based interventions',
        'Nature therapy techniques',
        'Mindfulness practices',
        'Expressive therapies'
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Evidence-Based Resources',
      description: 'Access a comprehensive library of therapeutic techniques and research.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Self-Care Tools',
      description: 'Built-in resources to maintain your own wellbeing while helping others.'
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: 'Progress Analytics',
      description: 'Track your development with detailed analytics and insights.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Ethical Framework',
      description: 'Integrated ethical guidelines and decision-making support.'
    }
  ];

  return (
    <div className="min-h-screen bg-mist">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage-light/50 via-lavender-light to-earth-light/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-secondary text-4xl md:text-5xl font-bold mb-6">
              Features that Nurture Growth
            </h1>
            <p className="text-lg text-earth mb-8">
              Discover the tools and features designed to support your journey from student to confident practitioner.
            </p>
            <Button variant="primary" size="lg">Start Free Trial</Button>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-sage bg-sage-light/20`}>
                  {feature.icon}
                </div>
                <h2 className="font-secondary text-2xl font-bold mb-4">{feature.title}</h2>
                <p className="text-earth mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-earth">
                      <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-sage-light/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-secondary text-3xl font-bold mb-4">Additional Tools for Success</h2>
            <p className="text-earth">Supporting features to enhance your learning experience</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-lg p-6 text-center shadow-soft hover:shadow-medium transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-secondary text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-earth">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sage/80 to-sage-dark/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of therapists who are developing their skills naturally in our supportive digital ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-sage">
                Start Free Trial
              </Button>
              <Button variant="primary" size="lg" className="bg-white text-sage hover:bg-sage-light hover:text-white">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;