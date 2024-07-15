import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProduct = ({ item, setPortal, openPortal, getProducts }) => {

  const [id, setId] = useState(item.PRODUCT_id)

  const updateProduct = async (values) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/updateProduct`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          'token': sessionStorage.getItem('token')
        },
        body: JSON.stringify({ values, id })
      })
      const data = await response.json()
      if (data.status == 200) {
        toast('Product updated')
        getProducts()
        setPortal(false)
      }
    } catch (error) {
      
      toast('Some error Occurred')
    }
  }


  return (
    <div className='absolute  z-[99] top-10 left-0 py-10 w-full px-10'>
      <ToastContainer />
      <div className='w-full bg-[#4f4f4fd3]  '>
        <div onClick={() => setPortal(!openPortal)} className='w-full my-2 pr-3 pt-2 text-end'>CUT</div>
        <Formik
          initialValues={{
            product_name: item.Product_name, price: item.Price, discounted_price: item.Discounted_Price
          }}
          onSubmit={updateProduct}>
          <Form className='px-10 py-10'>
            <div className='w-[300px] border my-2'>
              <Field className='w-full px-4 py-2 outline-none border-none' name='product_name' placeholder='Product Name' />
            </div>
            <div className='w-[300px] border my-2'>
              <Field className='w-full px-4 py-2 outline-none border-none' name='price' placeholder='Price' />
            </div>
            <div className='w-[300px] border my-2'>
              <Field className='w-full px-4 py-2 outline-none border-none' name='discounted_price' placeholder='Discounted Price' />
            </div>
            <div className='w-[300px] border my-2'>
              <button type='submit' className='w-full bg-black text-white py-2 px-3'>Submit </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default EditProduct
