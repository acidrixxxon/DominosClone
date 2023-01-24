import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BACKEND_URL } from '../Utils/config';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/users/` }),
  endpoints: (builder) => ({
    loginUser: builder.query({
      query: (data) => `/login`,
    }),
  }),
});

export const { useLoginUserQuery } = userApi;
