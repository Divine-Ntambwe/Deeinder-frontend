import React from 'react'
import {useHistory} from 'react-router-dom'
import useFetch from './useFetch';
import { useContext } from 'react';
import { UserContext } from './App';

function SplashScreen() {
  const navigate = useHistory();
  const {user, setUser} = useContext(UserContext);
  
  if (localStorage.getItem("username")) {
     navigate.push('/Home');
    setUser(localStorage.getItem("username"))
    console.log(user)
  }
  return (
    <div id="splash-screen"><img id="splashBG"src="splashBG.png"></img></div>
  )
}

export default SplashScreen