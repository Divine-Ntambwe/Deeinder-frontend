import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div id="home" >
      <div id="home-navbar" className="main-bg">
        <h1 className="main-heading">Deeinder</h1>

        <nav>

          <Link><i className="fa-solid fa-house-chimney"></i> Home</Link>
        </nav>
      </div>

      <div id="body">
        
      </div>
      
      
    </div>
  )
}

export default Home

