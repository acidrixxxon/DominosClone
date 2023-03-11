import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BACKEND_URL } from '../Utils/config';
import {
  ICreateNewOrderResponse,
  IFetchCategoriesResponse,
  IFetchIngridientsResponse,
  IFetchProductsResponse,
} from '../types/ResponseTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/` }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<IFetchCategoriesResponse | IFetchProductsResponse, { category: string; sortId: number }>({
      query: ({ category, sortId }) =>
        sortId === 0 ? `${category}/get_allcategories/` : `${category}/get_allproducts/?sort=${sortId}`,
    }),
    getProductById: builder.query({
      query: (productId) => `search/${productId}`,
    }),
    fetchIngridientsCategories: builder.query<IFetchIngridientsResponse, any>({
      query: () => 'pizza/ingridient/get_all',
    }),
    fetchAllIngridients: builder.query<IFetchIngridientsResponse, any>({
      query: () => 'pizza/ingridient/get_all',
    }),
    fetchOrder: builder.query<ICreateNewOrderResponse, any>({
      query: (id: string) => `order/${id}`,
    }),
  }),
});

export const { useFetchProductsQuery, useGetProductByIdQuery, useFetchIngridientsCategoriesQuery, useFetchOrderQuery } = productApi;
