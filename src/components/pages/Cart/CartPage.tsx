import React, { PropsWithChildren } from 'react';

import styles from './CartPage.module.scss';

import OrderItems from '../../CartPage/OrderItems/OrderItems';
import OrderType from '../../CartPage/OrderType/OrderType';
import Container from '../../UI/Container/Container';
import PageContainer from '../../UI/PageWrapper/PageWrapper';

const CartPage: React.FC<PropsWithChildren> = () => {
  return (
    <PageContainer id='cart-page' className={styles.cart}>
      <Container className={styles.cart__container}>
        <OrderType />

        <OrderItems />
      </Container>
    </PageContainer>
  );
};

export default CartPage;
