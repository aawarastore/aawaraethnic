import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='w-screen py-10 px-10 bg-[#0c0c0cd7] flex flex-wrap flex-col items-center  justify-center content-center  text-white' >
      <div className='subtextLines text-yellow-600  px-2 py-2 text-[20px] '><Link to={'/home'}><span className='QuoteLines'>A</span>awara <span className='QuoteLines'>E</span>thnic</Link></div>
      {/* <div className='subtextLines mb-8 w-1/2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quasi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, eius?</div> */}
        <div className='flex gap-4  ss:text-[15px] text-[12px] '>
        {/* <div className='flex gap-4'> */}
          <Link to={'/'}><div className='hover:underline transition-all'>Contact Us</div></Link>
          <Link to={'/privacypolicy'}><div className='hover:underline transition-all'>Privacy Policy</div></Link>
          <Link to={'/shippingpolicy'}><div className='hover:underline transition-all'>Shipping Policy</div></Link>
          <Link to={'/exchangepolicy'}><div className='hover:underline transition-all'>Exchange Policy</div></Link>
          <Link to={'/cancelationpolicy'}><div className='hover:underline transition-all'>Cancelation Policy</div></Link>
         
        {/* </div> */}

        {/* <div className='hover:underline transition-all'>
          Collections
        </div> */}
        {/* <div className='hover:underline transition-all'>Contact Us</div> */}

      </div>
      </div>

      <div className='w-screen flex justify-center py-3 text-center bg-[#0c0c0cd7] text-white text-[14px]'>Copyright 2024 © AawaraEthnic.com | All Rights Reserved </div>
    </>
  )
}

export default Footer
