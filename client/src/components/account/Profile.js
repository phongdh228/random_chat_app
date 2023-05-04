import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import avatar from '../../assets/avt.jpg';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import useFetch from '../../hooks/fetch.hook';
import {profileValidation} from '../../helper/validate';
import DatePicker from 'react-datepicker';
import covertToBase64 from '../../helper/convert';
import { useAuthStore } from '../../store/store';
import { updateUser } from '../../helper/helper';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/Username.module.css'
import extend from '../../styles/Profile.module.css';

export default function Profile() {

  const [{isLoading, apiData, serverError}] = useFetch();
  const [gender, setGender] = useState('male');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: apiData?.fullname || '',
      phone: apiData?.phone || '',
      address: apiData?.address || '',
      birthday: apiData?.birthday || null,
      is_male: apiData?.gender || true
    },
    enableReinitialize : true,
    //validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values)
      localStorage.setItem('user_informations', JSON.stringify(values));
      navigate('/hobby')
    }
  })

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <div className='text-xl text-red-500'>{serverError.message}</div>

  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{width: "45%"}}>
          
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              You can update your profile
              </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center'>
                <label htmlFor='profile'>
                <img src={avatar} className={styles.profile_img} alt="avatar"></img>
                </label>
              </div>
                
            <div className='text-box flex flex-col items-center py-4'>
              {/* <div className='name flex w-3/4 gap-10'>
              </div> */}
                <input {...formik.getFieldProps('fullname')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Full Name'/>

                <DatePicker
                {...formik.getFieldProps('birthday')}
                className={`${styles.textbox} ${extend.textbox}`}
                placeholderText='Birthday'
                selected={formik.values.birthday}
                dateFormat='dd/MM/yyyy'
                onChange={date => formik.setFieldValue('birthday', date)}
              />

              <div className='gender flex gap-10 py-2'>
                <label>
                  <input
                    type='radio'
                    value='male'
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type='radio'
                    value='female'
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
              </div>


              {/* <div className='name flex w-3/4 gap-10'>
              </div> */}
                <input {...formik.getFieldProps('phone')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Phone Number'/>

                {/* <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email'/> */}

              <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address'/>

              <button className={styles.btn} type="submit">Next</button>              
            </div>

            <div className='text-box py-4 text-center'>
              <span className='text-gray-500'>
                Comeback later?  
                  <button onClick={userLogout} className='text-red-500' to='/'>
                   Logout
                  </button>
              </span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
