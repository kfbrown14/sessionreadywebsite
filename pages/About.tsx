import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { useMemo, memo, useCallback } from 'react';

// Optimized animation variants - reduced complexity
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

// Memoized component for value cards to prevent unnecessary re-renders
const ValueCard = memo(({ value, variants }: { value: any, variants: any }) => (
  <motion.div
    className="bg-white p-8 rounded-xl shadow-lg border border-sage-light/20 hover:shadow-xl transition-shadow duration-200"
    variants={variants}
  >
    <h3 className="text-xl font-bold mb-6 text-sage border-b border-sage-light/30 pb-3 text-center">{value.title}</h3>
    <div className="mb-6">
      <p className="font-primary text-sm font-semibold text-sage/70 mb-3 uppercase tracking-wide">Every decision asks...</p>
      <p className="font-primary text-earth italic text-base leading-relaxed">"{value.question}"</p>
    </div>
    <div>
      <p className="font-primary text-sm font-semibold text-sage/70 mb-3 uppercase tracking-wide">We embody...</p>
      <p className="font-primary text-sage font-medium text-lg">{value.qualities}</p>
    </div>
  </motion.div>
));

// Memoized story card component
const StoryCard = memo(({ title, children, variants }: { title: string, children: React.ReactNode, variants: any }) => (
  <motion.div
    className="bg-sage-light/10 p-10 rounded-lg shadow-soft"
    variants={variants}
  >
    <h3 className="text-2xl font-bold mb-6 text-sage">{title}</h3>
    {children}
  </motion.div>
));

