import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';

import ActiveOrdersTable from '@/components/UI/Tables/ActiveOrdersTable/ActiveOrdersTable';
import FinishedOrdersTable from '@/components/UI/Tables/FinishedOrdersTable/FinishedOrdersTable';
import NoActiveOrders from '@/components/common/NoActiveOrders/NoActiveOrders';

import { useFetchOrderQuery } from '@/redux/api/ProductApi';
import { useFetchUserOrdersQuery } from '@/redux/api/UserApi';

import styles from './OrderHistory.module.scss';

const OrdersHistory: React.FC = () => {
  const [actualOrders, setActualOrders] = useState(true);
  const { data, isLoading } = useFetchUserOrdersQuery();
  console.log(data);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.ordersHistory}>
      <div className={styles.ordersHistory__headline}>
        <h4 className={classNames('headline__title')}>Мої замовлення</h4>

        <div className={styles.ordersHistory__buttonsGroup}>
          <button className={classNames({ [styles.active]: actualOrders })} onClick={() => setActualOrders(true)}>
            Поточні ({data?.orders?.active.length})
          </button>
          <button className={classNames({ [styles.active]: !actualOrders })} onClick={() => setActualOrders(false)}>
            Архів ({data?.orders?.finished.length})
          </button>
        </div>
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
        <div className={styles.ordersHistory__tableContainer}>
          {actualOrders && data && data.orders ? (
            <ActiveOrdersTable data={data.orders.active} />
          ) : (
            <FinishedOrdersTable data={data?.orders?.finished} />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default OrdersHistory;
