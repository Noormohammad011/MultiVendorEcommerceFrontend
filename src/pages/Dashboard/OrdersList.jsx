import React, { useEffect } from 'react'
import { Loader, MetaData } from '../../components'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteOrder,
  getOrders,
  resetOrder,
} from '../../features/order/orderSlice'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
const OrdersList = () => {
  const { orders, isLoading, isError, message, isDelete } = useSelector(
    (state) => state.order
  )
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrders())
    if (isError) {
      alert.error(message)
    }
    if (isDelete) {
      alert.success('Order deleted successfully')
    }
    return () => {
      dispatch(resetOrder())
    }
  }, [dispatch, isError, isDelete, navigate, isDelete])

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'No of Items',
          field: 'numofItems',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    orders &&
      orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          numofItems: order.orderItems.length,
          amount: `$${order.totalPrice}`,
          status:
            order.orderStatus &&
            String(order.orderStatus).includes('Delivered') ? (
              <p style={{ color: 'green' }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: 'red' }}>{order.orderStatus}</p>
            ),
          actions: (
            <>
              <Link
                to={`/dashboard/admin/order/${order._id}`}
                className='btn btn-primary py-1 px-2'
              >
                <i className='fa fa-eye'></i>
              </Link>
              <button
                className='btn btn-danger py-1 px-2 ml-2'
                onClick={() => dispatch(deleteOrder(order._id))}
              >
                <i className='fa fa-trash'></i>
              </button>
            </>
          ),
        })
      })

    return data
  }

  return (
    <>
      <MetaData title={'All Orders'} />

      <div className='col-12 col-md-10'>
        <>
          <h1 className='my-5'>All Orders</h1>

          {isLoading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
              className='px-3'
              bordered
              striped
              hover
            />
          )}
        </>
      </div>
    </>
  )
}

export default OrdersList
