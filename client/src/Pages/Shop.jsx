import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import CardsContainer from '../Components/CardsContainer'
import Cards from '../Components/Cards'
import { UserContextApi } from '../context/UserContext'
import Footer from '../Components/Footer'
import { toast } from 'react-toastify'
// import './Shop.css'
// import '../Components/CardsContainer.css'

const Shop = () => {

    const { itemsData , setItemsData} = useContext(UserContextApi)
    const [allItems,setallitems] = useState([])
    
    const [filteredItems,setFilteredItems] = useState([])

    const filterProducts = async (e)=>{
        const val = e.target.value

        if(val === 'All') return setFilteredItems(allItems)
        if(val === 'Latest'){
            const filteredProduct = allItems.filter(item=>item.uploaded_at == 'Latest')
            setFilteredItems(filteredProduct)
            return
        }

        

        const filteredProduct = allItems.filter(item=>item.Product_name.toLowerCase().includes(val.toLowerCase()))
        console.log('filtered products',filteredProduct)
        setFilteredItems(filteredProduct)

        
        
        

    }
    useEffect(()=>{
    const total = itemsData.map(item=>{
        return {...item }
    })
    setallitems(total)
    setFilteredItems(total)
    },[itemsData])


    return (
        <>
            <div className='fixed w-screen z-[9999]'><Header /></div>

            <div className=' w-screen'>
                <div className='h-[74px] w-screen bg-white'></div>

                <div className='w-full mt-10 flex justify-center '>
                    <div>
                        <input onChange={(e)=>filterProducts(e)} placeholder='Search' name='search' type="search" className='px-3 bg-transparent w-[260px]  py-2 md:w-[520px] border shadow-md' />
                    </div>
                    <div className='mx-2 '>
                        <select onChange={(e)=>filterProducts(e)} className='w-fit px-1 md:px-3 py-[9px] bg-transparent shadow-sm border ' name="filters" >
                            <option value="All">All</option>
                            <option value="Price">Price</option>
                            <option value="Latest">Latest</option>
                        </select>
                    </div>
                </div>

                <div className='w-full h-10'></div>

                <div className='productContainer w-screen flex flex-wrap justify-evenly  ss:justify-start  gap-y-5 ss:gap-6  ss:px-14 my-4'>
                    {
                        filteredItems.map(item => {
                            return (
                                <Cards key={item.PRODUCT_id} productsdata={item} />
                            )
                        })
                    }

                    
                    {
                        [1,2,3,4].map(m=>{
                            return <CardsContainer key={m} />
                        })
                    }

                </div>

            </div>
            <Footer />

        </>
    )
}

export default Shop
