import classNames from 'classnames';
import React, { FC } from 'react';
import { AiFillCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai';

import { MINUS, PLUS } from '../../../../../../../../../Utils/constants';
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
  const { changeQtyInCart } = useActionCreators(ProductActions);

  const mocarella =
    item.ingridients && item.ingridients.find((ingridient) => ingridient.ingridientId._id === '63714ca4858cf7c6b09716fc');

  return (
    <div className={styles.cartStatus__listItem}>
      <div className={styles.cartStatus__header}>
        <h4 className={styles.cartStatus__title}>{item.fulltitle}</h4>

        {item.class === 0 && (
          <div className={styles.cartStatus__addMocarella}>
            {mocarella?.qty === 2 ? <AiFillCheckCircle className={styles.cartStatus__addMocarellaAdded} /> : <AiOutlinePlusCircle />}{' '}
            2х Сир
          </div>
        )}
      </div>

      <div className={styles.cartStatus__body}>
        <div className={styles.cartStatus__qtyBlock} onClick={() => changeQtyInCart(MINUS, item._id)}>
          <span className={classNames(styles.cartStatus__qty, styles.cartStatus__qtyMinus)}>
            <MinusIcon />
          </span>

          <span>{item.qty}</span>

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
