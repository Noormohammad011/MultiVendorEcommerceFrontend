import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'

import { MDBDataTable } from 'mdbreact'
import { Loader, MetaData } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAlllProducts } from '../../features/product/productSlice'
const ProductsList = () => {
  const dispatch = useDispatch()
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  )
  useEffect(() => {
    if (isError) {
      alert.error(message)
    }

    dispatch(getAlllProducts())
  }, [isError, message, dispatch])

  const alert = useAlert()
  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    products?.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <>
            <Link
              to={`/admin/product/${product._id}`}
              className='btn btn-primary py-1 px-2'
            >
              <i className='fa fa-pencil'></i>
            </Link>
            <button
              className='btn btn-danger py-1 px-2 ml-2'
              onClick={() => dispatch(deleteProduct(product._id))}
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
      <MetaData title={'All Products'} />
      <div className='col-12 col-md-10'>
        <>
          <h1 className='my-5'>All Products</h1>

          {isLoading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProducts()}
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

export default ProductsList
