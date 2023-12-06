import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserProfile from '../features/User/component/userProfile'

const UserProfilePage = () => {
  return (
    <Navbar>
        <UserProfile></UserProfile>
    </Navbar>
  )
}

export default UserProfilePage