import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import kelseyWaterfallImage from '../components/public/kelsey-waterfall.jpeg?url';

const About = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [visionRef, visionInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const timeline = [
    {
      year: '2012-2020',
      title: 'Corporate Foundations',
      description: 'Product Development Manager at Walmart, leading international teams',
      icon: '💼'
    },
    {
      year: '2020-2022',
      title: 'Tech Leadership',
      description: 'Director of Product at Ox, building SaaS solutions',
      icon: '🚀'
    },
    {
      year: '2022',
      title: 'The Pivot',
      description: 'Founded Willow Consulting, supporting visionaries in transformation',
      icon: '🌱'
    },
    {
      year: '2023-Present',
      title: 'Clinical Journey',
      description: "Master's in Clinical Mental Health at William & Mary",
      icon: '🌸'
    },
    {
      year: '2024',
      title: 'Therapy Grove',
      description: 'Merging tech expertise with clinical training to revolutionize therapist education',
      icon: '🌳'
    }
  ];

  const values = [
    {
      icon: '🌿',
      title: 'Natural Growth',
      description: 'Every therapist develops at their own pace, like trees in a forest'
    },
    {
      icon: '🤝',
      title: 'Community Support',
      description: 'Learning thrives in connected ecosystems, not isolation'
    },
    {
      icon: '🎨',
      title: 'Creative Expression',
      description: 'Integrating arts and nature into healing practices'
    },
    {
      icon: '🔄',
      title: 'Sustainable Practice',
      description: 'Building resilience to prevent burnout before it starts'
    }
  ];

  return (
    <div className="min-h-screen bg-mist">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage-light/50 via-lavender-light to-earth-light/30">
        <div className="container mx-auto px-4" ref={heroRef}>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-secondary text-4xl md:text-5xl font-bold mb-6">
                From Tech to Therapy:<br />
                <span className="text-sage">A Journey of Growth</span>
              </h1>
              <p className="text-lg text-earth mb-8">
                Hi, I'm Kelsey Brown Coleman—a product leader turned therapist, bridging 
                the worlds of technology and mental health to create something truly transformative.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-bold text-sage">10+</span>
                  <span className="text-sm text-earth">Years in Tech</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-bold text-sage">500+</span>
                  <span className="text-sm text-earth">Products Shipped</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-bold text-sage">1</span>
                  <span className="text-sm text-earth">Mission</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <img 
                  src={kelseyWaterfallImage}
                  alt="Kelsey Brown Coleman at a waterfall"
                  className="rounded-2xl shadow-medium w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-sage/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-secondary text-3xl font-bold mb-4">The Journey</h2>
            <p className="text-earth">From corporate boardrooms to counseling rooms</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="flex items-start gap-6 mb-12 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-sage-light/20 rounded-full flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <span className="text-sage font-semibold">{item.year}</span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-earth">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-sage-light/10" ref={visionRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-secondary text-3xl font-bold mb-4">The Vision</h2>
            <p className="text-earth">Building a better future for mental health education</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-sage">The Problem I Saw</h3>
              <p className="text-earth">
                In my corporate years, I watched brilliant professionals struggle with burnout, 
                perfectionism, and anxiety. When I entered the mental health field, I realized 
                therapists face the same challenges—but with even less support.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-sage">The Gap I Found</h3>
              <p className="text-earth">
                Traditional therapist training doesn't prepare students for the realities of 
                modern practice—especially when working with high-achieving clients who mirror 
                their own perfectionist tendencies.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4 text-sage">The Solution I'm Building</h3>
              <p className="text-earth">
                Therapy Grove combines my tech expertise with clinical training to create the 
                first platform that teaches therapists not just skills, but sustainable practice 
                methods that prevent burnout before it starts.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white" ref={valuesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-secondary text-3xl font-bold mb-4">Core Values</h2>
            <p className="text-earth">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-sage-light/10 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-earth">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sage/80 to-sage-dark/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-6">
              Let's Grow Together
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Whether you're a student looking to develop your skills, a university seeking 
              innovative training solutions, or someone who shares our vision for the future 
              of mental health—I'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-sage"
              >
                Get in Touch
              </Button>
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-white text-sage hover:bg-sage-light hover:text-white"
                onClick={() => window.open('https://www.linkedin.com/in/kelsey-brown-coleman/', '_blank')}
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