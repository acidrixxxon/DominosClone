import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import { IClientData, ICustomerData } from '../../../types/UserTypes';
import styles from './ClientDataForm.module.scss';

interface ComponentProps {
  data: IClientData;
  setData: React.SetStateAction<any>;
}

const ClientDataForm: React.FC<ComponentProps> = ({ data, setData }) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData((state: ICustomerData) => ({
      ...state,
      client: {
        ...state.client,
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.clientDataForm}>
      <h4 className={classNames(styles.clientDataForm__heading, 'heading')}>Контакти</h4>

      <div className={styles.clientDataForm__inputGroup}>
        <div className={styles.clientDataForm__inputContainer}>
          <input
            type='text'
            className={styles.clientDataForm__input}
            placeholder='Імя'
            name='name'
            value={data.name}
            onChange={inputChangeHandler}
          />
        </div>

        <div className={styles.clientDataForm__inputContainer}>
          <input
            type='text'
            className={styles.clientDataForm__input}
            placeholder='Телефон'
            name='phone'
            value={data.phone}
            onChange={inputChangeHandler}
          />
        </div>

        <div className={styles.clientDataForm__inputContainer}>
          <input
            type='text'
            className={styles.clientDataForm__input}
            placeholder='Email'
            name='email'
            value={data.email}
            onChange={inputChangeHandler}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ClientDataForm;
