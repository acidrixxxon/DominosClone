import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { AddIngridientQtyAnimations, AddIngridientQtyAnimations1 } from '../../../../../../../assets/framer-animations';
import { IPizzaIngridientsFull, IPizzaIngridientsShort, IProduct, IProductDetails } from '../../../../../../../types/ProductTypes';
import styles from './CategoryItem.module.scss';

interface ComponentProps {
  alreadyInPizza: IPizzaIngridientsFull | undefined;
  item: IPizzaIngridientsShort;
  ref: React.RefObject<HTMLLIElement>;
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const CategoryItem: React.FC<ComponentProps> = ({ alreadyInPizza, item, ref, setDetails }) => {
  const addIngridientHandler = () => {
    //souse changes
    if (item.category === '636f4d444ea5314e1da77912') {
    } else {
      setDetails((state: IProductDetails) => ({
        ...state,
        ingridients: [...state.ingridients, { qty: 1, _id: item._id, ingridientId: item }],
        variants: state.variants.map((size) => {
          return {
            ...size,
            variants: size.variants.map((crust) => {
              return {
                ...crust,
                price: crust.price + item.addPrice,
              };
            }),
          };
        }),
      }));
    }
  };

  const changeIngridientQty = (type: 'add' | 'remove') => {
    if (type === 'add') {
      console.log('da');
    } else if (type === 'remove') {
      console.log('da1');
      //delete completely
      // setDetails((state: IProductDetails) => {
      //   const ingridient = state.ingridients.find((ingrid) => ingrid.ingridientId._id === item._id);
      //   if (ingridient && ingridient.qty === 1) {
      //     console.log('qty 1');
      //     return {
      //       ...state,
      //       ingridients: state.ingridients.filter((ingridient) => ingridient.ingridientId._id == ingridient._id),
      //       variants: state.variants.map((size) => {
      //         return {
      //           ...size,
      //           variants: size.variants.map((crust) => {
      //             return {
      //               ...crust,
      //               price: crust.price - item.addPrice,
      //             };
      //           }),
      //         };
      //       }),
      //     };
      //   } else if (ingridient?.qty === 2) {
      //   }
      // });
    }
  };

  const animation = {
    initial: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <li
      ref={ref}
      id='category__ingridient'
      className={classNames(styles.productDetails__itemIngridientsItem, {
        [styles.productDetails__alreadyInPizza]: alreadyInPizza,
      })}
      key={item._id}>
      <img className={styles.productDetails__itemImage} src={item.imageUrl} alt={item._id} />
      <span className={styles.productDetails__itemTitle}>{item.title}</span>

      <AnimatePresence>
        {alreadyInPizza ? (
          <motion.div
            variants={animation}
            className={classNames(styles.productDetails__qty, { [styles.productDetails__qtyVisible]: alreadyInPizza })}>
            <span className={styles.productDetails__icon} onClick={() => changeIngridientQty('remove')}>
              -
            </span>
            <span className={styles.productDetails__qtyCount}>{alreadyInPizza.qty}</span>
            <span className={styles.productDetails__icon} onClick={() => changeIngridientQty('add')}>
              +
            </span>
          </motion.div>
        ) : (
          <span className={styles.productDetails__addIcon} onClick={addIngridientHandler}>
            <AiOutlinePlus />
          </span>
        )}
      </AnimatePresence>
    </li>
  );
};

export default CategoryItem;
