import axios, { AxiosError, AxiosResponse } from 'axios';

import { BACKEND_URL } from '../config';
import { IOrder, IOrderFromServer } from '../types/CommontTypes';
import { ICreateNewOrderResponse, ICreateNewOrderSuccess } from '../types/ResponseTypes';

class OrderService {
  async createOrder(order: IOrder): Promise<AxiosResponse<ICreateNewOrderResponse>> {
    return await axios.post<ICreateNewOrderResponse>(`${BACKEND_URL}/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { order },
    });
  }
}

export default new OrderService();
