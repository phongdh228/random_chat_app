import React from 'react';
import Header from "../shared/Header";
import homeImg from "../../assets/home.svg";
import {useNavigate} from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <Header/>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-12 sm:pt-24 lg:pt-28">
          <div className="text-center">
            <img src={homeImg} alt="homepage image" className="w-1/2 mx-auto"/>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Welcome to GoldenWind</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">This is a random chat website which help you find more
              and more friends.
              No one can predict that you may be lucky enough to find someone to stand with you in the future.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="video"
                 className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Match
                now</a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Create custom room <span
                aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
