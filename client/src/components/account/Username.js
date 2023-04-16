import React, {useEffect}from 'react';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../../assets/avt.jpg';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {usernameValidate} from '../../helper/validate';
import { useAuthStore } from '../../store/store';

import styles from '../../styles/Username.module.css'

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername)

  const formik = useFormik({
    initialValues: {
      username:'example123'
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      setUsername(values.username);
    }
  })

  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Hello Username</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore more by connecting with us
              </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center'>
              <img src={avatar} className={styles.profile_img} alt="avatar"></img>
            </div>

            <div className='text-box flex flex-col items-center py-4'>
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username'/>
              <button className={styles.btn} type="submit">Let's go</button>
            </div>

            <div className='text-box py-4 text-center'>
              <span className='text-gray-500'>
                Not a member? 
                  <Link className='text-red-500' to='/register'>
                  Register now
                  </Link>
              </span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
