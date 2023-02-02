import { apiSlice } from '../api/apiSlice'

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword = '', currentPage = 1, price, category, rating = 0 }) =>
        category
          ? `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
          : `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`,

      providesTags: (returnValue, error, args) => {
        const result = returnValue?.data || []
        return [
          ...result.map(({ _id }) => ({ type: 'Product', id: _id })),
          { type: 'Product', id: 'LIST' },
        ]
      },
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery } = productApi
