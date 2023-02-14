import classNames from 'classnames';
import React, { FC } from 'react';

import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import styles from './CartStatusDetails.module.scss';
import EmptyCart from './components/EmptyCart/EmptyCart';
import ProductList from './components/ProductList/ProductList';
import Promo from './components/Promo/Promo';

interface ComponentProps {
  visible: boolean;
}

const CartStatusDetails: FC<ComponentProps> = ({ visible }) => {
  const { totalCount, totalCost, items } = useAppSelector((state) => state.cart);

  const emptyCart = totalCount === 0 && items.length === 0 && totalCost === 0;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      data-testid='cartStatus-details'
      className={classNames(styles.cartStatus__details, { [styles.cartStatus__detailsVisible]: visible })}>
      {visible && <Promo />}

      {emptyCart ? <EmptyCart /> : <ProductList />}
    </div>
  );
};

export default CartStatusDetails;
