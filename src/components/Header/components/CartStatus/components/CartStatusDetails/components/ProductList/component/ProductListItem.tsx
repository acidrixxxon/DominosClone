import classNames from 'classnames';
import React, { FC, useEffect } from 'react';
import { AiFillCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai';

import { ADD_MOCARELLA, MINUS, PLUS, REMOVE_MOCARELLA } from '../../../../../../../../../Utils/constants';
import ProductActions from '../../../../../../../../../redux/actions/ProductActions';
import { useActionCreators } from '../../../../../../../../../redux/store';
import { IProductInCart } from '../../../../../../../../../redux/types/ProductTypes';
import MinusIcon from '../../../../../../../../UI/Icons/MinusIcon';
import PlusIcon from '../../../../../../../../UI/Icons/PlusIcon';
import styles from './ProductListItem.module.scss';

interface ComponentProps {
  item: IProductInCart;
}

const ProductListItem: FC<ComponentProps> = ({ item }) => {
  const [qtyAnimation, setQtyAnimation] = React.useState<boolean>(false);
  const { changeQtyInCart, toggleMocarella } = useActionCreators(ProductActions);

  const mocarella =
    item.ingridients && item.ingridients.find((ingridient) => ingridient.ingridientId._id === '63714ca4858cf7c6b09716fc');

  useEffect(() => {
    setQtyAnimation(true);

    setTimeout(() => {
      setQtyAnimation(false);
    }, 300);
  }, [item.qty]);

  return (
    <div className={styles.cartStatus__listItem}>
      <div className={styles.cartStatus__header}>
        <h4 className={styles.cartStatus__title}>{item.fulltitle}</h4>

        {item.class === 0 && (
          <div className={styles.cartStatus__addMocarella}>
            {mocarella?.qty === 2 ? (
              <AiFillCheckCircle
                onClick={() => toggleMocarella(REMOVE_MOCARELLA, item._id)}
                className={styles.cartStatus__addMocarellaAdded}
              />
            ) : (
              <AiOutlinePlusCircle onClick={() => toggleMocarella(ADD_MOCARELLA, item._id)} />
            )}{' '}
            2х Сир
          </div>
        )}
      </div>

      <div className={styles.cartStatus__body}>
        <div className={styles.cartStatus__qtyBlock}>
          <span
            className={classNames(styles.cartStatus__qty, styles.cartStatus__qtyMinus)}
            onClick={() => changeQtyInCart(MINUS, item._id)}>
            <MinusIcon />
          </span>

          <span className={classNames({ scalechange__animation: qtyAnimation })}>{item.qty}</span>

          <span
            className={classNames(styles.cartStatus__qty, styles.cartStatus__qtyPlus)}
            onClick={() => changeQtyInCart(PLUS, item._id)}>
            <PlusIcon />
          </span>
        </div>

        <div className={styles.cartStatus__price}>{`${item.price * item.qty}грн`}</div>
      </div>
    </div>
  );
};

export default ProductListItem;
