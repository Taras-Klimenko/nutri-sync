
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Client from './components/Clients/Clients'
import { useEffect } from 'react'
import Dashbord from "./components/Dashbord/Dashbord.tsx";
import AddClients from "./components/AddClients/AddClients.tsx";
import Login from './authPages/Login';
import Registration from './authPages/Registration';


function App() {
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:3100/api/clients', {
          credentials: 'include',
        });
        const data = await res.json();
        console.log(data,'&&&&&&&&&&&&&&&&&');
      } catch (err) {
        console.log(err);
      }
    })();
  },[]);


  return (
    <>
     <Router>
      <Routes>
        <Route path="/clients" element={<Client />} />
      
      </Routes>
      </Router>
          <>
      <Login />
      <Registration />
      <Dashbord/>
        <AddClients/>

    </>
      
export default App;
