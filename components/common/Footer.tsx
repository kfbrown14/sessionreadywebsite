import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-light pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 text-primary-dark mb-4">
              <img 
                src="/Session Ready Logo Therapy Training Tool.png" 
                alt="Session Ready Logo" 
                className="w-6 h-6 object-contain"
              />
              <span className="font-nunito text-xl font-bold">Session Ready</span>
            </Link>
            <p className="text-primary mb-6 max-w-xs">
              Our mission is to empower therapists to provide transformative care through authentic, skill focused practice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-secondary transition-colors hidden" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary hover:text-secondary transition-colors hidden" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary hover:text-secondary transition-colors hidden" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/kelsey-brown-coleman/" className="text-primary hover:text-secondary transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-nunito text-lg font-bold mb-4 text-primary-dark">Therapy Training Tool</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="font-medium text-primary hover:text-secondary transition-colors duration-300">Features</Link></li>
              {/* <li><Link to="/how-it-works" className="text-primary hover:text-secondary transition-colors">How It Works</Link></li> */}
              {/* <li><Link to="/pricing" className="text-primary hover:text-secondary transition-colors">Pricing</Link></li> */}
              {/* <li><Link to="/universities" className="text-primary hover:text-secondary transition-colors">For Universities</Link></li> */}
            </ul>
          </div>

          {/* Resources section - commented out for later use
          <div>
            <h3 className="font-nunito text-lg font-bold mb-4 text-primary-dark">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-primary hover:text-secondary transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-primary hover:text-secondary transition-colors">Guides</Link></li>
              <li><Link to="/support" className="text-primary hover:text-secondary transition-colors">Support</Link></li>
              <li><Link to="/community" className="text-primary hover:text-secondary transition-colors">Community</Link></li> - Commented out - saving for later
            </ul>
          </div>
          */}

          <div>
            <h3 className="font-nunito text-lg font-bold mb-4 text-primary-dark">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-primary hover:text-secondary transition-colors">Why Us</Link></li>
              <li><Link to="/careers" className="text-primary hover:text-secondary transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-primary hover:text-secondary transition-colors">Contact</Link></li>
              {/* <li><Link to="/privacy" className="text-primary hover:text-secondary transition-colors">Privacy</Link></li> */}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-primary/20">
          <p className="text-primary text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Session Ready. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-primary text-sm hover:text-secondary transition-colors">Terms of Service</Link>
            {/* <Link to="/privacy" className="text-primary text-sm hover:text-secondary transition-colors">Privacy Policy</Link> */}
            <Link to="/cookies" className="text-primary text-sm hover:text-secondary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;