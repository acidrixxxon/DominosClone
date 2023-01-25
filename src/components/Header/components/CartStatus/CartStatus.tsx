import React, { FC } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import './CartStatus.scss';

const CartStatus: FC = () => {
  const { totalCost, totalCount } = useAppSelector((state) => state.cart);

  const productCount = totalCount === 0 ? '00' : totalCount < 10 ? `0${totalCount}` : totalCount;
  const totalPrice = totalCost === 0 ? '0.00' : `${totalCost}.00`;
  return (
    <div className='cartStatus'>
      <div className='cartStatus__container'>
        <span className='cartStatus__count'>
          {productCount}
          <AiOutlineShoppingCart />
        </span>

        <span className='cartStatus__price'>{totalPrice} грн</span>

        <span className='cartStatus__order'>Замовити</span>
      </div>
    </div>
  );
};

export default CartStatus;
