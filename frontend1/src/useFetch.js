import { useState } from "react";

const useFetch = (url,body,toDo) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function get() {
     try { 
     const res = await fetch(url);
     const data = await res.json();
     setData(data)
     } catch(e) {
      console.error(e)
     }
  
  }

  async function post(body,toDo) {
     try { 
      setLoading(true);
     const res = await fetch(url,{
       method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify(body)
     });
       
     const data = await res.json();
     setLoading(false);
     setData(data);
     console.log(data);

      if (data.message) {
        toDo()
     }
     } catch(e) {
      console.error(e)
     }
  }

 
  return { get, post , data, error,loading };
};

export default useFetch;
