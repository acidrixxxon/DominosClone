import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import { IPagination } from '@/utils/types/CommontTypes';

interface ComponentProps {
  state: IPagination<number>;
  setState: (state: React.SetStateAction<IPagination<number>>) => void;
}

const Pagination: React.FC<ComponentProps> = ({ state, setState }) => {
  if (state.pageCount < 2) return null;

  return (
    <motion.ul
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, delay: 1 } }}
      className='pagination'>
      {[...Array(state.pageCount)].map((item, index) => (
        <li
          className={classNames('pagination__item', { ['pagination__itemActive']: state.page === index + 1 })}
          onClick={() => setState((state) => ({ ...state, page: index + 1 }))}>
          {index + 1}
        </li>
      ))}
    </motion.ul>
  );
};

export default Pagination;
