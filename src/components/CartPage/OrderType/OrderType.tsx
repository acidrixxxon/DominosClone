import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { InfinitySpin, ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import LocalStorageService from '../../../Services/LocalStorageService';
import { NewOrderDto } from '../../../Utils/Dto';
import { initialClientInfo, initialDeliveryInfo, initialDineinInfo } from '../../../Utils/constants';
import { orderFormValidate, totalErrors } from '../../../Utils/formValidators';
import { useAppSelector } from '../../../hooks/useAppSelector';
import OrderActions from '../../../redux/actions/OrderActions';
import { useActionCreators } from '../../../redux/store';
import { ICreateNewOrderResponse, ICreateNewOrderSuccess } from '../../../types/ResponseTypes';
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

  const navigate = useNavigate();

  const {
    cart,
    view: {
      loaders: { createOrderLoader },
    },
  } = useAppSelector((state) => state);
  const { createNewOrder } = useActionCreators(OrderActions);

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
    customerData.details.house !== '' &&
    cart.items.length > 0;

  const submitHandler = async () => {
    setErrors(null);

    const { errors, result } = orderFormValidate(customerData, orderType);

    if (result) {
      setErrors(null);

      const orderDto = NewOrderDto(orderType, customerData, cart);

      if (orderDto) {
        LocalStorageService.saveCustomerData(customerData.client);
        const data: ICreateNewOrderSuccess = await createNewOrder(orderDto);
        if (data) navigate(`/order/${data.order._id}`);
      }
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
            {createOrderLoader ? (
              <span className={styles.orderType__loader}>
                {' '}
                Створюємо{' '}
                <ThreeDots
                  height='50'
                  width='50'
                  radius='5'
                  color='var(--gray-color)'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{ marginLeft: '10px' }}
                  visible={true}
                />
              </span>
            ) : (
              'Замовити'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderType;
