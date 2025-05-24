// Testimonials component - temporarily disabled
const Testimonials = () => {
  // Commenting out Voices from the Grove section - keeping for later use
  return null;
  
  /*
  import { motion } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';
  import { Quote } from 'lucide-react';

  const testimonials = [
    {
      id: 1,
      quote: "The Skill Garden approach transformed my confidence as a therapist. The AI client simulations felt incredibly realistic and prepared me for real-world scenarios.",
      name: "Dr. Sarah Johnson",
      role: "Clinical Psychologist",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 2,
      quote: "As a professor, I've seen my students flourish using Therapy Grove. The platform's organic learning methodology aligns perfectly with how skills naturally develop.",
      name: "Prof. Michael Chen",
      role: "University Program Director",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 3,
      quote: "The Community Grove connected me with mentors who guided my development. I'm now part of a thriving network of supportive professionals.",
      name: "Emma Rodriguez",
      role: "Marriage & Family Therapist",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-nunito text-3xl md:text-4xl font-bold mb-6">Voices from the Grove</h2>
          <p className="text-lg text-earth">
            Hear from therapists and educators who've flourished on our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-soft p-6 border border-sage-light/30 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-sage-light/50" />
              <p className="text-earth mb-6 relative z-10">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-storm">{testimonial.name}</h4>
                  <p className="text-sm text-earth">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
  */
};

export default Testimonials;