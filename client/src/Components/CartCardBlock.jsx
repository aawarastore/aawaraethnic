import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { UserContextApi } from '../context/UserContext';

const CartCardBlock = ({ productsdata, getCartProduct }) => {

  const {getCartLength} = useContext(UserContextApi)

  const [quantityCount, setQuantityCount] = useState(productsdata.Quantity);
  const finalPrice = productsdata.Price * quantityCount;

  const updateCart = async (newQuantity) => {
    try {
      // const product_item_id = productsdata.product_id;
      // const productColor = productsdata.Color
      // const productSize = productsdata.Size
      const product_item_id = productsdata.product_id+'-'+productsdata.Size+'-'+productsdata.Color
      const response = await fetch('http://localhost:3000/user/updateCart', {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({ product_item_id ,quantityCount: newQuantity, finalPrice: productsdata.Price * newQuantity })
      });
      getCartLength()
      getCartProduct();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const deleteItem = async (productid) => {
    // console.log(color)
   const encodedColor = encodeURIComponent(productid); // Example color hex code

    // const url = `http://localhost:3000/user/deleteCartItem/${productid}-${size}-${encodedColor}`
    const url = `http://localhost:3000/user/deleteCartItem/${encodedColor}`
    console.log(url)
    try {
      const response = await fetch(url,{
        method:'DELETE',
        headers:{
          token:localStorage.getItem('token')
        }
      })
      getCartProduct()

      
    } catch (error) {
      console.log('deleteitem ',error)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantityCount + change);
    setQuantityCount(newQuantity);
    // getCartLength()
  };

  useEffect(() => {
    updateCart(quantityCount);
    // getCartLength()
  }, [quantityCount]);

  return (
    <>
    
      <div className='max:w-[750px] border-b hidden grid-cols-8 lg:grid items-center text-stone-600'>
        <div className='flex w-full justify-center'>
          <MdOutlineCancel onClick={()=>deleteItem(productsdata.product_id)} className='text-stone-500 font-[200] text-[18px] cursor-pointer' />
        </div>
        <div className='h-[110px] w-[100%] my-3'><img className='w-full h-full' src={productsdata.product_img_url} alt="" /></div>
        <div className='col-span-2 pl-4 text-stone-800 font-[500]'>
          <div>{productsdata.product_name}</div>
          <div>{productsdata.Size} </div>
          {/* <div className='w-6 py-3 rounded-full opacity-[0.5]' style={{backgroundColor:productsdata.Color}}> </div> */}
        </div>
        <div>{'₹' + productsdata.Price}</div>
        <div className='col-span-2'>
          <div className='border border-stone-400 bg-slate-100 flex w-fit overflow-hidden rounded-[2px] my-3'>
            <div onClick={() => handleQuantityChange(-1)} className='px-3 cursor-pointer flex justify-center items-center text-[20px]'>-</div>
            <div className='border-l border-r border-stone-700 flex items-center justify-center w-10'>{quantityCount}</div>
            <div onClick={() => handleQuantityChange(1)} className='cursor-pointer px-2 flex justify-center items-center text-[20px]'>+</div>
          </div>
        </div>
        <div>{'₹' + finalPrice}</div>
      </div>

      <div className='w-full border lg:hidden block'>
        <div className='w-full flex justify-end pr-5 py-2 bg-red-100'>
          <MdOutlineCancel onClick={()=>deleteItem(productsdata.product_id)} className='text-stone-500' />
        </div>
        <div className='w-full flex justify-center items-center py-4'>
          <div className='h-[180px] w-[120px] '><img className='w-full h-full' src={productsdata.product_img_url} alt="" /></div>
        </div>
        <div className='flex justify-between px-2 border-b py-2 border-t'>
          <div>Product:</div>
          <div className='font-[500]'>{productsdata.product_name}</div>
        </div>
        <div className='flex justify-between px-2 border-b py-2'>
          <div>Price:</div>
          <div>{'₹' + productsdata.Price}</div>
        </div>
        <div className='flex items-center justify-between px-2 border-b'>
          <div>Quantity:</div>
          <div>
            <div className='border border-slate-300 flex w-fit overflow-hidden my-3'>
              <div onClick={() => handleQuantityChange(-1)} className='px-3 cursor-pointer flex justify-center items-center text-[20px]'>-</div>
              <div className='border-l border-r border-stone-700 flex items-center justify-center w-10'>{quantityCount}</div>
              <div onClick={() => handleQuantityChange(1)} className='cursor-pointer px-2 flex justify-center items-center text-[20px]'>+</div>
            </div>
          </div>
        </div>
        <div className='flex justify-between px-2 py-2 border-b border-t'>
          <div className='font-[500]'>Subtotal:</div>
          <div>{'₹' + finalPrice}</div>
        </div>
      </div>

    </>
  );
};

export default CartCardBlock;
