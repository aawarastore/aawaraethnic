import React , {useContext,useEffect, useState} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CardsContainer from '../Components/CardsContainer'
import { Link } from 'react-router-dom'
import {UserContextApi} from '../context/UserContext'
import Cards from '../Components/Cards'

const Home = () => {
    const img_url='../src/assets/kurtabanner.webp'
    // make it changeable from admin portal


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
                            <h1 className='QuoteLines ss:text-[20px] text-[16px]'>"Comfortable, Classy, and Chic" </h1>
                        </div>

                    </div>
                </div>

                <div className='bodytext px-auto  text-[17px] w-screen'>
                    <div className='m-10 '>
                        <div className='  relative flex justify-center'>
                            <h1 className='text-3xl z-[10] bg-white  py-2 px-5 w-fit'>Our Products</h1>
                            <div className='productCardHeading w-[90vw]   h-[1px] bg-yellow-600 absolute  top-6'></div>
                        </div>
                        <div className='flex md:w-[95vw] w-full gap-y-6 flex-wrap justify-evenly my-4'>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8].map(card => {
                                    return <CardsContainer key={card} />
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='QuoteLines mid_website_banner   w-screen h-[75vh] bg-slate-500 relative'>

                    <div className='h-full w-full overflow-hidden'>
                        <img className='object-cover' src={img_url} alt="" />
                    </div>

                    <div className='mid_banner_text absolute w-full h-full flex flex-col justify-center items-center  z-10 top-0 left-0 opacity-0 text-white' >
                            <h1 className='text-4xl '>Kurtas for Special Moments</h1>
                            
                            <button className='px-4 py-2 border my-3 hover:bg-white hover:text-black subtextLines'><Link to={'/'}>Shop Now</Link></button>
                    </div>
                </div>

                <div className='bodytext px-auto  text-[17px] w-screen  bg-white'>
                    <div className='m-10 '>
                        <div className='  relative flex justify-center'>
                            <h1 className=' text-3xl z-[10] bg-white px-5 w-fit'>New Arrivals</h1>
                            <div className='productCardHeading w-[90vw]   h-[1px] bg-yellow-600 absolute  top-4'></div>
                        </div>
                        <div className='flex md:w-[95vw] w-full gap-y-6 flex-wrap justify-evenly my-4'>
                            {
                                // [1, 2, 3, 4].map(card => {
                                //     return <CardsContainer key={card} />
                                // })
                                itemsData.map(item=>{
                                    return <Cards key={item.PRODUCT_id} productsdata={item} />
                                })
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
