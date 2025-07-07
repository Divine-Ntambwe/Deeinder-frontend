import React from 'react'
import bgImg from './splashBG.png'
import {useHistory} from 'react-router-dom'
import useFetch from './useFetch';
import { useEffect } from 'react';

function SplashScreen() {
  const navigate = useHistory();


  if (localStorage.getItem("email") || localStorage.getItem("username")) {
      // navigate.push('/Home')

  }
  return (
    <div id="splash-screen"><img id="splashBG"src={bgImg}></img></div>
  )
}

export default SplashScreen