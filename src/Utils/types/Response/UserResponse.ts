import { IOrderFromServer, IPagination } from '../CommontTypes';
import { ResponseError, ResponseSuccess } from '../ResponseTypes';

export interface UserOrders {
  all: IOrderFromServer[];
  active: IOrderFromServer[];
  finished: IOrderFromServer[];
  qty: {
    total: number;
    finished: number;
    active: number;
  };
}

export interface FetchUserOrdersSuccess extends ResponseSuccess {
  message: 'Ваші замовлення отримані';
  orders: UserOrders;
  pagination: IPagination<{ active: number; finished: number }>;
}

export interface FetchUserOrderFail extends ResponseError {
  message: 'Історія замовлень відсутня';
  orders: null;
  pagination: null;
}

export type FetchUserOrdersResponse = FetchUserOrdersSuccess | FetchUserOrderFail;

export interface FetchUserActiveOrdersSuccess extends ResponseSuccess {
  message: 'Активні замовлення отримані!';
  orders: IOrderFromServer[];
  pagination: IPagination<number>;
}

export interface FetchUserActiveOrdersFail extends ResponseError {
  message: 'У вас відсутні активні замовлення!';
  orders: null;
  pagination: null;
}

export type FetchUserActiveOrdersResponse = FetchUserActiveOrdersSuccess | FetchUserActiveOrdersFail;
