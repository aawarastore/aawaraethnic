import React, { useContext, useEffect, useState } from 'react';
import Header from '../Component/Header';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pay from '../Component/Pay';
import { UserContextApi } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import States from '../../../admin/src/addressData';


const Checkout = () => {
  const navigate = useNavigate()
  // const { isLoggedIn } = useContext(UserContextApi)

  const formKey1 = 'form1Data';
  const formKey2 = 'form2Data';

  // Function to save form data to sessionStorage
  const saveFormData = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };

  // Function to load form data from sessionStorage
  const loadFormData = (key, defaultValue) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  // Initial values for the forms, loaded from sessionStorage if available
  const initialValues1 = loadFormData(formKey1, {
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const initialValues2 = loadFormData(formKey2, {
    email: '',
    mobile: '',
    agreetoterms: false // Ensure default values are set here
  });

  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [CARTID, setCartid] = useState('')
  const [verified, setVerified] = useState(false);
  const [otpPortal, setOtpPortal] = useState(false);
  const [detailssubmit, setDeatilssubmitted] = useState(false)
  const [off, setOff] = useState(true)


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
        setCartid(data.cartProducts._id)
        setCartItems(data.cartProducts.Products);
        setCartTotalPrice(data.cartProducts.Total_Price);
      } else if (data.status === 204) {
        setCartItems([]);
        setCartTotalPrice(0);
        navigate('/home')
      } else if (data.status == 404) navigate('/home')
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
      saveFormData(formKey2, { email, mobile, agreetoterms: true });

      if (data.status === 200) {
        toast('OTP sent to your email');
        setOtpPortal(true);
        sessionStorage.setItem('specialtoken', data.verificationToken);
        return
      } else if (data.status === 429) {
        toast('Too Many Requests');
        return
      } else if (data.status === 404) {
        toast('User Does not Exist');
        return
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
          specialtoken: sessionStorage.getItem('specialtoken'),
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (data.status == 200) {
        setVerified(true);
        setOtpPortal(false);
        setOff(false)
        sessionStorage.setItem('#verifieditems', true)
        toast('Verified');
      } else {

        toast('Invalid OTP');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitDetails = async (values) => {

    saveFormData(formKey1, values)
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
      saveFormData(formKey1, values);

      const data = await response.json()
      if (data.status == 200) {
        setOff(false)

        setDeatilssubmitted(true)
        sessionStorage.setItem('#verifieddet',true)
        sessionStorage.removeItem('specialtoken')
        toast('Details Sumbited')
      }

    } catch (error) {
      console.log('details sumit error', error)
    }
  };

  useEffect(() => {
    getCartProduct();
    if (sessionStorage.getItem('#verifieditems')) {
      setOtpPortal(false)
      setVerified(true)
      setOff(false)
    }
    if(sessionStorage.getItem('#verifieddet')){
      setDeatilssubmitted(true)
    }
  }, []);

  const mobileNumberRegex = /^[0-9]{10}$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().matches(mobileNumberRegex, 'Mobile Number is not valid').required('Enter Valid Mobile Number'),
  });

  return (
    <>

      <div>
        <div className='w-screen fixed z-[99]' ><Header /></div>
        <div className='ss:h-[200px] h-[120px] '></div>
        <div className='w-screen justify-center flex lg:flex-row flex-col bodytext bg-gradient-to-br from-[white] via-[#ffffffeb] to-[#f6f6f6]'>
          {/* <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} newestOnTop={true} autoClose={1000} toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true} /> */}
          <div className='lg:w-[50%] w-full'>


            <div className='ss:px-16 px-5 pb-10'>
              {otpPortal && (
                <div className='absolute left-1/2 top-1/2 md:w-[90vw] w-[95vw] h-[90vh] flex justify-center items-center   -translate-x-1/2 -translate-y-1/2 px-3 py-10 border bg-white z-[99]'>
                  <div className='ss:w-1/2 w-[95%] '>
                    <div className='w-full text-center'>OTP VERIFICATION</div>
                    <Formik initialValues={{ otp: '' }} onSubmit={checkOtp}>
                      <Form>
                        <div className='w-full text-center flex justify-center mt-3'>
                          <Field name='otp' type='text' placeholder='Enter OTP' className='outline-none w-[100px] border-b-2 text-center py-1 px-2 border-black' />
                        </div>
                        <div className='w-full text-center my-4'>
                          <button type='submit' className='w-full bg-red-900 py-3 text-white text-center overflow-hidden'>
                            Submit & verify
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>

              )}
              <div className='border-b py-3 bodytext text-[18px] font-[600] border-black'>Step 1 : <span className='text-[14px] font-[300] '>add your contact no. and email</span></div>
              <div className='mb-5'>
                <Formik
                  initialValues={initialValues2}
                  validationSchema={validationSchema}
                  onSubmit={getOtp}
                >
                  <Form>
                    <div className='my-2'>
                      <div>Mobile Number*</div>
                      <Field disabled={verified} className='w-full py-3 pl-2 border border-[#77777781]' type='text' placeholder='Enter Mobile Number' name='mobile' />
                      <ErrorMessage component='div' className='text-red-700' name='mobile' />
                    </div>
                    <div className='my-4'>
                      <div>Email*</div>
                      <Field disabled={verified} className='w-full py-3 pl-2 border border-[#77777781]' type='text' placeholder='Email' name='email' />
                      <ErrorMessage component='div' className='text-red-700' name='email' />
                    </div>

                    <div className='mt-4 mb-2 text-[13px]'><span><Field className='translate-y-[2px]' required name='agreetoterms' type="checkbox" /></span> By Signing In, I agree to the <a target='_blank' href="/termsandcondition" className='text-blue-800 font-[500] hover:underline'> Terms of Use </a> and <a target='_blank' className='text-blue-800 font-[500] hover:underline' href="/privacypolicy"> Privacy Policy </a></div>
                    <button disabled={verified} type='submit' style={{ backgroundColor: verified ? 'green' : '#7F1D1D' }} className='w-full bg-red-900 py-3  text-white text-center overflow-hidden'>
                      {verified ? 'Verified' : 'Submit & Request OTP'}
                    </button>

                  </Form>
                </Formik>
              </div>


              <div>
                <div className='border-b pb-3 my-2 bodytext text-[18px] font-[600] border-black'>Step 2 : <span className='text-[14px] font-[300] '>add your delivery address </span></div>

                <Formik
                  initialValues={initialValues1}
                  onSubmit={(values) => {
                    if (off) {
                      toast('Request for OTP first')
                      return
                    } else {
                      console.log('dhlkdk')
                      submitDetails(values)
                    }
                  }}
                >
                  <Form>
                    <div className='flex justify-between'>
                      <div className='w-[48%]'>
                        <Field   disabled={detailssubmit}  type='text' className='border border-[#77777781] w-full py-3 pl-2' placeholder='First Name' name='firstname' required />
                      </div>
                      <div className='w-[48%]'>
                        <Field  disabled={detailssubmit}  type='text' className='border border-[#77777781] w-full py-3 pl-2' placeholder='Last Name' name='lastname' required />
                      </div>
                    </div>
                    <div className='my-4'>
                      <div className='mb-2 pl-1'>Address*</div>
                      <Field  disabled={detailssubmit}  className='w-full py-3 pl-2 border border-[#77777781]' placeholder='Address Line 1' type='text' name='address' required />
                    </div>
                    <div className='flex w-full justify-between gap-2'>
                      <div className='my-2 w-[48%]'>
                        <div className='mb-2 pl-1'>City*</div>
                        <Field  disabled={detailssubmit}  className='w-full py-3 pl-2 border border-[#77777781]' type='text' placeholder='City' name='city' required />
                      </div>
                      <div className='my-2 w-[48%]'>
                        <div className='mb-2 pl-1'>State*</div>
                        <Field  disabled={detailssubmit}  className='w-full py-3 pl-2 border text-black  border-[#77777781]' as='select' type='text'  name='state' required >
                          <option  label="State" />
                          {States.map(state => (
                            <option className="text-black" key={state.key} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </Field>

                      </div>
                    </div>
                    <div className='flex w-full justify-between gap-2'>
                      <div className='my-4 w-[48%]'>
                        <div className='mb-2 pl-1'>Country*</div>
                        <div className='w-full py-3 pl-2 border border-[#77777781]'>India</div>
                      </div>
                      <div className='my-4 w-[48%]'>
                        <div className='pl-2 mb-2'>Pincode*</div>
                        <Field  disabled={detailssubmit}  placeholder='Pincode' name='pincode' type='number' className='w-full py-3 pl-2  border border-[#77777781] ' />
                      </div>
                    </div>

                    <div className='w-full   text-white text-center overflow-hidden'>
                      <button  style={{ backgroundColor: detailssubmit ? 'green' : '#7F1D1D' }} type='submit' className='w-full py-3 '>Submit</button>
                    </div>
                  </Form>
                </Formik>
              </div>

            </div>
          </div>



          <div className='lg:w-[30%] w-full '>
            <div className='lg:px-2 px-5 ss:px-[60px] border '>
              <div className='border-b py-3 bodytext text-[18px] font-[600] border-black'>Step 3 : <span className='text-[14px] font-[300] '>Place your order!</span></div>

              <div className='pl-2 text-[22px] font-[500] border-b pt-2 pb-2'>Order Summary</div>

              {cartItems.map((pro) => (
                <div key={pro._id} className='w-full py-2 border-b px-2 flex gap-3 my-2 relative'>
                  <div className='lg:h-[130px] h-[150px]'>
                    <img className='h-full w-full' src={pro.product_img_url} alt='' />
                  </div>
                  <div className='text-[18px] font-[400]'>
                    <div>{pro.product_name}</div>
                    <div className='text-[14px] font-[300]'>Size: {pro.Size}</div>
                    <div className='text-[14px] font-[300]'>
                      Color: <span style={{ backgroundColor: `${pro.Color}`, color: `${pro.Color}` }} className='px-[5px] rounded-full '>d</span>
                    </div>
                    <div className='text-[15px] font-[300] mt-8'>Qty: {pro.Quantity}</div>
                  </div>
                  <div className='absolute bottom-2 right-2 font-[600]'> ₹ {pro.payable_amount}/-</div>
                </div>
              ))}

              <div className=' border-b py-2 px-1 mt-4  flex justify-between gap-6 text-[19px] font-[200]'>
                <div className='font-[500] '>Order Total:</div>
                <div className='font-[600]'> ₹ {cartTotalPrice}</div>
              </div>

              {
                <div className='w-full px-1 mt-10 mb-3'>
                  <Pay off={off} cartTotalPrice={cartTotalPrice} CARTID={CARTID} cartItems={cartItems} />
                </div>

              }
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Checkout;
