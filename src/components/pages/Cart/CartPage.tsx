import React, { PropsWithChildren } from 'react';

import styles from './CartPage.module.scss';

import OrderItems from '../../CartPage/OrderItems/OrderItems';
import OrderType from '../../CartPage/OrderType/OrderType';
import Container from '../../UI/Container/Container';
import PageContainer from '../../UI/PageWrapper/PageWrapper';
import PageWrapper from '../../UI/PageWrapper/PageWrapper';

const CartPage: React.FC<PropsWithChildren> = () => {
  return (
    <PageWrapper id='cart-page' className={styles.cart}>
      <OrderType />

      <OrderItems />
    </PageWrapper>
  );
};

export default CartPage;
