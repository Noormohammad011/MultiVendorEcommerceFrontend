import React from 'react'
import { Footer, Navbar } from '../components'
import { Outlet, useLocation } from 'react-router-dom'

const Main = () => {
  const { pathname } = useLocation()
  return (
    <>
      <Navbar />
      <div
        className={`${
          pathname.startsWith('/dashboard') ? '' : 'container container-fluid'
        }`}
      >
        <Outlet />
      </div>
      {pathname.startsWith('/dashboard') ? '' : <Footer />}
    </>
  )
}

export default Main
