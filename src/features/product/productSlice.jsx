import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from '../../utils'

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getAlllProducts = createAsyncThunk(
  'product/getAlllProducts',
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/adminProducts`,
        config
      )
      return data.products
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

export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/${id}`
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

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (product, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`,
        product,
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

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/${id}`,
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

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const id = product.get('id')
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/${id}`,
        product,
        config
      )
      return data.product
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

const productSlice = createSlice({
  name: 'admin/products',
  initialState: {
    products: [],
    product: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isUpdateSuccess: false
  },
  reducers: {
    clearProducts: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAlllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getAlllProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isUpdateSuccess = true
        state.product = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})
export const { clearProducts } = productSlice.actions
export default productSlice.reducer
