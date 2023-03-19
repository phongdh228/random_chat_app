import React from 'react';
import {Link} from 'react-router-dom';
import avatar from '../assets/avt.jpg';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {passwordValidate} from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';

import styles from '../styles/Username.module.css'

export default function Password() {

  const {username} = useAuthStore(state => state.auth);
  const [{isLoading, apiData, serverError}] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password:''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values)
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <div className='text-xl text-red-500'>{serverError.message}</div>

  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore more by connecting with us
              </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center'>
              <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar"></img>
            </div>

            <div className='text-box flex flex-col items-center py-4'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password'/>
              <button className={styles.btn} type="submit">Sign In</button>
            </div>

            <div className='text-box py-4 text-center'>
              <span className='text-gray-500'>
                Forgot Password?  
                  <Link className='text-red-500' to='/recovery'>
                   Recovery Now
                  </Link>
              </span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
