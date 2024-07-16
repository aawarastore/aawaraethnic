import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const saveFormData = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };

  const loadFormData = (key, defaultValue) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const formKey1 = 'form1Data';
  const formKey2 = 'form2Data';
  const initialValues1 = loadFormData(formKey1, { firstname: '', lastname: '', address: '', city: '', state: '', pincode: '' });
  const initialValues2 = loadFormData(formKey2, { email: '', mobile: '' });

  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  // const [userCart, setUserCart] = useState([]);
  const [verified, setVerified] = useState(false);
  const [otpPortal, setOtpPortal] = useState(false);


  const getCartProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getCartProduct`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        // setUserCart(data.cartProducts);
        setCartItems(data.cartProducts.Products);
        setCartTotalPrice(data.cartProducts.Total_Price);
      } else if (data.status === 204) {
        setCartItems([]);
        setCartTotalPrice(0);
      }
    } catch (error) {
      console.error('Failed to fetch cart products:', error);
    }
  };

  const getOtp = async ({ email, mobile }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/requestotp`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({ email, mobile }),
      });
      const data = await response.json();
      if (data.status === 200) {
        toast('OTP sent to your email');
        setOtpPortal(true);
        sessionStorage.setItem('specialtoken', data.verificationToken);
      } else if (data.status === 429) {
        toast('Too Many Requests');
      } else if (data.status === 404) {
        toast('User Does not Exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkOtp = async ({ otp }) => {
    try {
      console.log(otp)
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/checkotp`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          // token: localStorage.getItem('token'),
          specialtoken: sessionStorage.getItem('specialtoken'),
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (data.status == 200) {
        setVerified(true);
        setOtpPortal(false);
        // sessionStorage.removeItem('specialtoken');
        console.log('verified')

        toast('Verified');
      } else {
        toast('Invalid OTP');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitDetails = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/submitOrderDetails`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token'),
          specialtoken: sessionStorage.getItem('specialtoken')
        },
        body: JSON.stringify({ values })
      })

      const data = await response.json()
      if (data.status == 200) {
        console.log('sucess')
        toast('Details Sumbited')
      }

    } catch (error) {
      console.log('details sumit error', error)
    }
  };

  useEffect(() => {
    getCartProduct();
  }, []);

  const mobileNumberRegex = /^[0-9]{10}$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().matches(mobileNumberRegex, 'Mobile Number is not valid').required('Enter Valid Mobile Number'),
  });

  return (
    <>
      <Header />

      <div className='w-screen h-[174px] '></div>

      <div className='w-screen justify-center flex lg:flex-row flex-col'>
        <div className='lg:w-[50%] w-full'>
          <ToastContainer />

          <div className='ss:px-16 px-5 pb-10'>
            <div className='mb-5'>
              <Formik
                initialValues={initialValues2}
                validationSchema={validationSchema}
                onSubmit={getOtp}
              >
                <Form>
                  <div className='my-2'>
                    <div>Mobile Number*</div>
                    <Field className='w-full py-3 pl-2 border border-[#77777781]' type='text' placeholder='Enter Mobile Number' name='mobile' />
                    <ErrorMessage component='div' className='text-red-700' name='mobile' />
                  </div>
                  <div className='my-4'>
                    <div>Email*</div>
                    <Field className='w-full py-3 pl-2 border border-[#77777781]' type='text' placeholder='Email' name='email' />
                    <ErrorMessage component='div' className='text-red-700' name='email' />
                  </div>
                  <div className='mt-4 mb-2 text-[13px]'>By Signing In, I agree to the Terms of Use and Privacy Policy</div>
                  <button type='submit' style={{ backgroundColor: verified ? 'green' : 'darkred' }} className='w-full bg-red-900 py-3 text-white text-center overflow-hidden'>
                    {verified ? 'Verified' : 'Submit & Request OTP'}
                  </button>

                </Form>
              </Formik>
            </div>


            <div>

              <Formik
                initialValues={initialValues1}
                onSubmit={submitDetails}
              >
                <Form>
                  <div className='flex justify-between'>
                    <div className='w-[48%]'>
                      <Field type='text' className='border border-[#77777781] w-full py-3 pl-2' placeholder='First Name' name='firstname' required />
                    </div>
                    <div className='w-[48%]'>
                      <Field type='text' className='border border-[#77777781] active:shadow-lg w-full py-3 pl-2' placeholder='Last Name' name='lastname' required />
                    </div>
                  </div>
                  <div className='my-4'>
                    <div className='mb-2 pl-1'>Address*</div>
                    <Field className='w-full py-3 pl-2 border border-[#77777781]' placeholder='Address Line 1' type='text' name='address' required />
                  </div>
                  <div className='flex w-full justify-between gap-2'>
                    <div className='my-2 w-[48%]'>
                      <div className='mb-2 pl-1'>City*</div>
                      <Field className='w-full py-3 pl-2 border border-[#77777781]' type='text' placeholder='City' name='city' required />
                    </div>
                    <div className='my-2 w-[48%]'>
                      <div className='mb-2 pl-1'>State*</div>
                      <Field className='w-full py-3 pl-2 border border-[#77777781]' type='text' placeholder='State' name='state' required />
                    </div>
                  </div>
                  <div className='flex w-full justify-between gap-2'>
                    <div className='my-4 w-[48%]'>
                      <div className='mb-2 pl-1'>Country*</div>
                      <div className='w-full py-3 pl-2 border border-[#77777781]'>India</div>
                    </div>
                    <div className='my-4 w-[48%]'>
                      <div className='pl-2 mb-2'>Pincode*</div>
                      <Field placeholder='Pincode' name='pincode' type='text' className='w-full py-3 pl-2  border border-[#77777781] ' />
                    </div>

                  </div>

                  {/* {true && ( */}
                    <div className='w-full bg-red-900 py-3 text-white text-center overflow-hidden'>
                      <Field className='w-full' type='submit' value='Submit' />
                    </div>
                  {/* )} */}
                </Form>
              </Formik>
            </div>

            <div className='my-4 px-1'>
              <div  className='w-full'><a href="https://razorpay.me/@aawaraethnic">Pay</a></div>
            </div>


          </div>
          {otpPortal && (
            <div className='absolute left-1/2 top-1/2 md:w-[40vw] w-[60vw]  -translate-x-1/2 -translate-y-1/2 px-3 py-4 border bg-white z-[99]'>
              <div className='w-full text-center'>OTP VERIFICATION</div>
              <Formik initialValues={{ otp: '' }} onSubmit={checkOtp}>
                <Form>
                  <div className='w-full text-center flex justify-center mt-3'>
                    <Field name='otp' type='text' placeholder='Enter OTP' className='w-[100px] border-b-2 text-center py-1 px-2 border-black' />
                  </div>
                  <div className='w-full text-center my-4'>
                    <button type='submit' className='w-full bg-red-900 py-3 text-white text-center overflow-hidden'>
                      Submit & verify
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
        </div>

        <div className='lg:w-[30%] w-full '>
          <div className='lg:px-2 px-5 ss:px-[60px]'>
            <div className='pl-2 text-[22px] font-[500] border-b pb-2'>Order Summary</div>

            {cartItems.map((pro) => (
              <div key={pro._id} className='w-full py-2 border-b px-2 flex gap-3 my-2 relative'>
                <div className='lg:h-[130px] h-[150px]'>
                  <img className='h-full w-full' src={pro.product_img_url} alt='' />
                </div>
                <div className='text-[19px] font-[400]'>
                  <div>{pro.product_name}</div>
                  <div className='text-[15px] font-[300]'>Size: {pro.Size}</div>
                  <div className='text-[15px] font-[300]'>
                    Color: <span style={{ backgroundColor: `${pro.Color}`, color: `${pro.Color}` }} className='px-[5px] rounded-full '>d</span>
                  </div>
                  <div className='text-[15px] font-[300] mt-8'>Qty: {pro.Quantity}</div>
                </div>
                <div className='absolute bottom-2 right-2 font-[600]'> ₹ {pro.payable_amount}/-</div>
              </div>
            ))}

            <div className='border-t border-b pt-3 px-1 pb-5 flex justify-between gap-6 text-[19px] font-[200]'>
              <div>Order Total:</div>
              <div className='font-[600]'> ₹ {cartTotalPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
