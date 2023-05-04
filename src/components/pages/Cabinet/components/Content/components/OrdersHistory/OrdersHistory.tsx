import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';

import ActiveOrdersTable from '@/components/UI/Tables/ActiveOrdersTable/ActiveOrdersTable';
import FinishedOrdersTable from '@/components/UI/Tables/FinishedOrdersTable/FinishedOrdersTable';
import MotionDiv from '@/components/common/MotionContainer/MotionDiv/MotionDiv';
import Pagination from '@/components/common/Pagination/Pagination';

import { IPagination } from '@/utils/types/CommontTypes';
import { ORDER_STATUS } from '@/utils/types/enums';

import { useFetchUserOrdersQuery } from '@/redux/api/UserApi';

import styles from './OrderHistory.module.scss';

const OrdersHistory: React.FC = () => {
  const [actualOrders, setActualOrders] = useState(true);
  const [pagination, setPagination] = useState<IPagination<number>>({
    page: 1,
    limit: 5,
    pageCount: 1,
  });
  const { data, isLoading, isError } = useFetchUserOrdersQuery({ page: pagination.page, limit: pagination.limit });

  useEffect(() => {
    if (!data || !data.pagination || !data.orders || isLoading) return;

    data.orders &&
      data.pagination &&
      setPagination((state) => ({
        ...state,
        pageCount: actualOrders ? data.pagination.pageCount.active : data.pagination.pageCount.finished,
      }));
  }, [data, data?.pagination, actualOrders]);

  const changeTypeHandler = (type: ORDER_STATUS.ACTIVE | ORDER_STATUS.FINISHED): void => {
    if (type === 'active') setActualOrders(true);
    if (type === 'finished') setActualOrders(false);

    setPagination((state) => ({
      ...state,
      page: 1,
    }));
  };

  if (!isLoading && (isError || !data || !data.orders || !data.orders.finished)) return <span>Вибачте сталася помилка!</span>;

  return (
    <MotionDiv className={styles.ordersHistory}>
      <div className={styles.ordersHistory__headline}>
        <h4 className={classNames('headline__title')}>Мої замовлення</h4>

        <div className={styles.ordersHistory__buttonsGroup}>
          <button className={classNames({ [styles.active]: actualOrders })} onClick={() => changeTypeHandler(ORDER_STATUS.ACTIVE)}>
            Поточні {data && data.orders.qty.active && `(${data.orders.qty.active})`}
          </button>
          <button className={classNames({ [styles.active]: !actualOrders })} onClick={() => changeTypeHandler(ORDER_STATUS.FINISHED)}>
            Архів {data && data.orders.qty.finished && `(${data.orders.qty.finished})`}
          </button>
        </div>
      </div>

      <div className={styles.ordersHistory__content}>
        {isLoading ? (
          <Oval
            height={80}
            width={80}
            color='#4f4f4f'
            wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
            visible={true}
            ariaLabel='loading-indicator'
            secondaryColor='#151617'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          <div className={styles.ordersHistory__tableContainer}>
            {actualOrders ? <ActiveOrdersTable data={data.orders.active} /> : <FinishedOrdersTable data={data.orders.finished} />}

            <Pagination state={pagination} setState={setPagination} />
          </div>
        )}
      </div>
    </MotionDiv>
  );
};

export default OrdersHistory;
