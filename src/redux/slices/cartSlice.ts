import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import LocalStorageService from '../../Services/LocalStorageService';
import { ICartState } from '../../types/CartTypes';

const initialState: ICartState =
  localStorage.getItem('cart') !== null
    ? LocalStorageService.getCart()
    : {
        items: [],
        totalCost: 0,
        totalCount: 0,
      };

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
