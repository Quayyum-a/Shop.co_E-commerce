import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dummyJsonApi = createApi({
  reducerPath: 'dummyJsonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 30, skip = 0, category = '' } = {}) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
        })
        
        if (category) {
          return `products/category/${category}?${params}`
        }
        return `products?${params}`
      },
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query({
      query: () => 'products/categories',
    }),
    searchProducts: builder.query({
      query: (searchTerm) => `products/search?q=${searchTerm}`,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useSearchProductsQuery,
} = dummyJsonApi

