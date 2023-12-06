import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrder from '../features/User/component/userOrders'

const UserOrderPage = () => {
  return (
    <Navbar>
        <UserOrder></UserOrder>
    </Navbar>
  )
}

export default UserOrderPage