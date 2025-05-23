import Navigation from '../components/common/Navigation';
import Hero from './landing/Hero';
import FeaturesSection from './landing/FeaturesSection';
import HowItWorks from './landing/HowItWorks';
import Testimonials from './landing/Testimonials';
import CTA from './landing/CTA';
import Footer from '../components/common/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
} 