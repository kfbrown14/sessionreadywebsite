import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Practice', path: '/practice' },
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Community', path: '/community' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 
      ${isScrolled ? 'bg-white shadow-soft' : 'bg-white/90 backdrop-blur-sm shadow-sm'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sage-dark hover:text-sage">
            <Leaf size={28} className="text-sage" />
            <span className="font-secondary text-xl font-bold">Session Ready</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-medium text-gray-700 hover:text-sage transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <Link 
              to="/practice" 
              className="px-4 py-2 font-medium text-white bg-sage rounded-full hover:bg-sage-dark transition-all"
            >
              Start Practice
            </Link>
          </div>

          {/* Mobile Menu */}
          {isMobileOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-6 rounded-b-lg">
              <div className="flex flex-col items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="font-medium text-gray-700 hover:text-sage transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link 
                  to="/practice" 
                  className="px-4 py-2 font-medium text-white bg-sage rounded-full hover:bg-sage-dark transition-all mt-2"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Start Practice
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation"
          >
            <div className="space-y-1">
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${isMobileOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${isMobileOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${isMobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;