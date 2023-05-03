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
  message: 'Данні отримано!';
  analytics: IUserAnalytics;
}

export interface FetchUserAnalyticsError extends ResponseError {}

export type FetchUserAnalyticsResponse = FetchUserAnalyticsSuccess | FetchUserAnalyticsError;
