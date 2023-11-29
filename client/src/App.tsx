import { Routes, Route } from 'react-router-dom';
import './App.css';
import Client from './components/Clients/Clients';
import Dashboard from './components/Dashboard/Dashboard';
import AddClients from './components/AddClients/AddClients';
import Login from './authPages/Login';
import Registration from './authPages/Registration';
import {useAppDispatch} from "./redux/store/hooks.ts";
import {getClients} from "./redux/store/thunkActions.ts";
import {useEffect} from "react";
import EditClientDefault from "./components/EditClientDefault/EditClientDefault.tsx";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch, AddClients]);
    return (
<>
    <Routes>
        <Route path="/clients" element={<Client />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-clients" element={<AddClients />} />
        <Route path="/client/:id" element={<EditClientDefault />} />
    </Routes>
    {/*<Login />*/}
    {/*<Registration />*/}
</>


    );
}

export default App;
