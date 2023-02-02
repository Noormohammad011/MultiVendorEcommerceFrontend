import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../utils'

const RequiredAuth = ({ children }) => {
  const { pathname } = useLocation()
  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to={'/login'} state={{ from: pathname }} replace />
  )
}
export default RequiredAuth
