import { useAppSelector } from '@/hooks/useAppSelector';
import dayjs from 'dayjs';
import { isObject, isString } from 'lodash';

import { IRestaurant } from './types/CommontTypes';
import { ICustomerData } from './types/UserTypes';

export const translate = (title: string): string | boolean => {
  if (!title) return false;

  let newTitle: string = '';

  if (title === 'name') {
    newTitle = `Ім'я`;
  } else if (title === 'phone') {
    newTitle = 'Телефон';
  } else if (title === 'email') {
    newTitle = 'Email';
  } else if (title === 'contacts') {
    newTitle = 'Контакти';
  } else if (title === 'payment') {
    newTitle = 'Спосіб оплати';
  } else if (title === 'address') {
    newTitle = 'Адреса';
  } else if (title === 'comments') {
    newTitle = `Коментар для кур'єра`;
  }

  return newTitle;
};

export const setInitialClientInfo = () => {
  const {
    user: { user },
  } = useAppSelector((state) => state);
  console.log(user);
  const dataFromStorage = localStorage.getItem('customer');

  if (isObject(user)) {
    return {
      name: user.firstName,
      phone: user.phone,
      email: user.email,
    };
  } else if (isString(dataFromStorage) && dataFromStorage) {
    return JSON.parse(dataFromStorage);
  } else {
    return {
      name: '',
      phone: '',
      email: '',
    };
  }
};

export const setInitialDeliveryInfo = () => {
  const dataFromStorage = localStorage.getItem('deliveryAddress');
  if (isString(dataFromStorage) && dataFromStorage) {
    return JSON.parse(dataFromStorage);
  } else {
    return {
      street: '',
      house: '',
      room: '',
      floor: '',
      comments: '',
    };
  }
};

export const setInitialDineinInfo = (): { restaurant: IRestaurant } | null => {
  const dataFromStorage = localStorage.getItem('dineinAddress');

  dataFromStorage && console.log(JSON.parse(dataFromStorage));
  if (isString(dataFromStorage) && dataFromStorage) {
    const data = JSON.parse(dataFromStorage);

    return {
      restaurant: data.restaurant,
    };
  }

  return null;
};

export const setInitialCustomerData = (orderType: number): ICustomerData => {
  return {
    client: setInitialClientInfo(),
    details: orderType === 0 ? setInitialDeliveryInfo() : setInitialDineinInfo(),
    paymentType: null,
  };
};

export const isEmptyString = (value: string): boolean => {
  return value.trim() === '' && value.trim().length < 1;
};

export const shortedOrderId = (id: string): string => {
  return id
    .split('')
    .splice(id.length - 5, id.length)
    .join('');
};

export const formatDate = (date: string, format: string): string => {
  return dayjs(date).locale('uk').format(format).toString();
};
