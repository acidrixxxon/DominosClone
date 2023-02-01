import React from 'react';

import EmptyCartIcon from '../../../../../../../UI/Icons/EmptyCartIcon';

const EmptyCart = () => {
  return (
    <div className='cartStatus__emptyCart'>
      <EmptyCartIcon />

      <p className='cartStatus__emptyCart-text'>Положите что-нибудь в корзину.</p>
    </div>
  );
};

export default EmptyCart;
