import { Routes, Route } from 'react-router-dom';
import './App.css';
import Client from './components/ClientCard/ClientCard';
import Dashboard from './components/Dashboard/Dashboard';
import AddClients from './components/AddClients/AddClients';
import Knowledge from './pages/Knowledge';
import Login from './authPages/Login';
import Registration from './authPages/Registration';
import {useAppDispatch} from "./redux/store/hooks.ts";
import {getClients, getTodos} from "./redux/store/thunkActions.ts";
import {useEffect} from "react";
import EditClientDefault from "./components/EditClientDefault/EditClientDefault.tsx";
import Statistics from './pages/Statistics';

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getClients());
    }, []);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    return(
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-clients" element={<AddClients />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/statistics" element={<Statistics />} />
          <Route path="/client/:id" element={<EditClientDefault />} />
          <Route path="/clients/:id" element={<Client />} />
      </Routes>
    </>
  );

}

export default App;
