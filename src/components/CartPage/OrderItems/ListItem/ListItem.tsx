import { motion } from 'framer-motion';
import React from 'react';

import { MINUS, PLUS } from '../../../../Utils/constants';
import { useActionCreators } from '../../../../redux/store';
import { IProductInCart } from '../../../../types/ProductTypes';
import CloseIcon from '../../../UI/Icons/CloseIcon';
import MinusIcon from '../../../UI/Icons/MinusIcon';
import PlusIcon from '../../../UI/Icons/PlusIcon';
import cartActions from './../../../../redux/actions/ProductActions';
import styles from './ListItem.module.scss';

const ListItem: React.FC<{ item: IProductInCart; index: number }> = ({ item, index }) => {
  const { removeItemFromCart, changeQtyInCart } = useActionCreators(cartActions);

  const removeItemHandler = () => {
    removeItemFromCart(item);
  };
  return (
    <motion.li
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0, transition: { delay: index * 0.3, duration: 0.3 } }}
      exit={{ opacity: 0, x: '100%', transition: { opacity: { delay: 0.1, duration: 0.4 }, x: { duration: 0.2 } } }}
      className={styles.listItem__item}>
      <div className={styles.listItem__imageContainer}>
        <img src={item.image} alt={item.fulltitle} className={styles.listItem__image} />
      </div>

      <div className={styles.listItem__details}>
        <div className={styles.listItem__header}>
          <h5 className={styles.listItem__title}>{item.fulltitle}</h5>

          <CloseIcon closeHandler={removeItemHandler} />
        </div>

        {item.class === 0 && (
          <div className={styles.listItem__body}>
            <ul className={styles.listItem__ingridientsList}>
              {item.ingridients &&
                item.ingridients.map((ingridient, index) => (
                  <li className={styles.listItem__ingridientsItem} key={item._id + index}>
                    {ingridient.ingridientId.title}
                    {item.ingridients && index + 1 === item.ingridients.length ? null : ', '}
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className={styles.listItem__footer}>
          <div className={styles.listItem__price}>
            <span>{item.price}.00</span> грн
          </div>

          <div className={styles.listItem__qty}>
            <span className={styles.listItem__icon} onClick={() => changeQtyInCart(MINUS, item.uniqueId)}>
              <MinusIcon />
            </span>
            <span className={styles.listItem__count}>{item.qty}</span>
            <span className={styles.listItem__icon} onClick={() => changeQtyInCart(PLUS, item.uniqueId)}>
              <PlusIcon />
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default ListItem;
