import React from 'react'
import { Sidebar } from '../components'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <h1 className='my-4'>Dashboard</h1>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Dashboard
