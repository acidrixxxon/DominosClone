import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BACKEND_URL } from '../Utils/config';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/` }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (category: string) => `${category}/get_allcategories`,
    }),
  }),
});

export const { useFetchProductsQuery } = productApi;
