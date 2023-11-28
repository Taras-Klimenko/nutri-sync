import { Routes, Route } from 'react-router-dom';
import './App.css';
import Client from './components/ClientCard/ClientCard';
import Dashbord from './components/Dashbord/Dashbord';
import AddClients from './components/AddClients/AddClients';
import Login from './authPages/Login';
import Registration from './authPages/Registration';

function App() {

    return (
<>
    <Routes>
        <Route path="/clients" element={<Client />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/add-clients" element={<AddClients />} />
    </Routes>
    {/*<Login />*/}
    {/*<Registration />*/}
</>


    );
}

export default App;
