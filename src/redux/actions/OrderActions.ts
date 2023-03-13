import lodash from 'lodash';

import OrderService from '../../Services/OrderService';
import { IOrder, IOrderFromServer } from '../../types/CommontTypes';
import { addToCart, clearCart, removeFromCart, setCart } from '../slices/cartSlice';
import { viewActions } from '../slices/viewSlice';
import { AppDispatch, GetState, storeSetup } from '../store';

const createNewOrder = (order: IOrder) => async (dispatch: AppDispatch, getState: GetState) => {
  console.log(order);
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
