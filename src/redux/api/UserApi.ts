import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { FetchUserActiveOrdersResponse, FetchUserOrdersResponse, FetchUserOrdersSuccess } from '@/utils/types/Response/UserResponse';

import { BACKEND_URL } from '../../utils/config';
import { RootState } from '../store';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/order`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.user?.tokens.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserOrders: builder.query<FetchUserOrdersSuccess, { page: number; limit: number }>({
      query: ({ page, limit }) => `/getuserorders?page=${page}&limit=${limit}`,
      keepUnusedDataFor: 0,
    }),
    fetchUserActiveOrders: builder.query<FetchUserActiveOrdersResponse, number>({
      query: (page) => `/getuseractiveorders?page=${page}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useFetchUserOrdersQuery, useFetchUserActiveOrdersQuery } = userApi;
