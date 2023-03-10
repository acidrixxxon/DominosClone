import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { useAppSelector } from '../../../hooks/useAppSelector';
import cartActions from '../../../redux/actions/ProductActions';
import { useActionCreators } from '../../../redux/store';
import ListItem from './ListItem/ListItem';
import styles from './OrderItems.module.scss';

const OrderItems = () => {
  const { cart } = useAppSelector((state) => state);

  const { clearCartAction } = useActionCreators(cartActions);

  const emptyCart = cart.items.length === 0 && cart.totalCost === 0 && cart.totalCount === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.3 } }}
      className={styles.orderItems}>
      <h4 className={classNames(styles.orderItems__heading, 'heading')}>Ваше замовлення</h4>

      <div className={styles.orderItems__container}>
        <AnimatePresence>
          {!emptyCart && (
            <motion.ul exit={{ opacity: 0, scale: 0 }} className={styles.orderItems__list}>
              <AnimatePresence mode='popLayout'>
                {cart.items.map((item, index) => (
                  <ListItem key={item.uniqueId} item={item} index={index} />
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>

        <div className={styles.orderItems__totals}>
          {!emptyCart && (
            <button className={styles.orderItems__clearCartBtn} onClick={() => clearCartAction()}>
              Очистити корзину
            </button>
          )}

          <div className={styles.orderItems__totalsPrice}>{cart.totalCost}.00 грн</div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderItems;
