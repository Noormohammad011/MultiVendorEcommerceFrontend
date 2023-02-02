import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader, MetaData } from '../../components'
import { useGetSingleOrderQuery } from '../../features/order/orderApi'
import { useAlert } from 'react-alert'

const OrderDetails = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useGetSingleOrderQuery(id)
  const order = data?.data?.data
  const shippingInfo = data?.data?.data?.shippingInfo
  const orderItems = data?.data?.data?.orderItems
  const paymentInfo = data?.data?.data?.paymentInfo
  const user = data?.data?.data?.user
  const totalPrice = data?.data?.data?.totalPrice
  const orderStatus = data?.data?.data?.orderStatus
    const alert = useAlert()
    
    console.log(error)

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.postalCode}, ${shippingInfo?.country}`

  const isPaid =
    paymentInfo && paymentInfo.status === 'succeeded' ? true : false

  return (
    <>
      <MetaData title={'Order Details'} />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        alert.error(error.data)
      ) : (
        <>
          <div className='row d-flex justify-content-between'>
            <div className='col-12 col-lg-8 mt-5 order-details'>
              <h1 className='my-5'>Order # {order._id}</h1>

              <h4 className='mb-4'>Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo?.phoneNo}
              </p>
              <p className='mb-4'>
                <b>Address:</b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className='my-4'>Payment</h4>
              <p className={isPaid ? 'greenColor' : 'redColor'}>
                <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
              </p>

              <h4 className='my-4'>Order Status:</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes('Delivered')
                    ? 'greenColor'
                    : 'redColor'
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className='my-4'>Order Items:</h4>

              <hr />
              <div className='cart-item my-1'>
                {orderItems &&
                  orderItems?.map((item) => (
                    <div key={item.product} className='row my-5'>
                      <div className='col-4 col-lg-2'>
                        <img
                          src={item.image}
                          alt={item.name}
                          height='45'
                          width='65'
                        />
                      </div>

                      <div className='col-5 col-lg-5'>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                        <p>${item.price}</p>
                      </div>

                      <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default OrderDetails
