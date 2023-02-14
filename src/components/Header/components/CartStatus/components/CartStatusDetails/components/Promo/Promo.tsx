import React from 'react';

import styles from './Promo.module.scss';

const Promo = () => {
  return (
    <div className={styles.cartStatus__promo}>
      <div className={styles.cartStatus__promoContainer}>
        <img src='https://dominospizza.ru/images/car-banner-bg.png' alt='text' className={styles.cartStatus__promoImage} />
        <p className={styles.cartStatus__promoText}>
          Подвійна моцарела <br /> <span style={{ fontSize: '16px' }}>від 20грн</span>
        </p>
      </div>
    </div>
  );
};

export default Promo;
