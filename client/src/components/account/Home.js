import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Homepage(){
  const navigate = useNavigate();
  
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className="homepage">
      <div className="left-sidebar">
        <div className="sidebar-header">
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
        </div>
        <div className="sidebar-footer">
          <button onClick={userLogout} className='text-red-500' to='/'>
                   Logout
          </button>
        </div>
      </div>
      <div className="main-content">
        <h1>Welcome to the Homepage</h1>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </div>
    </div>
  );
};
