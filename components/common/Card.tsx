import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-soft hover:shadow-medium transition-all p-6 ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;