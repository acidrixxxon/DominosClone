import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { CHANGE_QTY, MINUS, PLUS } from '../../../../../../Utils/constants';
import { IPizzaIngridientsFull, IProductDetails } from '../../../../../../types/ProductTypes';
import styles from './IngridientsItem.module.scss';

interface ComponentProps {
  ingridient: IPizzaIngridientsFull;
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const IngridientsItem: FC<ComponentProps> = ({ ingridient, setDetails }) => {
  const removeIngridient = (id: string): void => {
    setDetails((state: IProductDetails) => ({
      ...state,
      ingridients: state && state.ingridients.filter((item) => item.ingridientId._id !== id),
      variants:
        state &&
        state.variants.map((size) => {
          return {
            ...size,
            variants: size.variants.map((crust) => {
              return {
                ...crust,
                price: crust.price - ingridient?.ingridientId.addPrice,
              };
            }),
          };
        }),
    }));
  };

  const changeIngridientQty = (type: CHANGE_QTY, id: string): void => {
    if (type === MINUS) {
      if (ingridient && ingridient.qty == 1) {
        removeIngridient(id);
      } else if (ingridient && ingridient.qty == 2) {
        setDetails((state: IProductDetails) => {
          return {
            ...state,
            variants:
              state &&
              state.variants.map((size) => {
                return {
                  ...size,
                  variants: size.variants.map((crust) => {
                    return {
                      ...crust,
                      price: crust.price - ingridient?.ingridientId.addPrice,
                    };
                  }),
                };
              }),
            ingridients: state?.ingridients.map((ingridient) =>
              ingridient.ingridientId._id === id
                ? {
                    ...ingridient,
                    qty: ingridient.qty - 1,
                  }
                : ingridient,
            ),
          };
        });
      }
    } else if (PLUS) {
      if (ingridient && ingridient.qty == 1) {
        setDetails((state: IProductDetails) => {
          return {
            ...state,
            ingridients: state?.ingridients.map((ingridient) =>
              ingridient.ingridientId._id === id
                ? {
                    ...ingridient,
                    qty: ingridient.qty + 1,
                  }
                : ingridient,
            ),
            variants:
              state &&
              state.variants.map((size) => {
                return {
                  ...size,
                  variants: size.variants.map((crust) => {
                    return {
                      ...crust,
                      price: crust.price + ingridient?.ingridientId.addPrice,
                    };
                  }),
                };
              }),
          };
        });
      }
    }

    // if (type === MINUS) {
    //   if (ingridient && ingridient.qty == 1) {
    //     removeIngridient(id);
    //   } else if (ingridient && ingridient.qty == 2) {
    //     setDetails((state: IProductDetails) => {
    //       return {
    //         ...state,
    //         variants:
    //           state &&
    //           state.variants.map((size) => {
    //             return {
    //               ...size,
    //               variants: size.variants.map((crust) => {
    //                 return {
    //                   ...crust,
    //                   price: crust.price - ingridient?.ingridientId.addPrice,
    //                 };
    //               }),
    //             };
    //           }),
    //         ingridients: state?.ingridients.map((ingridient) =>
    //           ingridient.ingridientId._id === id
    //             ? {
    //                 ...ingridient,
    //                 qty: ingridient.qty - 1,
    //               }
    //             : ingridient,
    //         ),
    //       };
    //     });
    //   }
    // } else if (PLUS) {
    //   if (ingridient && ingridient.qty == 1) {
    //     setDetails((state: IProductDetails) => {
    //       return {
    //         ...state,
    //         ingridients: state?.ingridients.map((ingridient) =>
    //           ingridient.ingridientId._id === id
    //             ? {
    //                 ...ingridient,
    //                 qty: ingridient.qty + 1,
    //               }
    //             : ingridient,
    //         ),
    //         variants:
    //           state &&
    //           state.variants.map((size) => {
    //             return {
    //               ...size,
    //               variants: size.variants.map((crust) => {
    //                 return {
    //                   ...crust,
    //                   price: crust.price + ingridient?.ingridientId.addPrice,
    //                 };
    //               }),
    //             };
    //           }),
    //       };
    //     });
    //   }
    // }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
      className={styles.productDetails__ingridientsItem}
      key={ingridient.ingridientId._id}>
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
        <span
          className={styles.productDetails__ingridientQtyIcon}
          onClick={() => changeIngridientQty(MINUS, ingridient.ingridientId._id)}>
          <AiOutlineMinus />
        </span>

        <span className={styles.productDetails__qty}>{ingridient.qty}</span>

        <span
          className={styles.productDetails__ingridientQtyIcon}
          onClick={() => changeIngridientQty(PLUS, ingridient.ingridientId._id)}>
          <AiOutlinePlus />
        </span>
      </div>

      <span className={styles.productDetails__ingridientsItemTitle}>
        {ingridient.ingridientId.title}{' '}
        <AnimatePresence>
          {ingridient.qty === 2 && (
            <motion.sup initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              (Подвійна)
            </motion.sup>
          )}
        </AnimatePresence>
      </span>
    </motion.li>
  );
};

export default IngridientsItem;
