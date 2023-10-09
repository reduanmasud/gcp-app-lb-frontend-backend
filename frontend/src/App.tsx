// @ts-ignore
import {useEffect, useState } from 'react'

import './App.css'

const host = "http://18.212.179.164";
const port = "3000";
function App() {


  const [cities, setCities] = useState<any[]>([]);  
  const fetchList = () => {
    fetch(`${host}:${port}/cities`)
    .then(res => {
      console.log(res);
      return res.json();
    }).then((data) => setCities(data));
  }

  useEffect(()=>{
    fetchList();
  }, []);
  console.log(cities);

  return (
    <>
    <h1>Hello, GCP</h1>
    <ul>
     {cities.map((city, idx)=>(
      <li>{city.name}</li>
     ))}
     </ul>
    </>
  )
}

export default App
