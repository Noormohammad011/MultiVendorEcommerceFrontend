import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from '../../utils'

export const addReviews = createAsyncThunk(
  'reviews/addReviews',
  async ({ id, rating, comment }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/reviews`,
        {
          rating,
          comment,
          productId: id,
        },
        config
      )
      return data.reviews
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

export const getProductReviewById = createAsyncThunk(
  'reviews/getProductReviewById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/reviews/${id}`
      )
      return data.reviews
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

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    clearReviews: (state) => {
      state.reviews = []
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReviews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reviews = action.payload
      })
      .addCase(addReviews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProductReviewById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductReviewById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reviews = action.payload
      })
      .addCase(getProductReviewById.rejected, (state, action) => { 
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})
export const { clearReviews } = reviewsSlice.actions
export default reviewsSlice.reducer
