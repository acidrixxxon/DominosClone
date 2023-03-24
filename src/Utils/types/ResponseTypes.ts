import { IOrderFromServer } from './CommontTypes';
import { IPizza, IPizzaIngridientsCategory, IProduct, IProductCategory } from './ProductTypes';
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

//Product Responses

//Get categories with products

export interface IFetchCategoriesSuccess {
  categories: IProductCategory[];
  products?: [];
  message: string;
  success: true;
}

export interface IFetchCategoriesError {
  message: string;
  categories?: [];
  products?: [];
  success: false;
}

export type IFetchCategoriesResponse = IFetchCategoriesError | IFetchCategoriesSuccess;

//Fetch all products with sort params

export interface IFetchProductsSuccess {
  message: string;
  success: true;
  products: IProduct[];
  categories?: [];
}

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

export interface ICreateNewOrderSuccess {
  message: string;
  order: IOrderFromServer;
  success: true;
}

export interface ICreateNewOrderError {
  success: false;
  message: string;
}

export type ICreateNewOrderResponse = ICreateNewOrderSuccess | ICreateNewOrderError;
