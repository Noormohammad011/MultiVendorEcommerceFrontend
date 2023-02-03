import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, MetaData } from '../../components'
import { useParams } from 'react-router-dom'
import {
  clearUsers,
  fetchUser,
  updateUser,
} from '../../features/adminUser/adminUserSlice'
import { useAlert } from 'react-alert'

const UpdateUser = () => {
  const { id } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const alert = useAlert()
  const dispatch = useDispatch()
  const { user, isError, message, isLoading, isUpdate } = useSelector(
    (state) => state.adminUser
  )

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(fetchUser(id))
    } else {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }
    if (isError) {
      alert.error(message)
    }
    if (isUpdate) {
      alert.success('User updated successfully')
      dispatch(clearUsers())
    }
  }, [isError, message, id, user, alert, dispatch, isUpdate])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateUser({ id, name, email, role }))
  }

  if (isLoading) return <Loader />
  return (
    <>
      <MetaData title={`Update User`} />
      <div className='col-12 col-md-10'>
        <div className='row wrapper'>
          <div className='col-10 col-lg-5'>
            <form className='shadow-lg' onSubmit={submitHandler}>
              <h1 className='mt-2 mb-5'>Update User</h1>

              <div className='form-group'>
                <label htmlFor='name_field'>Name</label>
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
                <label htmlFor='role_field'>Role</label>

                <select
                  id='role_field'
                  className='form-control'
                  name='role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value='user'>user</option>
                  <option value='admin'>admin</option>
                </select>
              </div>

              <button
                type='submit'
                className='btn update-btn btn-block mt-4 mb-3'
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateUser
