import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IViewState } from '../../utils/types/ViewTypes';

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
  loaders: {
    createOrderLoader: false,
  },
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
      state.sort = {
        id: 0,
        title: 'популярністю',
      };
    },
    setSort: (state, action: PayloadAction<{ id: number; title: string }>) => {
      state.sort = action.payload;
    },
    setCreateOrderLoader: (state, action: PayloadAction<boolean>) => {
      state.loaders.createOrderLoader = action.payload;
    },
  },
});

export const viewActions = viewSlise.actions;

export default viewSlise.reducer;
