import { useState,useContext } from "react";
import { UserContext } from './App';


const useFetch = (url,body,toDo) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);

  async function get(toDo = ()=>{}) {
     try { 
     const res = await fetch(url);
     const data = await res.json();
     setResult(data);
     if (res.ok){
      toDo()
     }
     } catch(e) {
      console.error(e)
     }
  
  }

  async function postMedia(body,toDo) {
     try { 
      setLoading(true);
     const res = await fetch(url,{
       method: "POST",
       body: body
     });
       
     const data = await res.json();
     setLoading(false);
     setResult(data);

      if (data.message) {
        let perform = toDo();
        if (perform === "creds") {
        localStorage.setItem("username",data.username)
        setUser(data.username)
      }
      }
     } catch(e) {
      console.error(e)
     }
  }

  async function post(body = {},toDo = ()=>{}) {
     try { 
      console.log(body)
      setLoading(true);
     const res = await fetch(url,{
       method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify(body)
     });
       
     const data = await res.json();
     setLoading(false);
     setResult(data);

      if (data.message) {
        let perform = toDo();
        if (perform === "creds") {
        localStorage.setItem("username",data.username)
        setUser(data.username)
      }
      }
     } catch(e) {
      console.error(e)
     }
  }

  async function put(body = {},toDo = ()=>{}) {
    try { 
      setLoading(true);
     const res = await fetch(url,{
       method: "PUT",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify(body)
     });
       
     const data = await res.json();
     setLoading(false);
     setResult(data);

      if (data.message) {
        let perform = toDo();
      }
     } catch(e) {
      console.error(e)
     }
  }

 
  return { get,postMedia, post , put,result, error,loading };
};

export default useFetch;
