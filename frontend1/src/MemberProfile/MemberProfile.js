import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import "./MemberProfile.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { grid, gridColumn, textAlign } from "@mui/system";
import Button from "@mui/material/Button";
import { UserContext } from "../App.js";
import CommonNavbar from '../CommonNavbar/CommonNavbar.js'

function MemberProfile() {
  const memberUsername = useParams().username;
  const { user, setUser } = useContext(UserContext);
  const url = "http://localhost:5000";
  const { get: getMembers, result: member } = useFetch(
    `${url}/memberProfile/${memberUsername}`
  );
  const likeButton = useRef();
  const { put: likeProfile } = useFetch(
    `${url}/likeProfile/${user}/${memberUsername}`
  );
  const { put: dislikeProfile } = useFetch(
    `${url}/dislikeProfile/${user}/${memberUsername}`
  );
  const { get: getConnections, result: allConnections } = useFetch(
    `${url}/connectionRequests/${memberUsername}`
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
  const noPhotoText = useRef();
  const { post: postConnection } = useFetch(
    `${url}/connectionRequest/${user}/${memberUsername}`
  );
  const requestBtn = useRef();
  const { put: updateConnection } = useFetch(
    `${url}/removeConnectionRequest/${memberUsername}/${user}`
  );

  function hideText() {
    noPhotoText.current.style.display = "none";
  }
  useEffect(() => {
    getConnections();
    if (allConnections){
    let found = allConnections.find(
      (connection) => connection.senderUsername === user
    );
    if (found) {
      requestBtn.current.style.color = "#cb6ce6";
    } else {
      requestBtn.current.style.color = "gray";
    }
  }
    getMembers();

    if (member && likes.includes(user)) {
      likeButton.current.style.color = "#cb6ce6";
    } else {
      likeButton.current.style.color = "gray";
    }
  }, [member]);

  const handleLikeProfile = () => {
    if (likeButton.current.style.color === "gray") {
      likeProfile({}, () => {
        likeButton.current.style.color = "#cb6ce6";
      });
    } else {
      dislikeProfile({}, () => {
        likeButton.current.style.color = "gray";
      });
    }
  };

  function handleSendConnectionRequest() {
    if (requestBtn.current.style.color === "gray") {
      postConnection({}, () => {
        requestBtn.current.style.color = "#cb6ce6";
      });
    } else {
      updateConnection({}, () => {
        requestBtn.current.style.color = "gray";
      });
    }
  }

  return (
    <div id="MemberProfile profile">
      <div id="body-mp">
      <div className='profile-navbar'>
          <CommonNavbar/>
        </div>
        <div id="top-mp">
          <div id="member-pfp-cont">
            {member && (
              <img id="member-pfp" src={"http://localhost:5000/" + pfpPath} />
            )}
          </div>

          <div id="name-desc-likes-connec">
            {member && (
              <p className="name-age">
                {fullName}, {age}
              </p>
            )}
            {member && <p className="short-desc">{shortDescription}</p>}

            <div className="like-connection-grp">
              <div>
                <p
                  style={{ cursor: "pointer" }}
                  className="purple-text"
                  onClick={handleLikeProfile}
                >
                  Like Profile
                </p>
                {member && <span>{`${likes.length}`} Likes</span>}
              </div>
              <FavoriteIcon
                className = "Like-Req-btn"
                ref={likeButton}
                onClick={handleLikeProfile}
                style={{ fontSize: "72px", color: "gray", cursor: "pointer" }}
              />
            </div>

            <div className="like-connection-grp">
              <div>
                <p
                  style={{ cursor: "pointer" }}
                  className="purple-text"
                  onClick={handleSendConnectionRequest}
                >
                  Send Connection Request
                </p>
                <span>{connections} connections</span>
              </div>
              <span
                className = "Like-Req-btn"
                ref={requestBtn}
                style={{ color: "gray", cursor: "pointer" }}
                onClick={handleSendConnectionRequest}
              >
                <i className="fa-solid fa-users-rays"></i>
              </span>
            </div>
          </div>

          <div className="intent-intests">
            <div>
              <p className="rel-intent">Relationship Intent</p>
              <p className="purple-text">{relationshipIntent || "-"}</p>
            </div>

            <div>
              <p className="short-desc">Interests</p>
              <div className="interests">
                {member && interests.map((i) => <span>{i}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div id="bottom-mp">
          <p>Photos</p>

          <div class="images-container">
            <p style={{ gridColumn: "1/span 3" }} ref={noPhotoText}>
              {" "}
              <CameraAltOutlinedIcon /> No Photos Yet
            </p>
            {member && picsPaths.length !== 0 && hideText()}
            {member &&
              picsPaths.length !== 0 &&
              picsPaths.map((path) => (
                <img src={"http://localhost:5000/" + path} />
              ))}
          </div>

          <p>About</p>
          <div className="aboutMe">
            {member &&
              Object.keys(aboutMe).map((k) => (
                <span className="about-prop">
                  {k}:{" "}
                  <span className="about-val">
                    {typeof aboutMe[k] == "string"
                      ? aboutMe[k]
                      : aboutMe[k].toString()}
                  </span>
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
