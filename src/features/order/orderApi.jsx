import { getCookie } from '../../utils'
import { apiSlice } from '../api/apiSlice'

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => ({
        url: '/orders/myorders',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
    }),
  }),
})

export const {
  useGetMyOrdersQuery,
  useGetSingleOrderQuery,
} = orderApi
