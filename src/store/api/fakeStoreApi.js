import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fakeStoreApi = createApi({
  reducerPath: 'fakeStoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
  }),
  endpoints: (builder) => ({
    getFakeStoreProducts: builder.query({
      query: ({ limit = 20, category = '' } = {}) => {
        if (category) {
          return `products/category/${category}?limit=${limit}`
        }
        return `products?limit=${limit}`
      },
    }),
    getFakeStoreProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getFakeStoreCategories: builder.query({
      query: () => 'products/categories',
    }),
  }),
})

export const {
  useGetFakeStoreProductsQuery,
  useGetFakeStoreProductByIdQuery,
  useGetFakeStoreCategoriesQuery,
} = fakeStoreApi

