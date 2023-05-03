import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import { totalErrors } from '@/utils/formValidators';

import styles from './ClientDataForm.module.scss';

import { IClientData, ICustomerData } from '../../../utils/types/UserTypes';
import InputError from '../../UI/Errors/InputError/InputError';

interface ComponentProps {
  data: IClientData;
  setData: React.SetStateAction<any>;
  err: {
    errors: totalErrors | null;
    setErrors: React.SetStateAction<any>;
  };
}

const ClientDataForm: React.FC<ComponentProps> = ({ data, setData, err: { errors, setErrors } }) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData((state: ICustomerData) => ({
      ...state,
      client: {
        ...state.client,
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.clientDataForm}>
      <h4 className={classNames(styles.clientDataForm__heading, 'heading')}>Контакти</h4>

      <div className={styles.clientDataForm__inputGroup}>
        <div className={styles.clientDataForm__inputContainer}>
          <input
            type='text'
            className={classNames(
              styles.clientDataForm__input,
              {
                [styles.clientDataForm__inputError]: errors && errors.name.length > 0,
              },
              { [styles.clientDataForm__inputFilled]: data.name.trim().length > 0 },
            )}
            placeholder='Імя'
            name='name'
            value={data.name}
            onChange={inputChangeHandler}
          />

          {errors && <InputError value={errors.name[0]} type='name' />}
        </div>

        <div className={styles.clientDataForm__inputContainer}>
          <input
            type='text'
            className={classNames(
              styles.clientDataForm__input,
              {
                [styles.clientDataForm__inputError]: errors && errors.phone.length > 0,
              },
              { [styles.clientDataForm__inputFilled]: data.phone.trim().length > 0 },
            )}
            placeholder='Телефон'
            name='phone'
            value={data.phone}
            onChange={inputChangeHandler}
          />

          {errors && <InputError type='phone' value={errors.phone[0]} />}
        </div>

        <div className={styles.clientDataForm__inputContainer}>
          <input
            type='email'
            className={classNames(
              styles.clientDataForm__input,
              {
                [styles.clientDataForm__inputError]: errors && errors.email.length > 0,
              },
              { [styles.clientDataForm__inputFilled]: data.email.trim().length > 0 },
            )}
            placeholder='Email'
            name='email'
            value={data.email}
            onChange={inputChangeHandler}
          />

          {errors && <InputError type='email' value={errors.email[0]} />}
        </div>
      </div>
    </motion.div>
  );
};

export default ClientDataForm;
