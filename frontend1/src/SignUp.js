import React from 'react'
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { compose, display, flexDirection, fontSize, margin, textAlign } from '@mui/system';
import { Link,useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useFetch from './useFetch';


function SignUp() {

  const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

  const [email,setEmail] = useState("");
  const [fullName,setFullName] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [gender,setGender] = useState("");
  const [dob,setDob] = useState("");

  const url = "http://localhost:5000/signUp";

  // const [loading, setLoading] = React.useState(false);
  // const [result,setResult] = useState("");
  // const [error,setError] = useState("");
  const navigate = useHistory();
 
  let today = new Date() ;
  let todayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2,"0")}-${(today.getDate()).toString().padStart(2,"0")}`
  
  const {post,data:result,loading} = useFetch(url)


  const handleSignUp = (e) => {
  e.preventDefault();
  const details = {fullName,username,email,password,confirmPassword,gender,dob};
  post(details,()=>{
     localStorage.setItem("username",username);
     navigate.push('/Home');
  }) 

    
  //  setLoading(true);
  //  fetch(url,{
  //       method: "POST",
  //       headers: {"Content-Type": "application/json"},
  //       body: JSON.stringify(details)
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setResult(data);
  //         setLoading(false);
  //         if (data.message) {
  //           localStorage.setItem("username",username);
  //           navigate.push('/Home');
            
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);

  //       });
  }

  return (
   
    <div id="SignUp" className="main-bg">

        <h1 className="main-heading">Deeinder</h1>
     
   <form onSubmit={handleSignUp}>
      <h2 id="signup-heading">Sign Up</h2>
      {result && <p id="display-error">{result.error}</p>}
        
      <div id="signup-form">
        <div id="left">
        <label>Full Name:</label>
         <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
         ></input>

         <label >Username:</label>
         <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>

          <label>Email:</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

         <label>Password:</label>
         <input required  type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

         <label>Confirm Password:</label>
         <input required  type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
        </div>
        
        <div id="right"> 
          <div id="upload-pfp">

            <Button
            style={{textAlign:'center' ,display:'flex', flexDirection:'column', color:'white'}}
      component="label"
      role={undefined}
      tabIndex={-1}
      
    >
     <AccountCircleIcon style={{fontSize:'180px', color:'gray'}}/>
     Upload Profile Picture
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files[0])}
        multiple
        
      />
    </Button>
           
          </div>
          
           <label>Gender:</label>
           <div id="genders">

            <div id="male-cont">

            <input required  className="gender" id="male" name="gender" type="radio" value="M" onChange={(e) => setGender(e.target.value)}></input>
            <label htmlFor="male">Male</label> 

            </div>

            <div id="female-cont">

            <input required className="gender" id="female"name="gender" type="radio" value="F" onChange={(e) => setGender(e.target.value)}></input>
            <label htmlFor="female">Female</label> 

            </div>

           </div>
          

          <label>Date Of Birth:</label>
         <input min="1900-01-01" max={todayDate} required type="date" value={dob} onChange={(e) => setDob(e.target.value)}></input>

         <div id="ts-cs">
           <input required id="ts-cs-ch" type="checkbox"></input>
           <label htmlFor="ts-cs-ch">I accept the <Link>terms&conditions</Link></label>
         </div>
        


        </div>

         
      </div>
      
      
       <IconButton style={{ width: '300px',
  height: '50px',
  fontSize: '20px',
  color: 'gray',
  backgroundColor: '#6215a3',
  borderRadius: '10px',
  border: 'none',
  margin: '10px 0 10px 0'}}  type="submit" variant="contained" loading={loading}>
              Sign Up
             </IconButton>
              <p>Already have an account? <Link to="/Login">Log In</Link></p>
      </form>       
    </div>
  )
}

export default SignUp