import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sprout, Brain, Target, Award } from 'lucide-react';
import Navigation from '../../components/common/Navigation';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';

const SkillGarden = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skills = [
    {
      icon: <Sprout className="w-12 h-12" />,
      title: 'Core Competencies',
      description: 'Master fundamental therapeutic skills through structured practice.',
      level: 'Beginner'
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'Advanced Techniques',
      description: 'Develop specialized intervention strategies and approaches.',
      level: 'Intermediate'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Clinical Integration',
      description: 'Apply skills in simulated client scenarios and case studies.',
      level: 'Advanced'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Professional Excellence',
      description: 'Refine your practice and develop your unique therapeutic style.',
      level: 'Expert'
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
              Cultivate Your Therapeutic Skills
            </h1>
            <p className="text-lg text-earth mb-8">
              A structured approach to developing your clinical expertise through 
              personalized learning paths and milestone-based progression.
            </p>
            <Button variant="primary" size="lg">Start Your Growth Journey</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="bg-mist rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-sage-light/20 text-sage flex items-center justify-center mb-6">
                  {skill.icon}
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-sage-light/20 text-sage text-sm mb-4">
                  {skill.level}
                </span>
                <h3 className="font-secondary text-xl font-bold mb-3">{skill.title}</h3>
                <p className="text-earth">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillGarden;