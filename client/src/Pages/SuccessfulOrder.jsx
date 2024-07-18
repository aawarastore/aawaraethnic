import React from 'react'
import { Link } from 'react-router-dom'

const SuccessfulOrder = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div>

        <div className='QuoteLines'>Order Placed!</div>
        <Link to={'/myorders'}>Check Your Order</Link>
      </div>
        
    </div>
  )
}

export default SuccessfulOrder
