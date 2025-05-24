import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Practice', path: '/practice' },
    { label: 'Why Us', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 
      ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-primary-dark hover:text-primary transition-colors duration-200">
            <img 
              src="/Session Ready Logo Therapy Training Tool.png" 
              alt="Session Ready Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-nunito text-2xl font-bold">Session Ready</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-medium text-primary hover:text-secondary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <Link 
              to="/early-access" 
              className="px-6 py-2 font-medium text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-200"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;