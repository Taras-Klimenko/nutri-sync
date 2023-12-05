import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/store/hooks';
import axios from 'axios';
import { logout } from '../redux/store/slice/userSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    axios.get('https://nutrition-o5ja.onrender.com/auth/logout', { withCredentials: true });
    dispatch(logout());
  };
  const { name } = useAppSelector((store) => store.userSlice);
  return (
    <div className="navbar">
      <div className="navLink">Hello, {name ? name : 'гость'}</div>
      <Link className="navLink" to="/login">
        Login
      </Link>
      <Link className="navLink" to="/reg">
        Reg
      </Link>
      {/* TODO для теста одного клиента (потом удалить)  */}
      <Link className="navLink" to="/clients/1">
        Clients
      </Link>
      <Link className="navLink" to="/dashboard">
        Dashboard
      </Link>
      <Link className="navLink" to="/add-clients">
        Add Clients
      </Link>
      <Link className="navLink" to="/knowledge">
        Knowledge
      </Link>
      <Link className="navLink" to="/statistics">
        Statistics
      </Link>
      <Link className="navLink" onClick={() => logoutHandler()}>
        Logout
      </Link>
    </div>
  );
}
