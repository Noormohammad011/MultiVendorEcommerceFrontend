import { authenticate, getCookie, updateUser } from '../../utils'
import { apiSlice } from '../api/apiSlice'
import { userLoggedIn } from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled

          authenticate(result.data, () => {})

          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user,
            })
          )
        } catch (err) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled

          authenticate(result.data, () => {})

          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user,
            })
          )
        } catch (err) {
          // do nothing
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
      providesTags: (result) => [{ type: 'User', id: result?.data?._id }],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/auth/updatedetails',
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) { 
        try {
          const result = await queryFulfilled

          updateUser(result.data, () => {})
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: (result) => [{ type: 'User', id: result?.data?._id }],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/updatepassword',
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }),
      invalidatesTags: (result) => [{ type: 'User', id: result?.data?._id }],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgotpassword',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result) => [{ type: 'User', id: result?.data?._id }],
    }),
    resePassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/auth/resetpassword/${token}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result) => [{ type: 'User', id: result?.data?._id }],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResePasswordMutation,
} = authApi
