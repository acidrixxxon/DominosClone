import { type } from 'os';

import { IOrderFromServer } from './CommontTypes';
import { IPizza, IPizzaIngridientsCategory, IProduct, IProductCategory } from './ProductTypes';
import { IUser } from './UserTypes';

export interface ResponseMessage {
  message: string;
}

export interface ResponseSuccess extends ResponseMessage {
  success: true;
}
export interface ResponseError extends ResponseMessage {
  success: false;
}

export interface Response extends ResponseMessage {
  success: boolean;
}

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

// USER UPDATE PROFILE RESPOMSE
export interface IUpdateProfileSuccess extends ResponseSuccess {
  message: 'Дані успішно оновлені';
  user: IUser;
}

export interface IUpdateProfileError extends ResponseError {}

export type IUpdateProfileResponse = IUpdateProfileSuccess | IUpdateProfileError;

//Product Responses

//Get categories with products

export interface IFetchCategoriesSuccess extends ResponseSuccess {
  categories: IProductCategory[];
}

//Fetch all products with sort params

export interface IFetchProductsSuccess extends ResponseSuccess {
  products: IProduct[];
}

//tip responsa dlya huka iz api
export type FetchProductsSuccess = IFetchCategoriesSuccess & IFetchProductsSuccess;

export interface IFetchCategoriesError {
  message: string;
  categories?: [];
  products?: [];
  success: false;
}

export type IFetchCategoriesResponse = IFetchCategoriesError | IFetchCategoriesSuccess;

export interface IFetchProductsError {
  message: string;
  success: false;
  products?: [];
  categories?: [];
}

export type IFetchProductsResponse = IFetchProductsSuccess | IFetchProductsError;

//Fetching ingridients

export interface IFetchIngridientsSuccess {
  message: string;
  succuess: true;
  ingridients: IPizzaIngridientsCategory[];
}

export interface IFetchIngridientsError {
  message: string;
  succuess: false;
  ingridients?: [];
}

export type IFetchIngridientsResponse = IFetchIngridientsSuccess | IFetchIngridientsError;

export interface ICreateNewOrderSuccess extends ResponseSuccess {
  message: 'Нове замовлення створене!';
  order: IOrderFromServer;
}

export interface ICreateNewOrderError extends ResponseError {
  order?: null;
}

export type ICreateNewOrderResponse = ICreateNewOrderSuccess | ICreateNewOrderError;
