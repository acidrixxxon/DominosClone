import axios, { AxiosResponse } from 'axios';

import { BACKEND_URL } from '../Utils/config';
import { LoginFormFieldInterface, RegisterFormFieldInterface } from '../types/CommontTypes';
import { ILoginUserResponse, IRefreshTokenResponse, IRegisterUserResponse } from '../types/ResponseTypes';

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
}

export default new UserService();
