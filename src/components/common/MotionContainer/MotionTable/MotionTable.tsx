import { motion } from 'framer-motion';
import React from 'react';

enum AnimationVariants {
  OPACITY = 'opacity',
  NONE = 'none',
}

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  initial?: {};
  animate?: {};
  exit?: {};
}

const MotionTable: React.FC<ComponentProps> = (props) => {
  const { children, className, initial, animate, exit } = props;

  return (
    <motion.table
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, ...animate }}
      exit={{ opacity: 0, ...exit }}
      className={className}>
      {children}
    </motion.table>
  );
};

export default MotionTable;
