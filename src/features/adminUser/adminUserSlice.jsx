import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from '../../utils'

const initialState = {
  users: [],
  user: {},
  count: 0,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdate: false,
  isDelete: false,
  message: '',
}

export const fetchAllUser = createAsyncThunk(
  'adminUser/fetchAllUser',
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users`,
        config
      )
      return data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const fetchUser = createAsyncThunk(
  'adminUser/fetchUser',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users/${id}`,
        config
      )
      return data.data.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'adminUser/updateUser',
  async ({ id, name, email, role }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users/${id}`,
        { name, email, role },
        config
      )
      return data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'adminUser/deleteUser',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/users/${id}`,
        config
      )
      return data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    clearUsers: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload.data
      state.count = action.payload.count
      state.total = action.payload.total
    })
    builder.addCase(fetchAllUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isUpdate = true
      state.user = action.payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isDelete = true
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  },
})

export const { clearUsers } = adminUserSlice.actions
export default adminUserSlice.reducer
