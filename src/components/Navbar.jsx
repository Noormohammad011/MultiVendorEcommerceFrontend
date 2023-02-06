import React from 'react'
import Logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import Search from './Search'
import { signout } from '../utils'
import { useLoadUserQuery } from '../features/auth/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggedOut } from '../features/auth/authSlice'
import Image from 'react-bootstrap/Image'
import {
  Container,
  Nav,
  Navbar as NavbarReact,
  NavDropdown,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Navbar = () => {
  const { data: userData, isLoading } = useLoadUserQuery()
  const { cartItems } = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.auth)
  const user = auth.user
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(userLoggedOut())
    signout()
    navigate('/')
  }
  return (
    <header>
      <NavbarReact bg='dark' variant='dark' expand='lg'>
        <Container>
          <NavbarReact.Brand href='/'>
            <img src={Logo} />
          </NavbarReact.Brand>
          <NavbarReact.Toggle aria-controls='basic-navbar-nav' />
          <NavbarReact.Collapse id='basic-navbar-nav'>
            <Search />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart' aria-hidden='true'></i>
                  Cart {cartItems.length}
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown
                  title={
                    <div
                      className='pull-left'
                      style={{
                        color: 'white',
                      }}
                    >
                      <Image
                        roundedCircle
                        src={userData?.data?.avatar?.url || user.avatar.url}
                        alt={user && user.name}
                        style={{
                          width: '30px',
                          height: '30px',
                          marginRight: '10px',
                        }}
                      />

                      {user && user.name}
                    </div>
                  }
                  id='nav-dropdown'
                >
                  <LinkContainer to='/me'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orders/me'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                  {user.role === 'admin' && (
                    <LinkContainer to='/dashboard'>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                  )}
                </NavDropdown>
              ) : (
                !isLoading && (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user' aria-hidden='true'></i> Login
                    </Nav.Link>
                  </LinkContainer>
                )
              )}
            </Nav>
          </NavbarReact.Collapse>
        </Container>
      </NavbarReact>
    </header>
  )
}

export default Navbar
