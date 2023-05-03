import axios, { AxiosError, AxiosResponse } from 'axios';

import { BACKEND_URL } from '../config';
import { IOrder, IOrderFromServer } from '../types/CommontTypes';
import { ICreateNewOrderResponse } from '../types/ResponseTypes';

class OrderService {
  createOrder(order: IOrder): Promise<AxiosResponse<ICreateNewOrderResponse>> {
    return axios.post(`${BACKEND_URL}/order/create`, order);
  }

  orderPaymentStatus(id: string): Promise<AxiosResponse> {
    return axios.get(`${BACKEND_URL}/order/${id}/payment-success`);
  }
}

export default new OrderService();
