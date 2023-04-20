import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

export default function Homepage(){

  return (
    <div className="homepage">
      <Sidebar/>
      <div className="main-content">
        <h1>Welcome to the Homepage</h1>
        <Link to="/video">Random Chat</Link>
        <button>Let's Study</button><br></br>
        <button>Make a Meeting</button>
      </div>
    </div>
  );
};
