import { FC } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { IPizzaIngridientsFull, IProduct, IProductDetails } from '../../../../types/ProductTypes';
import IngridientsItem from './IngridientsItem/IngridientsItem';
import styles from './IngridientsList.module.scss';

interface ComponentProps {
  ingridients: IPizzaIngridientsFull[];
  setDetails: React.Dispatch<React.SetStateAction<IProductDetails | null>>;
}

const IngridientsList: FC<ComponentProps> = ({ ingridients, setDetails }) => {
  const removeIngridient = (id: string): void => {
    const ingridient = ingridients.find((item) => item.ingridientId._id === id);
    if (ingridient) {
      setDetails((state) => {
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

  const changeIngridientQty = (id: string): void => {
    const ingridient = ingridients.find((item) => item.ingridientId._id === id);

    if (ingridient && ingridient.qty == 1) {
      removeIngridient(id);
    } else {
      setDetails((state) => {
        return {
          ...state,
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
