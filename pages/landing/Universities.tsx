import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Users, LineChart, Shield, BookOpen, Award, Clock, Zap } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';

const Universities = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const benefits = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: 'Enhanced Learning Outcomes',
      description: 'Improve student competency and confidence through structured, hands-on practice.'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Reduced Faculty Workload',
      description: 'Automated progress tracking and AI-assisted feedback reduce administrative burden.'
    },
    {
      icon: <LineChart className="w-12 h-12" />,
      title: 'Data-Driven Insights',
      description: 'Comprehensive analytics on student progress and program effectiveness.'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Risk Management',
      description: 'Safe practice environment with built-in ethical guidelines and supervision tools.'
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Customizable Curriculum',
      description: 'Integrate with your existing program and learning objectives.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Competency Tracking',
      description: 'Monitor student progress across core therapeutic competencies.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Flexible Implementation',
      description: 'Use as a standalone tool or integrate with your LMS.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Immediate Deployment',
      description: 'Quick setup with comprehensive onboarding support.'
    }
  ];

  return (
    <div className="min-h-screen bg-mist">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage-light/50 via-lavender-light to-earth-light/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-secondary text-4xl md:text-5xl font-bold mb-6">
                Transform Your Counseling Program
              </h1>
              <p className="text-lg text-earth mb-8">
                Provide your students with cutting-edge training tools that prepare them for real-world practice while reducing faculty workload.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg">Schedule Demo</Button>
                <Button variant="secondary" size="lg">Download Brochure</Button>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg"
                alt="University students in a counseling session"
                className="rounded-2xl shadow-medium w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-secondary text-3xl font-bold mb-4">
              Benefits for Your Institution
            </h2>
            <p className="text-earth">
              Discover how Therapy Grove enhances your counseling program
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="font-secondary text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-earth">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-sage-light/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-secondary text-3xl font-bold mb-4">
              Platform Features
            </h2>
            <p className="text-earth">
              Everything you need to enhance your counseling program
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
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

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-sage-light/10 rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img 
                  src="https://images.pexels.com/photos/7647920/pexels-photo-7647920.jpeg"
                  alt="Dr. Sarah Chen"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div>
                  <blockquote className="text-xl text-earth mb-6">
                    "Therapy Grove has transformed how we prepare our counseling students. 
                    The platform's innovative approach to skill development and the reduction 
                    in administrative workload has been invaluable for our program."
                  </blockquote>
                  <cite className="block font-semibold text-storm">
                    Dr. Sarah Chen
                  </cite>
                  <span className="text-earth">
                    Program Director, Clinical Mental Health Counseling
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sage/80 to-sage-dark/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Program?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join leading institutions in revolutionizing counselor education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Schedule Demo
              </Button>
              <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-primary-light hover:text-white">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Universities;