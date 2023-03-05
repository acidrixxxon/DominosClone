import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
import { HiArrowSmRight } from 'react-icons/hi';

import { addIngridientAnimations } from '../../../../../../assets/framer-animations';
import { IPizzaIngridientsCategory, IPizzaIngridientsFull } from '../../../../../../types/ProductTypes';
import styles from './Category.module.scss';
import CategoryItem from './CategoryItem/CategoryItem';

interface ComponentProps {
  item: IPizzaIngridientsCategory;
  ingridients: IPizzaIngridientsFull[] | undefined | [];
  setDetails: React.Dispatch<React.SetStateAction<any>>;
  closeModal: () => void;
}

const Category: FC<ComponentProps> = ({ item, ingridients, setDetails, closeModal }) => {
  const [visibleIngridients, setVisibleIngridients] = useState<boolean>(false);

  const divRef = useRef<HTMLLIElement>(null);
  const listItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const modalContent = document.getElementById('addIngridient-modal');

    const clickHandler = (e: MouseEvent) => {
      if (divRef.current?.contains(e.target as Node)) {
        return;
      } else {
        if (modalContent?.childNodes[0].contains(e.target as Node)) {
          setVisibleIngridients(false);
        } else {
          closeModal();
        }
      }
    };

    visibleIngridients && modalContent && modalContent.addEventListener('click', clickHandler);

    !visibleIngridients && modalContent && modalContent.removeEventListener('click', clickHandler);

    return () => {
      modalContent && modalContent.removeEventListener('click', clickHandler);
    };
  }, [visibleIngridients]);

  const componentStyles: { item: React.CSSProperties } = {
    item: {
      height: item.ingridients.length < 5 ? '100%' : `${listItemRef.current ? listItemRef.current.offsetHeight * 2 + 20 : 2 * 170}px`,
      overflowY: item.ingridients.length < 5 ? 'hidden' : 'scroll',
    },
  };

  return (
    <li
      ref={divRef}
      className={classNames(styles.productDetails__categoriesItem, {
        [styles.productDetails__categoriesItemActive]: visibleIngridients,
      })}
      key={item._id}>
      <div className={styles.productDetails__itemHeader} onClick={() => setVisibleIngridients((state) => !state)}>
        <span className={styles.productDetails__title}> {item.title}</span>

        <HiArrowSmRight className={classNames({ [styles.productDetails__addIconRotated]: visibleIngridients })} />
      </div>

      <AnimatePresence>
        {visibleIngridients && (
          <motion.div
            initial={addIngridientAnimations.initial}
            animate={addIngridientAnimations.animate}
            exit={addIngridientAnimations.exit}
            className={styles.productDetails__itemIngridients}>
            <ul className={styles.productDetails__itemIngridientsList} style={componentStyles.item}>
              {item.ingridients.map((ingrid) => {
                const alreadyInPizza = ingridients && ingridients.find((ingridient) => ingridient.ingridientId._id === ingrid._id);

                return (
                  <CategoryItem
                    refObj={listItemRef}
                    item={ingrid}
                    alreadyInPizza={alreadyInPizza}
                    setDetails={setDetails}
                    key={ingrid._id}
                  />
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Category;
