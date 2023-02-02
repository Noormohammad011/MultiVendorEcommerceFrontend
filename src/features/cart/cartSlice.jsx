
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ id, quantity }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/${id}`
      )

      return {
        product: data.data.data._id,
        name: data.data.data.name,
        price: data.data.data.price,
        image: data.data.data.images[0].url,
        stock: data.data.data.stock,
        quantity,
      }
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

export const saveShippingInfo = createAsyncThunk(
  'cart/saveShippingInfo',
  async (data, thunkAPI) => {
    try {
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

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (id, thunkAPI) => {
    try {
      return id
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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload
        state.isLoading = false
        state.isSuccess = true
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        )
        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          )
        } else {
          state.cartItems.push(item)
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeItemFromCart.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = state.cartItems.filter(
          (item) => item.product !== action.payload
        )
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(saveShippingInfo.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(saveShippingInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shippingAddress = action.payload
        localStorage.setItem(
          'shippingAddress',
          JSON.stringify(state.shippingAddress)
        )
      })
      .addCase(saveShippingInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export default cartSlice.reducer
