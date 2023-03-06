import { motion } from 'framer-motion';
import React from 'react';

const DineInDetailsForm = () => {
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}>
      DineInDetailsForm
    </motion.div>
  );
};

export default DineInDetailsForm;
