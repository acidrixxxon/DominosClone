import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import Container from '@/components/UI/Container/Container';

import styles from './PageWrapper.module.scss';

interface ComponentProps {
  children: React.ReactNode;
  className: string;
  id?: string;
  style?: any;
}

const PageWrapper: React.FC<ComponentProps> = ({ children, className, id, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'linear', duration: 0.3 }}
      id={id}
      style={style}
      className={classNames([styles.pageWrapper, { [className]: className }])}>
      <Container>{children}</Container>
    </motion.div>
  );
};

export default PageWrapper;
