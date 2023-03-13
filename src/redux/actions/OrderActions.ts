import lodash from 'lodash';

import OrderService from '../../Services/OrderService';
import { IOrder } from '../../types/CommontTypes';
import { clearCart } from '../slices/cartSlice';
import { viewActions } from '../slices/viewSlice';
import { AppDispatch, GetState } from '../store';

const createNewOrder = (order: IOrder) => async (dispatch: AppDispatch, getState: GetState) => {
  if (!order) return;

  dispatch(viewActions.setCreateOrderLoader(true));

  const { data, status, statusText } = await OrderService.createOrder(order);

  if (status === 200 && statusText === 'OK') {
    dispatch(viewActions.setCreateOrderLoader(false));
    dispatch(clearCart());
    return data;
  }
};

export default {
  createNewOrder,
};
