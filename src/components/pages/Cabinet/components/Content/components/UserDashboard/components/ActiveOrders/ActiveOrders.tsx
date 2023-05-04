import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';

import ActiveOrdersTable from '@/components/UI/Tables/ActiveOrdersTable/ActiveOrdersTable';
import Pagination from '@/components/common/Pagination/Pagination';

import { IPagination } from '@/utils/types/CommontTypes';

import { useFetchUserActiveOrdersQuery } from '@/redux/api/UserApi';

import styles from './ActiveOrders.module.scss';

const ActiveOrders: React.FC = () => {
  const [pagination, setPagination] = useState<IPagination<number>>({
    page: 1,
    limit: 5,
    pageCount: 1,
  });

  const { data, isLoading, isError } = useFetchUserActiveOrdersQuery(pagination.page);

  useEffect(() => {
    if (!data || !data.pagination || !data.orders) return;

    data.orders &&
      data.pagination &&
      setPagination((state) => ({
        ...state,
        pageCount: data.pagination.pageCount,
      }));
  }, [data, data?.pagination]);

  if (isError || !data) return <span>Вибачте сталася помилка!</span>;

  return (
    <div className={styles.activeOrders}>
      <div className={styles.activeOrders__headline}>
        <h4 className={classNames('headline__title')}>Поточні замовлення</h4>
      </div>

      <div className={styles.activeOrders__content}>
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
          <div
            className={styles.activeOrders__tableContainer}
            style={{
              minHeight: data.orders && data.orders.length < 3 ? '250px' : data.pagination?.pageCount === 1 ? 'auto' : '388px',
            }}>
            <ActiveOrdersTable data={data.orders} />

            <Pagination state={pagination} setState={setPagination} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveOrders;
