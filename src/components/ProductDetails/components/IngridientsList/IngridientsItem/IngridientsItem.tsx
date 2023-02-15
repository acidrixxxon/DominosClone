import { FC } from 'react';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { IPizzaIngridientsFull } from '../../../../../types/ProductTypes';
import styles from './IngridientsItem.module.scss';

interface ComponentProps {
  ingridient: IPizzaIngridientsFull;
  removeIngridient: (id: string) => void;
  changeIngridientQty: (id: string) => void;
}

const IngridientsItem: FC<ComponentProps> = ({ ingridient, removeIngridient, changeIngridientQty }) => {
  return (
    <li className={styles.productDetails__ingridientsItem} key={ingridient.ingridientId._id}>
      <span className={styles.productDetails__removeIcon} onClick={() => removeIngridient(ingridient.ingridientId._id)}>
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
        <span className={styles.productDetails__ingridientQtyIcon} onClick={() => changeIngridientQty(ingridient.ingridientId._id)}>
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
