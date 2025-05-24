import Navigation from './Navigation';
import Footer from './Footer';
import Button from './Button';

const UniversitiesPage = () => (
  <div className="min-h-screen">
    <Navigation />
    <div className="pt-32 pb-20 bg-gradient-to-br from-sage-light/20 to-lavender-light/30">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-nunito text-4xl md:text-5xl font-bold mb-6">For Universities</h1>
        <p className="text-lg text-earth max-w-4xl mx-auto mb-8">Are you an academic administrator or faculty member looking to elevate your counseling, psychology, or social work programs? Discover how Session Ready can strengthen your curriculum with AI-driven, full-length simulations, personalized feedback, and comprehensive analytics.</p>
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

export default UniversitiesPage; 