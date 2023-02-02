import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from '../../utils'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders`,
        order,
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

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/`,
        config
      )
      console.log(data)
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

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/${id}`,
        config
      )
      return data.data
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

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/${id}`,
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

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    resetOrder: (state) => {
      state.order = {}
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetOrder } = orderSlice.actions
export default orderSlice.reducer
