import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Users, Sprout, BookOpen, Heart, LineChart, Shield } from 'lucide-react';
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
      icon: <Sprout className="w-12 h-12" style={{ color: '#10a6bf' }} />,
      title: 'Grounded Confidence',
      description: 'Refine core techniques with adaptive drills and simulations, so you enter sessions confident, capable, and ready to provide exceptional care.',
      color: 'bg-secondary-light/20',
      href: '/features#skill-garden'
    },
    {
      id: 2,
      icon: <Brain className="w-12 h-12" style={{ color: '#10a6bf' }} />,
      title: 'Strong Client Relationships',
      description: 'Develop cultural competence and adaptability through diverse client scenarios so you can foster trust and rapport from the very first moment.',
      color: 'bg-secondary-light/20',
      href: '/features#practice-greenhouse'
    },
    {
      id: 3,
      icon: <Users className="w-12 h-12" style={{ color: '#10a6bf' }} />,
      title: 'Measured Skill Mastery',
      description: 'Track your development with performance analytics dashboards, then share clear growth reports with faculty, supervisors, and potential employers.',
      color: 'bg-secondary-light/20',
      href: '/features#community-grove'
    }
  ];

  const additionalFeatures = [
    {
      icon: <BookOpen className="w-8 h-8" style={{ color: '#10a6bf' }} />,
      title: 'Evidence-Based Resources',
      description: 'Access a comprehensive library of therapeutic techniques and research.'
    },
    {
      icon: <Heart className="w-8 h-8" style={{ color: '#10a6bf' }} />,
      title: 'Self-Care Tools',
      description: 'Built-in resources to maintain your own wellbeing while helping others.'
    },
    {
      icon: <LineChart className="w-8 h-8" style={{ color: '#10a6bf' }} />,
      title: 'Progress Analytics',
      description: 'Track your development with detailed analytics and insights.'
    },
    {
      icon: <Shield className="w-8 h-8" style={{ color: '#10a6bf' }} />,
      title: 'Ethical Framework',
      description: 'Integrated ethical guidelines and decision-making support.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-nunito text-4xl md:text-5xl font-bold mb-6">
              Features that Nurture Growth
            </h1>
            <p className="text-lg text-primary mb-8">
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
                  <p className="text-primary mb-6 flex-grow">{feature.description}</p>
                  <a 
                    href={feature.href}
                    className="inline-flex items-center text-secondary font-semibold hover:text-secondary-dark transition-colors group"
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
      <section className="py-20 bg-secondary-light/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-nunito text-3xl font-bold mb-4">Additional Tools for Success</h2>
            <p className="text-primary">Supporting features to enhance your learning experience</p>
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
                <div className="w-12 h-12 rounded-full bg-secondary-light/20 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-nunito text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-primary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/80 to-primary-dark/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-nunito text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of therapists who are developing their skills naturally in our supportive digital ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Start Free Trial
              </Button>
              <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-secondary hover:text-white">
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