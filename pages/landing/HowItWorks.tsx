import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Sprout, TreeDeciduous, Flower } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Plant Your Seeds',
    description: 'Begin with foundational skills assessment and personalized learning path creation.',
    icon: <Leaf className="w-8 h-8" />,
    color: 'bg-sage-light/20 text-sage'
  },
  {
    number: '02',
    title: 'Nurture Growth',
    description: 'Practice with AI clients, receive immediate feedback, and track your progress.',
    icon: <Sprout className="w-8 h-8" />,
    color: 'bg-lavender-light/20 text-lavender'
  },
  {
    number: '03',
    title: 'Join the Grove',
    description: 'Connect with peers, learn from mentors, and share your unique perspective.',
    icon: <TreeDeciduous className="w-8 h-8" />,
    color: 'bg-earth-light/20 text-earth'
  },
  {
    number: '04',
    title: 'Bloom & Flourish',
    description: 'Achieve certification milestones and prepare for real-world practice.',
    icon: <Flower className="w-8 h-8" />,
    color: 'bg-sage-light/20 text-sage'
  }
];

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-br from-sage-light/10 via-white to-lavender-light/10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-6 text-earth-dark">Your Growth Journey</h2>
          <p className="text-lg text-earth">
            Four natural stages of therapeutic skill development
          </p>
        </motion.div>

        {/* Mobile and Tablet Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-white rounded-xl shadow-soft overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-stretch">
                <div className={`${step.color} w-20 flex items-center justify-center`}>
                  <span className="text-3xl font-bold">{step.number}</span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`${step.color} p-2 rounded-lg`}>
                      {step.icon}
                    </div>
                    <h3 className="font-secondary text-xl font-bold text-earth-dark">{step.title}</h3>
                  </div>
                  <p className="text-earth">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-sage-light/30"></div>
            
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Step number circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-white rounded-full shadow-medium flex items-center justify-center border-4 border-sage-light relative z-10">
                      <span className="text-2xl font-bold text-sage">{step.number}</span>
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className="bg-white rounded-lg shadow-soft p-6 text-center">
                    <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {step.icon}
                    </div>
                    <h3 className="font-secondary text-xl font-bold mb-3 text-earth-dark">{step.title}</h3>
                    <p className="text-earth text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;