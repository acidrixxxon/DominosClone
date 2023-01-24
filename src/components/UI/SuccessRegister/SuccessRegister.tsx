import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

import './SuccessRegister.scss';

const SuccessRegister: FC = () => {
  return (
    <motion.div initial={{ opacity: '0' }} animate={{ opacity: '1' }} exit={{ opacity: '0' }} className='successRegister'>
      <p className='successRegister__text'>
        Для завершенння реєстрації Вам потрібно перейти по лінку у відомленні яке ми надіслали на вказану електронну пошту!
      </p>
      <span className='successRegister__icon'>
        <AiOutlineCheck />
      </span>
    </motion.div>
  );
};

export default SuccessRegister;
