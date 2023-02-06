import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
const DashbordSidebar = () => {
  return (
    <Sidebar
      transitionDuration={1000}
      rootStyles={{
        color: 'white',
        // marginTop: '84px',
        border: 'none',
        backgroundColor: '#18212b !important',
      }}
    >
      <Menu transitionDuration={1000}>
        <SubMenu
          component={<Link to='/dashboard' />}
          label='Dashboard'
          icon={<i className='fa fa-tachometer'></i>}
        >
          <MenuItem
            component={<Link to='/dashboard/admin/products' />}
            icon={<i className='fa fa-clipboard'></i>}
          >
            All
          </MenuItem>
          <MenuItem
            component={<Link to='/dashboard/admin/product' />}
            icon={<i className='fa fa-plus'></i>}
          >
            Create
          </MenuItem>
        </SubMenu>
        <MenuItem
          component={<Link to='/dashboard/admin/orders' />}
          icon={<i className='fa fa-shopping-basket'></i>}
        >
          Orders
        </MenuItem>
        <MenuItem
          component={<Link to='/dashboard/admin/users' />}
          icon={<i className='fa fa-users'></i>}
        >
          Users
        </MenuItem>
        <MenuItem
          component={<Link to='/dashboard/admin/reviews' />}
          icon={<i className='fa fa-star'></i>}
        >
          Reviews
        </MenuItem>
      </Menu>
    </Sidebar>
  )
}

export default DashbordSidebar
