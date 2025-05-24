import Navigation from './Navigation';
import Footer from './Footer';

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage = ({ title }: ComingSoonPageProps) => (
  <div className="min-h-screen">
    <Navigation />
    <div className="pt-32 pb-20 bg-gradient-to-br from-sage-light/20 to-lavender-light/30">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-nunito text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-earth">This page is growing and will bloom soon!</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default ComingSoonPage; 