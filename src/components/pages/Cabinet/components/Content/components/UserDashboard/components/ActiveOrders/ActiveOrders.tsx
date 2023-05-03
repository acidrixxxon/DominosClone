import React from 'react';
import { Oval } from 'react-loader-spinner';

import ActiveOrdersTable from '@/components/UI/Tables/ActiveOrdersTable/ActiveOrdersTable';
import NoActiveOrders from '@/components/common/NoActiveOrders/NoActiveOrders';

import { useFetchUserOrdersQuery } from '@/redux/api/UserApi';

import styles from './ActiveOrders.module.scss';

const ActiveOrders: React.FC = () => {
  const { data, isLoading, isError } = useFetchUserOrdersQuery();

  const activeOrders = data && data.orders && data.orders.active.length > 0 ? true : false;

  return (
    <div className={styles.activeOrders}>
      <div className={styles.activeOrders__headline}>
        <h4 className='headline__title'>Поточні замовлення</h4>
      </div>

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
        <div className={styles.activeOrders__content}>
          {activeOrders ? (
            <div className={styles.activeOrders__tableContainer}>
              <ActiveOrdersTable data={data?.orders?.active} />
            </div>
          ) : (
            <NoActiveOrders />
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveOrders;
