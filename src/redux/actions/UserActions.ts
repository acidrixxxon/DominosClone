import { toast } from 'react-toastify';

import LocalStorageService from '../../utils/services/LocalStorageService';
import UserService from '../../utils/services/UserService';
import { LoginFormFieldInterface, RegisterFormFieldInterface } from '../../utils/types/CommontTypes';
import {
  loginUserError,
  loginUserRequest,
  loginUserSuccess,
  refreshTokenError,
  refreshTokenRequest,
  refreshTokenSuccess,
  registerUserError,
  registerUserRequest,
  registerUserSuccess,
} from '../slices/userSlice';
import { AppDispatch } from '../store';

export const loginUserProcess = (data: LoginFormFieldInterface) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginUserRequest());

    const response = await UserService.loginUser(data);
    console.log(response);
    if (response.status === 200 && response.data.success === true && response.data.user) {
      dispatch(loginUserSuccess(response.data.user));
      LocalStorageService.saveAccessToken(response.data.user.tokens.accessToken);
    }
  } catch (error: any) {
    toast.error(error.response.data.message, { className: 'toast-error' });
    dispatch(loginUserError(error.response.data.message));
  }
};

export const refreshTokenProcess = () => async (dispatch: AppDispatch) => {
  try {
    const token = LocalStorageService.getAccessToken();
    if (token === null) {
      dispatch(refreshTokenError('Невалідний токен,авторизуйтесь знов!'));
    } else {
      dispatch(refreshTokenRequest());

      const response = await UserService.refreshToken(token);

      if (response.status === 200 && response.data.success === true && response.data.user) {
        dispatch(refreshTokenSuccess(response.data.user));
      }
    }
  } catch (error: any) {
    dispatch(refreshTokenError(error.response.data.message));
    LocalStorageService.removeTokenFromLS();
  }
};

export const registerUserProcess = (data: RegisterFormFieldInterface) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerUserRequest());

    const response = await UserService.registerUser(data);

    if (response.status === 200 && response.data.success === true && response.data.user) {
      dispatch(registerUserSuccess());

      return true;
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    dispatch(registerUserError(error.response.data.message));
  }
};
