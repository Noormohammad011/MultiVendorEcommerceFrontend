import React, { useState } from 'react'
import { DashbordSidebar, Sidebar } from '../components'
import { Outlet } from 'react-router-dom'
import { useProSidebar } from 'react-pro-sidebar'
const Dashboard = () => {
  const { collapseSidebar } = useProSidebar()
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <div
        style={{
          display: 'flex',
          height: '170vh',
          minHeight: '400px',
        }}
      >
        <DashbordSidebar />
        <main style={{ display: 'flex', padding: 10 }}>
          <div>
            <button
              // className='sb-button'
              type='button'
              onClick={() => {
                collapseSidebar()
                setToggle(!toggle)
              }}
             
            >
              <i className='fa fa-bars'></i>
            </button>
          </div>
        </main>
        <div
          // className='col-12 col-md-8'
          className={`${toggle ? 'col-md-12' : 'col-md-9'} col-12`}
        >
          <h1 className='my-4'>Dashboard</h1>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Dashboard
