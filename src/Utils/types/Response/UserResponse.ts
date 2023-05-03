import { IOrderFromServer } from '../CommontTypes';

export interface UserOrders {
  all: IOrderFromServer[];
  active: IOrderFromServer[];
  finished: IOrderFromServer[];
}

export interface FetchUserOrdersSuccess {
  message: 'Ваші замовлення отримані';
  success: true;
  orders: UserOrders;
}

export interface FetchUserOrderFail {
  success: false;
  message: 'Історія замовлень відсутня';
  orders: null;
}

export type FetchUserOrdersResponse = FetchUserOrdersSuccess | FetchUserOrderFail;
