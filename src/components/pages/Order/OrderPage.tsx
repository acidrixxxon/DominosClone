import React, { useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import OrderService from '@/utils/services/OrderService';

import styles from './OrderPage.module.scss';

import { useFetchOrderQuery } from '../../../redux/api/ProductApi';
import OrderDetails from '../../OrderPage/OrderDetails/OrderDetails';
import OrderItems from '../../OrderPage/OrderItems/OrderItems';
import Container from '../../UI/Container/Container';
import PageContainer from '../../UI/PageWrapper/PageWrapper';

const OrderPage: React.FC = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isSuccess, isLoading } = useFetchOrderQuery(id);

  useEffect(() => {
    if (!id) return;
    const paymentStatus = search.split('=')[1];
    console.log(location.search.split('=')[1] === 'success');
    if (paymentStatus === 'success') {
      OrderService.orderPaymentStatus(id).then((res) => {
        console.log(res);
        // if (res.data.order && res.data.success && res.status === 200) navigate(`/order/${id}`);
      });
    }
  }, [search, id]);

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
