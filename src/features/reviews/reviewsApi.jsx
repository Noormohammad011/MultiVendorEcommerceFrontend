import { getCookie } from '../../utils'
import { apiSlice } from '../api/apiSlice'

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    creteReviews: builder.mutation({
      query: (reviews) => ({
        url: '/reviews',
        method: 'PUT',
        body: reviews,
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
    }),
  }),
})

export const { useCreteReviewsMutation } = reviewsApi
