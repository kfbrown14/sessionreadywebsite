import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { throttle } from '../../utils/performance-light';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Preload Early Access page on button hover
  const preloadEarlyAccess = useCallback(() => {
    const EarlyAccess = import('../../pages/EarlyAccess');
  }, []);

  // Memoize nav items to prevent recreation
  const navItems = useMemo(() => [
    { label: 'Practice', path: '/practice' },
    { label: 'Why Us', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Contact Us', path: '/contact' },
  ], []);

  // Filter out practice page in production - memoized
  const filteredNavItems = useMemo(() => 
    navItems.filter(item => 
      item.path !== '/practice' || import.meta.env.DEV
    ), [navItems]);

  // Throttle scroll handler for better performance
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
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

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Memoize the navigation content to prevent unnecessary re-renders
  const navigationContent = useMemo(() => (
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
            loading="eager"
            fetchPriority="high"
          />
          <span className="font-nunito text-xl sm:text-2xl font-bold">Session Ready</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4 max-[480px]:hidden">
          <div className="flex items-center gap-6">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-semibold text-primary hover:text-secondary transition-colors duration-300 text-base"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link 
              to="/early-access" 
              className="inline-block px-6 py-2 font-semibold text-white bg-primary rounded-full hover:bg-primary-dark hover:shadow-lg transform transition-all duration-200 text-base hover:-translate-y-0.5"
              onMouseEnter={preloadEarlyAccess}
            >
              Get Early Access
            </Link>
          </motion.div>
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
  ), [filteredNavItems, handleMobileMenuClose, handleMobileMenuToggle, isMobileMenuOpen, preloadEarlyAccess]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 bg-neutral-light`}>
        {navigationContent}
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
                  className="block px-6 py-4 text-lg font-semibold text-primary hover:text-secondary hover:bg-sage-light/10 transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-100">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link 
                to="/early-access" 
                onClick={handleMobileMenuClose}
                onMouseEnter={preloadEarlyAccess}
                className="block w-full px-6 py-3 text-center font-semibold text-white bg-primary rounded-full hover:bg-primary-dark hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5"
              >
                Get Early Access
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;