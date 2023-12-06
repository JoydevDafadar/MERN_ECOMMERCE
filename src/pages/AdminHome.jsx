import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import { ProductList } from '../features/product/component/ProductList'
import { AdminProductList } from '../features/product copy/component/AdminProductList'



const AdminHome = () => {
  return (
    <>
    <Navbar >
        <AdminProductList></AdminProductList>
    </Navbar>

    </>
  )
}

export default AdminHome