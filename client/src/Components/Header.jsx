import React, { useContext, useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { BsBag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { UserContextApi } from '../context/UserContext';
import { RiMenu3Line } from "react-icons/ri";
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
      <div className='w-screen px-5 lg:px-10 py-2 pt-3  ss:py-2 lg:py-[16px] ss:bg-[#ffffff] bg-white ss:text-black   shadow-md'>
        <div className='flex justify-between w-full'>

          <div className='flex  gap-5 items-center text-[18px]'>
            <div className='subtextLines text-yellow-600  px-2 py-2 ss:text-[25px]  text-[18px]  md:block'><Link to={'/home'}><span className='QuoteLines'>A</span>awara Ethnic</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block  duration-500'><Link to={'/home'}>Home</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block  duration-500'><Link to={'/aboutus'}>About Us</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block  duration-500'><Link to={'/shop'}>Shop</Link></div>
          </div>

          <div className='flex gap-5 items-center relative'>
            <Link to={'/shop'}>
            <div className='scale-[1.3]'><FaSearch /></div>
            </Link>
            <div className=' relative' ><Link to={'/cart'}><BsBag className='scale-[1.4]' /></Link>
              <div className='absolute -bottom-2 -right-3  bg-[#000000e7] text-white w-4 h-4 text-[10px] rounded-full text-center'>{totalCartItems}</div>
            </div>
            {
              isLoggedIn
              ?
              <>
              <div className=' px-4 py-1 text-white bg-[#000000d1] rounded-full' onClick={logout} >Login</div></>
              :
              <>
              <div onClick={()=>setProfileCard(!profileCard)} className='text-black block ss:hidden  text-[18px]'><RiMenu3Line /></div>
              </>

            }
            {
              profileCard
              ?

              <div className='absolute bottom-[-90vh] py-4 px-5  flex flex-col justify-between  w-[260px] h-[90vh] right-[-8px] bg-white border'> 
              <div className='absolute bg-white border h-5 right-2 border-b-0 border-r-0 -top-[10px] rotate-45 w-5'></div>
              <div className='w-full flex justify-start flex-col py-10  text-[22px] gap-y-5'>
                <Link to={'/home'}>Home</Link>
                <Link to={'/shop'}>Shop</Link>
                <Link to={'/aboutus'}>About Us</Link>
              </div>
              <div className='mb-10'>
                <div className='bg-stone-100 px-3 py-2 rounded-md' onClick={logout}>Logout</div>
              </div>
              </div>
              :
              ''
            }
            

          </div>

        </div>
      </div>
    </>
  )
}

export default Header
