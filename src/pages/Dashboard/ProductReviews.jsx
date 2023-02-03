import React, { useEffect, useState } from 'react'
import { Loader, MetaData } from '../../components'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearReviews,
  deleteReview,
  getReviewsByQuery,
} from '../../features/reviews/reviewsSlice'
import { MDBDataTable } from 'mdbreact'
const ProductReviews = () => {
  const [productId, setProductId] = useState('')

  const alert = useAlert()
  const dispatch = useDispatch()

  const { reviews, isError, isLoading, message, isDelete } = useSelector(
    (state) => state.reviews
  )

  useEffect(() => {
    if (isError) {
      alert.error(message)
    }
    if (isDelete) {
      alert.success('Review deleted successfully')
      dispatch(clearReviews())
    }
    if (productId !== '') {
      dispatch(getReviewsByQuery(productId))
    }
  }, [dispatch, isError, message, isDelete, productId])
  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className='btn btn-danger py-1 px-2 ml-2'
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className='fa fa-trash'></i>
          </button>
        ),
      })
    })

    return data
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(getReviewsByQuery(productId))
  }
  const deleteReviewHandler = (id) => {
    dispatch(deleteReview({ id, productId }))
  }
  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <MetaData title={'Product Reviews'} />

      <div className='col-12 col-md-10'>
        <>
          <div className='row justify-content-center mt-5'>
            <div className='col-5'>
              <form onSubmit={submitHandler}>
                <div className='form-group'>
                  <label htmlFor='productId_field'>Enter Product ID</label>
                  <input
                    type='text'
                    id='productId_field'
                    className='form-control'
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>

                <button
                  id='search_button'
                  type='submit'
                  className='btn btn-primary btn-block py-2'
                >
                  SEARCH
                </button>
              </form>
            </div>
          </div>

          {reviews && reviews.length > 0 ? (
            <MDBDataTable
              data={setReviews()}
              className='px-3'
              bordered
              striped
              hover
            />
          ) : (
            <p className='mt-5 text-center'>No Reviews.</p>
          )}
        </>
      </div>
    </>
  )
}

export default ProductReviews
