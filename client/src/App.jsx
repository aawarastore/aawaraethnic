import React from 'react'

import '../src/App.css'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SizeChart from './Pages/SizeChart';
import AboutUs from './Pages/AboutUs';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import BuyProduct from './Pages/BuyProduct';
import Checkout from './Pages/Checkout';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/register',
    element:<Register />
  },
  {
    path:'/home',
    element:<Home />
  },
 
  {
    path:'/aboutus',
    element:<AboutUs />
  },
  {
    path:'/shop',
    element:<Shop />
  },
  {
    path:'/cart',
    element:<Cart />
  },
  {
    path:'/buyproduct/:id',
    element:<BuyProduct />
  },
  {
    path:'/checkout',
    element:<Checkout />
  },
  

])

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
