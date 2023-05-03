import axios, { AxiosResponse } from 'axios';

import { BACKEND_URL } from '../config';
import { LoginFormFieldInterface, RegisterFormFieldInterface } from '../types/CommontTypes';
import { ILoginUserResponse, IRefreshTokenResponse, IRegisterUserResponse, IUpdateProfileResponse } from '../types/ResponseTypes';
import { IUserData } from '../types/UserTypes';

class UserService {
  loginUser(data: LoginFormFieldInterface) {
    return axios.post<ILoginUserResponse>(`${BACKEND_URL}/user/login`, data);
  }

  refreshToken(token: string) {
    return axios.get<IRefreshTokenResponse>(`${BACKEND_URL}/user/refresh_token`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  registerUser(data: RegisterFormFieldInterface): Promise<AxiosResponse> {
    return axios.post<IRegisterUserResponse>(`${BACKEND_URL}/user/register`, data);
  }

  updateUserProfile(data: IUserData, token: string): Promise<AxiosResponse<IUpdateProfileResponse>> {
    return axios.post(`${BACKEND_URL}/user/update__profile`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new UserService();
