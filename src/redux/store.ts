import { ActionCreatorsMapObject, PreloadedState, bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { productApi } from '../Api/ProductApi';
import { useAppDispatch } from '../hooks/useAppDispatch';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import viewReducer from './slices/viewSlice';

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  view: viewReducer,
  [productApi.reducerPath]: productApi.reducer,
});

export const storeSetup = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof storeSetup>;
export type AppDispatch = AppStore['dispatch'];
export type GetState = AppStore['getState'];

export const useActionCreators = (actions: ActionCreatorsMapObject) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
