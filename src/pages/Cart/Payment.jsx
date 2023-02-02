import React, { useEffect } from 'react'
import { Loader, MetaData } from '../../components'
import CheckoutSteps from './CheckoutSteps'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js'

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getCookie, isAuthenticated } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { createOrder, resetOrder } from '../../features/order/orderSlice'
const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
}
const Payment = () => {
  const alert = useAlert()
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.order
  )

  const { cartItems, shippingAddress } = useSelector((state) => state.cart)
  const order = {
    orderItems: cartItems,
    shippingAddress,
  }

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice
    order.shippingPrice = orderInfo.shippingPrice
    order.taxPrice = orderInfo.taxPrice
    order.totalPrice = orderInfo.totalPrice
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }
  const submitHandler = async (e) => {
    e.preventDefault()

    document.querySelector('#pay_btn').disabled = true

    let res
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }

      res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/vi/payment/stripe`,
        paymentData,
        config
      )

      const clientSecret = res.data.client_secret

      if (!stripe || !elements) {
        return
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.name || isAuthenticated()?.name,
            email: user?.email || isAuthenticated()?.email,
          },
        },
      })

      if (result.error) {
        alert.error(result.error.message)
        document.querySelector('#pay_btn').disabled = false
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(order))
        } else {
          alert.error('There is some issue while payment processing')
        }
      }
    } catch (error) {
      document.querySelector('#pay_btn').disabled = false
    }
  }
  useEffect(() => {
    if (isError) {
      alert.error(message)
    }
    if (isSuccess) {
      alert.success('Order created successfully')
      navigate('/success')
      dispatch(resetOrder())
    }
  }, [isError, message, dispatch, isSuccess, navigate])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <MetaData title={'Payment'} />

      <CheckoutSteps shipping confirmOrder payment />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-4'>Card Info</h1>
            <div className='form-group'>
              <label htmlFor='card_num_field'>Card Number</label>
              <CardNumberElement
                type='text'
                id='card_num_field'
                className='form-control'
                options={options}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='card_exp_field'>Card Expiry</label>
              <CardExpiryElement
                type='text'
                id='card_exp_field'
                className='form-control'
                options={options}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='card_cvc_field'>Card CVC</label>
              <CardCvcElement
                type='text'
                id='card_cvc_field'
                className='form-control'
                options={options}
              />
            </div>

            <button id='pay_btn' type='submit' className='btn btn-block py-3'>
              Pay {` - ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Payment
