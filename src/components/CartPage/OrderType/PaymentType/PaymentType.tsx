import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import styles from './PaymentType.module.scss';

import { useOutsideClick2 } from '../../../../hooks/useOutsideClick2';
import { totalErrors } from '../../../../utils/formValidators';
import { ICustomerData, IPaymentType } from '../../../../utils/types/UserTypes';
import ArrowIcon from '../../../UI/Icons/ArrowIcon';
import OrderType from '../OrderType';

interface ComponentProps {
  setData: React.SetStateAction<any>;
  data: IPaymentType | null;
  orderType: number;
  err: {
    errors: totalErrors | null;
    setErrors: React.SetStateAction<any>;
  };
  state1: ICustomerData;
}

const PaymentType: React.FC<ComponentProps> = ({ data, setData, orderType, err: { errors, setErrors }, state1 }) => {
  const paymentVariants =
    orderType === 0
      ? [
          { id: 4123, title: 'Готівкою' },
          { id: 11231, title: 'Карткою курьєру' },
          { id: 12312, title: 'Онлайн на сайті' },
        ]
      : [
          { id: 41121, title: 'У ресторані' },
          { id: 12312, title: 'Онлайн на сайті' },
        ];
  const [state, setState, ref] = useOutsideClick2();

  const changeHandler = (paymentType: IPaymentType): void => {
    setData((state: ICustomerData) => ({
      ...state,
      paymentType,
    }));
    if (errors && errors.paymentType) {
      setErrors((state: totalErrors) => ({
        ...state,
        paymentType: [],
      }));
    }
    setState(false);
  };

  if (orderType === 1 && !state1.details.restaurant) return null;
  if (
    (orderType === 0 && state1.client.email === '') ||
    state1.client.phone === '' ||
    state1.client.name === '' ||
    state1.details.house === '' ||
    state1.details.street === ''
  )
    return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.paymentType}>
      <h4 className={classNames(styles.paymentType__heading, 'heading')}>
        Оплата{' '}
        {errors && errors.paymentType.length > 0 && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.paymentType__error}>
            ({errors.paymentType[0]})
          </motion.span>
        )}
      </h4>

      <div className={styles.paymentType__dropdown} ref={ref}>
        <button
          className={classNames(
            styles.paymentType__dropdownButton,
            { [styles.paymentType__dropdownButtonActive]: state },
            { [styles.paymentType__dropdownButtonError]: errors && errors.paymentType.length > 0 },
            { [styles.paymentType__dropdownButtonFilled]: data },
          )}
          onClick={() => setState((state) => !state)}>
          {data !== null ? data.title : 'Тип оплати'}
          <ArrowIcon status={state} />
        </button>

        <AnimatePresence>
          {state && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { opacity: { delay: 0.1 }, duration: 0.15 } }}
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
    </motion.div>
  );
};

export default PaymentType;
