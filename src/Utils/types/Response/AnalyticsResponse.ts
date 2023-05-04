import { ResponseError, ResponseSuccess } from './../ResponseTypes';

export interface IUserAnalytics {
  date: {
    title: string;
    from: string;
    to: string;
  };
  deliveriesCount: number;
  dineInCount: number;
  moneySpent: number;
  orderCount: number;
}

export interface FetchUserAnalyticsSuccess extends ResponseSuccess {
  message: 'Аналітику отримано!';
  analytics: IUserAnalytics;
}

export interface FetchUserAnalyticsError extends ResponseError {
  analytics: null;
  message: 'Не вдалось отримати аналітику!';
}

export type FetchUserAnalyticsResponse = FetchUserAnalyticsSuccess | FetchUserAnalyticsError;
