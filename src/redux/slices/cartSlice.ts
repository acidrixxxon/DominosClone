import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICartState } from '../../types/CartTypes';

const setInitialState = () => {
  const LS = localStorage.getItem('cart');

  if (LS !== null) {
    return JSON.parse(LS);
  } else {
    return {
      items: [],
      totalCount: 0,
      totalCost: 0,
    };
  }
};

setInitialState();
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
  },
});

export const { addToCart, setCart } = cartSlise.actions;

export default cartSlise.reducer;
