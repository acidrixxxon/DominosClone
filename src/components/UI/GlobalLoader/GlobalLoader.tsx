import { useAppSelector } from '@/hooks/useAppSelector';
import { motion } from 'framer-motion';
import React from 'react';

import ReactPortal from '@/components/common/ReactPortal/ReactPortal';

import styles from './GlobalLoader.module.scss';

const GlobalLoader: React.FC = () => {
  return (
    <ReactPortal wrapperId='root'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.loader__overlay}>
        <svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' xmlSpace='preserve'>
          <path
            className={styles.loader__icon}
            style={{
              fill: 'none',
              stroke: '#fff',
              strokeWidth: 4,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            d='
        M116.9,43c-20.8-1.6-17.7-17.3-17.7-17.3s-3.5,3.8-13.7,3.5S75,19,75,19S50.6,24.4,59,11.4c12.2-18.7,55.7-3.8,55.7-3.8
        s42.7,14.6,26.2,33c-12.4,13.8-18.8,2.5-16.4-5.7c3.8-13.2,39.7-7.9,9.6,21.1C97,91.6,60.3,66.7,81,51.8c21.1-15.1,40,8.4,18.1,27
        c-19.5,16.7-21,19.4-24.2,22.3s-6.7-1.9-11.1,1.3s2.2,20-4.1,21.6c-6.4,1.6-1.9-14.3-9.2-15s-3.5,10.8-7.6,11.5s-2.2-3.8-7.6-4.5
        S8.7,138.6,4.9,136.7c-3.8-1.9-6.3-13.6,8.6-41S65.8,69,47.8,88.6C23,115.7,21.2,76.1,32,57.7C42.9,39,72.4,39.5,59.3,52.3
        C43.2,68,40.2,39,56.5,26.7'
          />
        </svg>
      </motion.div>
    </ReactPortal>
  );
};

export default GlobalLoader;
