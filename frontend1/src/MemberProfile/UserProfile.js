import React, { useEffect,useRef, useState,useContext } from 'react'
import { useParams} from 'react-router-dom'
import useFetch from '../useFetch'
import './MemberProfile.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { grid, gridColumn, textAlign } from '@mui/system';
import Button from '@mui/material/Button';
import { UserContext } from '../App.js';
import CommonNavbar from '../CommonNavbar/CommonNavbar.js';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const url = "http://localhost:8000";
  const { get: getMembers, result: member } = useFetch(
    `${url}/memberProfile/${user}`
  );
  const {
    username,
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

  const 
    [newUsername,setUsername] = useState(),
    [newShortDesc,setShortDesc] = useState(),
    [newRelationshipIntent,setRelationshipIntent] = useState(),
    [newPfpPath,setPfpPath] = useState(),
    [newInterests,setInterests] = useState(),
    [newAboutMe,setAboutMe] = useState(),
    [newPicsPaths,setPicsPath] = useState(picsPaths) ;


  function hideText() {
    noPhotoText.current.style.display = "none";
  }

  useEffect(() => {
      getMembers(()=>{
      });
    }, []);

    useEffect(() => {
        setUsername(username);
        setShortDesc(shortDescription);
        setRelationshipIntent(relationshipIntent);
        setPfpPath(pfpPath);
        setInterests(interests);
        setAboutMe(aboutMe);
        setPicsPath(picsPaths)
    }, [member]);

    useEffect(()=>{ 

    },[newInterests])

    

    const noPhotoText = useRef();


    const addInterestInput = useRef();
    function handleAddInterest(e){
      if (!newInterests.includes(addInterestInput.current.value)){
      setInterests([...newInterests,addInterestInput.current.value])
      addInterestInput.current.value = ""
    } else {
      alert("Interest Already Exists")
    }
    }
 
    
    
    function handleRemoveInterest(e){
      const interest = e.target.parentElement.parentElement ;
      interest.style.display = "none";

      setInterests(newInterests.filter((i)=>{return i !== interest.children[1].textContent}))

    }
  return (
    <div className='user-profile profile'>

      <div className='profile-popup-cont'>

        <div className='profile-popup'>
          <div id="edit-prof-header">
          <h2>Edit Profile</h2>
          <div>
          <input value="save" type='submit' id="save-discard"/>
          <input value="discard" type='button' id="save-discard"/>
          </div>
        
          </div>
          

          {member && <div>
            <div className='edit-pfp'>
              <div>
              <img src={"http://localhost:8000/" + pfpPath}/>
              <p>
                <span>{fullName}, {age}</span>
                <p></p>
              </p>
              </div>
              
              <button>Change Profile Picture</button>
            </div>

            <form>
              <label>Username:<span style={{color:"#cb6ce6"}}>*</span></label>
              <input required value={newUsername} onChange={(e)=> setUsername(e.target.value)}/>

              <label>Short Description:<span style={{color:"#cb6ce6"}}>*</span></label>
              <input required spellcheck="true" value={newShortDesc} onChange={(e)=> setShortDesc(e.target.value)}/>

              <label>Relationship Intent:<span style={{color:"#cb6ce6"}}>*</span></label>
              <select required value={relationshipIntent}>
                <option>Short-term Fun</option>
                <option>Long-term Relationship</option>
                <option>Short-term but open to long terms</option>
                <option>Friends</option>
              </select>
             {newAboutMe &&<> <label>Languages<span style={{color:"#cb6ce6"}}>*</span></label>
              <input spellcheck="true" required pattern={/\w|,|\s/} value={typeof newAboutMe["Languages"] !== "string"? newAboutMe["Languages"].join(", "):newAboutMe["Languages"]} onChange={(e)=>{setAboutMe({...newAboutMe,"Languages": e.target.value.replace(/(?<!,)\s/,", ")})}}/>
          </>}

              <fieldset>
                <legend>Interests</legend>

                {newInterests && newInterests.map((i,k)=>(
                  <div className='interests-edit' id={k}> <Checkbox onChange={handleRemoveInterest} icon={<RemoveCircleOutlineIcon />} /> <label>{i}</label> </div>
                  
                  ))}
                <input className='add-interest' id="add-interest" ref={addInterestInput}/> 
              <input type='button' className='add-interest-btn' id='save-discard' onClick={handleAddInterest} value="add"/>

              </fieldset>

              
             {newAboutMe && 
             <>
             <label>You Live in?</label>
             <input value={newAboutMe["Lives In"]} onChange={(e)=>{setAboutMe({...newAboutMe,"Lives In": e.target.value})}} />

             <label>You Grew Up in?</label>
              <input value={newAboutMe["Grew Up In"]} onChange={(e)=>{setAboutMe({...newAboutMe,"Grew Up In": e.target.value})}}/>

              <label>Ethnicity</label>
              <input value={newAboutMe["Ethnicity"]} onChange={(e)=>{setAboutMe({...newAboutMe,"Ethnicity": e.target.value})}}/>

              <label>Job</label>
              <input value={newAboutMe["Job"]} onChange={(e)=>{setAboutMe({...newAboutMe,"Job": e.target.value})}}/>

              <label>Education</label>
              <input value={newAboutMe["Education"]} onChange={(e)=>{setAboutMe({...newAboutMe,"Education": e.target.value})}}/>

             
              <label>Relationship Status</label>
              <input value={newAboutMe["Relationship Status"]} onChange={(e)=>{setAboutMe({...newAboutMe,"Relationship Status": e.target.value})}}/>

              <label>Religion</label>
              <input value={newAboutMe["Religion"]} onChange={(e)=>{setAboutMe({...newAboutMe,"Religion": e.target.value})}}/>

             </>
             }

             

              
             
            </form>
          </div>}
        </div>

      </div>

        <div className='profile-navbar'>
          <CommonNavbar/>
        </div>
        <div id="body-mp">
        <p className='edit-prof'><EditTwoToneIcon style={{fontSize:"3em"}}/> </p>
          <div id="top-mp">
            
            <div id="member-pfp-cont">
             {member && <img id="member-pfp" src={"http://localhost:8000/" + pfpPath}/>}
            </div>

            <div id="name-desc-likes-connec">
               {member && <p className="name-age">{fullName}, {age}</p>}
               {member&& <p className="short-desc">{shortDescription}</p>}

              <div className="like-connection-grp">

                <div> 
                 
                  <p  style={{cursor:"pointer"}} className="purple-text" >Profile Likes:</p>
                  {member && <span>{`${likes.length}`} Likes</span>}
                </div>
       
              </div>

              <div className="like-connection-grp">

                <div> 
                 
                  <p  style={{cursor:"pointer"}}className="purple-text">Connection Requests:</p>
                  <span>{connections} connections</span>
                </div>
           
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
              {member && picsPaths.length !== 0  && picsPaths.map((path)=>(<img src={"http://localhost:8000/"+path}/>)) }
        
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