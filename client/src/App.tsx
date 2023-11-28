import './App.css'
import Dashbord from "./components/Dashbord/Dashbord.tsx";
import AddClients from "./components/AddClients/AddClients.tsx";
import Login from './authPages/Login';
import Registration from './authPages/Registration';

function App() {
 

  return (
    <>
      <Login />
      <Registration />
      <Dashbord/>
        <AddClients/>
    </>
  );
}

export default App;
