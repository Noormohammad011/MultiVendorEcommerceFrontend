import React, { useState } from 'react'
import { Loader, MetaData } from '../../components'
import { useForgotPasswordMutation } from '../../features/auth/authApi'
import { useAlert } from 'react-alert'
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [forgotPassword, { isLoading, error, isError, isSuccess }] =
    useForgotPasswordMutation()
  const alert = useAlert()
  const submitHandler = (e) => {
    e.preventDefault()
    forgotPassword({ email })
    setEmail('')
  }
  if (isError) {
    alert.error(error.error || error?.data?.error)
  }
  if (isSuccess) {
    alert.success('Email Sent & Please Check your Email')
  }
  return (
    <>
      <MetaData title={'Forgot Password'} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='row wrapper'>
          <div className='col-10 col-lg-5 mx-auto my-5'>
            <form className='shadow-lg' onSubmit={submitHandler}>
              <h1 className='mb-3'>Forgot Password</h1>
              <div className='form-group'>
                <label htmlFor='email_field'>Enter Email</label>
                <input
                  type='email'
                  id='email_field'
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                id='forgot_password_button'
                type='submit'
                className='btn btn-block py-3'
                disabled={isLoading}
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ForgotPassword
