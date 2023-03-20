import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

/*import all components */
import Username from './components/Username.js';
import Password from './components/Password.js';
import PageNotFound from './components/PageNotFound.js';
import Profile from './components/Profile.js';
import Recovery from './components/Recovery.js';
import Register from './components/Register.js';
import Reset from './components/Reset.js';

import { AuthorizeUser, ProtectRoute} from './middleware/auth.js';

/*root router */
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
  }
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
