import classNames from 'classnames';
import React from 'react';

import DeliveryIcon from '../../../UI/Icons/DeliveryIcon';
import DineInIcon from '../../../UI/Icons/DineinIcon';
import styles from './Variants.module.scss';

interface ComponentProps {
  type: number;
  setType: (id: number) => void;
}

const Variants: React.FC<ComponentProps> = ({ type, setType }) => {
  return (
    <div className={styles.orderType__variants}>
      <button
        onClick={() => setType(0)}
        className={classNames(styles.orderType__item, { [styles.orderType__itemActive]: type === 0 })}>
        <DeliveryIcon />
        Доставка
      </button>

      <button
        onClick={() => setType(1)}
        className={classNames(styles.orderType__item, { [styles.orderType__itemActive]: type === 1 })}>
        <DineInIcon />З собою
      </button>
    </div>
  );
};

export default Variants;
