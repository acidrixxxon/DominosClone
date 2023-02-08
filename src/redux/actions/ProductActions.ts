import lodash from 'lodash';

import { CHANGE_QTY, MINUS, PLUS } from '../../Utils/constants';
import { addToCart, setCart } from '../slices/cartSlice';
import { AppDispatch, GetState, storeSetup } from '../store';
import { IProductInCart } from '../types/ProductTypes';

const addToCartAction = (item: IProductInCart) => async (dispatch: AppDispatch, getState: GetState) => {
  const { cart } = getState();

  const alreadyInCart = cart.items.find((product) => product._id === item._id);

  if (item.class === 0) {
    if (alreadyInCart) {
      const sameIngridients = lodash.isEqual(item.ingridients, alreadyInCart.ingridients);

      if (sameIngridients) {
        const index = cart.items.findIndex((product) => product._id === item._id);

        let updatedObj = Object.assign({}, alreadyInCart);
        updatedObj = {
          ...updatedObj,
          qty: updatedObj.qty + 1,
        };

        const cartitems = [...cart.items];
        cartitems[index] = updatedObj;

        const cartObj = {
          items: cartitems,
          totalCost: cart.totalCost + updatedObj.price,
          totalCount: cart.totalCount + 1,
        };

        dispatch(addToCart(cartObj));
      } else {
        const cartObj = {
          items: [...cart.items, item],
          totalCost: cart.totalCost + item.qty * item.price,
          totalCount: cart.totalCount + item.qty,
        };

        dispatch(addToCart(cartObj));
      }
    } else {
      const cartObj = {
        items: [...cart.items, item],
        totalCost: cart.totalCost + item.qty * item.price,
        totalCount: cart.totalCount + item.qty,
      };

      dispatch(addToCart(cartObj));
    }
  } else {
    if (alreadyInCart) {
      const index = cart.items.findIndex((product) => product._id === item._id);

      let updatedObj = Object.assign({}, alreadyInCart);
      updatedObj = {
        ...updatedObj,
        qty: updatedObj.qty + 1,
      };

      const cartitems = [...cart.items];
      cartitems[index] = updatedObj;

      const cartObj = {
        items: cartitems,
        totalCost: cart.totalCost + updatedObj.price,
        totalCount: cart.totalCount + 1,
      };

      dispatch(addToCart(cartObj));
    } else {
      const cartObj = {
        items: [...cart.items, item],
        totalCost: cart.totalCost + item.qty * item.price,
        totalCount: cart.totalCount + item.qty,
      };

      dispatch(addToCart(cartObj));
    }
  }
};

const changeQtyInCart = (type: CHANGE_QTY, id: string) => async (dispatch: AppDispatch, getState: GetState) => {
  const {
    cart: { items, totalCost, totalCount },
  } = getState();
  const item = items.find((item) => item._id === id);

  if (!item) return;

  if (type === MINUS) {
    if (item.qty === 1) {
      const cartObj = {
        totalCost: totalCost - item.price,
        totalCount: totalCount - 1,
        items: items.filter((item) => item._id !== id),
      };

      dispatch(setCart(cartObj));
    } else if (item.qty > 1) {
      const itemIndex = items.findIndex((item) => item._id === id);
      let updatedArray = [...items];
      updatedArray[itemIndex] = { ...item, qty: item.qty - 1 };

      const cartObj = {
        items: updatedArray,
        totalCost: totalCost - item.price,
        totalCount: totalCount - 1,
      };

      dispatch(setCart(cartObj));
    }
  } else if (type === PLUS) {
    const itemIndex = items.findIndex((item) => item._id === id);
    let updatedArray = [...items];
    updatedArray[itemIndex] = { ...item, qty: item.qty + 1 };

    const cartObj = {
      items: updatedArray,
      totalCost: totalCost + item.price,
      totalCount: totalCount + 1,
    };

    dispatch(setCart(cartObj));
  }
};

export default {
  addToCartAction,
  changeQtyInCart,
};
