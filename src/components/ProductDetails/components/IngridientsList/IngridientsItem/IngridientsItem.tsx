import { FC } from 'react';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { IPizzaIngridientsFull } from '../../../../../types/ProductTypes';
import styles from './IngridientsItem.module.scss';

interface ComponentProps {
  ingridient: IPizzaIngridientsFull;
}

const IngridientsItem: FC<ComponentProps> = ({ ingridient }) => {
  return (
    <li className={styles.productDetails__ingridientsItem} key={ingridient.ingridientId._id}>
      <span className={styles.productDetails__removeIcon}>
        <AiOutlineClose />
      </span>

      <div className={styles.productDetails__ingridientsItemImageContainer}>
        <img
          src={ingridient.ingridientId.imageUrl}
          alt={ingridient.ingridientId.title}
          className={styles.productDetails__ingridientsItemImage}
        />
      </div>

      <div className={styles.productDetails__ingridientQty}>
        <span className={styles.productDetails__ingridientQtyIcon}>
          <AiOutlineMinus />
        </span>

        <span className={styles.productDetails__qty}>{ingridient.qty}</span>

        <span className={styles.productDetails__ingridientQtyIcon}>
          <AiOutlinePlus />
        </span>
      </div>

      <span className={styles.productDetails__ingridientsItemTitle}>{ingridient.ingridientId.title}</span>
    </li>
  );
};

export default IngridientsItem;
