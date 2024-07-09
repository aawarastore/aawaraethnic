import React, { useContext, useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { BsBag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { UserContextApi } from '../context/UserContext';

const Header = () => {

  
  const navigate = useNavigate()
  


  const {isLoggedIn,setLoggedIn,totalCartItems} = useContext(UserContextApi)
  const [profileCard, setProfileCard] = useState(false)

  const logout =async ()=>{
    localStorage.removeItem('token')
    setLoggedIn(false)
    navigate('/home')
  }



  return (
    <>
      <div className='w-screen px-5 lg:px-10  py-2 lg:py-[16px] bg-[#ffffff]  shadow-md'>
        <div className='flex justify-between w-full'>

          <div className='flex  gap-5 items-center text-[18px]'>
            <div className='subtextLines text-yellow-600  px-2 py-2 text-[25px] hidden md:block'><Link to={'/home'}><span className='QuoteLines'>A</span>awara Ethinc</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block  duration-500'><Link to={'/home'}>Home</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block  duration-500'><Link to={'/aboutus'}>About Us</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block  duration-500'><Link to={'/shop'}>Shop</Link></div>
            <div className='hover:underline transition-all ease-in block md:hidden  duration-500'>=</div>
          </div>

          <div className='flex gap-5 items-center relative'>
            {/* <div>
              <input placeholder='Search' name='search' type="search" className='px-2 py-1 w-[320px] border shadow-sm' />
            </div> */}
            <Link to={'/shop'}>
            <div className='scale-[1.3]'><FaSearch /></div>
            </Link>
            <div className=' relative' ><Link to={'/cart'}><BsBag className='scale-[1.4]' /></Link>
              <div className='absolute -bottom-2 -right-3  bg-[#000000e7] text-white w-4 h-4 text-[10px] rounded-full text-center'>{totalCartItems}</div>
            </div>
            {
              isLoggedIn
              ?
              <><div className='scale-[1.01]'><FaRegUser /></div>
              <div className=' px-4 py-1 text-white bg-[#000000d1] rounded-full' onClick={logout} >LogOut</div></>
              :
              <div className='px-5 py-2 rounded-full  text-white bg-[#000000d1] font-[600] shadow-md shadow-stone-400 hover:scale-[1.01] '><Link to={'/login'}>Login</Link></div>

            }
            

          </div>

        </div>
      </div>
    </>
  )
}

export default Header
