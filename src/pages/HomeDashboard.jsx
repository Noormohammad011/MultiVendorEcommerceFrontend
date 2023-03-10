import React, { useEffect } from 'react'
import { Loader, MetaData } from '../components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getAlllProducts } from '../features/product/productSlice'
import { useAlert } from 'react-alert'
import { getOrders } from '../features/order/orderSlice'
import { fetchAllUser } from '../features/adminUser/adminUserSlice'

const HomeDashboard = () => {
  const alert = useAlert()
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  )
  const { orders, totalAmount } = useSelector((state) => state.order)
   const { users } = useSelector(
     (state) => state.adminUser
   )
  let outOfStock = 0
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1
    }
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (isError) {
      alert.error(message)
    }

    dispatch(getOrders())
    dispatch(fetchAllUser())
    dispatch(getAlllProducts())
  }, [isError, message, dispatch])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={'Admin Dashboard'} />

          <div className='row pr-4'>
            <div className='col-xl-12 col-sm-12 mb-3'>
              <div className='card text-white bg-primary o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Total Amount
                    <br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row pr-4'>
            <div className='col-xl-3 col-sm-6 mb-3'>
              <div className='card text-white bg-success o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Products
                    <br /> <b>{products && products.length}</b>
                  </div>
                </div>
                <Link
                  className='card-footer text-white clearfix small z-1'
                  to='/dashboard/admin/products'
                >
                  <span className='float-left'>View Details</span>
                  <span className='float-right'>
                    <i className='fa fa-angle-right'></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className='col-xl-3 col-sm-6 mb-3'>
              <div className='card text-white bg-danger o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Orders
                    <br /> <b>{orders && orders.length}</b>
                  </div>
                </div>
                <Link
                  className='card-footer text-white clearfix small z-1'
                  to='/dashboard/admin/orders'
                >
                  <span className='float-left'>View Details</span>
                  <span className='float-right'>
                    <i className='fa fa-angle-right'></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className='col-xl-3 col-sm-6 mb-3'>
              <div className='card text-white bg-info o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Users
                    <br /> <b>{users && users.length}</b>
                  </div>
                </div>
                <Link
                  className='card-footer text-white clearfix small z-1'
                  to='/dashboard/admin/users'
                >
                  <span className='float-left'>View Details</span>
                  <span className='float-right'>
                    <i className='fa fa-angle-right'></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className='col-xl-3 col-sm-6 mb-3'>
              <div className='card text-white bg-warning o-hidden h-100'>
                <div className='card-body'>
                  <div className='text-center card-font-size'>
                    Out of Stock
                    <br /> <b>{outOfStock}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HomeDashboard
