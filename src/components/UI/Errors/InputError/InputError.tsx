import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface ComponentProps {
  value: string;
  type: string;
}
const InputError: React.FC<ComponentProps> = ({ value, type }) => {
  const className = (type: string) => {
    if (type === 'name') return 'formInput__errorName';
    if (type === 'email') return 'formInput__errorEmail';
    if (type === 'phone') return 'formInput__errorPhone';
    if (type === 'street') return 'formInput__errorStreet';
    if (type === 'house') return 'formInput__errorHouse';
  };

  return (
    <AnimatePresence>
      {value && (
        <motion.span
          initial={{ opacity: 0, x: '50%' }}
          animate={{ opacity: 1, x: 0, transition: { opacity: { delay: 0.15 } } }}
          exit={{ opacity: 0, x: '100%', transition: { x: { delay: 0.15 } } }}
          className={classNames('formInput__error', className(type))}>
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default InputError;
