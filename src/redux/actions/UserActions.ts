import { toast } from 'react-toastify';

import LocalStorageService from '@/utils/services/LocalStorageService';
import UserService from '@/utils/services/UserService';
import { LoginFormFieldInterface, RegisterFormFieldInterface } from '@/utils/types/CommontTypes';
import { Response, ResponseError, ResponseSuccess } from '@/utils/types/ResponseTypes';

import { IUserData } from '../../utils/types/UserTypes';
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
  userActions,
} from '../slices/userSlice';
import { viewActions } from '../slices/viewSlice';
import { AppDispatch, AppStore, GetState } from '../store';

const loginUserProcess = (userData: LoginFormFieldInterface) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginUserRequest());

    const { status, data } = await UserService.loginUser(userData);

    if (status === 200 && data.success === true && data.user) {
      dispatch(loginUserSuccess(data.user));
      LocalStorageService.saveAccessToken(data.user.tokens.accessToken);
      dispatch(viewActions.hideAuthModal());
    }
  } catch (error: any) {
    toast.error(error.response.data.message, {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: 'dark',
      autoClose: 3500,
      className: 'dark__toast',
    });
    dispatch(loginUserError(error.response.data.message));
  }
};

const refreshTokenProcess =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const token = LocalStorageService.getAccessToken();
      if (token === null) {
        dispatch(refreshTokenError('Невалідний токен,авторизуйтесь знов!'));
      } else {
        dispatch(refreshTokenRequest());

        const { status, data } = await UserService.refreshToken(token);

        if (status === 200 && data.success === true && data.user) {
          dispatch(refreshTokenSuccess(data.user));
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: 'dark',
        autoClose: 1400,
        className: 'dark__toast',
      });
      dispatch(refreshTokenError(error.response.data.message));
      LocalStorageService.removeAccessToken();
    }
  };

const registerUserProcess = (userData: RegisterFormFieldInterface) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerUserRequest());

    const { status, data } = await UserService.registerUser(userData);

    if (status === 200 && data.success === true && data.user) {
      dispatch(registerUserSuccess());

      return true;
    }
  } catch (error: any) {
    toast.error(error.message);
    dispatch(registerUserError(error.data.message));
  }
};

const updateUserProfileProcess =
  (userData: IUserData) =>
  async (dispatch: AppDispatch, getState: GetState): Promise<{ message: string; success: boolean }> => {
    try {
      const {
        user: { user },
      } = getState();

      if (!user || !user.tokens.accessToken) throw Error('Ви не авторизовані');

      const { data, status } = await UserService.updateUserProfile(userData, user.tokens.accessToken);

      if (status === 200 && data.success && data.user) {
        dispatch(loginUserSuccess(data.user));
        LocalStorageService.saveAccessToken(data.user.tokens.accessToken);
      }
      return {
        success: data.success,
        message: data.message,
      };
    } catch (error: any) {
      let errorMessage: string = error.response.data.message ? error.response.data.message : error.message;

      return {
        message: errorMessage,
        success: false,
      };
    }
  };

const userLogoutProccess = () => (dispatch: AppDispatch) => {
  dispatch(viewActions.setGlobalLoader(true));
  dispatch(userActions.logoutUser());
  LocalStorageService.removeAccessToken();
  dispatch(viewActions.hideAuthModal());

  setTimeout(() => {
    dispatch(viewActions.setGlobalLoader(false));
  }, 1000);
};

export default {
  registerUserProcess,
  loginUserProcess,
  refreshTokenProcess,
  userLogoutProccess,
  updateUserProfileProcess,
};
