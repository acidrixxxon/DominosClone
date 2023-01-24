import { createSlice } from '@reduxjs/toolkit';
import { ICartState } from '../types/CartTypes';

const initialState: ICartState = {
  items: [],
  totalCost: 0,
  totalCount: 0,
};

export const cartSlise = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state) => {
      state.items.push();
      state.totalCount += 1;
    },
  },
});

export const { addToCart } = cartSlise.actions;

export default cartSlise.reducer;
