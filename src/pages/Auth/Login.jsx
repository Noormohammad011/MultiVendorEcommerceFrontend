import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../features/auth/authApi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Loader, MetaData } from '../../components'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const { email, password } = values
  const alert = useAlert()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [login, { isLoading, error, isError }] = useLoginMutation()
  const { user } = useSelector((state) => state.auth)
  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const resetForm = () => {
    setValues({ ...values, email: '', password: '' })
  }

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate(state?.from ? state.from : '/dashboard', { replace: true })
        alert.success('loggedin success')
      } else {
        navigate(state?.from ? state.from : '/me', { replace: true })
        alert.success('loggedin success')
      }
    }
    if (isError) {
      alert.error('Invalid credentials')
    }
  }, [user, navigate, isError])

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
    resetForm()
  }
  // if (isError) {
  //    return alert.error('loggedin fail')
  // }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={'Login'} />
          <div className='row wrapper'>
            <div className='col-10 col-lg-5 mx-auto my-5'>
              <form className='shadow-lg' onSubmit={handleSubmit}>
                <h1 className='mb-3'>Login</h1>
                <div className='form-group'>
                  <label htmlFor='email_field'>Email</label>
                  <input
                    type='email'
                    id='email_field'
                    className='form-control'
                    name='email'
                    onChange={handleChange}
                    value={email}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password_field'>Password</label>
                  <input
                    type='password'
                    id='password_field'
                    className='form-control'
                    value={password}
                    onChange={handleChange}
                    name='password'
                  />
                </div>

                <Link to='/password/forgot' className='float-right mb-4'>
                  Forgot Password?
                </Link>

                <button
                  id='login_button'
                  type='submit'
                  className='btn btn-block py-3'
                >
                  LOGIN
                </button>

                <Link to='/register' className='float-right mt-3'>
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Login
