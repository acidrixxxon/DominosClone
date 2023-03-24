import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICartState } from '../../utils/types/CartTypes';
import { IProductInCart } from '../../utils/types/ProductTypes';

const setInitialState = () => {
  const LS = localStorage.getItem('cart');

  if (LS !== null) {
    const parsedCart = JSON.parse(LS);
    if (parsedCart.items.length === 0) {
      return {
        items: [],
        totalCount: 0,
        totalCost: 0,
      };
    }

    return parsedCart;
  } else {
    return {
      items: [],
      totalCount: 0,
      totalCost: 0,
    };
  }
};

const initialState: ICartState = setInitialState();

export const cartSlise = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartState>) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.totalCost = action.payload.totalCost;
    },
    setCart: (state, action: PayloadAction<ICartState>) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.totalCost = action.payload.totalCost;
    },
    removeFromCart: (state, action: PayloadAction<IProductInCart>) => {
      state.items = state.items.filter((item) => item.uniqueId !== action.payload.uniqueId);
      state.totalCount = state.totalCount - action.payload.qty;
      state.totalCost = state.totalCost - action.payload.qty * action.payload.price;
    },
    clearCart: (state: ICartState) => {
      state.items = [];
      state.totalCost = 0;
      state.totalCount = 0;
    },
  },
});

export const { addToCart, setCart, removeFromCart, clearCart } = cartSlise.actions;

export default cartSlise.reducer;
