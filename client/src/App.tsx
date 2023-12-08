import { Routes, Route } from 'react-router-dom';
import './App.css';
import ClientCard from './components/ClientCard/ClientCard';
import Dashboard from './components/Dashboard/Dashboard';
import AddClients from './components/AddClients/AddClients';
import Knowledge from './pages/Knowledge';
import Login from './authPages/Login';
import Registration from './authPages/Registration';
import {
  getClients,
  getClientsCurator,
  getStata,
  getTodos,
} from './redux/store/thunkActions.ts';
import { useEffect } from 'react';
import EditClientDefault from './components/EditClientDefault/EditClientDefault.tsx';
import { useAppDispatch, useAppSelector } from './redux/store/hooks.ts';
import Statistics from './pages/Statistics';
import Navbar from './components/Navbar.jsx';
import { checkSession } from './redux/store/thunkActions.ts';
import AllCurator from './components/AllCurator/AllCurator.tsx';

function App() {
  const { loader, isAdmin, id } = useAppSelector((store) => store.userSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkSession());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isAdmin == true) {
        await dispatch(getClients());
      } else {
        await dispatch(getClientsCurator(id));
      }
    };
    fetchData();
  }, [dispatch, isAdmin, id]);

  return (
    <div className='roote'>
      <div className='nav'>
        <Navbar />
        {loader && <div className="loader"></div>}
      </div>
      <div className='content'>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/clients/:id" element={<ClientCard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-clients" element={<AddClients />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/client/:id" element={<EditClientDefault />} />
          <Route path="/all-curator" element={<AllCurator />} />
        </Routes>
      </div>

    </div>
  );
}
export default App;

function Landing() {
  window.location.href = '../landing.html';
  return null;
}
