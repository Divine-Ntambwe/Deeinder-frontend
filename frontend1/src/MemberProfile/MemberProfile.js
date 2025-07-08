import React from 'react'
import { useParams} from 'react-router-dom'
import useFetch from '../useFetch'

function MemberProfile() {
    const username = useParams().username;
    const url = "http://localhost:5000/memberProfile/"+ username
    const {get,data:member} = useFetch(url);
    get();

  return (
    <div id="MemberProfile">
       {member && <p>This is {member.fullName} page</p> }

    </div>
  )
}

export default MemberProfile