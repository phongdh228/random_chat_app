import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import avatar from '../../assets/avt.jpg';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import useFetch from '../../hooks/fetch.hook';
import {profileValidation} from '../../helper/validate';
import DatePicker from 'react-datepicker';
import covertToBase64 from '../../helper/convert';
import {useAuthStore} from '../../store/store';
import {updateUser} from '../../helper/helper';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/Username.module.css'
import extend from '../../styles/Profile.module.css';
import Header from "../shared/Header";

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
    enableReinitialize: true,
    //validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
      localStorage.setItem('user_informations', JSON.stringify(values));
      navigate('/hobby')
    }
  })

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
  }

  //
  // if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  // if(serverError) return <div className='text-xl text-red-500'>{serverError.message}</div>

  return (
    <div className='container mx-auto'>
      <Header/>

      <form className={`${extend.contentContainer} max-w-screen-md mx-auto mt-24 p-8 px-12 sm:px-24 rounded-xl`}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">You can update your profile</p>

            <div className='profile flex justify-center'>
              <label htmlFor='profile'>
                <img src={avatar} className={styles.profile_img} alt="avatar"></img>
              </label>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
              <div className="mt-1">
                <input {...formik.getFieldProps('fullname')} className={`${styles.textbox}`} type="text"
                       placeholder='Full Name'/>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Birthday</label>
            <div className="mt-1">
              <DatePicker
                {...formik.getFieldProps('birthday')}
                className={`${styles.textbox}`}
                placeholderText='Birthday'
                selected={formik.values.birthday}
                dateFormat='dd/MM/yyyy'
                onChange={date => formik.setFieldValue('birthday', date)}
              />
            </div>
            </div>

            <div className="mt-3 flex gap-10 py-2 justify-center">
              <div>
                <input
                  type='radio'
                  value='male'
                  id='male'
                  name='gender'
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male"> Male</label>
              </div>
              <div>
                <input
                  type='radio'
                  value='female'
                  id='female'
                  name='gender'
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female"> Female</label>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
              <div className="mt-1">
                <input {...formik.getFieldProps('phone')} className={`${styles.textbox}`} type="text"
                       placeholder='Phone Number'/>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Address</label>
              <div className="mt-1">
                <input {...formik.getFieldProps('address')} className={`${styles.textbox}`} type="text"
                       placeholder='Address'/>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
          </button>
        </div>
      </form>
    </div>
  )
}
