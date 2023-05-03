import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

import NoActiveOrders from '@/components/common/NoActiveOrders/NoActiveOrders';

import { formatDate, shortedOrderId } from '@/utils/helpers';
import { IOrderFromServer } from '@/utils/types/CommontTypes';

import styles from './FinishedOrdersTable.module.scss';

interface ComponentProps {
  data: IOrderFromServer[] | undefined;
}

const FinishedOrdersTable: React.FC<ComponentProps> = ({ data }) => {
  if (!data) return <NoActiveOrders />;

  return (
    <motion.table initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.table}>
      <thead>
        <tr>
          <th>Номер замовлення</th>
          <th>Дата та час замовлення</th>
          <th>Тип</th>
          <th>Адреса</th>
          <th>Телефон</th>
          <th>Сума</th>
          <th>Статус</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <Link to={`/order/${item._id}`} key={item._id}>
            <tr key={item._id}>
              <td>{shortedOrderId(item._id)}</td>
              <td>{formatDate(item.createdAt, 'D.MM.YYYY, HH:MM')}</td>
              <td>{item.details.orderType.title}</td>
              <td>
                {item.details.orderType.id === 0 ? (
                  `вул.${item.details.customerData.details.street}, буд.${item.details.customerData.details.house}`
                ) : (
                  <>${item.details.customerData.details.restaurant}</>
                )}
              </td>
              <td>{item.details.customerData.client.phone}</td>
              <td>{item.cart.totalCost}.00</td>
              <td>{item.status.title}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </motion.table>
  );
};

export default FinishedOrdersTable;
