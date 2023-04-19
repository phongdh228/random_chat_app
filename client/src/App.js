import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { makeStyles } from '@mui/styles';

/*import all components */
import Username from './components/account/Username.js';
import Password from './components/account/Password.js';
import PageNotFound from './components/account/PageNotFound.js';
import Profile from './components/account/Profile.js';
import Recovery from './components/account/Recovery.js';
import Register from './components/account/Register.js';
import Reset from './components/account/Reset.js';
import Video from './components/call/Video.js';

import { AuthorizeUser, ProtectedRoute} from './middleware/auth.js';

/*root router */
const useStyles = makeStyles((theme) => ({
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
    element: <ProtectedRoute><Password/></ProtectedRoute>
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
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  },
]);



export default function App() {

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
