import React from 'react';

import OrderItems from '@/components/CartPage/OrderItems/OrderItems';
import OrderType from '@/components/CartPage/OrderType/OrderType';
import PageWrapper from '@/components/UI/PageWrapper/PageWrapper';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  return (
    <PageWrapper id='cart-page' className={styles.cart}>
      <OrderType />

      <OrderItems />
    </PageWrapper>
  );
};

export default CartPage;
