import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../features/product/productApi'
import { ListReviews, Loader, MetaData } from '../../components'
import { useAlert } from 'react-alert'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { isAuthenticated } from '../../utils'
import {
  addReviews,
  getProductReviewById,
} from '../../features/reviews/reviewsSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')


  const { user } = useSelector((state) => state.auth)
  const {
    reviews,
    isLoading: ReviewLoading,
    isError: ReviewsError,
    message,
  } = useSelector((state) => state.reviews)

  const { data: product, isLoading, isError, error } = useGetProductQuery(id)
  const alert = useAlert()

  const dispatch = useDispatch()
  const increaseQty = () => {
    const count = document.querySelector('.count')
    if (count.valueAsNumber >= product.stock) return
    const qty = Number(count.valueAsNumber + 1)
    setQuantity(qty)
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count')
    if (count.valueAsNumber <= 1) return
    const qty = Number(count.valueAsNumber - 1)
    setQuantity(qty)
  }
  const addToCartProduct = () => {
    dispatch(addToCart({ id, quantity }))
    alert.success('Item Added to Cart')
  }

  function setUserRatings() {
    const stars = document.querySelectorAll('.star')

    stars.forEach((star, index) => {
      star.starValue = index + 1
      ;['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings)
      })
    })

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange')

            setRating(this.starValue)
          } else {
            star.classList.remove('orange')
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow')
          } else {
            star.classList.remove('yellow')
          }
        }
        if (e.type === 'mouseout') {
          star.classList.remove('yellow')
        }
      })
    }
  }
  useEffect(() => {
    if (ReviewsError) {
      alert.error(message)
    }
    if (id) {
      dispatch(getProductReviewById(id))
    }
  }, [dispatch, id, ReviewsError])
  if (ReviewLoading) {
    return <Loader />
  }


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        alert.error(error?.data?.error)
      ) : (
        <>
          <MetaData title={product?.data?.data?.name} />
          <div className='row d-flex justify-content-around'>
            <div className='col-12 col-lg-5 img-fluid' id='product_image'>
              <Carousel pause='hover'>
                {product?.data?.data?.images &&
                  product?.data?.data?.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className='d-block w-100'
                        src={image.url}
                        alt={image.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className='col-12 col-lg-5 mt-5'>
              <h3>{product?.data?.data?.name}</h3>
              <p id='product_id'>Product # {product?.data?.data?._id}</p>

              <hr />

              <div className='rating-outer'>
                <div
                  className='rating-inner'
                  style={{
                    width: `${(product?.data?.data?.ratings / 5) * 100}%`,
                  }}
                ></div>
              </div>
              <span id='no_of_reviews'>
                ({product?.data?.data?.numOfReviews} Reviews)
              </span>

              <hr />

              <p id='product_price'>${product?.data?.data?.price}</p>
              <div className='stockCounter d-inline'>
                <span className='btn btn-danger minus' onClick={decreaseQty}>
                  -
                </span>

                <input
                  type='number'
                  className='form-control count d-inline'
                  value={quantity}
                  readOnly
                />

                <span className='btn btn-primary plus' onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type='button'
                id='cart_btn'
                className='btn btn-primary d-inline ml-4'
                disabled={product?.data?.data?.stock === 0}
                onClick={addToCartProduct}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{' '}
                <span
                  id='stock_status'
                  className={
                    product?.data?.data?.stock > 0 ? 'greenColor' : 'redColor'
                  }
                >
                  {product?.data?.data?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>

              <hr />

              <h4 className='mt-2'>Description:</h4>
              <p>{product?.data?.data?.description}</p>
              <hr />
              <p id='product_seller mb-3'>
                Sold by: <strong>{product?.data?.data?.seller}</strong>
              </p>

              {isAuthenticated() || user ? (
                <button
                  id='review_btn'
                  type='button'
                  className='btn btn-primary mt-4'
                  data-toggle='modal'
                  data-target='#ratingModal'
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className='alert alert-danger mt-5' type='alert'>
                  Login to post your review.
                </div>
              )}

              <div className='row mt-2 mb-5'>
                <div className='rating w-50'>
                  <div
                    className='modal fade'
                    id='ratingModal'
                    tabIndex='-1'
                    role='dialog'
                    aria-labelledby='ratingModalLabel'
                    aria-hidden='true'
                  >
                    <div className='modal-dialog' role='document'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h5 className='modal-title' id='ratingModalLabel'>
                            Submit Review
                          </h5>
                          <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                            aria-label='Close'
                          >
                            <span aria-hidden='true'>&times;</span>
                          </button>
                        </div>
                        <div className='modal-body'>
                          <ul className='stars'>
                            <li className='star'>
                              <i className='fa fa-star'></i>
                            </li>
                            <li className='star'>
                              <i className='fa fa-star'></i>
                            </li>
                            <li className='star'>
                              <i className='fa fa-star'></i>
                            </li>
                            <li className='star'>
                              <i className='fa fa-star'></i>
                            </li>
                            <li className='star'>
                              <i className='fa fa-star'></i>
                            </li>
                          </ul>

                          <textarea
                            name='review'
                            id='review'
                            className='form-control mt-3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className='btn my-3 float-right review-btn px-4 text-white'
                            onClick={() =>
                              dispatch(addReviews({ id, rating, comment }))
                            }
                            data-dismiss='modal'
                            aria-label='Close'
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {reviews && reviews.length > 0 && <ListReviews reviews={reviews} />}
        </>
      )}
    </>
  )
}

export default ProductDetails
