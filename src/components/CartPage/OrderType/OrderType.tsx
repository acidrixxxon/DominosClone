import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import { initialClientInfo, initialDeliveryInfo, initialDineinInfo } from '../../../Utils/constants';
import { ICustomerData } from '../../../types/UserTypes';
import ClientDataForm from '../../Forms/ClientDataForm/ClientDataForm';
import DeliveryDetailsForm from '../../Forms/DeliveryDetailsForm/DeliveryDetailsForm';
import DineInDetailsForm from '../../Forms/DineInDetailsForm/DineInDetailsForm';
import styles from './OrderType.module.scss';
import PaymentType from './PaymentType/PaymentType';
import Variants from './Variants/Variants';

const OrderType: React.FC = () => {
  const [orderType, setOrderType] = useState<number>(0);
  const [customerData, setCustomerData] = useState<ICustomerData>({
    client: initialClientInfo,
    details: orderType === 0 ? initialDeliveryInfo : initialDineinInfo,
    paymentType: null,
  });

  console.log(customerData);

  const setType = (id: number) => setOrderType(id);

  return (
    <div className={styles.orderType}>
      <h4 className={classNames(styles.orderType__heading, 'heading')}>Оформлення замовлення</h4>

      <Variants type={orderType} setType={setType} />

      <div className={styles.orderType__formContainer}>
        <ClientDataForm data={customerData.client} setData={setCustomerData} />

        <AnimatePresence>
          {orderType === 0 ? <DeliveryDetailsForm data={customerData.details} setData={setCustomerData} /> : <DineInDetailsForm />}
        </AnimatePresence>

        <PaymentType setData={setCustomerData} data={customerData.paymentType} />

        <div className={styles.orderType__totals}>
          <div className={styles.orderType__totalsText}>
            <span>Усьго</span>

            <div className={styles.orderType__price}>
              <span className={styles.paymentType__priceNumber}>324.00</span>
              <span className={styles.paymentType__priceText}>грн</span>
            </div>
          </div>

          <button className={styles.orderType__submitBtn}>Замовити</button>
        </div>
      </div>
    </div>
  );
};

export default OrderType;
