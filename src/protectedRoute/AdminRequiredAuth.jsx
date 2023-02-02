import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../utils'

const AdminRequiredAuth = ({ children }) => {
  const { pathname } = useLocation()
  return isAuthenticated() && isAuthenticated().role == 'admin' ? (
    children
  ) : (
    <Navigate to={'/login'} state={{ from: pathname }} replace />
  )
}

export default AdminRequiredAuth
