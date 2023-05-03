import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { FetchUserOrdersResponse } from '@/utils/types/Response/UserResponse';

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
    fetchUserOrders: builder.query<FetchUserOrdersResponse, void>({
      query: () => '/getuserorders',
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useFetchUserOrdersQuery } = userApi;
