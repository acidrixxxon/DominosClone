import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useOutsideClick2 } from '../../hooks/useOutsideClick2';
import { viewActions as actions } from '../../redux/slices/viewSlice';
import { useActionCreators } from '../../redux/store';
import Arrow from '../UI/Arrow/Arrow';
import './Sort.scss';

const sortVariants = [
  { id: 0, title: 'популярністю' },
  { id: 1, title: 'ціною (найдорожчі)' },
  { id: 2, title: 'ціною (дешевші)' },
];

const Sort: FC = () => {
  const { sort } = useAppSelector((state) => state.view);

  const { setSort } = useActionCreators(actions);

  const [state, setState, ref] = useOutsideClick2();

  const changeSortHandler = (item: { id: number; title: string }): void => {
    setSort(item);
    setState(false);
  };
  return (
    <div className='sort' ref={ref}>
      <div className='sort__label'>
        <Arrow rotated={state} />
        Сортування за:
      </div>
      <div className='sort__title' onClick={() => setState((state) => !state)}>
        {sort.title}
      </div>

      <AnimatePresence>
        {state && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className='sort__variants'>
            <ul className='sort__variants-list'>
              {sortVariants.map((item) => (
                <li
                  onClick={() => changeSortHandler(item)}
                  className={classNames('sort__variants-item', { 'sort__variants-active': sort.id === item.id })}
                  key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sort;
