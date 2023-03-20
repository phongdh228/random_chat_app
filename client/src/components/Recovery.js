import React from 'react';
import {Toaster} from 'react-hot-toast';
import {useAuthStore} from '../store/store';
import {generateOTP, verifyOTP} from '../helper/helper'
import {userNavigate} from 'react-router-dom'

import styles from '../styles/Username.module.css'

export default function Recovery() {

  const {username} = useAuthStore(state => state.auth)
  const [OTP, setOTP] = useState();
  const navigate = userNavigate()

  useEffect(()=>{
    generateOTP(username).then((OTP) =>{
        if(OTP) return toast.success('OTP has been sent to your email');
        return toast.error('Problems while generating OTP')
    })
  },[username])

  async function onSubmit(e){
    e.preventDefault();

    try{
      let {status} = await verifyOTP({username, code: OTP})
      if(status === 201){
        toast.success('Verify OTP successfully')
        navigate('/reset')
      }
    }catch(e){
      return toast.error('Wrong OTP')
    }
  }

  //Handle of resend OTP
  function resendOTP() {
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise,{
      loading: 'Sending...',
      success: <b>OTP has been sent to your email</b>,
      error: <b>Could not sent it</b>
    });

    sendPromise.then(OTP => {
      console.log(OTP);
    })
  }

  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
             Enter OTP to recovery password
              </span>
          </div>

          <form className='pt-20' onSubmit={onSubmit}>

            <div className='text-box flex flex-col items-center py-4'>
              
              <div className='input text-center'>
              
              
              <span className='py-4 text-sm text-left text-gray-500'>
                Enter 6 digit OTP sent to your email address
              </span>
              
              <input onChange={(e)=> setOTP(e.target.value)} className={styles.textbox} type="text" placeholder='OTP'/>

              </div>

              <button className={styles.btn} type="submit">Sign In</button>
            </div>

          </form>

            <div className='text-box py-4 text-center'>
              <span className='text-gray-500'>
                Can't get OTP?   
                  <button onClick={resendOTP} className='text-red-500'>
                    Resend
                  </button>
              </span>
            </div>

        </div>
      </div>
    </div>
  )
}
