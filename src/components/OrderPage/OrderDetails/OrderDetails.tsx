import { motion } from 'framer-motion';
import React from 'react';

import styles from './OrderDetails.module.scss';

const OrderDetails = () => {
  return (
    <motion.div className={styles.orderDetails} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={styles.orderDetails__heading}>Замовлення</div>
    </motion.div>
  );
};

export default OrderDetails;
