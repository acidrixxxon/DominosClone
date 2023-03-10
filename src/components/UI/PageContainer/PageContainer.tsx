import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

interface ComponentProps {
  children: React.ReactNode;
  className: string;
  id?: string;
  style?: any;
}

const PageContainer: React.FC<ComponentProps> = ({ children, className, id, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'linear', duration: 0.3 }}
      id={id}
      style={style}
      className={classNames('page-container', { [className]: className })}>
      {children}
    </motion.div>
  );
};

export default PageContainer;
