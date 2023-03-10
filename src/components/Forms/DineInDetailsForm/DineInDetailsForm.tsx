import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import { useOutsideClick2 } from '../../../hooks/useOutsideClick2';
import { IRestaurant } from '../../../types/CommontTypes';
import { ICustomerData } from '../../../types/UserTypes';
import ArrowIcon from '../../UI/Icons/ArrowIcon';
import styles from './DineInDetailsForm.module.scss';

const restaurantList: IRestaurant[] = [
  { id: 1, title: 'вул. Драгоманова 40' },
  { id: 2, title: 'вул. Мішуги 11б' },
  { id: 3, title: 'вул. Чавдар 34' },
  { id: 4, title: 'вул. Бассейна 1/2' },
  { id: 5, title: 'вул. Декабристів 12/37' },
];

interface ComponentProps {
  data: {
    restaurant: IRestaurant | null;
  };
  setData: React.SetStateAction<any>;
}

const DineInDetailsForm: React.FC<ComponentProps> = ({ data, setData }) => {
  const [state, setState, ref] = useOutsideClick2();

  const clickHandler = (item: IRestaurant): void => {
    setData((state: ICustomerData) => ({
      ...state,
      details: {
        restaurant: item,
      },
    }));
    setState(false);
  };
  return (
    <motion.div
      className={styles.dineInForm}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto', transition: { duration: 0.1, opacity: { delay: 0.15 } } }}
      exit={{ opacity: 0 }}>
      <h4 className={classNames(styles.dineInForm__heading, 'heading')}>Ресторан</h4>

      <div className={styles.dineInForm__dropdown} ref={ref}>
        <button className={styles.dineInForm__dropdownButton} onClick={() => setState((state) => !state)}>
          {data.restaurant !== null ? data.restaurant.title : 'Оберіть ресторан'} <ArrowIcon status={state} />
        </button>

        <AnimatePresence>
          {state && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { opacity: { delay: 0.2 }, duration: 0.2 } }}
              exit={{ opacity: 0, y: '-100%', transition: { y: { duration: 0.3 }, opacity: { duration: 0.2 } } }}
              className={styles.dineInForm__dropdownList}>
              {restaurantList.map((item) => (
                <li key={item.id} className={styles.dineInForm__dropdownItem} onClick={() => clickHandler(item)}>
                  {item.title}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DineInDetailsForm;
