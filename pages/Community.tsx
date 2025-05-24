import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, MessageCircle, Calendar, BookOpen, Heart, Award, Sprout, Coffee } from 'lucide-react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const Community = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Peer Support Groups',
      description: 'Connect with fellow therapists in training through structured support circles.'
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Mentorship Program',
      description: 'Learn from experienced practitioners through our mentorship matching system.'
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: 'Events & Workshops',
      description: 'Participate in regular virtual events, workshops, and skill-building sessions.'
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Resource Library',
      description: 'Access shared resources, case studies, and best practices from the community.'
    }
  ];

  const activities = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Support Circles',
      description: 'Weekly peer groups focused on specific therapeutic approaches or client populations.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Skill Shares',
      description: 'Monthly sessions where members share specialized techniques and insights.'
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: 'Growth Groups',
      description: 'Structured personal development programs for therapists in training.'
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: 'Virtual Coffee Chats',
      description: 'Informal networking and connection opportunities with peers.'
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
              <h1 className="font-nunito text-4xl md:text-5xl font-bold mb-6">
                Join Our Thriving Community
              </h1>
              <p className="text-lg text-earth mb-8">
                Connect, learn, and grow with fellow therapists in a supportive environment designed for meaningful collaboration and professional development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg">Join Community</Button>
                <Button variant="secondary" size="lg">Explore Events</Button>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Therapy Grove community members collaborating"
                className="rounded-2xl shadow-medium w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-nunito text-3xl font-bold mb-4">
              Community Features
            </h2>
            <p className="text-earth">
              Everything you need to connect and grow with fellow practitioners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <h3 className="font-nunito text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-earth">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 bg-sage-light/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-nunito text-3xl font-bold mb-4">
              Community Activities
            </h2>
            <p className="text-earth">
              Regular events and activities to keep you engaged and growing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                className="bg-white rounded-lg p-6 text-center shadow-soft hover:shadow-medium transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mx-auto mb-4">
                  {activity.icon}
                </div>
                <h3 className="font-nunito text-xl font-bold mb-2">{activity.title}</h3>
                <p className="text-earth">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-sage-light/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt="Community Member"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <blockquote className="text-earth mb-4">
                    "The support I've received from this community has been invaluable. 
                    It's amazing to connect with others who understand exactly what you're 
                    going through."
                  </blockquote>
                  <cite className="block font-semibold text-storm">
                    Sarah Johnson
                  </cite>
                  <span className="text-earth text-sm">
                    Third-year Graduate Student
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-sage-light/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Community Member"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <blockquote className="text-earth mb-4">
                    "The mentorship program connected me with an experienced therapist 
                    who has helped guide my professional development in ways I never 
                    expected."
                  </blockquote>
                  <cite className="block font-semibold text-storm">
                    Michael Chen
                  </cite>
                  <span className="text-earth text-sm">
                    Recent Graduate
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
            <h2 className="font-nunito text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Connect with fellow therapists and start your journey of growth together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Join Now
              </Button>
              <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-primary-light hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;