import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import MotionTr from '@/components/common/MotionContainer/MotionTr/MotionTr';
import NoActiveOrders from '@/components/common/NoActiveOrders/NoActiveOrders';

import { formatDate, shortedOrderId } from '@/utils/helpers';
import { IOrderFromServer } from '@/utils/types/CommontTypes';

import styles from './ActiveOrdersTable.module.scss';

interface ComponentProps {
  data: IOrderFromServer[] | null;
}

const ActiveOrdersTable: React.FC<ComponentProps> = ({ data }) => {
  const activeOrders = data && data.length > 0;

  const navigate = useNavigate();

  const navigateHandler = (e: React.MouseEvent<HTMLElement>, url: string): void => {
    e.preventDefault();

    navigate(`/order/${url}`);
  };

  if (!activeOrders) return <NoActiveOrders />;

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
        <AnimatePresence mode='wait'>
          {data.map((item, index) => (
            <MotionTr
              onClick={(e) => navigateHandler(e, item._id)}
              key={item._id}
              initial={{
                opacity: 0,
                translateY: -10,
                scale: 0.97,
              }}
              animate={{
                opacity: 0.9,
                translateY: 0,
                scale: 0.97,
                transition: {
                  delay: index * 0.15,
                  opacity: {
                    duration: 0.3,
                  },
                  translateY: {
                    duration: 0.1,
                  },
                },
              }}
              exit='none'>
              <td>{shortedOrderId(item._id)}</td>
              <td>{formatDate(item.createdAt, 'D.MM.YYYY, HH:MM')}</td>
              <td>{item.details.orderType.title}</td>
              <td>
                {item.details.orderType.id === 0 ? (
                  `вул.${item.details.customerData.details.street}, буд.${item.details.customerData.details.house}`
                ) : (
                  <>${item.details.customerData.details.restaurant?.title}</>
                )}
              </td>
              <td>{item.details.customerData.client.phone}</td>
              <td>{item.cart.totalCost}.00</td>
              <td>
                <button>{item.status.title}</button>
              </td>
            </MotionTr>
          ))}
        </AnimatePresence>
      </tbody>
    </motion.table>
  );
};

export default ActiveOrdersTable;
