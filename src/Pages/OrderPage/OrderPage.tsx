import React from 'react';
import { Triangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import { useFetchOrderQuery } from '../../Api/ProductApi';
import OrderDetails from '../../components/OrderPage/OrderDetails/OrderDetails';
import OrderItems from '../../components/OrderPage/OrderItems/OrderItems';
import Container from '../../components/UI/Container/Container';
import PageContainer from '../../components/UI/PageContainer/PageContainer';
import styles from './OrderPage.module.scss';

const OrderPage: React.FC = () => {
  const { id } = useParams();
  const { data, error, isSuccess, isLoading } = useFetchOrderQuery(id);
  console.log(data);

  const renderCondition = data && data.success && data.order && isSuccess;
  return (
    <PageContainer className={styles.orderPage}>
      <Container className={styles.orderPage__container}>
        <h4 className={styles.orderPage__heading}>Статус замовлення</h4>

        {isLoading && (
          <Triangle
            height='300'
            width='300'
            color='var(--gray-color)'
            ariaLabel='triangle-loading'
            wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-150px,-150px)' }}
            visible={true}
          />
        )}

        {renderCondition && (
          <>
            <OrderDetails data={data.order} />
            <OrderItems cart={data.order.cart} />
          </>
        )}
      </Container>
    </PageContainer>
  );
};

export default OrderPage;
