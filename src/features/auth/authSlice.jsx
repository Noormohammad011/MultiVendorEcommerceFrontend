import { createSlice } from '@reduxjs/toolkit'
import { signout } from '../../utils'

const initialState = {
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    userLoggedOut: (state) => {
      state.token = undefined
      state.user = undefined
      // signout()
    },
  },
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer
