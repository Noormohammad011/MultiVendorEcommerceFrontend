import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { Loader, MetaData } from '../../components'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearUsers,
  deleteUser,
  fetchAllUser,
} from '../../features/adminUser/adminUserSlice'
const UsersList = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { users, isError, isLoading, message, isDelete } = useSelector(
    (state) => state.adminUser
  )
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAllUser())
    if (isError) {
      alert.error(message)
    }

    if (isDelete) {
      alert.success('User deleted successfully')
      navigate('/dashboard/admin/users')
      dispatch(clearUsers())
    }
  }, [dispatch, isError, alert, message, isDelete, navigate])
  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        actions: (
          <Fragment>
            <Link
              to={`/dashboard/admin/user/${user._id}`}
              className='btn btn-primary py-1 px-2'
            >
              <i className='fa fa-pencil'></i>
            </Link>
            <button
              className='btn btn-danger py-1 px-2 ml-2'
              onClick={() => dispatch(deleteUser(user._id))}
            >
              <i className='fa fa-trash'></i>
            </button>
          </Fragment>
        ),
      })
    })

    return data
  }

  return (
    <>
      <MetaData title={'All Users'} />

      <div className='col-12 col-md-10'>
        <>
          <h1 className='my-5'>All Users</h1>

          {isLoading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setUsers()}
              className='px-3'
              bordered
              striped
              hover
            />
          )}
        </>
      </div>
    </>
  )
}

export default UsersList
