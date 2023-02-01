import React from 'react';

const Promo = () => {
  return (
    <div className='cartStatus__promo'>
      <div className='cartStatus__promoContainer'>
        <img src='https://dominospizza.ru/images/car-banner-bg.png' alt='text' className='cartStatus__promo-img' />
        <p className='cartStatus__promo-text'>
          Подвійна моцарела <br /> <span style={{ fontSize: '16px' }}>від 20грн</span>
        </p>
      </div>
    </div>
  );
};

export default Promo;
