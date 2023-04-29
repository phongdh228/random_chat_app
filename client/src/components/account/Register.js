import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../../assets/avt.jpg';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {registerValidation} from '../../helper/validate';
import covertToBase64 from '../../helper/convert';
import {registerUser} from '../../helper/helper';
import styles from '../../styles/Username.module.css'

export default function Register() {

  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password:''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      let registerPromise= registerUser(values);
      toast.promise(registerPromise,{
        loading: "Creating...",
        success: <b>Register Successfully</b>,
        error: <b>Could not register</b>
      });
      
      registerPromise.then(res =>{
        console.log("Response is: ")
        console.log(res)
        let token = res.loginData.data.token;
        console.log("REgister token: " + token);
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })

  return (
    <div className='container mx-auto'>

      <Toaster position='top-center' reverseOder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{width: "45%"}}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you
              </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center'>
              <label htmlFor='profile'>
              <img src={avatar} className={styles.profile_img} alt="avatar"></img>
              </label>
            </div>

            <div className='text-box flex flex-col items-center py-4'>
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email'/>
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username'/>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password'/>
              <button className={styles.btn} type="submit">Register</button>
            </div>

            <div className='text-box py-4 text-center'>
              <span className='text-gray-500'>
                Already Registed?  
                  <Link className='text-red-500' to='/'>
                   Login Now
                  </Link>
              </span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
