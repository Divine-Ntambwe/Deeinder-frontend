import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

function Home() {
  return (
    <div id="home" >
      <div id="home-navbar" className="main-bg">
        <h1 className="main-heading">Deeinder</h1>

        <nav>

          <a href="#home"><i className="fa-solid fa-house-chimney nav-icons"></i> Home</a>
          <a><i className="fa-solid fa-magnifying-glass nav-icons"></i> Search</a>
          <Link><i className="fa-solid fa-users-rays nav-icons"></i> Connections</Link>
          <Link id="msg-icon-link"><SendOutlinedIcon id="msg-icon" className="nav-icons"/> Messages</Link>
          <Link><i class="fa-solid fa-user nav-icons"></i> Profile</Link>

        </nav>
      </div>

      <div id="body">
        
      </div>
      
      
    </div>
  )
}

export default Home

