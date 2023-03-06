import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import { IAddressData, ICustomerData } from '../../../types/UserTypes';
import styles from './DeliveryDetailsForm.module.scss';

interface ComponentProps {
  data: IAddressData;
  setData: React.SetStateAction<any>;
}

const DeliveryDetailsForm: React.FC<ComponentProps> = ({ data, setData }) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setData((state: ICustomerData) => ({
      ...state,
      details: {
        ...state.details,
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <motion.div
      className={styles.deliveryForm}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0 }}>
      <h4 className={styles.deliveryForm__heading}>Адреса</h4>

      <div className={classNames(styles.deliveryForm__inputGroup, styles.deliveryForm__inputGroupSingle)}>
        <div className={styles.deliveryForm__inputContainer}>
          <input
            type='text'
            className={styles.deliveryForm__input}
            placeholder='Вулиця'
            name='street'
            value={data.street}
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <div className={styles.deliveryForm__inputGroup}>
        <div className={styles.deliveryForm__inputContainer}>
          <input
            type='text'
            className={styles.deliveryForm__input}
            placeholder='Будинок'
            name='house'
            value={data.house}
            onChange={inputChangeHandler}
          />
        </div>

        <div className={styles.deliveryForm__inputContainer}>
          <input
            type='text'
            className={styles.deliveryForm__input}
            placeholder='Квартира'
            name='room'
            value={data.room}
            onChange={inputChangeHandler}
          />
        </div>

        <div className={styles.deliveryForm__inputContainer}>
          <input
            type='text'
            className={styles.deliveryForm__input}
            placeholder='Поверх'
            name='floor'
            value={data.floor}
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <div className={classNames(styles.deliveryForm__inputGroup, styles.deliveryForm__inputGroupTextarea)}>
        <div className={styles.deliveryForm__inputContainer}>
          <textarea
            name='comments'
            onChange={inputChangeHandler}
            className={classNames(styles.deliveryForm__input, styles.deliveryForm__inputTextarea)}
            placeholder='Коментар для курьера'
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryDetailsForm;
