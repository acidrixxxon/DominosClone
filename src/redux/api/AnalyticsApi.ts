import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { FetchUserAnalyticsResponse, FetchUserAnalyticsSuccess } from '@/utils/types/Response/AnalyticsResponse';

import { BACKEND_URL } from '../../utils/config';
import '../../utils/types/ResponseTypes';
import { RootState } from '../store';

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.user?.tokens.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserAnalytics: builder.query<FetchUserAnalyticsSuccess, { date: string }>({
      query: ({ date }) => `/analytics/?time=${date}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useFetchUserAnalyticsQuery } = analyticsApi;
