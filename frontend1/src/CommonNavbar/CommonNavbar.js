import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import './CommonNavbar.css'
import { UserContext } from '../App';

function CommonNavbar() {
  const {check,setCheck} = useContext(UserContext)
  return (
    <div id="common-navbar">
        <nav>
          <h1 className="main-heading">Deeinder</h1>

          <div id="common-nav-icons">
          <Link to="/Home"><i className="fa-solid fa-house-chimney nav-icons"></i></Link>

          <Link><i className="fa-solid fa-users-rays nav-icons"></i></Link>

          <Link to="/Home"  id="msg-icon-link"><SendOutlinedIcon id="msg-icon" className="nav-icons"/></Link>
          <Link><i className="fa-solid fa-user nav-icons"></i></Link>
          </div>
        </nav>

        
    </div>
  )
}

export default CommonNavbar