import axios, { AxiosResponse } from 'axios';

import { BACKEND_URL } from '../Utils/config';
import { LoginFormFieldInterface, RegisterFormFieldInterface } from '../redux/types/CommontTypes';
import { ILoginUserResponse, IRefreshTokenResponse, IRegisterUserResponse } from '../redux/types/ResponseTypes';

class UserService {
  loginUser(data: LoginFormFieldInterface) {
    return axios.post<ILoginUserResponse>(`${BACKEND_URL}/user/login`, data);
  }

  async refreshToken(token: string) {
    return await axios.get<IRefreshTokenResponse>(`${BACKEND_URL}/user/refresh_token`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  async registerUser(data: RegisterFormFieldInterface): Promise<AxiosResponse> {
    return await axios.post<IRegisterUserResponse>(`${BACKEND_URL}/user/register`, data);
  }
}

export default new UserService();
