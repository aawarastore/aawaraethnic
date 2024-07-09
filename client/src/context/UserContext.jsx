import { createContext, useEffect, useState } from "react";
// require('dotenv').config()

export const UserContextApi = createContext()

export const UserContextProvider = ({ children }) => {

    const [isLoggedIn, setLoggedIn] = useState(false)

    const checkUser = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/authorization`, {
                method: 'POST',
                headers: {
                    token: localStorage.getItem('token')
                }

            })
            const data = await response.json()
            // console.log(data)
            if (data.status == 200) setLoggedIn(true)
        } catch (error) {
            setLoggedIn(false)
        }

    }

    const [itemsData, setItemsData] = useState([])

    const getPosts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getProducts`)
            const data = await response.json()
            // console.log(data)
            setItemsData(data.products)

        } catch (error) {
            console.log(error)
        }
    }

    const [totalCartItems, setTotalCartItems] = useState(0)
    const getCartLength = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getCartLength`, {
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                }
            });

            const data = await response.json()
            setTotalCartItems(data.totalItems)
            // setTotalCartItems()
        } catch (error) {
            console.log('totallength error', error)
        }
    }


    const [isOpen, setAddPortal] = useState(false)
    const onOpen = () => {
        setAddPortal(true)
    }
    const onClose = () => {
        setAddPortal(false)
    }





    useEffect(() => {
        getPosts()
        checkUser()
        getCartLength()
    }, [isLoggedIn])





    return (
        <UserContextApi.Provider value={{ setLoggedIn, isLoggedIn, checkUser, setItemsData,itemsData, totalCartItems, getCartLength ,isOpen,onOpen,onClose}}>
            {children}
        </UserContextApi.Provider>
    )
}