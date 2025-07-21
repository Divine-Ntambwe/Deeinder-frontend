import React, { useEffect,useRef, useState,useContext } from 'react'
import { useParams} from 'react-router-dom'
import useFetch from '../useFetch'
import './MemberProfile.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { grid, gridColumn, textAlign } from '@mui/system';
import Button from '@mui/material/Button';
import { UserContext } from '../App.js';

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const url = "http://localhost:5000";
  const { get: getMembers, result: member } = useFetch(
    `${url}/memberProfile/${user}`
  );
  const {
    fullName,
    age,
    shortDescription,
    likes,
    connections,
    relationshipIntent,
    pfpPath,
    interests,
    aboutMe,
    picsPaths,
  } = member ? member : "";

  useEffect(() => {
      getMembers();
    }, []);
    const noPhotoText = useRef();
  return (
    <div>
        <div id="body-mp">

          <div id="top-mp">
            <div id="member-pfp-cont">
             {member && <img id="member-pfp" src={"http://localhost:5000/" + pfpPath}/>}
            </div>

            <div id="name-desc-likes-connec">
               {member && <p className="name-age">{fullName}, {age}</p>}
               {member&& <p className="short-desc">{shortDescription}</p>}

              <div className="like-connection-grp">

                <div> 
                 
                  <p  style={{cursor:"pointer"}} className="purple-text" >Like Profile</p>
                  {member && <span>{`${likes.length}`} Likes</span>}
                </div>
             <FavoriteIcon id="like-button" ref={likeButton} style={{fontSize: "72px",color:"gray",cursor:"pointer"}}/>

              </div>

              <div className="like-connection-grp">

                <div> 
                 
                  <p  style={{cursor:"pointer"}}className="purple-text">Send Connection Request</p>
                  <span>{connections} connections</span>
                </div>
             <span ref={requestBtn} style={{color:"gray",cursor:"pointer"}} onClick={handleSendConnectionRequest} ><i className="fa-solid fa-users-rays"></i></span>

              </div>
             
            </div>

            <div className="intent-intests">
              <div>
              <p className="rel-intent">Relationship Intent</p>
              <p className="purple-text">{relationshipIntent || "-"}</p>
              </div>
              
              <div>
                <p className="short-desc">Interests</p>
                <div  className="interests">
                   {member && interests.map((i)=>(<span>{i}</span>))}
                </div>
               
                
              </div>
            </div>
            

          </div>

          <div id="bottom-mp">
            <p>Photos</p>
            
            <div class="images-container">
                <p style={{gridColumn:"1/span 3"}} ref={noPhotoText}> <CameraAltOutlinedIcon/> No Photos Yet</p>
                {member && picsPaths.length !== 0 && hideText()}
              {member && picsPaths.length !== 0  && picsPaths.map((path)=>(<img src={"http://localhost:5000/"+path}/>)) }
        
            </div>

            <p>About</p>
            <div className="aboutMe">
              {member && Object.keys(aboutMe).map((k)=> (<span className="about-prop">{k}: <span className="about-val">{typeof aboutMe[k] == "string"?aboutMe[k]:aboutMe[k].toString()}</span></span> ))}
            </div>
              
     

          </div>

          

        </div>
    </div>
  )
}

export default UserProfile