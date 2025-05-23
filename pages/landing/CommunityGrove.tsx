import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, MessageCircle, Calendar, BookOpen } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';

const CommunityGrove = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Peer Support Groups',
      description: 'Connect with fellow therapists in structured support circles.'
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Mentorship Program',
      description: 'Learn from experienced practitioners through our matching system.'
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: 'Events & Workshops',
      description: 'Participate in regular virtual events and skill-building sessions.'
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Resource Library',
      description: 'Access shared resources and best practices from the community.'
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
              Join Our Supportive Community
            </h1>
            <p className="text-lg text-earth mb-8">
              Connect with peers, learn from mentors, and share experiences in a 
              nurturing environment designed for therapist growth.
            </p>
            <Button variant="primary" size="lg">Join the Community</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-secondary text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-earth">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityGrove;