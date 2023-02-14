import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { IPizzaIngridientsFull } from '../../../../types/ProductTypes';
import IngridientsItem from './IngridientsItem/IngridientsItem';
import styles from './IngridientsList.module.scss';

interface ComponentProps {
  ingridients: IPizzaIngridientsFull[];
}

const IngridientsList: FC<ComponentProps> = ({ ingridients }) => {
  return (
    <div className={styles.productDetails__ingridientsContainer}>
      <span className={styles.productDetails__heading}>Інгрідієнти:</span>

      <ul className={styles.productDetails__ingridientsList}>
        {ingridients.map((ingridient) => (
          <IngridientsItem ingridient={ingridient} />
        ))}

        <li className={styles.productDetails__ingridientsItemAdd}>
          <span className='productDetails__ingridientsItemIcon'>
            <AiOutlinePlus />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default IngridientsList;
