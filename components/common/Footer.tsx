import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sage-light/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 text-sage-dark mb-4">
              <Leaf size={24} />
              <span className="font-secondary text-xl font-bold">Session Ready</span>
            </Link>
            <p className="text-earth mb-6 max-w-xs">
              Our mission is to nurture the next generation of therapists through organic growth and authentic practice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sage hover:text-sage-dark transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-sage hover:text-sage-dark transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-sage hover:text-sage-dark transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-sage hover:text-sage-dark transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-secondary text-lg font-bold mb-4 text-earth-dark">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-earth hover:text-sage transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="text-earth hover:text-sage transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="text-earth hover:text-sage transition-colors">Pricing</Link></li>
              <li><Link to="/universities" className="text-earth hover:text-sage transition-colors">For Universities</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-secondary text-lg font-bold mb-4 text-earth-dark">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-earth hover:text-sage transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-earth hover:text-sage transition-colors">Guides</Link></li>
              <li><Link to="/support" className="text-earth hover:text-sage transition-colors">Support</Link></li>
              <li><Link to="/community" className="text-earth hover:text-sage transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-secondary text-lg font-bold mb-4 text-earth-dark">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-earth hover:text-sage transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-earth hover:text-sage transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-earth hover:text-sage transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-earth hover:text-sage transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-sage/20">
          <p className="text-earth text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Session Ready. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-earth text-sm hover:text-sage transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-earth text-sm hover:text-sage transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="text-earth text-sm hover:text-sage transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;