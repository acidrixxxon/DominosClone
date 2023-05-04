import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import MotionTable from '@/components/common/MotionContainer/MotionTable/MotionTable';
import MotionTr from '@/components/common/MotionContainer/MotionTr/MotionTr';
import NoActiveOrders from '@/components/common/NoActiveOrders/NoActiveOrders';

import { formatDate, shortedOrderId } from '@/utils/helpers';
import { IOrderFromServer } from '@/utils/types/CommontTypes';

import styles from './FinishedOrdersTable.module.scss';

interface ComponentProps {
  data: IOrderFromServer[] | undefined;
}

const FinishedOrdersTable: React.FC<ComponentProps> = ({ data }) => {
  if (!data) return <NoActiveOrders />;

  const navigate = useNavigate();

  const navigateHandler = (e: React.MouseEvent<HTMLElement>, url: string): void => {
    e.preventDefault();

    navigate(`/order/${url}`);
  };

  return (
    <MotionTable className={styles.table}>
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
          <MotionTr
            key={item._id}
            onClick={(e) => navigateHandler(e, item._id)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.7, y: 0, transition: { duration: 0.1, opacity: { delay: 0.1 } } }}
            exit={{}}>
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
          </MotionTr>
        ))}
      </tbody>
    </MotionTable>
  );
};

export default FinishedOrdersTable;
