import React, { useState, useEffect } from 'react'
import { Loader, MetaData } from '../../components'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearProducts,
  createProduct,
} from '../../features/product/productSlice'
import { useNavigate } from 'react-router-dom'
const NewProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState(0)
  const [seller, setSeller] = useState('')
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.product
  )

  useEffect(() => {
    if (isError) {
      alert.error(message)
    }
    dispatch(clearProducts())
  }, [dispatch, isError, navigate, message])

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
    dispatch(createProduct(formData))
  }

  const onChange = (e) => {
    const files = Array.from(e.target.files)
    setImagesPreview([])
    setImages([])
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
  if (isSuccess) {
    navigate('/dashboard/admin/products')
  }

  return (
    <>
      <MetaData title={'New Product'} />
      <div className='col-12 col-md-10'>
        <>
          <div className='wrapper my-5'>
            <form
              className='shadow-lg'
              onSubmit={submitHandler}
              encType='multipart/form-data'
            >
              <h1 className='mb-4'>New Product</h1>

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
                  rows='3'
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
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

                {imagesPreview.map((img) => (
                  <img
                    src={img}
                    key={img}
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
                CREATE
              </button>
            </form>
          </div>
        </>
      </div>
    </>
  )
}

export default NewProduct
