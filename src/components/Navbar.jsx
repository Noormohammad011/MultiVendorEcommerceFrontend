import React from 'react'
import Logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import Search from './Search'
import { isAuthenticated, signout } from '../utils'
import { useLoadUserQuery } from '../features/auth/authApi'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { data: userData, isLoading } = useLoadUserQuery()
  const { cartItems } = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.auth)
  const user = userData?.data || isAuthenticated() || auth?.user
  return (
    <nav className='navbar row'>
      <div className='col-12 col-md-3'>
        <div className='navbar-brand'>
          <Link to='/'>
            <img src={Logo} />
          </Link>
        </div>
      </div>

      <div className='col-12 col-md-6 mt-2 mt-md-0'>
        <Search />
      </div>

      <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <span id='cart' className='ml-3'>
            Cart
          </span>
          <span className='ml-1' id='cart_count'>
            {cartItems.length}
          </span>
        </Link>

        {user ? (
          <div className='ml-4 dropdown d-inline'>
            <Link
              to='#!'
              className='btn dropdown-toggle text-white mr-4'
              type='button'
              id='dropDownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <figure className='avatar avatar-nav'>
                <img
                  src={user.avatar.url}
                  alt={user && user.name}
                  className='rounded-circle'
                />
              </figure>
              <span>{user && user.name}</span>
            </Link>

            <div className='dropdown-menu' aria-labelledby='dropDownMenuButton'>
              {user.role === 'admin' && (
                <Link className='dropdown-item' to='/dashboard'>
                  Dashboard
                </Link>
              )}
              <Link className='dropdown-item' to='/orders/me'>
                Orders
              </Link>
              <Link className='dropdown-item' to='/me'>
                Profile
              </Link>
              <Link
                className='dropdown-item text-danger'
                to='/'
                onClick={() => {
                  signout()
                  navigate('/')
                }}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to='/login' className='btn ml-4' id='login_btn'>
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  )
}

export default Navbar
