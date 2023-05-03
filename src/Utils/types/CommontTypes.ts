import { ICartState } from './CartTypes';
import { ICustomerData } from './UserTypes';

export interface LoginFormFieldInterface {
  email: string;
  password: string;
}

export interface RegisterFormFieldInterface {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IRestaurant {
  id: number;
  title: string;
}

export interface IOrder {
  cart: ICartState;
  details: {
    customerData: ICustomerData;
    orderType: {
      id: number;
      title: string;
    };
  };
}

export interface IOrderFromServer {
  _id: string;
  cart: ICartState;
  createdAt: string;
  updatedAt: string;
  details: {
    customerData: ICustomerData;
    orderType: {
      id: number;
      title: string;
    };
  };
  status: {
    id: number;
    title: string;
  };
}

export const enum ICabinetTabs {
  PROFILE = 'profile',
  ORDERS = 'orders',
  USER_DASHBOARD = 'user_dashboard',
  ADMIN_DASHBOARD = 'admin_dashboard',
  LOGOUT = 'LOGOUT',
}

export const enum ICabinetTabNames {
  USER_DASHBOARD = 'Головна',
  PROFILE = 'Профіль',
  ORDERS = 'Замовлення',
}
