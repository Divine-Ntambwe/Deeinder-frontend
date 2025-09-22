import React, { useContext, useEffect, useState } from 'react';
import './Connections.css';
import { UserContext } from '../App';
import useFetch from '../useFetch';
import { members } from '../Context/MembersContext';
import CommonNavbar from '../CommonNavbar/CommonNavbar';
const ConnectionRequestItem = ({ name, button1, button2,img }) => (
  <div className="request-item">
    <img src={img} alt="Profile" className="profile-img" />
    <span className="name">{name}</span>
    <div className="buttons">
      <button className={`btn ${button1 === 'Pending' ? 'disabled' : ''}`}>
        {button1}
      </button>
      <button className={`btn ${button2 === 'Pending' ? 'disabled' : ''}`}>
        {button2}
      </button>
    </div>
  </div>
);

const ConnectionRequests = () => {
  const requests = [
    { name: 'Blessing Jones', button1: 'Accept', button2: 'Accept' },
    { name: 'Brittney Connor', button1: 'Message', button2: 'Message' },
    { name: 'Samuel Korry', button1: 'Accept', button2: 'Accept' },
    { name: 'Wilfred Mendes', button1: 'Pending', button2: 'Pending' },
    { name: 'Ozias Powers', button1: 'Message', button2: 'Message' },
    { name: 'Rich Idris', button1: 'Message', button2: 'Message' },
    { name: 'Chris B. Jordan', button1: 'Message', button2: 'Message' },
  ];
  
  const {user,url} = useContext(UserContext)
  const {get} = useFetch(`${url}/connectionRequests/${user.username}`);
  const {allMembers} = useContext(members)
  console.log(allMembers)

  const [connections,setConnections] = useState()
  useEffect(()=>{
    get((d)=>{
        setConnections(d)
    })
  },[])
 

  return (
    <>
     <div className="home-navbar">
        <CommonNavbar />
      </div>
    <div className="container">
      <h1 className="title">Connection Requests</h1>
      <div className="header">
        <div className="tabs">
          All | Accepted requests | Unaccepted requests | Pending
        </div>
        <input type="text" className="search" placeholder="Search" />
      </div>
      <div className="requests-list">
        {connections && allMembers && connections.map((connection) => (
        <> {connection.senderUsername === user.username && <ConnectionRequestItem
            key={connection._id}
            name={connection.recieverUsername}
            button1={connection.hasAccepted?"Message":"Pending"}
            button2={connection.hasAccepted?"Remove":"Cancel Request"}
            img={`${url}/${allMembers.find((person)=>{return person.username === connection.recieverUsername}).pfpPath}`}
          /> }
          { connections && allMembers &&  connection.recieverUsername === user.username && <ConnectionRequestItem
            key={connection._id}
            name={connection.senderUsername}
            button1={connection.hasAccepted?"Message":"Accept"}
            button2={connection.hasAccepted?"Remove":"Cancel Request"}
            img={`${url}/${allMembers.find((person)=>{return person.username === connection.senderUsername})}`}
          />}
          </>
        ))}
      </div>
    </div>
    </>
  );
};

export default ConnectionRequests;