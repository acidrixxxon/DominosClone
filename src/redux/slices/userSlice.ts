import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ILoginErrors } from '../../utils/types/ResponseTypes';
import { IUser, IUserState } from '../../utils/types/UserTypes';

const initialState: IUserState = {
  user: null,
  loaders: {
    loginLoading: false,
    refreshLoading: false,
    registerLoading: false,
  },
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUserRequest: (state) => {
      state.user = null;
      state.error = null;
      state.loaders.loginLoading = true;
    },
    loginUserStopLoader: (state) => {
      state.loaders.loginLoading = false;
    },
    loginUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.loaders.loginLoading = false;
    },
    loginUserError: (state, action: PayloadAction<ILoginErrors>) => {
      state.user = null;
      state.error = action.payload;
      state.loaders.loginLoading = false;
    },
    refreshTokenRequest: (state) => {
      (state.user = null), (state.error = null);
      state.loaders.refreshLoading = true;
    },
    refreshTokenSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.loaders.refreshLoading = false;
    },
    refreshTokenError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loaders.refreshLoading = false;
    },
    registerUserRequest: (state) => {
      state.user = null;
      state.error = null;
      state.loaders.registerLoading = true;
    },
    registerUserSuccess: (state) => {
      state.loaders.registerLoading = false;
      state.error = null;
    },
    registerUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loaders.registerLoading = false;
    },
  },
});

export const {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  loginUserStopLoader,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenError,
  registerUserError,
  registerUserRequest,
  registerUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
