import React from 'react'
import { Link } from 'react-router-dom'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

function CommonNavbar() {
  return (
    <div id="common-navbar">
        <nav>
          <h1 className="main-heading">Deeinder</h1>
          <div id="common-nav-icons">
          <Link to="/Home"><i className="fa-solid fa-house-chimney nav-icons"></i></Link>

          <Link><i className="fa-solid fa-users-rays nav-icons"></i></Link>

          <Link id="msg-icon-link"><SendOutlinedIcon id="msg-icon" className="nav-icons"/></Link>
          <Link><i className="fa-solid fa-user nav-icons"></i></Link>
          </div>
        </nav>
    </div>
  )
}

export default CommonNavbar