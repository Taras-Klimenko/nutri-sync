import { Routes, Route } from 'react-router-dom';
import './App.css';
import Client from './components/ClientCard/ClientCard';
import Dashboard from './components/Dashboard/Dashboard';
import AddClients from './components/AddClients/AddClients';
import Knowledge from './pages/Knowledge';
import Login from './authPages/Login';
import Registration from './authPages/Registration';
import {useAppDispatch} from "./redux/store/hooks.ts";
import {getClients, getCurators} from "./redux/store/thunkActions.ts";
import {useEffect} from "react";
import EditClientDefault from "./components/EditClientDefault/EditClientDefault.tsx";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getClients());
    }, []);
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-clients" element={<AddClients />} />
        <Route path="knowledge" element={<Knowledge />} />
      </Routes>
    </>
  );

}

export default App;
