import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import authSlice from '../features/auth/authSlice'
import cartSlice from '../features/cart/cartSlice'
import reviewSlice from '../features/reviews/reviewsSlice'
import orderSlice from '../features/order/orderSlice'
import productSlice from '../features/product/productSlice'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  auth: {
    userInfo: userInfoFromStorage,
  },
}

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    cart: cartSlice,
    reviews: reviewSlice,
    order: orderSlice,
    product: productSlice,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})
