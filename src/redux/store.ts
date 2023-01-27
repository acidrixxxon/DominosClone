import { ActionCreatorsMapObject, bindActionCreators, combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import { productApi } from '../Api/ProductApi';
import { useAppDispatch } from '../hooks/useAppDispatch';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import viewReducer from './slices/viewSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  view: viewReducer,
  [productApi.reducerPath]: productApi.reducer,
});

export const storeSetup = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof storeSetup.dispatch;

export const useActionCreators = (actions: ActionCreatorsMapObject) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

setupListeners(storeSetup.dispatch);
