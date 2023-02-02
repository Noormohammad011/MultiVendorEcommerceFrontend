import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedOut } from '../auth/authSlice'
import { getCookie } from '../../utils'

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.token || getCookie('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut())
      localStorage.clear()
    }
    return result
  },
  tagTypes: ['User', 'Product'],
  endpoints: (builder) => ({}),
})
