import { motion } from 'framer-motion';
import React from 'react';

interface ComponentsProps {
  className?: string;
  initial?: {};
  animate?: {};
  exit?: {} | 'none';
  children: React.ReactNode;
  onClick?: (e: any) => void;
  key?: string;
}

const MotionTr: React.FC<ComponentsProps> = ({ className, initial, animate, exit, children, onClick, key }) => {
  return (
    <motion.tr
      key={key}
      onClick={onClick}
      className={className && className}
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, ...animate }}
      exit={exit == 'none' ? {} : { opacity: 0, ...exit }}>
      {children}
    </motion.tr>
  );
};

export default MotionTr;
