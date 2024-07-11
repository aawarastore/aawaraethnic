import React, { useContext, useState } from 'react'
import { UserContextApi } from '../context/UserContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { FaBagShopping } from "react-icons/fa6";

const Cards = ({productsdata}) => {
    // console.log(productsdata)

    const navigate = useNavigate()
    const {isLoggedIn,setLoggedIn,getCartProduct} = useContext(UserContextApi)
    const [size,setSize] = useState('')

    const addtoCart = async(productid,size,productimg)=>{
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/addtoCart`,{
          method:'POST',
          headers:{
            'Content-type':'Application/json',
            token:localStorage.getItem('token')
          },
          body:JSON.stringify({productid,size,productimg})
        })
        const data = await response.json()
        if(data.status == 200) getCartProduct()
      } catch (error) {
        console.log(error)
      }
    }

    const notify = ()=>{
      toast('Kindly Logged In')
    }

    const buyProduct = (productid)=>{
      navigate('/buyproduct/'+productid)
    }

  return (
    <>
      <div className='f:w-[300px]  s:w-[270px] sl:w-[220px] ss:w-[190px] w-[160px]  flex justify-center items-center flex-col'>
        {/* img==  330/250 */}
        <ToastContainer />

        <div className='f:w-[300px] f:h-[448px] s:w-[270px] s:h-[404px] sl:w-[220px] sl:h-[328px] ss:w-[190px] ss:h-[280px] w-[160px] h-[240px] '>
            <img className='w-full h-full z-50 ' src={productsdata.Product_img_url} alt="s" />
        </div>
        <div className='w-full  text-[12px]  ss:text-[16px]  '>
            <div className='uppercase  py-1 h-[43px]'>{productsdata.Product_name}</div>
            <div className='line-through opacity-[0.7]'> ₹ {productsdata.Price}/-</div>
            <div className='text-[17px] font-[500]'>₹ {productsdata.Discounted_Price}/-</div>
            <div className='my-2 flex gap-1'>
            {
                [{ SL: 34 }, { S: 36 }, { M: 38 }, { L: 40 }, { XL: 42 }, { XXL: 44 }].map((item, index) => {
                  const brandSize = Object.keys(item)[0]; // Get the key from the object
                  const value = item[brandSize]; // Get the value from the object
                  return (
                    <div onClick={()=>setSize(brandSize)} key={value} style={{backgroundColor:size == brandSize ? 'rgb(78 78 78 / 48%)':'white'}} className='py-[3px] w-7 px-1  cursor-pointer text-center border border-stone-300 ss:text-[11px]  text-[7px] uppercase'>{brandSize}</div>
                  );
                })
              }
            </div>

            <div className='flex justify-between w-full'>
              {/* <div  className='bg-yellow-700 text-center text-white px-2 text-[18px] py-1 w-[48%] cursor-pointer' onClick={()=>{isLoggedIn ? addtoCart(productsdata.PRODUCT_id,size,productsdata.Product_img_url) : notify()}}>Cart+</div> */}
              {/* <div  className='bg-white border text-center text-yellow-700 px-2 text-[18px] py-1 w-[48%] cursor-pointer' onClick={()=>buyProduct() } >Buy </div> */}
              <div  className='bg-black rounded-[5px] border text-center text-white  px-2 text-[18px] py-[6px] w-[79%] cursor-pointer' onClick={()=>buyProduct(productsdata.PRODUCT_id) } >Buy </div>
              <div  className='bg-white flex justify-center  text-black border  rounded-[5px]  px-2 text-[10px] ss:text-[13px] py-3 w-[18%] cursor-pointer' onClick={()=>{isLoggedIn ? addtoCart(productsdata.PRODUCT_id,size,productsdata.Product_img_url) : notify()}}><FaBagShopping /></div>

            </div>
        </div>
      </div>
    </>
  )
}

export default Cards
