import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface ComponentProps {
  value: string;
}
const InputError: React.FC<ComponentProps> = ({ value }) => {
  return (
    <AnimatePresence>
      {value && (
        <motion.span
          initial={{ opacity: 0, x: '50%' }}
          animate={{ opacity: 1, x: 0, transition: { opacity: { delay: 0.15 } } }}
          exit={{ opacity: 0, x: '100%', transition: { x: { delay: 0.15 } } }}
          className='formInput__error'>
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default InputError;
