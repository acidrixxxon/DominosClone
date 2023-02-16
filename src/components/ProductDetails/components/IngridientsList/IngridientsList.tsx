import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { CHANGE_QTY, MINUS, PLUS } from '../../../../Utils/constants';
import { IPizzaIngridientsFull, IProductDetails } from '../../../../types/ProductTypes';
import AddIngridients from './AddIngridients/AddIngridients';
import IngridientsItem from './IngridientsItem/IngridientsItem';
import styles from './IngridientsList.module.scss';

interface ComponentProps {
  ingridients: IPizzaIngridientsFull[];
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const IngridientsList: FC<ComponentProps> = ({ ingridients, setDetails }) => {
  const removeIngridient = (id: string): void => {
    const ingridient = ingridients.find((item) => item.ingridientId._id === id);
    if (ingridient) {
      setDetails((state: IProductDetails) => {
        return {
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
        };
      });
    }
  };

  const changeIngridientQty = (type: CHANGE_QTY, id: string): void => {
    const ingridient = ingridients.find((item) => item.ingridientId._id === id);
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
  };

  return (
    <div className={styles.productDetails__ingridientsContainer}>
      <span className={styles.productDetails__heading}>Інгрідієнти:</span>

      <ul className={styles.productDetails__ingridientsList}>
        {ingridients.map((ingridient) => (
          <IngridientsItem
            ingridient={ingridient}
            changeIngridientQty={changeIngridientQty}
            removeIngridient={removeIngridient}
            key={ingridient.ingridientId._id}
          />
        ))}

        <AddIngridients setDetails={setDetails} ingridients={ingridients} />
      </ul>
    </div>
  );
};

export default IngridientsList;
