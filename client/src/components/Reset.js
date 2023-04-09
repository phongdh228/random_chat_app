import React, { useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {resetPasswordValidation} from '../helper/validate';
import {resetPassword} from '../helper/helper'
import {useAuthStore} from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook.js';

import styles from '../styles/Username.module.css'

export default function Reset() {

  const {username} = useAuthStore(state => state.auth)
  const navigate = useNavigate()
  const [isLoading, apiData, status, serverError] = useFetch('')

  useEffect(()=>{
    console.log(apiData)
  })

  const formik = useFormik({
    initialValues: {
      password:'',
      confirm_pwd:''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      let resetPromise = resetPassword({username, password: values.password})

      toast.promise(resetPromise,{
        loading: 'Updating...',
        success: <b>Reset successfully</b>,
        error: <b>Could not reset</b>
      });

      resetPromise.then(function(){navigate('/password')})
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <div className='text-xl text-red-500'>{serverError.message}</div>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{width: "50%"}}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
             Enter new password
              </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
          <div className='text-box flex flex-col items-center py-4'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password'/>
              <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Confirm Password'/>
              <button className={styles.btn} type="submit">Reset</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}
