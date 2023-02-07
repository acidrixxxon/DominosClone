import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../../../../../../hooks/useAppSelector';
import ProductListItem from './component/ProductListItem';

const ProductList: FC = () => {
  const { items, totalCost } = useAppSelector((state) => state.cart);

  return (
    <>
      <div className='cartStatus__listContainer'>
        {items.map((item) => (
          <ProductListItem item={item} key={item._id} />
        ))}
      </div>

      <div className='cartStatus__footer'>
        <Link to='/cart' className='cartStatus__footerLink'>
          <span className='cartStatus__footerText'>Оформити</span>
          <span className='cartStatus__footerPrice'>{totalCost}грн</span>
        </Link>
      </div>
    </>
  );
};

export default ProductList;
