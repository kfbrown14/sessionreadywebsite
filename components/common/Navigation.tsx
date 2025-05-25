import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'Practice', path: '/practice' },
    { label: 'Why Us', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Contact Us', path: '/contact' },
  ];

  // Filter out practice page in production
  const filteredNavItems = navItems.filter(item => 
    item.path !== '/practice' || import.meta.env.DEV
  );

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 
        ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm shadow-sm'}`}>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 text-primary-dark hover:text-primary transition-colors duration-200"
              onClick={handleMobileMenuClose}
            >
              <img 
                src="/Session Ready Logo Therapy Training Tool.png" 
                alt="Session Ready Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-nunito text-xl sm:text-2xl font-bold">Session Ready</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-4 max-[480px]:hidden">
              <div className="flex items-center gap-4">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="font-medium text-primary hover:text-secondary transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <Link 
                to="/early-access" 
                className="px-4 py-2 font-medium text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-200 text-sm"
              >
                Get Early Access
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="hidden max-[480px]:block p-2 text-primary hover:text-secondary transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 min-[480px]:hidden"
          onClick={handleMobileMenuClose}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out min-[480px]:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="font-nunito text-xl font-bold text-primary">Menu</span>
            <button
              onClick={handleMobileMenuClose}
              className="p-2 text-primary hover:text-secondary transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 py-6">
            <div className="space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  className="block px-6 py-4 text-lg font-medium text-primary hover:text-secondary hover:bg-sage-light/10 transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-100">
            <Link 
              to="/early-access" 
              onClick={handleMobileMenuClose}
              className="block w-full px-6 py-3 text-center font-medium text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-200"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;