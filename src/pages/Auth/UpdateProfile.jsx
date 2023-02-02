import React, { useState } from 'react'
import { MetaData } from '../../components'
import { useAlert } from 'react-alert'
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from '../../features/auth/authApi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const { data: userData } = useLoadUserQuery()
  const navaigate = useNavigate()
  const [name, setName] = useState(userData?.data?.name)
  const [email, setEmail] = useState(userData?.data?.email)
  const [avatar, setAvatar] = useState()
  const [avatarPreview, setAvatarPreview] = useState(
    userData?.data?.avatar?.url
  )
  const [updateUser, { isLoading, isError, isSuccess, error }] =
    useUpdateUserMutation()
  const alert = useAlert()

  const submitHandler = (e) => {
    e.preventDefault()
    updateUser({ name, email, avatar })
    navaigate('/me')
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('avatar', file)

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
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <MetaData title={'Update Profile'} />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form
            className='shadow-lg'
            onSubmit={submitHandler}
            encType='multipart/form-data'
          >
            <h1 className='mt-2 mb-5'>Update Profile</h1>

            <div className='form-group'>
              <label htmlFor='email_field'>Name</label>
              <input
                type='name'
                id='name_field'
                className='form-control'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
              type='submit'
              className='btn update-btn btn-block mt-4 mb-3'
              disabled={isLoading}
            >
              Update
            </button>
          </form>
          {isSuccess && alert.success('Profile updated successfully')}
          {isError && alert.error(error.error)}
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
