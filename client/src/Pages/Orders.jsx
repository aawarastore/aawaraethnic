import React, { useContext, useEffect, useState } from 'react'
import Header from '../Component/Header'
import { UserContextApi } from '../context/UserContext'
import { Link } from 'react-router-dom'

const Orders = () => {

    const { isLoggedIn } = useContext(UserContextApi)
    const [allOrders, setAllOrders] = useState([])
    // const [products,setProducts] = useState([])

    const findOrders = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getorders`, {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            const data = await response.json()

            if (data.status == 200) {
                // console.log(data.Orders)
                setAllOrders(data.Orders)
                // setProducts(data.Products)
                // console.log(products)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        findOrders()
    }, [])


    return (
        <>
            <div className='w-screen'>
                <div className='w-full fixed'><Header /></div>
                <div className='w-full bodytext  bg-stone-50'>
                    <div className='w-screen bg-red-400 h-[50px] ss:h-[60px] sl:h-[65px] f:h-[79px]'></div>

                    {
                        isLoggedIn
                            ?
                            <div>
                                <div className='h-10 w-full'></div>
                                <div className='w-full ss:pl-10 pl-5 s:pl-20 QuoteLines  '> My Orders</div>
                                <div className='pt-10 px-5  s:px-[15vw] '>
                                    {
                                        allOrders.map(order => {
                                            return <div className='w-full s:px-20 ss:px-10 px-4 s:py-10  py-4 my-3 bg-white border rounded-[20px] ' key={order.USER_ORDER_ID}>
                                               <div className='font-[600] w-full my-2 s:text-[16px] text-[12px]'>Order ID:  {order.USER_ORDER_ID}</div>
                                                {
                                                    order.ITEMS.map(item => {
                                                        return <div key={item.product_id}  className='w-full my-3 rounded-[12px] s:rounded-[20px] overflow-hidden  border shadow-sm flex'>
                                                            <div>
                                                                <img className='w-[130px]' src={item.Product_url} alt="" />
                                                            </div>
                                                            <div className='pl-3 pt-3 text-[14px]'>
                                                                <div className='text-[16px] font-[500] '>{item.product_name}</div>
                                                                <div >{item.Size}</div>
                                                                <div> Qty: {item.Quantity}</div>
                                                                <div>{ '₹ '+ item.Amount}</div>
                                                            </div>
                                                        </div>
                                                    })

                                                }
                                                <div className='w-ful flex justify-between items-center'>
                                                <div className='py-2 pl-3 font-[600]'>Total : {order.Total_Price}</div>
                                                <div  className='py-2 rounded-full text-[15px] font-[600] text-green-600 bg-stone-300 px-4'> {order.orderStatus}</div>
                                                </div>

                                            </div>
                                        })
                                    }
                                </div>
                            </div>

                            :
                            <div>
                                <div>Seems your session is over!</div>
                                <Link to={'/login'}>Login</Link>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Orders
