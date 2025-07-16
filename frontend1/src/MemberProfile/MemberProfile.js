import React, { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import useFetch from '../useFetch'
import './MemberProfile.css'
import FavoriteIcon from '@mui/icons-material/Favorite';

function MemberProfile() {
    const username = useParams().username;
    const url = "http://localhost:5000/memberProfile/"+ username
    const {get,result:member} = useFetch(url);
    get();
    const {fullName,age,shortDescription,likes,connections,relationshipIntent,pfpPath,interests,aboutMe} = member? member:""

  return (
    <div id="MemberProfile">
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
                 
                  <p className="purple-text">Like Profile</p>
                  <span>{likes} Likes</span>
                </div>
              <FavoriteIcon style={{fontSize: "72px"}}/>

              </div>

              <div className="like-connection-grp">

                <div> 
                 
                  <p className="purple-text">Send Connection Request</p>
                  <span>{connections} connections</span>
                </div>
              <i className="fa-solid fa-users-rays"></i>

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
              <img src="/splashBG.png"/>
              <img src="/splashBG.png"/>
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

export default MemberProfile