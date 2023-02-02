import React from 'react'
import { useGetMyOrdersQuery } from '../../features/order/orderApi'
import { Link } from 'react-router-dom'
import { Loader, MetaData } from '../../components'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
const ListOrders = () => {
  const { data, isLoading, isError, error } = useGetMyOrdersQuery()
  const orders = data?.data
  const alert = useAlert()
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Num of Items',
          field: 'numOfItems',
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
          sort: 'asc',
        },
      ],
      rows: [],
    }

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className='btn btn-primary'>
            <i className='fa fa-eye'></i>
          </Link>
        ),
      })
    })

    return data
  }

  return (
    <>
      <MetaData title={'My Orders'} />

      <h1 className='my-5'>My Orders</h1>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        alert.error(error.data)
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
  )
}

export default ListOrders
