import React, { useContext, useEffect, useState } from 'react'
import { UserContextApi } from '../context/UserContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { FaBagShopping } from "react-icons/fa6";

const Cards = ({ productsdata }) => {

  const navigate = useNavigate()
  const { isLoggedIn, setLoggedIn, getCartProduct } = useContext(UserContextApi)
  const [size, setSize] = useState('')
  const [discount, setDisccount] = useState(0)

  const findDis = () => {
    const tot = (productsdata.Price - productsdata.Discounted_Price) / productsdata.Price
    const dis = Math.floor(tot * 100)

    setDisccount(dis)
  }
  useEffect(() => {
    findDis()
  }, [])

  const addtoCart = async (productid, size, productimg) => {
    console.log(productimg,size,productid)
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/addtoCart`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({ productid, size, productimg })
      })
      const data = await response.json()
      if (data.status == 200) {
        getCartProduct()
        // localStorage.setItem('token',data.client_token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const notify = () => {
    toast('Kindly Log In')
  }

  const buyProduct = (productid) => {
    navigate('/buyproduct/' + productid)
  }

  return (
    <>
      <div className='f:w-[300px] relative  s:w-[270px]   sl:w-[220px] ss:w-[190px] w-[160px]  flex justify-center items-center flex-col'>
        <ToastContainer newestOnTop={true} autoClose={1000}
          toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true} />
        <div className='f:w-[300px] f:h-[448px] s:w-[270px] s:h-[404px] sl:w-[220px] sl:h-[328px] border  border-b-0 border-[#2323233c] ss:w-[190px] ss:h-[280px] w-[160px] h-[240px] rounded-[0px]  overflow-hidden relative'>
          <div className='bg-[#ffffff9d]  ss:flex justify-center  text-black border absolute right-2 top-2  z-[99]  rounded-[06px]  px-2 text-[10px] ss:text-[13px] py-2 w-[18%] cursor-pointer' onClick={() => { isLoggedIn ? addtoCart(productsdata.PRODUCT_id, size, productsdata.Product_img_url) : notify() }}><FaBagShopping /></div>
          <img className='w-full bg-stone-200 hover:scale-[1.01] transition-all ease-out duration-[0.9s] h-full z-50  ' src={productsdata.Product_img_url} alt='Network!!' />
        </div>
        <div className='w-full  text-[11px] px-[4px] text-black flex flex-col justify-center items-center  ss:text-[16px]   '>
          <div className='uppercase ss:font-[700] opacity-[0.7]  font-[800]'>Aawara Ethnic </div>
          <div className='uppercase  text-center w-full whitespace-nowrap truncate  text-[12px] text-[#b0b0b0] font-[300]'>{productsdata.Description}</div>
          <div className=' flex gap-1 items-center'>
            <div className=' line-through ss:text-[15px] text-red-600 text-[12px] opacity-[0.6]'> ₹ {productsdata.Price}</div>
            <div className=' ss:text-[17px] text-[15px] font-[600]'>₹ {productsdata.Discounted_Price}/-</div>
          </div>


          <div className='my-2 w-full  ss:justify-center hidden  ss:flex gap-1'>
            {
              [{ XS: 34 }, { S: 36 }, { M: 38 }, { L: 40 }, { XL: 42 }, { XXL: 44 }].map((item, index) => {
                const brandSize = Object.keys(item)[0]; // Get the key from the object
                const value = item[brandSize]; // Get the value from the object
                return (
                  <div onClick={() => setSize(brandSize)} key={value} style={{ backgroundColor: size == brandSize ? 'rgb(78 78 78 / 48%)' : 'transparent' }} className='py-1 px-2 rounded-full  cursor-pointer text-center border border-stone-300 ss:text-[11px]  text-[7px] uppercase'>{brandSize}</div>
                );
              })
            }
          </div>
        </div>
        <div className='flex  justify-between mt-1 w-full '>
          {/* <div className='bg-gradient-to-r hover:bg-gradient-to-t from-[#282828d2]  to-black  rounded-[5px]  text-center text-white  px-2 text-[15px] ss:text-[18px] py-[6px] w-full  cursor-pointer' onClick={() => buyProduct(productsdata.PRODUCT_id)} >Buy </div> */}
          <div className='bg-[#1D0100] text-center text-white  px-2 text-[15px] ss:text-[18px] py-[6px] w-full  cursor-pointer  bttn ' onClick={() => buyProduct(productsdata.PRODUCT_id)} >Buy </div>
        </div>
      </div>
    </>
  )
}

export default Cards
