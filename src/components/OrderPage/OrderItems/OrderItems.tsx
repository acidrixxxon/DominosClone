import { motion } from 'framer-motion';
import React from 'react';

import { ICartState } from '../../../types/CartTypes';
import ListItem from './ListItem/ListItem';
import styles from './OrderItems.module.scss';

interface ComponentProps {
  cart: ICartState;
}

const OrderItems: React.FC<ComponentProps> = ({ cart }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.orderItems}>
      <div className={styles.orderItems__heading}>
        <h5>Обрані товари</h5>
      </div>

      <ul className={styles.orderItems__list}>
        {cart.items.length > 0 && cart.items.map((item) => <ListItem item={item} key={item._id} />)}
      </ul>

      <div className={styles.orderItems__totals}>
        <span className={styles.orderItems__price}>
          До сплати: <span className={styles.orderItems__number}>{cart.totalCost}</span> грн
        </span>
      </div>
    </motion.div>
  );
};

export default OrderItems;
