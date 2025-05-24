import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const baseClasses = "font-primary font-semibold rounded-full transition-all inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: `bg-primary text-white hover:bg-primary-dark shadow-soft hover:shadow-medium ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    secondary: `bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;