import React from 'react'
import { createBrowserRouter, RouterProvider , Outlet } from 'react-router'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

import ProductDetails from './pages/ProductDetails'
import ProductList from './admin/ProductList'
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProduct'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutAddress from './pages/CheckoutAddress'
import OrderSuccess from './pages/OrderSuccess'


import UploadImage from './components/UploadImage'



function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: '/cart', element: <Cart /> },

      { path: '/admin/products', element: <ProductList /> },
      { path: '/admin/products/add', element: <AddProduct /> },
      { path: '/admin/products/edit/:id', element: <EditProduct /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/checkout-address', element: <CheckoutAddress /> },
      { path: '/order-success/:id', element: <OrderSuccess /> },
      { path: '/test-upload', element: <UploadImage /> },
      { path: "*", element: <ProductList /> }
    ]
  }
])


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
