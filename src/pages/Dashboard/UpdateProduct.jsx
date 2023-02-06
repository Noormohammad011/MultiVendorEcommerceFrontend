import React, { useEffect, useState } from 'react'
import { Loader, MetaData } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'

import {
  clearProducts,
  getProductDetails,
  updateProduct,
} from '../../features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
const UpdateProduct = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState(0)
  const [seller, setSeller] = useState('')
  const [images, setImages] = useState([])

  const [oldImages, setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const { product, isUpdateSuccess, isLoading } = useSelector(
    (state) => state.product
  )

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

  const alert = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isUpdateSuccess) {
      alert.success('Product Updated Successfully')
      dispatch(clearProducts())
      navigate('/dashboard/admin/products')
    } else {
      if (product && product._id !== id) {
        dispatch(getProductDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setCategory(product.category)
        setSeller(product.seller)
        setStock(product.stock)
        setOldImages(product.images)
      }
    }
  }, [dispatch, product, id, isUpdateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('name', name)
    formData.set('price', price)
    formData.set('description', description)
    formData.set('category', category)
    formData.set('stock', stock)
    formData.set('seller', seller)

    images.forEach((image) => {
      formData.append('images', image)
    })
    formData.set('id', product._id)

    dispatch(updateProduct(formData))
  }
  const onChange = (e) => {
    const files = Array.from(e.target.files)
    setImagesPreview([])
    setImages([])
    setOldImages([])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImagesPreview((oldArray) => [...oldArray, reader.result])
        setImages((oldArray) => [...oldArray, reader.result])
      }
    })
  }
  if (isLoading) {
    return <Loader />
  }
  // if (isUpdateSuccess) {
  //   dispatch(clearProducts())
  //   alert.success('Product updated successfully')
  //   navigate('/dashboard/admin/products')
  // }
  return (
    <div>
      <MetaData title={'Update Product'} />
      <div className='col-12 col-md-10'>
        <>
          <div className='wrapper my-5'>
            <form
              className='shadow-lg'
              onSubmit={submitHandler}
              encType='multipart/form-data'
            >
              <h1 className='mb-4'>Update Product</h1>

              <div className='form-group'>
                <label htmlFor='name_field'>Name</label>
                <input
                  type='text'
                  id='name_field'
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='price_field'>Price</label>
                <input
                  type='text'
                  id='price_field'
                  className='form-control'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='description_field'>Description</label>
                <textarea
                  className='form-control'
                  id='description_field'
                  rows='8'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className='form-group'>
                <label htmlFor='category_field'>Category</label>
                <select
                  className='form-control'
                  id='category_field'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='stock_field'>Stock</label>
                <input
                  type='number'
                  id='stock_field'
                  className='form-control'
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='seller_field'>Seller Name</label>
                <input
                  type='text'
                  id='seller_field'
                  className='form-control'
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label>Images</label>

                <div className='custom-file'>
                  <input
                    type='file'
                    name='product_images'
                    className='custom-file-input'
                    id='customFile'
                    onChange={onChange}
                    multiple
                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose Images
                  </label>
                </div>

                {oldImages &&
                  oldImages.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={img.url}
                      className='mt-3 mr-2'
                      width='55'
                      height='52'
                    />
                  ))}

                {imagesPreview.map((img,index) => (
                  <img
                    src={img}
                    key={index}
                    alt='Images Preview'
                    className='mt-3 mr-2'
                    width='55'
                    height='52'
                  />
                ))}
              </div>

              <button
                id='login_button'
                type='submit'
                className='btn btn-block py-3'
                disabled={isLoading}
              >
                UPDATE
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  )
}

export default UpdateProduct
