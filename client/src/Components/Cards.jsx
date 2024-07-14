import React, { useContext, useEffect, useState } from 'react'
import { UserContextApi } from '../context/UserContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { FaBagShopping } from "react-icons/fa6";

const Cards = ({ productsdata }) => {
  // console.log(productsdata)

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
      if (data.status == 200) getCartProduct()
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
      <div className='f:w-[300px] relative  s:w-[270px]  sl:w-[220px] ss:w-[190px] w-[160px]  flex justify-center items-center flex-col'>
      <ToastContainer />
        <div className='f:w-[300px] f:h-[448px] s:w-[270px] s:h-[404px] sl:w-[220px] sl:h-[328px] ss:w-[190px] ss:h-[280px] w-[160px] h-[240px] rounded-[7px] shadow-lg ] overflow-hidden'>
          <img className='w-full bg-stone-200 hover:scale-[1.01] transition-all ease-out h-full z-50 ' src={productsdata.Product_img_url} alt="s" />
        </div>
        <div className='w-full  text-[11px] px-[4px]  ss:text-[16px]  '>
          <div className='uppercase  py-1 h-9 ss:h-[43px] font-[500]'>{productsdata.Product_name} </div>
          {/* <div className='uppercase  text-[13px] w-full h-[30px] font-[300]'>{productsdata.Description}</div> */}
          <div className='w-full flex gap-1 items-center'>
            <div className=' line-through ss:text-[15px] text-[12px] opacity-[0.6]'> ₹ {productsdata.Price}</div>
            <div className=' ss:text-[17px] text-[15px] font-[600]'>₹ {productsdata.Discounted_Price}/-</div>
            {/* <div className='font-[600] text-[9px] py-1 px-1 bg-gradient-to-r text-yellow-800 from-orange-100 to-orange-400 rounded-e-full'>
              <span>{discount + '% OFF'}</span>
            </div> */}
          </div>


          <div className='my-2  hidden  ss:flex gap-1'>
            {
              [{ XS: 34 }, { S: 36 }, { M: 38 }, { L: 40 }, { XL: 42 }, { XXL: 44 }].map((item, index) => {
                const brandSize = Object.keys(item)[0]; // Get the key from the object
                const value = item[brandSize]; // Get the value from the object
                return (
                  <div onClick={() => setSize(brandSize)} key={value} style={{ backgroundColor: size == brandSize ? 'rgb(78 78 78 / 48%)' : 'white' }} className='py-[3px] w-7 px-1  cursor-pointer text-center border border-stone-300 ss:text-[11px]  text-[7px] uppercase'>{brandSize}</div>
                );
              })
            }
          </div>
        </div>
        <div className='flex  justify-between mt-1 w-full'>
            <div className='bg-gradient-to-tr hover:bg-gradient-to-tl from-[#292929]  to-black  rounded-[5px] border text-center text-white  px-2 text-[15px] ss:text-[18px] py-[6px] ss:w-[79%] w-full  cursor-pointer' onClick={() => buyProduct(productsdata.PRODUCT_id)} >Buy </div>
            <div className='bg-white hidden ss:flex justify-center hover:shadow-md  text-black border  rounded-[5px]  px-2 text-[10px] ss:text-[13px] py-3 w-[18%] cursor-pointer' onClick={() => { isLoggedIn ? addtoCart(productsdata.PRODUCT_id, size, productsdata.Product_img_url) : notify() }}><FaBagShopping /></div>
          </div>
      </div>
    </>
  )
}

export default Cards
