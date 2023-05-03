import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IViewState } from '../../utils/types/ViewTypes';

const initialState: IViewState = {
  modals: {
    auth: {
      visible: false,
    },
  },
  analytics: 'month',
  sort: {
    id: 0,
    title: 'популярністю',
  },
  category: 0,
  loaders: {
    createOrderLoader: false,
    globalLoader: false,
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
    setGlobalLoader: (state, action: PayloadAction<boolean>) => {
      state.loaders.globalLoader = action.payload;
    },
    setAnalyticsMonth: (state, action: PayloadAction<'month' | 'year'>) => {
      state.analytics = action.payload;
    },
  },
});

export const viewActions = viewSlise.actions;

export default viewSlise.reducer;
