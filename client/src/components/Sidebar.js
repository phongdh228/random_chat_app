import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    function userLogout() {
        localStorage.removeItem('token');
        navigate('/')
      }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/home">Setting</Link>
        </li>
        <li>
            <button onClick={userLogout} className='text-red-500' to='/'>
                   Logout
            </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
