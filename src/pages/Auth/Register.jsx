import React, { useEffect, useState } from 'react'
import { Loader, MetaData } from '../../components'
import { useAlert } from 'react-alert'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../features/auth/authApi'
import axios from 'axios'
const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = user
  const [avatar, setAvatar] = useState()
  const [uploading, setUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(
    'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
  )

  const location = useLocation()
  const from = location?.search ? location?.search.split('=')[1] : '/login'

  const alert = useAlert()
  const [register, { data, isLoading, error, isError, isSuccess }] =
    useRegisterMutation()
  const resetForm = () => {
    setUser({ ...values, email: '', password: '', name: '' })
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (isError) {
      alert.error(error.error || error?.data?.error)
    }
    if (data?.token && data?.user) {
      navigate(from, { replace: true })
      alert.success('Register Success')
    }
  }, [data, error, navigate, isSuccess])
  const submitHandler = (e) => {
    e.preventDefault()
    register({ name, email, password, avatar })
    resetForm()
  }

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('avatar', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/upload/avatar`,
        formData,
        config
      )
      setAvatar(data.avatar)
      setAvatarPreview(URL.createObjectURL(file))
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <MetaData title={'Register User'} />
      {uploading && <Loader />}
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form
            className='shadow-lg'
            onSubmit={submitHandler}
            encType='multipart/form-data'
          >
            <h1 className='mb-3'>Register</h1>

            <div className='form-group'>
              <label htmlFor='email_field'>Name</label>
              <input
                type='text'
                id='name_field'
                className='form-control'
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email_field'>Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password_field'>Password</label>
              <input
                type='password'
                id='password_field'
                className='form-control'
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                <div>
                  <figure className='avatar mr-3 item-rtl'>
                    <img
                      src={avatarPreview}
                      className='rounded-circle'
                      alt='Avatar Preview'
                    />
                  </figure>
                </div>
                <div className='custom-file'>
                  <input
                    type='file'
                    name='avatar'
                    className='custom-file-input'
                    id='customFile'
                    accept='iamges/*'
                    onChange={uploadFileHandler}
                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id='register_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={isLoading}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
