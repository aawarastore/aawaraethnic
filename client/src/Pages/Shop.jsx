import React, { useContext, useEffect, useState } from 'react'
import Header from '../Component/Header'
import CardsContainer from '../Component/CardsContainer'
import Cards from '../Component/Cards'
import { UserContextApi } from '../context/UserContext'
import Footer from '../Component/Footer'
import { CiSearch } from "react-icons/ci";

const Shop = () => {

    const { itemsData } = useContext(UserContextApi)
    const [allItems, setallitems] = useState([])

    const [filteredItems, setFilteredItems] = useState([])


    const filterProducts = (e) => {
        const { name, value } = e.target;

        let filteredProduct = [];

        if (name === 'Search') {
            filteredProduct = allItems.filter(item =>
                item.Product_name.toLowerCase().includes(value.toLowerCase()) || item.Description.toLowerCase().includes(value.toLowerCase()) || item.PRODUCT_id.toLowerCase().includes(value.toLowerCase())
            );
        } else if (value === 'All') {
            filteredProduct = allItems;
        } else if (value === 'Latest') {
            filteredProduct = allItems.filter(item => item.uploaded_at === 'Latest');
        } else if (value === 'hightolow') {
            filteredProduct = [...allItems].sort((i1, i2) => i2.Discounted_Price - i1.Discounted_Price);
        } else if (value === 'lowtohigh') {
            filteredProduct = [...allItems].sort((i1, i2) => i1.Discounted_Price - i2.Discounted_Price);
        }

        setFilteredItems(filteredProduct);
    };


    useEffect(() => {
        const total = itemsData.map(item => {
            return { ...item }
        })
        setallitems(total)
        setFilteredItems(total)
    }, [itemsData]) 


    return (
        <>
            <div className='fixed w-screen z-[9999]'><Header /></div>

            <div className=' w-screen bg-[#f4f4f4]'>
                <div className='h-[74px] w-screen'></div>
                <div className='w-full justify-center flex'>
                    <div className='w-full ss:w-[90vw] lg:w-[70vw] gap-2 mt-10 flex flex-wrap ss:flex-nowrap justify-between gap-y-4 px-4 ss:px-10'>
                        <div className='ss:w-[85%] w-full border border-[#23232372] relative'>
                            <div className='absolute top-3 left-3'><CiSearch className='scale-[1.4]  opacity-[0.9]' /></div>
                            <input onChange={(e) => filterProducts(e)} placeholder='Search Products' name='Search' type="search" className='pl-10 pr-5 bg-transparent w-full  py-2   border-none outline-none' />
                        </div>
                        <div className='flex ss:block justify-between w-full ss:w-fit ss:border-none items-center border-b border-t ss:py-0 py-2 '>
                            <div className='ss:hidden'>Filters</div>
                        <div className='bg-transparent shadow-sm border px-2 border-[#23232372] '>
                            
                            <select defaultValue={'Sort'}   onChange={(e) => filterProducts(e)} className='w-fit  md:px-3 py-[9px] bg-transparent outline-none ' name="filters" >
                                <option name='Sort' value="Sort">Sort</option>
                                <option value="All">All</option>
                                <option  value="Latest">Latest</option>
                                <option value="hightolow">Prices: High to Low</option>
                                <option value="lowtohigh">Prices: Low to High</option>
                            </select>
                        </div>
                        </div>

                    </div>
                </div>


                <div className='w-full h-10'></div>

                <div className='productContainer min-h-[80vh] w-screen flex py-2   justify-center  flex-wrap  ss:px-10'>
                    <div className='w-[98vw]   flex flex-wrap  py-2 justify-around  ss:justify-around  gap-y-5 ss:gap-6 '>
                        {
                            filteredItems.map(item => {
                                return (
                                    <Cards key={item.PRODUCT_id} productsdata={item} />
                                )
                            })
                        }
                        {
                            filteredItems.length % 2 != 0
                                ?
                                <CardsContainer />
                                :                                
                                ""
                        }
                    </div>
                </div>

            </div>
            <Footer />

        </>
    )
}

export default Shop
