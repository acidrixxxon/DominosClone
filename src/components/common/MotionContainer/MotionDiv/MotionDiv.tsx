import { motion } from 'framer-motion';
import React from 'react';

interface ComponentsProps {
  className?: string;
  initial?: {};
  animate?: {};
  exit?: {};
  children: React.ReactNode;
}

const MotionDiv: React.FC<ComponentsProps> = ({ className, initial, animate, exit, children }) => {
  return (
    <motion.div
      className={className && className}
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, ...animate }}
      exit={{ opacity: 0, ...exit }}>
      {children}
    </motion.div>
  );
};

export default MotionDiv;
