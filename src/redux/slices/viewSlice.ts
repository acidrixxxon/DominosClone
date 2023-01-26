import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IViewState } from '../types/ViewTypes';

const initialState: IViewState = {
  modals: {
    auth: {
      visible: false,
    },
  },
  sort: {
    id: 0,
    title: 'популярністю',
  },
  category: 0,
};

export const viewSlise = createSlice({
  name: 'view',
  initialState,
  reducers: {
    showAuthModal: (state) => {
      state.modals.auth.visible = true;
    },
    hideAuthModal: (state) => {
      state.modals.auth.visible = false;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<{ id: number; title: string }>) => {
      state.sort = action.payload;
    },
  },
});

export const viewActions = viewSlise.actions;

export default viewSlise.reducer;
