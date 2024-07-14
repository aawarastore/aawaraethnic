import React , {useContext,useEffect, useState} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CardsContainer from '../Components/CardsContainer'
import { Link, useNavigate } from 'react-router-dom'
import {UserContextApi} from '../context/UserContext'
import Cards from '../Components/Cards'

const Home = () => {
    const img_url='../src/assets/kurtabanner.webp'
    // make it changeable from admin portal
    const navigate = useNavigate()

    const {itemsData} = useContext(UserContextApi)



   


    return (
        <>

            <div className='fixed w-screen z-[9999] shadow-md'><Header /></div>
            <div className='scrollBar_design  scrollbar-track-[#ffffff00] scrollbar-thumb-yellow-800  scrollbar-thin h-screen w-screen  overflow-x-hidden'>
            <div className='w-screen bg-red-400 h-[50px] lg:h-[79px]'></div>
            <div className='w-screen bg-black lg:py-3 pt-4 pb-1 text-white text-center QuoteLines'>Aawara Ethincs</div>

                <div className='md:h-[86%] sm:h-[60%] h-1/2 w-full '>
                    <div className='h-full w-full object-contain overflow-hidden bg-[#928f8fe7]'>
                        <img className='object-contain object-center' src={img_url} alt="" />
                    </div>
                </div>

                <div className='h-4 w-full bg-white'></div>

                <div className=' w-full '>
                    <div className='py-14  w-full flex justify-center items-center '>
                        <div className='text-center text-[#470b2f]'>
                            <h1 className='QuoteLines ss:text-[36px]  text-[25px]  '>Quality You Can Trust, Craftsmanship You’ll Love</h1>
                            <h1 className='QuoteLines ss:text-[20px] text-[16px]'>"Comfortable Classy and Chic" </h1>
                        </div>

                    </div>
                </div>

                <div className='bodytext px-auto  text-[17px] w-screen'>
                    <div className='my-10 ss:mx-10 mx-1'>
                        <div className='  relative flex justify-center'>
                            <h1 className='text-3xl z-[10] bg-white  py-2 px-5 w-fit'>Our Products</h1>
                            <div className='productCardHeading w-[90vw]   h-[1px] bg-yellow-600 absolute  top-6'></div>
                        </div>
                        <div className='flex md:w-[95vw] w-full gap-y-6 flex-wrap justify-evenly my-4'>
                            {
                                itemsData.slice(0,5).filter(item=>item.uploaded_at== 'Latest').map(item=>{
                                    return <Cards key={item.PRODUCT_id} productsdata={item} />
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='QuoteLines mid_website_banner   w-screen h-[75vh]  relative'>

                    
                    <div className='w-screen h-full flex justify-center items-center'>
                        <div className='ss:w-[45vw]  ss:block hidden'>
                            <div className='h-[14vw] rounded-[13px] flex justify-center items-center mb-6 border bg-gradient-to-tr from-orange-50 to-fuchsia-100'>
                            <div className='text-[22px] text-center text-orange-900 w-[60%] font-[600]'>"From Casual to Festive, Find the Perfect Kurta for Every Moment!"</div>

                            </div>
                            <div className='h-[14vw] w-full rounded-[13px] mt-6 flex justify-between'>
                                <div className='h-full w-[32%] rounded-[13px] border  bg-gradient-to-tr from-orange-50 to-blue-50  shadow-md'></div>
                                <div className='h-full w-[32%] rounded-[13px] border  bg-gradient-to-tr from-orange-50 to-blue-50  shadow-md'></div>
                                <div className='h-full w-[32%] rounded-[13px] border  bg-gradient-to-tr from-orange-50 to-blue-50  shadow-md'></div>
                              
                                
                            </div>
                        </div>
                        <div className='ss:w-[30%] ss:ml-6 lg:w-[20%] mx-0 flex ss:bg-white bg-black justify-center  w-full'>
                            <div className='w-[90vw] ss:h-[30vw] ss:rounded-[13px] shadow-md bg-black overflow-hidden relative'>
                                <video autoPlay muted loop  className='h-full w-full ' src="/vid1.mp4"></video>
                                <div onClick={()=>navigate('/shop')} className='absolute ss:hidden bottom-4 text-white left-2 border border-white px-4 py-2'>Shop Now</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bodytext px-auto  text-[17px] w-screen  bg-white'>
                    <div className='my-10 ss:mx-10 mx-1 '>
                        <div className='  relative flex justify-center'>
                            <h1 className=' text-3xl z-[10] bg-white px-5 w-fit'>New Arrivals</h1>
                            <div className='productCardHeading w-[90vw]   h-[1px] bg-yellow-600 absolute  top-4'></div>
                        </div>
                        <div className='flex md:w-[95vw]  w-full gap-y-6 flex-wrap justify-evenly my-4'>
                            {
                                itemsData.map(item=>{
                                    return <Cards key={item.PRODUCT_id} productsdata={item} />
                                })

                            }
                            {
                                itemsData.length % 2 != 0 
                                ?
                                <CardsContainer />
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>

                <div className='w-screen flex justify-center my-5'>
                    <div className='text-yellow-600 border border-yellow-600 px-3 py-2'><Link to={'/shop'}>Shop More</Link></div>
                </div>





                <div className='w-screen'><Footer /></div>
            </div>
        </>
    )
}

export default Home
