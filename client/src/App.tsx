import { Routes, Route } from 'react-router-dom';
import './App.css';
import ClientCard from './components/ClientCard/ClientCard';
import Dashboard from './components/Dashboard/Dashboard';
import AddClients from './components/AddClients/AddClients';
import Knowledge from './pages/Knowledge';
import Login from './authPages/Login';
import Registration from './authPages/Registration';
import {getClients, getTodos} from "./redux/store/thunkActions.ts";
import {useEffect} from "react";
import EditClientDefault from "./components/EditClientDefault/EditClientDefault.tsx";
import { useAppDispatch, useAppSelector } from './redux/store/hooks.ts';
import Statistics from './pages/Statistics';
import Navbar from './components/Navbar.jsx';
import axios from 'axios';
import { checkSession } from './redux/store/thunkActions.ts';
import AllCurator from "./components/AllCurator/AllCurator.tsx";

function App() {
  const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getClients());
    }, []);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

  useEffect(() => {
    dispatch(checkSession());
  }, []);

  const { loader } = useAppSelector((store) => store.userSlice);

  return (
    <>
      <Navbar />
      {loader && <div className="loader"></div>}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/clients/:id" element={<ClientCard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-clients" element={<AddClients />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/statistics" element={<Statistics />} />
          <Route path="/client/:id" element={<EditClientDefault />} />
          <Route path="/all-curator" element={<AllCurator/>}/>

      </Routes>
    </>
  );
}

export default App;
