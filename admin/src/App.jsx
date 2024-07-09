import React from 'react'
import Login from './Pages/Login'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AdminPage from './Pages/AdminPage'
import Users from './Pages/Users'
import Products from './Pages/Products'
import AddProducts from './Pages/AddProducts'


function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login />
    },
    {
      path:'/adminPage',
      element:<AdminPage />
    },
    {
      path:'/allusers',
      element:<Users />
    },
    {
      path:'/products',
      element:<Products />
    },
    {
      path:'/addproduct',
      element:<AddProducts />
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