const About = () => {
  // Optimized intersection observer - single observer with higher threshold
  const [pageRef, pageInView] = useInView({ 
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px'
  });

  // Memoized values to prevent recreation on every render
  const values = useMemo(() => [
    {
      title: 'Learner Centered',
      question: 'Does this enhance learner confidence and competence?',
      qualities: 'empathy · empowerment · relevance'
    },
    {
      title: 'Culturally Competent',
      question: 'Does this support inclusive, culturally responsive practice?',
      qualities: 'diversity · inclusion'
    },
    {
      title: 'Innovative Impact',
      question: 'Is this pushing technology to better prepare therapists?',
      qualities: 'creativity · innovation · progress'
    },
    {
      title: 'Evidence Based',
      question: 'Is this grounded in proven clinical methods?',
      qualities: 'rigor · integrity · excellence'
    },
    {
      title: 'Collaborative Growth',
      question: 'Does this foster meaningful feedback and a supportive community?',
      qualities: 'collaboration · openness · trust'
    },
    {
      title: 'Lifelong Development',
      question: 'Are we encouraging curiosity and ongoing professional growth?',
      qualities: 'learning · adaptability · curiosity'
    }
  ], []);

  const handleLinkedInClick = useCallback(() => {
    window.open('https://www.linkedin.com/in/kelsey-brown-coleman/', '_blank');
  }, []);

  return (
    <div className="min-h-screen bg-mist" ref={pageRef}>
      <Navigation />
      
      {/* Vision Section */}
      <section className="pt-32 pb-20 bg-sage-light/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUp}
            animate={pageInView ? fadeInUp.animate : fadeInUp.initial}
          >
            <h2 className="font-nunito text-3xl font-bold mb-4">What Inspired Our Vision</h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
              variants={staggerContainer}
              initial="initial"
              animate={pageInView ? "animate" : "initial"}
            >
              <motion.div
                className="bg-white p-8 rounded-lg shadow-soft md:col-span-1"
                variants={cardVariants}
              >
                <h3 className="text-xl font-bold mb-4 text-sage text-center">The Problem</h3>
                <p className="font-primary text-earth leading-relaxed">
                  Traditional clinical training falls short: students role-play with peers who are emotionally attuned, case studies focus on theory, and practice sessions are too short, all while faculty juggle too many learners to provide deep, meaningful feedback.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-lg shadow-soft md:col-span-1"
                variants={cardVariants}
              >
                <h3 className="text-xl font-bold mb-4 text-sage text-center">The Gap</h3>
                <p className="font-primary text-earth leading-relaxed">
                  Without realistic, full-length simulations and personalized insights, students leave programs uncertain, underprepared, and without clear metrics to demonstrate clinical competence.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-lg shadow-soft md:col-span-2 lg:col-span-1"
                variants={cardVariants}
              >
                <h3 className="text-xl font-bold mb-4 text-sage text-center">Our Solution</h3>
                <p className="font-primary text-earth leading-relaxed">
                  Session Ready is the premier AI-powered training platform offering full-session simulations with diverse client personas and adaptive detours. With real-time feedback and detailed performance analytics, trainees build practical counseling skills and confidence before ever seeing real clients.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Text Content */}
              <div>
                <motion.div 
                  className="mb-16"
                  {...fadeInUp}
                  animate={pageInView ? fadeInUp.animate : fadeInUp.initial}
                >
                  <h2 className="font-nunito text-3xl font-bold mb-4 text-left">Founder's Story</h2>
                </motion.div>

                <motion.div 
                  className="space-y-12"
                  variants={staggerContainer}
                  initial="initial"
                  animate={pageInView ? "animate" : "initial"}
                >
                  <StoryCard title="Why I Started Session Ready" variants={cardVariants}>
                    <p className="font-primary text-earth leading-relaxed text-lg">
                      I was deeply grateful for my graduate program. It laid a solid foundation in theory and skill, but I often found myself wishing for more realistic practice. Traditional role-plays and case studies just couldn't replicate the nuanced challenges of a full clinical session. Let's face it, the moment you get in front of a client recounting trauma or at risk of self-harm, it can be incredibly daunting. I saw my classmates and I grappling with uncertainty as we stepped into real therapy rooms, worried we weren't fully prepared.
                    </p>
                  </StoryCard>

                  <StoryCard title="How We Built It" variants={cardVariants}>
                    <p className="font-primary text-earth leading-relaxed text-lg">
                      For the first 14+ years of my career, I worked in technology and product innovation. But once I started training as a future therapist, I knew I had to combine my clinical training with my innovative approach to technology. I set out to create the tools I always wished I had access to during my training. By harnessing AI-driven simulations, adaptive scenarios, and real-time insights, I crafted a platform that offers focused, repeatable practice. We mirror the full arc of a 50+ minute session and deliver feedback that transforms students into skilled practitioners.
                    </p>
                  </StoryCard>

                  <StoryCard title="What We Believe" variants={cardVariants}>
                    <p className="font-primary text-earth leading-relaxed text-lg">
                      Every client deserves skilled, compassionate, and culturally competent care. At Session Ready, our mission is to empower therapists to provide transformative care through authentic, skill-focused practice. We're committed to ensuring every graduate enters their first session confident, competent, and ready to make a lasting impact on the lives of the people they serve.
                    </p>
                  </StoryCard>
                </motion.div>
              </div>

              {/* Right Column - Image */}
              <motion.div 
                className="relative lg:sticky lg:top-32"
                {...fadeInUp}
                animate={pageInView ? fadeInUp.animate : fadeInUp.initial}
              >
                <div className="relative">
                  <img 
                    src="/Kelsey waterfall therapy.jpeg" 
                    alt="Kelsey, founder of Session Ready, in a natural outdoor setting"
                    className="w-full h-auto rounded-lg shadow-lg object-cover max-w-md mx-auto lg:mx-0"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-sage/20 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUp}
            animate={pageInView ? fadeInUp.animate : fadeInUp.initial}
          >
            <h2 className="font-nunito text-3xl font-bold mb-4">Core Values</h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate={pageInView ? "animate" : "initial"}
          >
            {values.map((value) => (
              <ValueCard
                key={value.title}
                value={value}
                variants={cardVariants}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-br from-sage/80 to-sage-dark/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-nunito text-3xl md:text-4xl font-bold mb-6">
              Let's Nerd Out Together
            </h2>
            <p className="font-primary text-lg mb-8 opacity-90">
              Whether you're a student looking to develop your skills, a university seeking 
              innovative training solutions, or someone who shares our vision for the future 
              of mental health—I'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleLinkedInClick}
              >
                Connect on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
