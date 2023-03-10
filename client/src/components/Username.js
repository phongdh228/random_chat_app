import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/avt.jpg'

import styles from '../styles/Username.module.css'

export default function Username() {
  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Hello Username</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore more by connecting with us
              </span>
          </div>

          <form className='py-1'>
            <div className='profile flex justify-center'>
              <img src={avatar} className={styles.profile_img} alt="avatar"></img>
            </div>

            <div className='text-box flex flex-col items-center py-4'>
              <input className={styles.textbox} type="text" placeholder='Username'/>
              <button className={styles.btn} type="submit">Let's go</button>
            </div>

            <div className='text-box py-4'>
              <span className='text-gray-500'>Not a member? <Link className='text-red-500' to='/register'>Register now</Link></span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
