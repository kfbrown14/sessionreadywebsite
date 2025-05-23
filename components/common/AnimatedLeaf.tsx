import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface AnimatedLeafProps {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

const AnimatedLeaf = ({ id, x, y, duration, delay }: AnimatedLeafProps) => {
  const getRandomRotation = () => Math.random() * 360;
  const getRandomScale = () => 0.5 + Math.random() * 0.5;
  
  return (
    <motion.div
      className="absolute z-0 text-sage-light/50"
      initial={{ x, y, rotate: getRandomRotation(), scale: getRandomScale() }}
      animate={{
        y: window.innerHeight + 50,
        rotate: getRandomRotation(),
        scale: getRandomScale(),
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Leaf size={24 + id * 4} />
    </motion.div>
  );
};

export default AnimatedLeaf;