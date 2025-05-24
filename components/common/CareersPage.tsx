import Navigation from './Navigation';
import Footer from './Footer';
import Button from './Button';

const CareersPage = () => (
  <div className="min-h-screen">
    <Navigation />
    <div className="pt-32 pb-20 bg-gradient-to-br from-sage-light/20 to-lavender-light/30">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-nunito text-4xl md:text-5xl font-bold mb-6">Careers</h1>
        <p className="text-lg text-earth mb-8">Does our mission align with your values? Message us on LinkedIn! We'd love to chat!</p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => window.open('https://www.linkedin.com/in/kelsey-brown-coleman/', '_blank')}
        >
          Connect on LinkedIn
        </Button>
      </div>
    </div>
    <Footer />
  </div>
);

export default CareersPage; 