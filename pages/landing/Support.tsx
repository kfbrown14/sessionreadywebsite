import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';

const Support = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const channels = [
    {
      icon: <HelpCircle className="w-12 h-12" />,
      title: 'Help Center',
      description: 'Find answers to common questions in our knowledge base.'
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Live Chat',
      description: 'Get immediate assistance from our support team.'
    },
    {
      icon: <Phone className="w-12 h-12" />,
      title: 'Phone Support',
      description: 'Speak directly with a support representative.'
    },
    {
      icon: <Mail className="w-12 h-12" />,
      title: 'Email Support',
      description: 'Send us your questions and get detailed responses.'
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
              We're Here to Help
            </h1>
            <p className="text-lg text-earth mb-8">
              Get the support you need through our various assistance channels. 
              Our team is ready to help you succeed.
            </p>
            <Button variant="primary" size="lg">Contact Support</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mb-6">
                  {channel.icon}
                </div>
                <h3 className="font-secondary text-xl font-bold mb-3">{channel.title}</h3>
                <p className="text-earth">{channel.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;