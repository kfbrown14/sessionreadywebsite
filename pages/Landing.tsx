import Navigation from '../components/common/Navigation';
import Hero from './landing/Hero';
import Vision from './landing/Vision';
import FeaturesSection from './landing/FeaturesSection';
import Testimonials from './landing/Testimonials';
import CTA from './landing/CTA';
import Footer from '../components/common/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral">
      <Navigation />
      <Hero />
      <Vision />
      <FeaturesSection />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
} 