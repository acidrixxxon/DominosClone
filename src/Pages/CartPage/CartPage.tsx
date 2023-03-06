import React, { PropsWithChildren } from 'react';

import OrderItems from '../../components/CartPage/OrderItems/OrderItems';
import OrderType from '../../components/CartPage/OrderType/OrderType';
import Container from '../../components/UI/Container/Container';
import PageContainer from '../../components/UI/PageContainer/PageContainer';
import styles from './CartPage.module.scss';

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
