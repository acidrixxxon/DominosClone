import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { userApi } from '../Api/UserApi';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export const storeSetup = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof storeSetup.dispatch;

setupListeners(storeSetup.dispatch);
