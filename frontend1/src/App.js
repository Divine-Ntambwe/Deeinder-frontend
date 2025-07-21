import Navbar from './Navbar/Navbar'
import './App.css';
import SplashScreen from './SplashScreen';
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch as Switch, useHistory} from 'react-router-dom';
import useFetch from './useFetch';
import Login from './Login';
import SignUp from './SignUp';
import Home from './HomePage/Home'
import MemberProfile from './MemberProfile/MemberProfile';
import CommonNavbar from './CommonNavbar/CommonNavbar';
import UserProfile from './MemberProfile/UserProfile';
export const UserContext = React.createContext();

function App() {

  const [user,setUser] = useState(localStorage.getItem("username"));

  return (
    <Router>
       <div className="App">
       <div className='content'>
         <Switch>
          <UserContext.Provider value={{user,setUser}}>

            <Route exact path="/">
             <Navbar/>
             <SplashScreen/>
          </Route>

          <Route exact path="/Login">
          <Login/>
          </Route>

          <Route exact path="/SignUp">
            <SignUp/>
          </Route>

          <Route exact path="/Home">
          <Home/>
          </Route>
          
          <Route exact path="/MemberProfile/:username">
           <CommonNavbar/>
           <MemberProfile/>
           
          
          </Route>

          <Route exact path="/userProfile/:user">
          <CommonNavbar/>
          <UserProfile/>
          </Route>

          </UserContext.Provider>
         </Switch>
        
         
       </div>
      
    </div>

    
    </Router>
   
  );
}

export default App;
