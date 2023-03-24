import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { motion } from 'framer-motion';
import React from 'react';

import { IOrderFromServer } from '../../../utils/types/CommontTypes';
import InfoGroup from './InfoGroup/InfoGroup';
import styles from './OrderDetails.module.scss';

interface ComponentProps {
  data: IOrderFromServer;
}

const OrderDetails: React.FC<ComponentProps> = ({ data }) => {
  const shortedId = data._id.split('').splice(data._id.length - 5, data._id.length);
  const formattedDate = dayjs(data.createdAt).locale('uk').format('D MMMM YYYY - HH:MM').toString();

  return (
    <motion.div className={styles.orderDetails} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={styles.orderDetails__heading}>
        Замовлення #{shortedId} {`${formattedDate && ` , ${formattedDate}`}`}
      </div>

      <div className={styles.orderDetails__content}>
        <div className={styles.orderDetails__status}>
          <img src={`https://dominospizza-clone.netlify.app/img/${data.status.id}.gif`} alt='' />
        </div>

        <div className={styles.orderDetails__details}>
          <InfoGroup title='contacts' data={data.details.customerData.client} key='211' />

          <InfoGroup
            key='2121'
            title='address'
            data={{ orderType: data.details.orderType, details: data.details.customerData.details, createdAt: data.createdAt }}
          />

          <InfoGroup key='21212' title='payment' data={data.details.customerData.paymentType} />

          {data.details.customerData.details.comments && (
            <InfoGroup key='212321' title='comments' data={data.details.customerData.details.comments} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
