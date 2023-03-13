import React from 'react';

import { IProductInCart } from '../../../../types/ProductTypes';
import styles from './ListItem.module.scss';

const ListItem: React.FC<{ item: IProductInCart }> = ({ item }) => {
  return (
    <li className={styles.orderItems__item}>
      <div className={styles.orderItems__imageContainer}>
        <img src={item.image} alt={item.fulltitle} className={styles.orderItems__image} />
      </div>

      <div className={styles.orderItems__data}>
        <div className={styles.orderItems__header}>
          <h5 className={styles.orderItems__title}>{item.fulltitle}</h5>

          <span className={styles.orderItems__price}>{item.price} грн</span>
        </div>

        {item.class === 0 && item.ingridients && item.ingridients.length > 0 && (
          <div className={styles.orderItems__body}>
            <ul className={styles.orderItems__ingridientsList}>
              {item.ingridients.map((item, index) => (
                <li key={item.ingridientId._id}>{index === 0 ? item.ingridientId.title : `, ${item.ingridientId.title}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default ListItem;
