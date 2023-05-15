import React from "react";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex flex-1">
          <a href="home" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                 alt="logo"/>
          </a>
        </div>
        <div className="flex gap-x-12">
          <a href="profile" className="text-sm font-semibold leading-6 text-gray-900">Profile</a>
          <a href="setting" className="text-sm font-semibold leading-6 text-gray-900">Setting</a>
        </div>
        <div className="flex flex-1 justify-end">
          <button onClick={()=>userLogout()} className="text-sm font-semibold leading-6 text-gray-900">Log out <span aria-hidden="true">&rarr;</span></button>
        </div>
      </nav>
    </header>
  )
}

export default Header;