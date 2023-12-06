import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetails from '../features/product/component/ProductDetail'
import AdminProductDetails from '../features/product copy/component/AdminProductDetail'




const AdminProductDetailsPage = () => {
  return (
    <>
    <Navbar >
        <AdminProductDetails></AdminProductDetails>
    </Navbar>

    </>
  )
}

export default AdminProductDetailsPage