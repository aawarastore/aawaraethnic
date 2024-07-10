import React from 'react'
// import './CardsContainer.css'

const CardsContainer = () => {
  // create a context and provide a islloged in state to check if user is logged in or not if not redirect it to login page

  return (
    <>
      <div className='container f:w-[300px] s:w-[270px] sl:w-[220px] ss:w-[190px] w-[160px]  flex justify-center items-center flex-col '>
      {/* <div className='md:w-[330px]  md:h-[550px] container w-[160px] h-fit pt-4  flex flex-col justify-center items-center '> */}
        {/* img==  330/250 */}
        <div className='imgCont w-full'>
            <img className='mainImg h-auto w-full z-50 ' src="/kurta2.jpg" alt="s" />
        </div>
        <div className='textCont w-full  text-[12px]  ss:text-[17px] '>
            <div className='uppercase'>mens kurtas for traditional wear.</div>
            <div className='line-through opacity-[0.7]'> ₹ 6999/-</div>
            <div className='text-[17px] font-[500]'>₹ 5499/-</div>
            <div className='w-full flex gap-1 my-2'>
            {
                [{ SL: 34 }, { S: 36 }, { M: 38 }, { L: 40 }, { XL: 42 }, { XXL: 44 }].map((item, index) => {
                  const brandSize = Object.keys(item)[0]; // Get the key from the object
                  const value = item[brandSize]; // Get the value from the object
                  return (
                    <div  key={value} className='py-[3px] w-7 px-1  cursor-pointer text-center border border-stone-300 ss:text-[11px]  text-[7px] uppercase'>{brandSize}</div>
                  );
                })
              }
                          </div>

            <div className='flex justify-between btns '>
              <div className='bg-black text-center  text-white  text-[18px] py-1 w-[100%] cursor-pointer'>Buy</div>
              {/* <div className='bg-white border text-center text-yellow-700 px-2 text-[18px] py-1 w-[48%] cursor-pointer'>Buy </div> */}
            </div>
        </div>
      </div>
    </>
  )
}

export default CardsContainer
