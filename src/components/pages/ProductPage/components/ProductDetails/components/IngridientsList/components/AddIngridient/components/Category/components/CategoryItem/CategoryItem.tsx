import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import styles from './CategoryItem.module.scss';

import { SOUCE_CATEGORY_ID } from '../../../../../../../../../../../../../utils/constants';
import {
  IPizzaIngridientsFull,
  IPizzaIngridientsShort,
  IProduct,
  IProductDetails,
} from '../../../../../../../../../../../../../utils/types/ProductTypes';

interface ComponentProps {
  alreadyInPizza: IPizzaIngridientsFull | undefined;
  item: IPizzaIngridientsShort;
  refObj: React.RefObject<HTMLLIElement>;
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const CategoryItem: React.FC<ComponentProps> = ({ alreadyInPizza, item, refObj, setDetails }) => {
  const addIngridientHandler = () => {
    //if ingridient souce
    if (item.category === SOUCE_CATEGORY_ID) {
      setDetails((state: IProductDetails) => {
        const souseInPizza = state.ingridients.find((ingrid) => ingrid.ingridientId.category === SOUCE_CATEGORY_ID);
        const newSouceObj = { qty: 1, ingridientId: item, _id: item._id };

        //if pizza already has souce(remove old,add new without)
        if (souseInPizza) {
          const newArray = state.ingridients.filter((ingrid) => ingrid.ingridientId._id !== souseInPizza.ingridientId._id);
          newArray.push(newSouceObj);
          return {
            ...state,
            ingridients: newArray,
          };
        } else {
          //if pizza without souce by default(push obj in array,change price)
          return {
            ...state,
            ingridients: [...state.ingridients, newSouceObj],
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
          };
        }
      });
    } else {
      //another ingridient category(not souce)

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
      if (alreadyInPizza && alreadyInPizza.qty === 1) {
        console.log('in pizza');
        setDetails((state: IProductDetails) => ({
          ...state,
          ingridients: state.ingridients.map((ingridient) =>
            ingridient.ingridientId._id === item._id ? { ...ingridient, qty: 2 } : ingridient,
          ),
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
    } else if (type === 'remove') {
      console.log('da1');
      // delete completely
      setDetails((state: IProductDetails) => {
        const ingridient = state.ingridients.find((ingrid) => ingrid.ingridientId._id === item._id);
        if (ingridient && ingridient.qty === 1) {
          console.log('qty 1');
          return {
            ...state,
            ingridients: state.ingridients.filter((ingridient) => ingridient.ingridientId._id !== item._id),
            variants: state.variants.map((size) => {
              return {
                ...size,
                variants: size.variants.map((crust) => {
                  return {
                    ...crust,
                    price: crust.price - item.addPrice,
                  };
                }),
              };
            }),
          };
        } else if (ingridient && ingridient.qty === 2) {
          return {
            ...state,
            ingridients: state.ingridients.map((ingridient) =>
              ingridient.ingridientId._id === item._id ? { ...ingridient, qty: 1 } : ingridient,
            ),
            variants: state.variants.map((size) => {
              return {
                ...size,
                variants: size.variants.map((crust) => {
                  return {
                    ...crust,
                    price: crust.price - item.addPrice,
                  };
                }),
              };
            }),
          };
        }
      });
    }
  };

  const animation = {
    initial: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <li
      ref={refObj}
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
            <span
              className={classNames(styles.productDetails__icon, { [styles.productDetails__iconDisabled]: alreadyInPizza.qty === 2 })}
              onClick={() => changeIngridientQty('add')}>
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
