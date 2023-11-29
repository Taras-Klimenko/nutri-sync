import { Routes, Route } from 'react-router-dom';
import './App.css';
import Client from './components/Clients/Clients';
import Dashboard from './components/Dashboard/Dashboard';
import AddClients from './components/AddClients/AddClients';
import Login from './authPages/Login';
import Registration from './authPages/Registration';

function App() {

    return (
<>
    <Routes>
        <Route path="/clients" element={<Client />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-clients" element={<AddClients />} />
    </Routes>
    {/*<Login />*/}
    {/*<Registration />*/}
</>


    );
}

export default App;
