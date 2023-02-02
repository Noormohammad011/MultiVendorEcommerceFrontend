import React, { useState } from 'react'
import { Loader, MetaData } from '../../components'
import { useUpdatePasswordMutation } from '../../features/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()
  const alert = useAlert()
  const [updatePassword, { isLoading, error, isError, isSuccess }] =
    useUpdatePasswordMutation()
  
  const submitHandler = (e) => {
    e.preventDefault()
    updatePassword({ currentPassword, newPassword })
    setCurrentPassword('')
    setNewPassword('')
  }
  if (isSuccess) { 
    alert.success('Password Updated')
    navigate('/me')
  }
  if (isError) {
    alert.error(error.error || error?.data?.error)
  }

  return (
    <>
      <MetaData title={'Change Password'} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='row wrapper'>
          <div className='col-10 col-lg-5'>
            <form className='shadow-lg' onSubmit={submitHandler}>
              <h1 className='mt-2 mb-5'>Update Password</h1>
              <div className='form-group'>
                <label htmlFor='old_password_field'>Old Password</label>
                <input
                  type='password'
                  id='old_password_field'
                  className='form-control'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='new_password_field'>New Password</label>
                <input
                  type='password'
                  id='new_password_field'
                  className='form-control'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <button
                type='submit'
                className='btn update-btn btn-block mt-4 mb-3'
                disabled={isLoading}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdatePassword
