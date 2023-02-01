import classNames from 'classnames';
import React, { FC } from 'react';

import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import './CartStatusDetails.scss';
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
    <div data-testid='cartStatus-details' className={classNames('cartStatus__details', { 'cartStatus__details-visible': visible })}>
      {visible && <Promo />}

      {emptyCart ? <EmptyCart /> : <ProductList />}
    </div>
  );
};

export default CartStatusDetails;
