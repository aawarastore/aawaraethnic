import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link , useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup'




const Register = () => {
  const navigate = useNavigate()

  const handleRegistration = async ({firstname,lastname,email,mobile,password,confirmPassword}) => {
    if(confirmPassword != password) {
      toast('Confirm Password must be same as Password')
      return
    }
    try {
      // console.log(firstname,lastname,email,mobile,password,confirmPassword)
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/register`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify({firstname,lastname,email,mobile,password})
      })
      const data = await response.json()
      if(data.status == 200) toast('User Already Exist!')
      if(data.status == 201){
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const mobileNumberRegex = /^[0-9]{10}$/
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    mobile: Yup.string().matches(mobileNumberRegex, 'Mobile Number is not valid').required('Enter Valid Mobile Number')
  })
  return (
    <>
      <div className='w-screen h-screen  flex justify-center items-center relative '>
        <div className='absolute top-10 left-10 md:top-[20%] md:left-[20%] bg-yellow-700 text-white px-6 py-2 rounded-full'><Link to={'/home'}>Back</Link></div>
        <ToastContainer />

        <div className='border px-10 py-6 w-full md:w-[40vw]'>
        <div className='QuoteLines text-[18px] text-center my-4  relative'>
                <div>Create Your Pass</div>
                <div className='mt-1 w-full h-[1px] bg-yellow-800 productCardHeading'></div>
              </div>
          <Formik
            initialValues={{ email: '', password: '', mobile: '', firstname: '', lastname: '',confirmPassword:'' }}
            validationSchema={validationSchema}
            onSubmit={handleRegistration}>
            <Form>
              
              <div className='w-full flex ga-2'>

                <div className='my-2 w-1/2 px-3'>
                  <Field
                    placeholder='First Name'
                    className='w-full rounded-md bg-transparent border border-black py-2 pl-3'
                    name="firstname"
                    type="text"
                    required
                  />
                  <ErrorMessage name="Name" component="div" className="text-red-500" />
                </div>
                <div className='my-2 w-1/2 px-3'>
                  <Field
                    placeholder='Last Name'
                    className='w-full rounded-md bg-transparent border border-black py-2 pl-3'
                    name="lastname"
                    type="text"
                    required
                  />
                  <ErrorMessage name="Name" component="div" className="text-red-500" />
                </div>
              </div>

              <div className='my-2 w-full px-3'>
                <Field
                  placeholder='Whatsapp No.'
                  className='w-full rounded-md bg-transparent border border-black py-2 pl-3'
                  name="mobile"
                  type="text"
                />
                <ErrorMessage name="mobile" component="div" className="text-red-500" />
              </div>

              <div className='my-2 w-full px-3'>
                <Field
                  placeholder='Email'
                  className='w-full rounded-md bg-transparent border border-black py-2 pl-3'
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className='my-2 w-full px-3'>
                <Field
                  placeholder='Password'
                  className='w-full rounded-md bg-transparent border border-black py-2 pl-3'
                  name="password"
                  type="password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className='my-2 w-full px-3'>
                <Field
                  placeholder='Confirm Password'
                  className='w-full rounded-md bg-transparent border border-black py-2 pl-3'
                  name="confirmPassword"
                  type="password"
                />
              </div>
              <div className='my-2 w-full px-3'>
                <button className='w-full bg-yellow-600 rounded-md py-2 text-white text-[17px] hover:bg-red-600' type="submit">Create Account</button>
              </div>
            </Form>
          </Formik>

          <div className=' px-4 text-[15px] text-yellow-800 -translate-y-2 hover:text-blue-700'> <Link to={'/login'}>Already have an account?</Link></div>

        </div>
      </div >
    </>
  )
}

export default Register
