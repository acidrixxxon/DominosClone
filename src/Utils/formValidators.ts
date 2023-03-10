import { IAddressData1, IClientData, ICustomerData, IPaymentType } from '../types/UserTypes';

interface IDeliveryErrors {
  street: string[] | null;
  house: string[] | null;
  restaurant?: null;
}

interface IDineinErrors {
  restaurant: string[] | null;
  street?: null;
  house?: null;
}

export interface IClientErrors {
  name: string[];
  phone: string[];
  email: string[];
  paymentType: string[];
}

export type detailsErrors = IDeliveryErrors | IDineinErrors;
export type totalErrors = IClientErrors & detailsErrors;

export const orderFormValidate = (
  data: { client: IClientData; details: IAddressData1; paymentType: IPaymentType | null },
  orderType: number,
) => {
  let result: boolean = true;

  const deliveryErrors: IDeliveryErrors = {
    street: [],
    house: [],
  };

  const dineinErrors: IDineinErrors = {
    restaurant: [],
  };

  const clientErrors: IClientErrors = {
    name: [],
    phone: [],
    email: [],
    paymentType: [],
  };

  const totalErrors: detailsErrors & IClientErrors =
    orderType === 0
      ? {
          ...deliveryErrors,
          ...clientErrors,
        }
      : {
          ...dineinErrors,
          ...clientErrors,
        };

  for (const prop in data.client) {
    if (data.client[prop] === '') {
      totalErrors[prop].push(`Ви не ввели ${prop}`);
      result = false;
    }

    if (prop === 'phone' && data.client[prop].length < 8) {
      totalErrors[prop].push(`Номер містить меньше 8 цифр`);
      result = false;
    } else if (prop === 'email') {
      if (!data.client[prop].includes('@') || !data.client.email.split('@')[1].includes('.')) {
        totalErrors[prop].push(`Не корректний email`);
        result = false;
      }
    }
  }

  if (orderType === 1 && data.details.restaurant === null && totalErrors.restaurant) {
    totalErrors.restaurant.push(`Оберіть тип оплати`);
    result = false;
  }

  if (orderType === 0) {
    for (const prop in data.details) {
      if (prop === 'street' || prop === 'house') {
        if (data.details[prop].trim() === '') {
          totalErrors[prop]?.push(`Заповніть поля адреси`);
          result = false;
        }
      }
    }
  }

  if (data.paymentType === null) {
    totalErrors.paymentType.push(`Оберіть тип оплати`);
    result = false;
  }

  return {
    errors: totalErrors,
    result,
  };
};
