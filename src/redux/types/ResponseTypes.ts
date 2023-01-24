import { IUser } from './UserTypes';

//LOGIN TYPES
export interface ILoginUserResponseSuccess {
  message: 'Авторизований!';
  success: true;
  user: IUser;
}

export interface ILoginUserResponseError {
  message: ILoginErrors;
  success: false;
}

export type ILoginErrors = 'Ви ввели невірний пароль!' | 'Користувача з таким email не знайдено!' | 'Заповніть все поля!';

export type ILoginUserResponse = ILoginUserResponseSuccess | ILoginUserResponseError;

//REFRESH TYPES
export interface IRefreshTokenResponseSuccess {
  message: 'Новий токен отримано';
  success: true;
  user: IUser;
}

export interface IRefreshTokenResponseError {
  message: 'Не вдалось валідувати токен!';
  success: false;
}

export type IRefreshTokenResponse = IRefreshTokenResponseError | IRefreshTokenResponseSuccess;

//REGISTER TYPES
export interface INewUser {
  _id: string;
  email: string;
  phone: string;
  confirmed: boolean;
  confirmLink: string;
  firstName: string;
  secondName: string;
  isAdmin: boolean;
}

export interface IRegisterUserResponseSuccess {
  message: 'Користувач зареєстрований!';
  success: true;
  user: INewUser;
}

export interface IRegisterUserResponseError {
  message: string;
  success: false;
}

export type IRegisterUserResponse = IRefreshTokenResponseSuccess | IRefreshTokenResponseError;
