import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import LocalStorageService from '../../../Services/LocalStorageService';
import { NewOrderDto } from '../../../Utils/Dto';
import { initialClientInfo, initialDeliveryInfo, initialDineinInfo } from '../../../Utils/constants';
import { orderFormValidate, totalErrors } from '../../../Utils/formValidators';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { ICustomerData } from '../../../types/UserTypes';
import ClientDataForm from '../../Forms/ClientDataForm/ClientDataForm';
import DeliveryDetailsForm from '../../Forms/DeliveryDetailsForm/DeliveryDetailsForm';
import DineInDetailsForm from '../../Forms/DineInDetailsForm/DineInDetailsForm';
import styles from './OrderType.module.scss';
import PaymentType from './PaymentType/PaymentType';
import Variants from './Variants/Variants';

const OrderType: React.FC = () => {
  const [errors, setErrors] = useState<totalErrors | null>(null);
  const [orderType, setOrderType] = useState<number>(0);
  const [customerData, setCustomerData] = useState<ICustomerData>({
    client: typeof initialClientInfo === 'string' ? JSON.parse(initialClientInfo) : initialClientInfo,
    details: orderType === 0 ? initialDeliveryInfo : initialDineinInfo,
    paymentType: null,
  });

  const { cart } = useAppSelector((state) => state);

  const setType = (id: number) => {
    setOrderType(id);
    setCustomerData((state) => ({
      ...state,
      paymentType: null,
      details: orderType !== 0 ? initialDeliveryInfo : initialDineinInfo,
    }));
  };

  const buttonStatus =
    customerData.client.email !== '' &&
    customerData.client.phone !== '' &&
    customerData.client.name !== '' &&
    customerData.paymentType !== null &&
    customerData.details.street !== '' &&
    customerData.details.house !== '';

  const submitHandler = () => {
    setErrors(null);

    const { errors, result } = orderFormValidate(customerData, orderType);

    if (result) {
      setErrors(null);

      console.log(NewOrderDto(orderType, customerData, cart));
      LocalStorageService.saveCustomerData(customerData.client);
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className={styles.orderType}>
      <h4 className={classNames(styles.orderType__heading, 'heading')}>Оформлення замовлення</h4>

      <Variants type={orderType} setType={setType} />

      <div className={styles.orderType__formContainer}>
        <ClientDataForm err={{ errors, setErrors }} data={customerData.client} setData={setCustomerData} />

        <AnimatePresence>
          {orderType === 0 ? (
            <DeliveryDetailsForm err={{ errors, setErrors }} data={customerData.details} setData={setCustomerData} />
          ) : (
            <DineInDetailsForm data={customerData.details} setData={setCustomerData} />
          )}
        </AnimatePresence>

        <PaymentType
          err={{ errors, setErrors }}
          setData={setCustomerData}
          data={customerData.paymentType}
          orderType={orderType}
          state1={customerData}
        />

        <div className={styles.orderType__totals}>
          <div className={styles.orderType__totalsText}>
            <span>Усьго</span>

            <div className={styles.orderType__price}>
              <span className={styles.paymentType__priceNumber}>324.00</span>
              <span className={styles.paymentType__priceText}>грн</span>
            </div>
          </div>

          <button
            disabled={!buttonStatus}
            className={classNames(styles.orderType__submitBtn, { [styles.orderType__submitBtnDisabled]: !buttonStatus })}
            onClick={submitHandler}>
            Замовити
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderType;
