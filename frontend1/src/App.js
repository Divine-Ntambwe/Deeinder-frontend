import Navbar from './Navbar/Navbar'
import './App.css';
import SplashScreen from './SplashScreen';
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch as Switch, useHistory} from 'react-router-dom';
import useFetch from './useFetch';
import Login from './Login';
import SignUp from './SignUp';
import Home from './HomePage/Home'
import MemberProfile from './MemberProfile/MemberProfile';


function App() {
  

  return (
    <Router>
       <div className="App">
      
      
      
     
       <div className='content'>
         <Switch>
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
           <MemberProfile/>
          </Route>

          
         
         </Switch>
        
         
       </div>
      
    </div>

    
    </Router>
   
  );
}

export default App;
