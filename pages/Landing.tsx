import Navigation from '../components/common/Navigation';
import Hero from './landing/Hero';
import FeaturesSection from './landing/FeaturesSection';
import Testimonials from './landing/Testimonials';
import CTA from './landing/CTA';
import Footer from '../components/common/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturesSection />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
} 