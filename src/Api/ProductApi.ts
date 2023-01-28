import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BACKEND_URL } from '../Utils/config';
import { IPizza, IProductCategory } from '../redux/types/ProductTypes';
import { IFetchCategoriesResponse, IFetchProductsResponse } from '../redux/types/ResponseTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/` }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<IFetchCategoriesResponse | IFetchProductsResponse, { category: string; sortId: number }>({
      query: ({ category, sortId }) =>
        sortId === 0 ? `${category}/get_allcategories/` : `${category}/get_allproducts/?sort=${sortId}`,
    }),
  }),
});

export const { useFetchProductsQuery } = productApi;
