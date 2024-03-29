import lodash from 'lodash';

import { ADD_MOCARELLA, CHANGE_QTY, MINUS, MOCARELLA_ID, MOCARELLA_TYPES, PLUS, REMOVE_MOCARELLA } from '../../utils/constants';
import { IProductInCart } from '../../utils/types/ProductTypes';
import { addToCart, clearCart, removeFromCart, setCart } from '../slices/cartSlice';
import { AppDispatch, GetState } from '../store';

const addToCartAction = (item: IProductInCart) => async (dispatch: AppDispatch, getState: GetState) => {
  const { cart } = getState();

  const alreadyInCart = cart.items.find((product) => product._id === item._id);

  if (item.class === 0) {
    if (alreadyInCart) {
      console.log('da');
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
  const item = items.find((item) => item.uniqueId === id);

  if (!item) return;

  if (type === MINUS) {
    if (item.qty === 1) {
      const cartObj = {
        totalCost: totalCost - item.price,
        totalCount: totalCount - 1,
        items: items.filter((item) => item.uniqueId !== id),
      };

      dispatch(setCart(cartObj));
    } else if (item.qty > 1) {
      const itemIndex = items.findIndex((item) => item.uniqueId === id);
      console.log(itemIndex);
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
    const itemIndex = items.findIndex((item) => item.uniqueId === id);
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

const toggleMocarella = (type: MOCARELLA_TYPES, id: string) => async (dispatch: AppDispatch, getState: GetState) => {
  const {
    cart: { items, totalCost, totalCount },
  } = getState();

  const item = items.find((item) => item._id === id);
  const itemIndex = items.findIndex((item) => item._id === id);
  const mocarella = item && item.ingridients && item.ingridients.find((item) => item.ingridientId._id === MOCARELLA_ID);

  if (item && mocarella) {
    if (type === ADD_MOCARELLA) {
      const updatedItem = {
        ...item,
        ingridients:
          item.ingridients &&
          item.ingridients.map((item) => (item.ingridientId._id === MOCARELLA_ID ? { ...item, qty: item.qty + 1 } : item)),
        price: item.price + mocarella.ingridientId.addPrice,
      };

      let updatedArray = [...items];
      updatedArray[itemIndex] = updatedItem;

      const cartObj = {
        totalCount,
        items: updatedArray,
        totalCost: totalCost + updatedItem.qty * mocarella.ingridientId.addPrice,
      };

      dispatch(setCart(cartObj));
    } else if (type === REMOVE_MOCARELLA) {
      const updatedItem = {
        ...item,
        ingridients:
          item.ingridients &&
          item.ingridients.map((item) => (item.ingridientId._id === MOCARELLA_ID ? { ...item, qty: item.qty - 1 } : item)),
        price: item.price - mocarella.ingridientId.addPrice,
      };

      let updatedArray = [...items];
      updatedArray[itemIndex] = updatedItem;

      const cartObj = {
        totalCount,
        items: updatedArray,
        totalCost: totalCost - updatedItem.qty * mocarella.ingridientId.addPrice,
      };

      dispatch(setCart(cartObj));
    }
  }
};

const removeItemFromCart = (item: IProductInCart) => async (dispatch: AppDispatch, getState: GetState) => {
  const {
    cart: { items, totalCost, totalCount },
  } = getState();

  const itemInCart = items.find((prod) => prod.uniqueId === item.uniqueId);
  console.log(items);

  if (itemInCart) dispatch(removeFromCart(item));
};

const clearCartAction = () => async (dispatch: AppDispatch, getState: GetState) => {
  dispatch(clearCart());
};

export default {
  addToCartAction,
  changeQtyInCart,
  toggleMocarella,
  removeItemFromCart,
  clearCartAction,
};
