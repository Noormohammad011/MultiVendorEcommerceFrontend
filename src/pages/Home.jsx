import React, { useState } from 'react'
import { Loader, MetaData, Product } from '../components'
import { useGetProductsQuery } from '../features/product/productApi'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)
  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home',
  ]
  const { keyword } = useParams()

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({ keyword, currentPage, price, category, rating })
  const alert = useAlert()
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  let resPerPage = products?.count
  let count = products?.total || products?.data?.length
  return (
    <div className='container container-fluid'>
      <MetaData title={'Buy best products online'} />
      <h1 id='products_heading'>Latest Products</h1>
      <section id='products' className='container mt-5'>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          alert.error(error)
        ) : (
          <div className='row'>
            {keyword ? (
              <>
                <div className='col-12 col-md-3 mt-5 mb-5'>
                  <div className='px-5'>
                    <Range
                      marks={{
                        1: `$1`,
                        1000: `$1000`,
                      }}
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      tipFormatter={(value) => `$${value}`}
                      tipProps={{
                        placement: 'top',
                        visible: true,
                      }}
                      value={price}
                      onChange={(price) => setPrice(price)}
                    />
                    <hr className='my-5' />
                    <div className='mt-5'>
                      <h4 className='mb-3'>Categories</h4>

                      <ul className='pl-0'>
                        {categories.map((category) => (
                          <li
                            style={{
                              cursor: 'pointer',
                              listStyleType: 'none',
                            }}
                            key={category}
                            onClick={() => setCategory(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr className='my-3' />
                    <div className='mt-5'>
                      <h4 className='mb-3'>Ratings</h4>
                      <ul className='pl-0'>
                        {[5, 4, 3, 2, 1].map((star) => (
                          <li
                            style={{
                              cursor: 'pointer',
                              listStyleType: 'none',
                            }}
                            key={star}
                            onClick={() => setRating(star)}
                          >
                            <div className='rating-outer'>
                              <div
                                className='rating-inner'
                                style={{
                                  width: `${star * 20}%`,
                                }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-12 col-md-9'>
                  <div className='row'>
                    {products?.data?.map((product) => (
                      <Product key={product._id} product={product} col={5} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              products?.data?.map((product) => (
                <Product key={product._id} product={product} col={3} />
              ))
            )}
          </div>
        )}
      </section>
      <div className='d-flex justify-content-center mt-5'>
        {resPerPage <= count && (
          <div className='d-flex justify-content-center mt-5'>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={count}
              onChange={setCurrentPageNo}
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
