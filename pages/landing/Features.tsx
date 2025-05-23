import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Users, Sprout, Flower, BookOpen, Heart, LineChart, Shield } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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