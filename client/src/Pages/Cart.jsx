import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import CartCardBlock from '../Components/CartCardBlock';
import { UserContextApi } from '../context/UserContext';
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { MdSettingsPhone } from 'react-icons/md';

const Cart = () => {

  const navigate = useNavigate()
  

  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn,getCartLength , totalCartItems } = useContext(UserContextApi);
  // const [userCart,setUserCart] = useState([])

  const getCartProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getCartProduct`, {
        method: 'GET',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token')
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setCartItems(data.cartProducts.Products);
        setCartTotalPrice(data.cartProducts.Total_Price);
      } else if (data.status === 204) {
        setCartItems([]);
        setCartTotalPrice(0);
      }
    } catch (error) {
      console.error('Failed to fetch cart products:', error);
    }
  };
  
  const UserCheckout = ()=>{
    navigate('/checkout')
  }

  useEffect(() => {
    getCartProduct();
    getCartLength()
  }, []);

  return (
    <div className='w-screen  overflow-x-hidden'>
      <div className='w-screen z-[9999] fixed shadow-md'><Header totalCartItems={totalCartItems} /></div>

      <div className='w-full h-[74px] bg-yellow-700'></div>
      <div className='w-full pl-6 md:pl-10 text-2xl QuoteLines mt-10'>Cart</div>

      <div className='h-20 w-screen'></div>

      {isLoggedIn ? 
        (
          cartItems.Total_Quantity == 0 
          ?
          <div className='w-screen h-[50vh] flex items-center justify-center'>
          <div className=' text-center px-10 py-10'>
            <div className=''>
              <div>Cart</div>
            </div>
              <div className='text-[14px]'>Your cart is empty</div>
              <div  className='text-[19px]'>There are no items in your cart.Let's add something</div>
              <Link><div className='px-5 py-3 my-3 bg-[#191919db] text-white '>Continue Shopping</div></Link>
          </div>
        </div>
        :
        <div className='w-screen flex justify-center lg:flex-row flex-col lg:items-start items-center gap-3'>
          <div className='flex justify-center lg:w-[48vw] w-[90vw]'>
            <div className='border lg:w-[3/4] w-full min:h-[300px] text-[14px]'>
              <div className='hidden lg:grid grid-cols-8 max:w-[750px] px-2 py-2 border font-[500]'>
                <div className=''></div>
                <div className=''></div>
                <div className='col-span-2 pl-3'>Product</div>
                <div className=''>Price</div>
                <div className='col-span-2'>Quantity</div>
                <div className=''>Final Price</div>
              </div>
              {/* {cartItems.length === 0 ? (
                <div className='w-full px-4 py-4 flex justify-center items-center'>
                  <div className='w-full h-[50vh]'>
                    
                  </div>
                </div>
              ) : ( */}
              {
                cartItems.map(item => (
                  <CartCardBlock key={item._id} getCartProduct={getCartProduct} productsdata={item} />
                ))
              }
            </div>
          </div>

          <div className='lg:w-[25vw] mb-10 w-[90vw] border-2'>
            <div className='w-full py-[7px] border-b px-5 font-[700]'>Cart Total</div>
            <div className='w-full px-5 text-stone-500'>
              <div className='flex w-full py-3 border-b justify-between'>
                <div>Subtotal</div>
                <div className='pr-5'>{'₹' + cartTotalPrice}</div>
              </div>
              <div className='flex w-full py-3 border-b justify-between'>
                <div>Total</div>
                <div className='pr-5'>{'₹' + cartTotalPrice}</div>
              </div>
              <div onClick={()=>UserCheckout()} className='w-full bg-black text-white text-center text-[18px] my-2 rounded-sm py-3 font-[600]'>Proceed To Checkout</div>

            </div>

          </div>
        </div>
        ):(
        <div className='w-screen flex justify-center flex-wrap items-center gap-10'>
          <div>
          </div>
        </div>
      )}


      <div className='h-20'></div>
      <div className='w-screen overflow-x-hidden'><Footer /></div>
    </div>
  );
};

export default Cart;
