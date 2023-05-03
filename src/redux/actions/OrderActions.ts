import { InitOptions } from 'react-redux/es/connect/selectorFactory';
import { toast } from 'react-toastify';

import LocalStorageService from '@/utils/services/LocalStorageService';
import { ICreateNewOrderResponse, ResponseError, ResponseSuccess } from '@/utils/types/ResponseTypes';

import OrderService from '../../utils/services/OrderService';
import { IOrder, IOrderFromServer } from '../../utils/types/CommontTypes';
import { clearCart } from '../slices/cartSlice';
import { viewActions } from '../slices/viewSlice';
import { AppDispatch, GetState } from '../store';

const createNewOrder =
  (orderDto: IOrder) =>
  async (dispatch: AppDispatch, getState: GetState): Promise<({ order: IOrderFromServer } & ResponseSuccess) | ResponseError> => {
    const { setCreateOrderLoader } = viewActions;
    try {
      if (!orderDto) throw new Error('Помилка при створенні замовлення');

      dispatch(setCreateOrderLoader(true));

      const {
        data: { order, message, success },
        status,
      } = await OrderService.createOrder(orderDto);

      if (!order) throw new Error('Помилка стврорення замовлення');

      if (success && status === 200) {
        dispatch(clearCart());
        LocalStorageService.saveCustomerData(order.details.customerData, order.details.orderType.id);
      }

      dispatch(setCreateOrderLoader(false));

      return {
        success,
        order,
        message,
      };
    } catch (error: any) {
      const errorMessage = error.response.data.message ? error.response.data.message : error.message;
      dispatch(setCreateOrderLoader(false));

      toast.error(errorMessage);

      return {
        success: error.response.data.success,
        message: errorMessage,
      };
    }
  };

export default {
  createNewOrder,
};
