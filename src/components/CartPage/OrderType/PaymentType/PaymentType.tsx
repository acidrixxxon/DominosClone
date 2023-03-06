import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import { useOutsideClick2 } from '../../../../hooks/useOutsideClick2';
import { ICustomerData, IPaymentType } from '../../../../types/UserTypes';
import ArrowIcon from '../../../UI/Icons/ArrowIcon';
import styles from './PaymentType.module.scss';

const paymentVariants: IPaymentType[] = [
  { id: 4123, title: 'Готівкою' },
  { id: 11231, title: 'Карткою курьєру' },
  { id: 12312, title: 'Онлайн' },
];

const PaymentType: React.FC<{ setData: React.SetStateAction<any>; data: IPaymentType }> = ({ data, setData }) => {
  const [state, setState, ref] = useOutsideClick2();

  const changeHandler = (paymentType: IPaymentType): void => {
    setData((state: ICustomerData) => ({
      ...state,
      paymentType,
    }));

    setState(false);
  };
  return (
    <div className={styles.paymentType}>
      <h4 className={classNames(styles.paymentType__heading, 'heading')}>Оплата</h4>

      <div className={styles.paymentType__dropdown} ref={ref}>
        <button
          className={classNames(styles.paymentType__dropdownButton, { [styles.paymentType__dropdownButtonActive]: state })}
          onClick={() => setState((state) => !state)}>
          {data !== null ? data.title : 'Тип оплати'}
          <ArrowIcon status={state} />
        </button>

        <AnimatePresence>
          {state && (
            <motion.ul
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0, transition: { opacity: { delay: 0.1 }, duration: 0.15 } }}
              exit={{ opacity: 0, transition: { opacity: { delay: 0 }, duration: 0.05 } }}
              className={styles.paymentType__dropdownList}>
              {paymentVariants.map((item) => (
                <li className={styles.paymentType__dropdownListItem} key={item.id} onClick={() => changeHandler(item)}>
                  {item.title}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PaymentType;
