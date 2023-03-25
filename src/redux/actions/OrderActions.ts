import lodash from 'lodash';

import OrderService from '../../utils/services/OrderService';
import { IOrder } from '../../utils/types/CommontTypes';
import { clearCart } from '../slices/cartSlice';
import { viewActions } from '../slices/viewSlice';
import { AppDispatch, GetState } from '../store';

const createNewOrder = (order: IOrder) => async (dispatch: AppDispatch, getState: GetState) => {
  if (!order) return;

  dispatch(viewActions.setCreateOrderLoader(true));

  const { data, status, statusText } = await OrderService.createOrder(order);

  if (data) {
    console.log(data);
    dispatch(viewActions.setCreateOrderLoader(false));
    if (data.order && status === 200 && statusText === 'OK') dispatch(clearCart());

    return data;
  }
};

export default {
  createNewOrder,
};
