import { createBrowserRouter } from 'react-router-dom'
import Main from '../layout/Main'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import {
  ForgotPassword,
  Home,
  Login,
  ProductDetails,
  Register,
  UpdateProfile,
  Profile,
  UpdatePassword,
  NewPassword,
  Cart,
  Shipping,
  ConfirmOrder,
  Payment,
  OrderSuccess,
  ListOrders,
  OrderDetails,
  HomeDashboard,
  ProductsList,
  NewProduct,
} from '../pages'
import RequiredAuth from '../protectedRoute/RequiredAuth'
import Dashboard from '../layout/Dashboard'
import AdminRequiredAuth from '../protectedRoute/AdminRequiredAuth'
const stripeApiKey = `${import.meta.env.VITE_STRIPE_API_KEY}`

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search/:keyword',
        element: <Home />,
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/password/forgot',
        element: <ForgotPassword />,
      },
      {
        path: '/password/reset/:token',
        element: <NewPassword />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/shipping',
        element: (
          <RequiredAuth>
            <Shipping />
          </RequiredAuth>
        ),
      },
      {
        path: '/confirm',
        element: (
          <RequiredAuth>
            <ConfirmOrder />
          </RequiredAuth>
        ),
      },
      {
        path: '/me',
        element: (
          <RequiredAuth>
            <Profile />
          </RequiredAuth>
        ),
      },
      {
        path: '/me/update',
        element: (
          <RequiredAuth>
            <UpdateProfile />
          </RequiredAuth>
        ),
      },
      {
        path: 'password/update',
        element: (
          <RequiredAuth>
            <UpdatePassword />
          </RequiredAuth>
        ),
      },
      {
        path: '/orders/me',
        element: (
          <RequiredAuth>
            <ListOrders />
          </RequiredAuth>
        ),
      },
      {
        path: '/order/:id',
        element: (
          <RequiredAuth>
            <OrderDetails />
          </RequiredAuth>
        ),
      },
      {
        path: '/payment',
        element: stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <RequiredAuth>
              <Payment />
            </RequiredAuth>
          </Elements>
        ),
      },
      {
        path: '/success',
        element: stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <RequiredAuth>
              <OrderSuccess />
            </RequiredAuth>
          </Elements>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <AdminRequiredAuth>
            <Dashboard />
          </AdminRequiredAuth>
        ),
        children: [
          {
            path: '/dashboard',
            element: (
              <AdminRequiredAuth>
                <HomeDashboard />
              </AdminRequiredAuth>
            ),
          },
          {
            path: '/dashboard/admin/products',
            element: (
              <AdminRequiredAuth>
                <ProductsList />
              </AdminRequiredAuth>
            ),
          },
          {
            path: '/dashboard/admin/product',
            element: (
              <AdminRequiredAuth>
                <NewProduct />
              </AdminRequiredAuth>
            ),
          },
        ],
      },
    ],
  },
])

export default routes
