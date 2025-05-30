import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Optimized animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.04
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const Vision = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px'
  });

  return (
    <section 
      className="py-24 bg-sage-light/10" 
      ref={ref}
      aria-labelledby="vision-title"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          {...fadeInUp}
          animate={inView ? fadeInUp.animate : fadeInUp.initial}
        >
          <h2 id="vision-title" className="font-nunito text-3xl md:text-4xl font-bold">Why We Built Session Ready</h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14"
            variants={staggerContainer}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            <motion.div
              className="bg-white p-8 md:p-10 rounded-lg shadow-soft md:col-span-1 hover:shadow-lg transition-shadow duration-200"
              variants={cardVariants}
              role="article"
              aria-labelledby="problem-title"
            >
              <h3 id="problem-title" className="text-xl font-bold mb-6 text-sage text-center">Clinical Training Isn't Realistic</h3>
              <p className="font-primary text-earth leading-relaxed">
                Challenges abound: students do short role-plays with emotionally attuned peers, case studies prioritize theory, and faculty are stretched thin with too many learners for deep feedback; even seasoned therapists lack a safe space to practice new modalities.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 md:p-10 rounded-lg shadow-soft md:col-span-1 hover:shadow-lg transition-shadow duration-200"
              variants={cardVariants}
              role="article"
              aria-labelledby="gap-title"
            >
              <h3 id="gap-title" className="text-xl font-bold mb-6 text-sage text-center">Practitioners Feel Unprepared</h3>
              <p className="font-primary text-earth leading-relaxed">
                Without realistic, full-length simulations and personalized insights, students leave programs uncertain, underprepared, and without clear metrics to demonstrate clinical competence.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 md:p-10 rounded-lg shadow-soft md:col-span-2 lg:col-span-1 hover:shadow-lg transition-shadow duration-200"
              variants={cardVariants}
              role="article"
              aria-labelledby="solution-title"
            >
              <h3 id="solution-title" className="text-xl font-bold mb-6 text-sage text-center">Real Training for Real Therapy</h3>
              <p className="font-primary text-earth leading-relaxed">
                Session Ready is the premier AI-powered training platform offering full-session simulations with diverse client personas and adaptive detours. With real-time feedback and detailed performance analytics, trainees build practical counseling skills and confidence before ever seeing real clients.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Vision; 