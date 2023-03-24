import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import { totalErrors } from '../../../utils/formValidators';
import { IAddressData, IAddressData1, ICustomerData } from '../../../utils/types/UserTypes';
import InputError from '../../UI/Errors/InputError/InputError';
import styles from './DeliveryDetailsForm.module.scss';

interface ComponentProps {
  data: IAddressData1;
  setData: React.SetStateAction<any>;
  err: {
    errors: totalErrors | null;
    setErrors: React.SetStateAction<any>;
  };
}

const DeliveryDetailsForm: React.FC<ComponentProps> = ({ data, setData, err: { setErrors, errors } }) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setData((state: ICustomerData) => ({
      ...state,
      details: {
        ...state.details,
        [e.target.name]: e.target.value,
      },
    }));
    if (errors && errors[e.target.name]) {
      setErrors((state: totalErrors) => ({
        ...state,
        [e.target.name]: [],
      }));
    }
  };

  return (
    <motion.div
      className={styles.deliveryForm}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto', transition: { duration: 0.1, opacity: { delay: 0.15 } } }}
      exit={{ opacity: 0 }}>
      <h4 className={classNames(styles.deliveryForm__heading, 'heading')}>Адреса</h4>

      <div className={classNames(styles.deliveryForm__inputGroup, styles.deliveryForm__inputGroupSingle)}>
        <div className={styles.deliveryForm__inputContainer}>
          <input
            type='text'
            className={classNames(
              styles.deliveryForm__input,
              {
                [styles.deliveryForm__inputError]: errors?.street && errors.street.length > 0,
              },
              { [styles.deliveryForm__inputFilled]: data.street && data.street.trim().length > 0 },
            )}
            placeholder='Вулиця'
            name='street'
            value={data.street}
            onChange={inputChangeHandler}
          />

          {errors && errors.street && <InputError value={errors.street[0]} />}
        </div>
      </div>

      <div className={styles.deliveryForm__inputGroup}>
        <div className={styles.deliveryForm__inputContainer}>
          <input
            type='text'
            className={classNames(
              styles.deliveryForm__input,
              {
                [styles.deliveryForm__inputError]: errors?.house && errors.house.length > 0,
              },
              { [styles.deliveryForm__inputFilled]: data.house && data.house.trim().length > 0 },
            )}
            placeholder='Будинок'
            name='house'
            value={data.house}
            onChange={inputChangeHandler}
          />

          {errors && errors.house && <InputError value={errors.house[0]} />}
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
