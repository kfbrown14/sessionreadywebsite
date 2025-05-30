import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-light backdrop-blur-sm border-b border-sage-light/20 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/Session Ready Logo Therapy Training Tool.png" 
              alt="Session Ready Logo" 
              className="w-10 h-10 object-contain"
              loading="eager"
              fetchPriority="high"
            />
            <span className="font-nunito text-xl sm:text-2xl font-bold text-primary-dark">Session Ready</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="font-semibold text-primary hover:text-secondary transition-colors duration-300 text-base">Why Us</Link>
            <Link to="/features" className="font-semibold text-primary hover:text-secondary transition-colors duration-300 text-base">Features</Link>
            <Link to="/contact" className="font-semibold text-primary hover:text-secondary transition-colors duration-300 text-base">Contact Us</Link>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => window.location.href = '/early-access'}
              className="px-6 py-2 font-semibold text-white bg-primary rounded-full hover:bg-primary-dark hover:shadow-lg transform transition-all duration-200 text-base hover:-translate-y-0.5"
            >
              Get Early Access
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/about" 
                className="font-semibold text-primary hover:text-secondary transition-colors duration-300 text-base"
                onClick={() => setIsOpen(false)}
              >
                Why Us
              </Link>
              <Link 
                to="/features" 
                className="font-semibold text-primary hover:text-secondary transition-colors duration-300 text-base"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/contact" 
                className="font-semibold text-primary hover:text-secondary transition-colors duration-300 text-base"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Button 
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/early-access';
                }}
                className="w-full px-6 py-2 font-semibold text-white bg-primary rounded-full hover:bg-primary-dark hover:shadow-lg transform transition-all duration-200 text-base hover:-translate-y-0.5"
              >
                Get Early Access
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}