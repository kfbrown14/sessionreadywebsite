import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Settings, Target, Play, MessageSquare, BarChart3 } from 'lucide-react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Instant Personalization',
      description: 'Sign up quickly, choose from diverse client profiles and issues (anxiety, depression, relationship issues), and select the evidence-based techniques you want to practice (CBT, EFT, Solution Focused).',
      bgColor: 'bg-sage-light/10',
      iconColor: 'text-secondary-light'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Focused Skill Drills',
      description: 'Hone essential techniques such as active listening, reflection of feeling & meaning, confidentiality limits, minimal encouragers, challenging, plus perfecting session openings and closings.',
      bgColor: 'bg-lavender-light/10',
      iconColor: 'text-secondary-light'
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: 'Realistic Simulations',
      description: 'Enter comprehensive, timed role-plays that mimic a real 50+ minute session, from introductions and pacing to wrap-up, complete with client detours to sharpen your adaptability skills.',
      bgColor: 'bg-earth-light/10',
      iconColor: 'text-secondary-light'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Expert & Peer Feedback',
      description: 'Receive real-time, modality-specific insights on your core therapeutic skills from our tool and collaborate with professors, supervisors, and peers to continuously refine your practice.',
      bgColor: 'bg-sage-light/10',
      iconColor: 'text-secondary-light'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Progress Dashboards & Milestones',
      description: 'Track your growth with interactive dashboards that visualize your session metrics, celebrate milestone badges as you master new skills, and export detailed progress reports for instructors and supervisors.',
      bgColor: 'bg-lavender-light/10',
      iconColor: 'text-secondary-light'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-mist">
      <Navigation />
      
      {/* Features Section */}
      <section className="pt-24 pb-16 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
            animate={inView ? fadeInUp.animate : fadeInUp.initial}
          >
            <h2 className="font-nunito text-2xl md:text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-earth max-w-2xl mx-auto">Comprehensive tools for therapeutic skill development, practice, and progress tracking.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={index === 4 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <div className={`${feature.bgColor} p-4 rounded-xl inline-flex mb-6`}>
                    <div className={feature.iconColor}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-nunito text-xl font-bold mb-4 text-sage">{feature.title}</h3>
                  <p className="font-primary text-earth leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-sage/80 to-sage-dark/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-nunito text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience Session Ready?
            </h2>
            <p className="font-primary text-base mb-6 opacity-90">
              Join thousands of therapists developing their skills in our supportive digital ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => window.location.href = '/early-access'}>Start Free Trial</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;