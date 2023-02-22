import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiArrowSmRight } from 'react-icons/hi';

import { addIngridientAnimations } from '../../../../../../assets/framer-animations';
import { IPizzaIngridientsCategory, IPizzaIngridientsFull } from '../../../../../../types/ProductTypes';
import styles from './CategoryItem.module.scss';

interface ComponentProps {
  item: IPizzaIngridientsCategory;
  ingridients: IPizzaIngridientsFull[] | undefined | [];
}

const CategoryItem: FC<ComponentProps> = ({ item, ingridients }) => {
  const [visibleIngridients, setVisibleIngridients] = useState<boolean>(false);

  return (
    <li className={styles.productDetails__categoriesItem} key={item._id}>
      <div className={styles.productDetails__itemHeader} onClick={() => setVisibleIngridients((state) => !state)}>
        <span className={styles.productDetails__title}> {item.title}</span>

        <HiArrowSmRight />
      </div>

      <AnimatePresence>
        {visibleIngridients && (
          <motion.div
            initial={addIngridientAnimations.initial}
            animate={addIngridientAnimations.animate}
            exit={addIngridientAnimations.exit}
            className={styles.productDetails__itemIngridients}>
            <ul className={styles.productDetails__itemIngridientsList}>
              {item.ingridients.map((ingrid) => {
                const alreadyInPizza = ingridients && ingridients.find((ingridient) => ingridient.ingridientId._id === ingrid._id);

                return (
                  <li
                    className={classNames(styles.productDetails__itemIngridientsItem, {
                      [styles.productDetails__alreadyInPizza]: alreadyInPizza,
                    })}>
                    <img src={ingrid.imageUrl} alt={item._id} />
                    <span>{ingrid.title}</span>

                    {alreadyInPizza ? (
                      <div className={styles.productDetails__qty}>
                        <span className={styles.productDetails__icon}>-</span>
                        <span className={styles.productDetails__qtyCount}>{alreadyInPizza.qty}</span>
                        <span className={styles.productDetails__icon}>+</span>
                      </div>
                    ) : (
                      <span className={styles.productDetails__addIcon}>
                        <AiOutlinePlus />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default CategoryItem;
