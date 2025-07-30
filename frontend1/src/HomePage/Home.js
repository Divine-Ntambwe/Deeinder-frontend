import React, { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useState, useContext, useRef } from "react";
import useFetch from "../useFetch";
import { UserContext } from "../App";

function Home() {
  const { result: data, get } = useFetch(
    "http://localhost:8000/membersProfiles"
  );
  const { user, setUser } = useContext(UserContext);
  setUser(localStorage.getItem("username"));

  useEffect(() => {
    get();
  }, []);

  let [members, setMembers] = useState([]);

  let temp = [];
  for (let i in data) {
    temp.push(data[i]);
  }

  useEffect(() => {
    setMembers([...temp]);
  }, [data]);

  const [searchText, setSearchText] = useState("");
  let filterMembers = [...temp];

  const search = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    filterMembers =
      searchText === ""
        ? filterMembers
        : filterMembers.filter(
            (member) =>
              member.username.toLowerCase().includes(value) ||
              member.fullName.toLowerCase().includes(value)
          );
    setMembers(filterMembers);
  };

  const searchTextElement = useRef();
  const searchInput = useRef();
  function handleSearchClick() {
    searchInput.current.style.display = "inline";
    searchInput.current.focus();
    searchTextElement.current.style.display = "none";
  }

  function handleSearchInputBlur() {
    searchInput.current.style.display = "none";
    searchTextElement.current.style.display = "inline";
  }

  return (
    <div id="home">
      <div id="home-navbar" className="main-bg">
        <h1 className="main-heading">Deeinder</h1>

        <nav>
          <a href="#home">
            <i className="fa-solid fa-house-chimney nav-icons"></i> Home
          </a>
          <a id="home-search" onClick={handleSearchClick}>
            <i className="fa-solid fa-magnifying-glass nav-icons"></i>
            <span ref={searchTextElement} id="search-text">
              Search
            </span>
            <input
              id="search"
              ref={searchInput}
              value={searchText}
              onChange={search}
              onBlur={handleSearchInputBlur}
            />
          </a>
          <Link>
            <i className="fa-solid fa-users-rays nav-icons"></i> Connections
          </Link>
          <Link id="msg-icon-link">
            <SendOutlinedIcon id="msg-icon" className="nav-icons" /> Messages
          </Link>
          <Link to={"/userProfile/"+ user}>
            <i className="fa-solid fa-user nav-icons"></i> Profile
          </Link>
        </nav>
      </div>

      <div id="body">
        <h2>Explore Profiles</h2>

        <div id="explore">
          {members && members.length === 0 ? (
            <h3>No results found</h3>
          ) : (
            members.map((member) => (
              <Link to={`MemberProfile/${member.username}`}>
                <div key={member.username} className="preview-profile">
                  <img
                    alt={`a picture of ${member.username}`}
                    src={"http://localhost:8000/" + member.pfpPath}
                  />
                  <h3>
                    {member.username}, {member.age}
                  </h3>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
