import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { makeStyles } from '@mui/styles';

/*import all components */
import Username from './components/Username.js';
import Password from './components/Password.js';
import PageNotFound from './components/PageNotFound.js';
import Profile from './components/Profile.js';
import Recovery from './components/Recovery.js';
import Register from './components/Register.js';
import Reset from './components/Reset.js';
import Video from './components/Video.js';

import { AuthorizeUser, ProtectRoute} from './middleware/auth.js';

/*root router */
const useStyles = makeStyles((theme) => ({
  // appBar: {
  //   borderRadius: 15,
  //   margin: '30px 100px',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '600px',
  //   border: '2px solid black',

  //   [theme.breakpoints.down('xs')]: {
  //     width: '90%',
  //   },
  // },
  // image: {
  //   marginLeft: '15px',
  // },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },  
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/password',
    element: <ProtectRoute><Password/></ProtectRoute>
  },
  {
    path: '/pagenotfound',
    element: <PageNotFound></PageNotFound>
  },
  {
    path: '/profile',
    element: <AuthorizeUser><Profile/></AuthorizeUser>
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  },
  {
    path: '/video',
    element: <div className={useStyles.wrapper}><Video></Video></div>
  }
]);



export default function App() {

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
